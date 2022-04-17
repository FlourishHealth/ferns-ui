/**
 * Contains the APIs and model plugins to send and receive messages. Currently, supports Twilio and
 * Expo push notifications.
 */
import axios from "axios";
import Expo, {ExpoPushErrorTicket, ExpoPushSuccessTicket, ExpoPushTicket} from "expo-server-sdk";
import mongoose, {Document, Schema, Types} from "mongoose";

import {logger} from "../logger";
import {
  ConversationDocument,
  ConversationModel as GeneratedConversationModel,
  ConversationSchema as GeneratedConversationSchema,
  ConversationUser,
  MessageData,
  MessageDocument,
  MessageModel,
  MessagePushStatus,
  MessageSchema,
} from "./interfaces";

// Selectively export from interfaces
export {MessageSchema, MessageModel, MessageDocument} from "./interfaces";

const expo = new Expo({accessToken: process.env.EXPO_ACCESS_TOKEN});

const BACKOFF_SECONDS = [5, 5, 5, 15, 30];

// TODO make these adjustable by the calling app.
const DEFAULT_USER_MODEL = "User";
const DEFAULT_CONVERSATION_MODEL = "Conversation";

// const DEFAULT_MESSAGE_MODEL = "Message";

function isPopulated(field: any): boolean {
  if (Array.isArray(field)) {
    if (field.length === 0) {
      return false;
    } else {
      return field[0]._bsontype === "ObjectId";
    }
  } else {
    return field._bsontype === "ObjectId";
  }
}

function isExpoPushTicketSuccess(data: ExpoPushTicket): data is ExpoPushSuccessTicket {
  return data.status === "ok";
}

function isExpoPushTicketError(data: ExpoPushTicket): data is ExpoPushErrorTicket {
  return data.status === "error";
}

export function userMessagingPlugin(schema: Schema) {
  schema.add({
    expoToken: {type: String},
    messagingMethods: {
      push: {enabled: {type: Boolean, default: true}, optedOut: {type: Boolean, default: false}},
      sms: {enabled: {type: Boolean, default: true}, optedOut: {type: Boolean, default: false}},
    },
    conversations: [
      {
        conversationId: {
          type: Schema.Types.ObjectId,
          ref: DEFAULT_CONVERSATION_MODEL,
          required: true,
        },
      },
    ],
  });
}

export function messagePlugin(messageSchema: Schema) {
  messageSchema.add({
    text: {type: String},
    // Not required, if not specified, shows up as a system message. Your app should handle this
    // on the frontend.
    from: {
      type: Schema.Types.ObjectId,
      ref: DEFAULT_USER_MODEL,
    },
    conversationId: {
      type: Schema.Types.ObjectId,
      ref: DEFAULT_CONVERSATION_MODEL,
      required: true,
    },
    pushStatuses: [
      {
        // Expo returns a push ticket which tells us whether the Expo servers have accepted our push message.
        userId: {
          type: Schema.Types.ObjectId,
          ref: DEFAULT_USER_MODEL,
        },
        ticketStatus: {type: String, enum: ["ok", "error"]},
        // When a ticket is successful, we get a ticket id for querying for push receipt.
        ticketId: String,
        // If there was an error communicating with Expo, that message and type will be storied here.
        ticketErrorMessage: String,
        ticketErrorType: {
          type: String,
          enum: [
            "DeviceNotRegistered",
            "InvalidCredentials",
            "MessageTooBig",
            "MessageRateExceeded",
          ],
        },
        // Receipts come from the iOS and Google push servers and represent whether the push was actually delivered.
        receiptStatus: {type: String, enum: ["ok", "error"]},
        receiptErrorMessage: String,
        receiptErrorDetails: String,
      },
    ],
    // TODO: Add support for threading messages and replies.
  });

  messageSchema.methods = {
    // Ask the Expo server for push receipts to see what the status from Google/Apple is for push.
    async updatePushReceipts(backoffIndex: number = 1) {
      logger.debug(`Updating push receipts for ${this._id}`);
      const ids = this.pushStatuses
        .map((s: MessagePushStatus) => {
          if (s.ticketStatus === "ok" && s.ticketId && !s.receiptStatus) {
            return s.ticketId;
          }
          return null;
        })
        .filter((s: string | null) => s);

      // Get push receipts
      const res = await axios.post("https://exp.host/--/api/v2/push/getReceipts", {
        ids,
      });

      for (const ticketId of Object.keys(res.data.data)) {
        const receipt = res.data.data[ticketId];
        const pushStatus = this.pushStatuses.find(
          (s: MessagePushStatus) => s.ticketId === ticketId
        );
        if (!pushStatus) {
          logger.error(
            `Could not update push status for ticketId ${ticketId} in message ${this._id}`
          );
          continue;
        }
        pushStatus.receiptStatus = receipt.status;
        if (receipt.status === "error") {
          pushStatus.receiptErrorMessage = receipt.message;
          pushStatus.receiptErrorDetails = receipt.details;
        }
      }
      await this.save();
      // If we don't have all the receipts, we'll keep checking for one minute. After that, we should
      // check with a background job of some sort.
      let count = 0;
      for (const status of this.pushStatuses) {
        if (!status.receiptStatus) {
          count += 1;
        }
      }
      if (count > 0) {
        if (backoffIndex >= BACKOFF_SECONDS.length) {
          logger.warn(
            `Missing ${count}/${this.pushStatuses.length} push receipts after` + ` 60s, giving up.`
          );
          return;
        }
        setTimeout(() => this.updatePushReceipts(backoffIndex + 1), BACKOFF_SECONDS[backoffIndex]);
      }
    },
  };

  messageSchema.statics = {
    async createFromMessageData(messageData: MessageData): Promise<MessageDocument> {
      return this.create({
        from: messageData.from,
        text: messageData.text,
        conversationId: messageData.conversationId,
      });
    },
  };
}

interface ConversationMember {
  _id: Types.ObjectId;
  userId: Types.ObjectId | Document<any>;
}

export interface ConversationSchema extends GeneratedConversationSchema {}

export interface ConversationModel extends GeneratedConversationModel {
  onMemberAdded?: (
    this: ConversationModel,
    doc: ConversationDocument,
    member: ConversationMember
  ) => Promise<void> | void;
  onMemberRemoved?: (
    this: ConversationModel,
    doc: ConversationDocument,
    member: ConversationMember
  ) => Promise<void> | void;
}

export function conversationPlugin(conversationSchema: Schema) {
  conversationSchema.add({
    members: [
      {
        userId: {
          type: Schema.Types.ObjectId,
          ref: DEFAULT_USER_MODEL,
          required: true,
        },
      },
    ],
  });

  conversationSchema.methods = {
    // Actually send the message. If the members have push tokens, sends the message via push. Can
    // also send va SMS if enabled. This function should be called from a worker or not awaited from
    // a request handler as it will try to update the push status for up to 1 minute.
    async sendMessage(message: MessageDocument) {
      if (!isPopulated(this.members)) {
        await this.populate("members");
        await this.populate("members.userId");
      }
      // const members = (this.members as ConversationMember[]).filter((m) => m._id !== message.from);
      const members = this.members as ConversationMember[];

      logger.debug(`Sending message ${message._id} to ${members.length} members`);
      this._sendPushNotifications(message, members);
    },

    // Private method to perform the push notification sending. Call sendMessage instead.
    async _sendPushNotifications(message: MessageDocument, members: ConversationMember[]) {
      const pushNotificationData: any = [];
      const pushMembers: ConversationMember[] = [];
      for (const member of members) {
        const data = this._getExpoPushDataForMember(message, member.userId);
        if (data === null) {
          continue;
        }
        pushNotificationData.push(data);
        pushMembers.push(member);
      }
      let tickets: ExpoPushTicket[] = [];
      try {
        tickets = (await expo.sendPushNotificationsAsync(pushNotificationData)) as ExpoPushTicket[];
      } catch (error) {
        logger.error("Error sending push notification to Expo: ", error);
        return;
      }
      logger.debug(`Result from sending message ${message._id}: ${JSON.stringify(tickets)}`);
      // Try to fetch push results right away. We'll follow up on this with retries.
      for (let i = 0; i < pushMembers.length; i++) {
        const member = pushMembers[i];
        const ticket: ExpoPushTicket = tickets[i];

        if (isExpoPushTicketSuccess(ticket)) {
          message.pushStatuses.push({
            userId: member.userId,
            ticketStatus: ticket.status,
            ticketId: ticket.id,
          });
        } else if (isExpoPushTicketError(ticket)) {
          message.pushStatuses.push({
            userId: member.userId,
            ticketStatus: ticket.status,
            ticketErrorMessage: ticket.message,
            ticketErrorType: ticket.details?.error,
          });
        } else {
          logger.error(`Unknown push ticket status`, ticket, member);
        }
      }

      await message.updatePushReceipts();
    },

    async addMember(member: ConversationMember) {
      const Conversation: any = mongoose.model(DEFAULT_CONVERSATION_MODEL);
      if (this.members.length >= 1000) {
        throw new Error(`Conversations are limited to 1000 members.`);
      }
      for (const m of this.members) {
        if (m.userId === member.userId) {
          logger.warn(`Cannot add member for user ${member.userId}, already is a member`);
          return;
        }
      }
      this.members.push(member);
      const User = mongoose.model(DEFAULT_USER_MODEL);
      const user = await User.findById(member.userId);
      if (!user) {
        throw new Error(`Could not find user ${member.userId} to add to conversation.`);
      }
      const result = await this.save();

      (user as any).conversations.push({conversationId: result.id});
      await user.save();

      if (Conversation.onMemberAdded) {
        await Conversation.onMemberAdded(this, member);
      }

      return result;
    },

    async removeMember(member: ConversationMember) {
      const Conversation: any = mongoose.model(DEFAULT_CONVERSATION_MODEL);
      this.members.pull({userId: member.userId});

      const User = mongoose.model(DEFAULT_USER_MODEL);
      const user = await User.findById(member.userId);
      if (!user) {
        throw new Error(`Could not find user ${member.userId} to remove from conversation.`);
      }

      const result = await this.save();
      (user as any).conversations.pull({conversationId: result.id});
      await user.save();

      if (Conversation.onMemberRemoved) {
        await Conversation.onMemberRemoved(this, member);
      }
      return result;
    },

    // Private method to build the data to send to Expo for a push notification.
    _getExpoPushDataForMember(message: MessageDocument, member: any) {
      const pushToken = member.expoToken;

      if (!pushToken) {
        logger.debug(`Not sending message to ${member.id}, no expo token.`);
        return null;
      }
      if (!Expo.isExpoPushToken(pushToken)) {
        logger.error(`Not sending message to ${member.id}, invalid Expo push token: ${pushToken}`);
        return null;
      }
      // TODO: come up with a good way to handle this with reasonable defaults.
      // if (!member.messageMethods?.push?.enabled) {
      //   logger.debug(`Not sending message to ${member.id}, push is not enabled.`);
      //   return null;
      // }
      if (member.messageMethods?.push?.optedOut) {
        logger.debug(`Not sending message to ${member.id}, opted out.`);
        return null;
      }

      return {
        to: pushToken,
        sound: "default",
        body: "This is a test notification",
        data: {withSome: "data"},
      };
    },
  };

  conversationSchema.statics = {
    createConversationForUser(user: ConversationUser, extraData: any) {
      logger.info("Creating conversation for user", user._id);
      return this.create({
        members: [{userId: user._id}],
        ...extraData,
      });
    },
  };
}
