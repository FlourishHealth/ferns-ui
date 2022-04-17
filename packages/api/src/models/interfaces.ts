/* tslint:disable */
/* eslint-disable */

import mongoose, {Types} from "mongoose";

// TODO: figure out how to make this work better. Generics?
type User = any;
type UserDocument = any;

type StringOrObjectId = string | Types.ObjectId;

export interface MessageData {
  text: string;
  from: StringOrObjectId;
  conversationId: StringOrObjectId;
}

export interface ConversationUser {
  _id: StringOrObjectId
}

/**
 * Lean version of MessagePushStatusDocument
 *
 * This has all Mongoose getters & functions removed. This type will be returned from `MessageDocument.toObject()`.
 * ```
 * const messageObject = message.toObject();
 * ```
 */
export type MessagePushStatus = {
  userId?: User["_id"] | User;
  ticketStatus?: "ok" | "error";
  ticketId?: string;
  ticketErrorMessage?: string;
  ticketErrorType?:
    | "DeviceNotRegistered"
    | "InvalidCredentials"
    | "MessageTooBig"
    | "MessageRateExceeded";
  receiptStatus?: "ok" | "error";
  receiptErrorMessage?: string;
  receiptErrorDetails?: string;
  _id: mongoose.Types.ObjectId;
};

/**
 * Lean version of MessageDocument
 *
 * This has all Mongoose getters & functions removed. This type will be returned from `MessageDocument.toObject()`. To avoid conflicts with model names, use the type alias `MessageObject`.
 * ```
 * const messageObject = message.toObject();
 * ```
 */
export type Message = {
  text?: string;
  from?: User["_id"] | User;
  conversationId: Conversation["_id"] | Conversation;
  pushStatuses: MessagePushStatus[];
  _id: mongoose.Types.ObjectId;
};

/**
 * Lean version of MessageDocument (type alias of `Message`)
 *
 * Use this type alias to avoid conflicts with model names:
 * ```
 * import { Message } from "../models"
 * import { MessageObject } from "../interfaces/mongoose.gen.ts"
 *
 * const messageObject: MessageObject = message.toObject();
 * ```
 */
export type MessageObject = Message;

/**
 * Mongoose Query types
 *
 * Pass this type to the Mongoose Model constructor:
 * ```
 * const Message = mongoose.model<MessageDocument, MessageModel>("Message", MessageSchema);
 * ```
 */
export type MessageQueries = {};

export type MessageMethods = {
  updatePushReceipts: (this: MessageDocument, backoffIndex?: number) => Promise<void>;
};

export type MessageStatics = {
  createFromMessageData: (this: MessageModel, messageData: MessageData) => Promise<MessageDocument>;
};

/**
 * Mongoose Model type
 *
 * Pass this type to the Mongoose Model constructor:
 * ```
 * const Message = mongoose.model<MessageDocument, MessageModel>("Message", MessageSchema);
 * ```
 */
export type MessageModel = mongoose.Model<MessageDocument, MessageQueries> & MessageStatics;

/**
 * Mongoose Schema type
 *
 * Assign this type to new Message schema instances:
 * ```
 * const MessageSchema: MessageSchema = new mongoose.Schema({ ... })
 * ```
 */
export type MessageSchema = mongoose.Schema<MessageDocument, MessageModel>;

/**
 * Mongoose Subdocument type
 *
 * Type of `MessageDocument["pushStatuses"]` element.
 */
export type MessagePushStatusDocument = mongoose.Types.Subdocument & {
  userId?: UserDocument["_id"] | UserDocument;
  ticketStatus?: "ok" | "error";
  ticketId?: string;
  ticketErrorMessage?: string;
  ticketErrorType?:
    | "DeviceNotRegistered"
    | "InvalidCredentials"
    | "MessageTooBig"
    | "MessageRateExceeded";
  receiptStatus?: "ok" | "error";
  receiptErrorMessage?: string;
  receiptErrorDetails?: string;
  _id: mongoose.Types.ObjectId;
};

/**
 * Mongoose Document type
 *
 * Pass this type to the Mongoose Model constructor:
 * ```
 * const Message = mongoose.model<MessageDocument, MessageModel>("Message", MessageSchema);
 * ```
 */
export type MessageDocument = mongoose.Document<mongoose.Types.ObjectId, MessageQueries> &
  MessageMethods & {
    text?: string;
    from?: UserDocument["_id"] | UserDocument;
    conversationId: ConversationDocument["_id"] | ConversationDocument;
    pushStatuses: mongoose.Types.DocumentArray<MessagePushStatusDocument>;
    _id: mongoose.Types.ObjectId;
  };

/**
 * Lean version of ConversationMemberDocument
 *
 * This has all Mongoose getters & functions removed. This type will be returned from `ConversationDocument.toObject()`.
 * ```
 * const conversationObject = conversation.toObject();
 * ```
 */
export type ConversationMember = {
  userId:mongoose.Types.ObjectId | User;
  _id: mongoose.Types.ObjectId;
};

/**
 * Lean version of ConversationDocument
 *
 * This has all Mongoose getters & functions removed. This type will be returned from `ConversationDocument.toObject()`. To avoid conflicts with model names, use the type alias `ConversationObject`.
 * ```
 * const conversationObject = conversation.toObject();
 * ```
 */
export type Conversation = {
  members: ConversationMember[];
  _id: mongoose.Types.ObjectId;
};

/**
 * Lean version of ConversationDocument (type alias of `Conversation`)
 *
 * Use this type alias to avoid conflicts with model names:
 * ```
 * import { Conversation } from "../models"
 * import { ConversationObject } from "../interfaces/mongoose.gen.ts"
 *
 * const conversationObject: ConversationObject = conversation.toObject();
 * ```
 */
export type ConversationObject = Conversation;

/**
 * Mongoose Query types
 *
 * Pass this type to the Mongoose Model constructor:
 * ```
 * const Conversation = mongoose.model<ConversationDocument, ConversationModel>("Conversation", ConversationSchema);
 * ```
 */
export type ConversationQueries = {};

export type ConversationMethods = {
  sendMessage: (this: ConversationDocument, message: MessageDocument) => Promise<void>;
  sendPushNotifications: (
    this: ConversationDocument,
    message: MessageDocument,
    members: ConversationMember[]
  ) => Promise<void>;
  addMember: (this: ConversationDocument, member: ConversationMember) => Promise<any>;
  removeMember: (this: ConversationDocument, member: ConversationMember) => Promise<any>;
};

export type ConversationStatics = {
  createConversationForUser: (
    this: ConversationModel,
    user: ConversationUser,
    extraData: any
  ) => void;
  getPushDataForMember: (
    this: ConversationModel,
    message: MessageDocument,
    member: any
  ) => {to: string; sound: string; body: string; data: {withSome: string}};
  sendMessageToMember: (
    this: ConversationModel,
    message: MessageDocument,
    member: any
  ) => Promise<void>;
};

/**
 * Mongoose Model type
 *
 * Pass this type to the Mongoose Model constructor:
 * ```
 * const Conversation = mongoose.model<ConversationDocument, ConversationModel>("Conversation", ConversationSchema);
 * ```
 */
export type ConversationModel = mongoose.Model<ConversationDocument, ConversationQueries> &
  ConversationStatics;

/**
 * Mongoose Schema type
 *
 * Assign this type to new Conversation schema instances:
 * ```
 * const ConversationSchema: ConversationSchema = new mongoose.Schema({ ... })
 * ```
 */
export type ConversationSchema = mongoose.Schema<ConversationDocument, ConversationModel>;

/**
 * Mongoose Subdocument type
 *
 * Type of `ConversationDocument["members"]` element.
 */
export type ConversationMemberDocument = mongoose.Types.Subdocument & {
  userId: UserDocument["_id"] | UserDocument;
  _id: mongoose.Types.ObjectId;
};

/**
 * Mongoose Document type
 *
 * Pass this type to the Mongoose Model constructor:
 * ```
 * const Conversation = mongoose.model<ConversationDocument, ConversationModel>("Conversation", ConversationSchema);
 * ```
 */
export type ConversationDocument = mongoose.Document<mongoose.Types.ObjectId, ConversationQueries> &
  ConversationMethods & {
    members: mongoose.Types.DocumentArray<ConversationMemberDocument>;
    _id: mongoose.Types.ObjectId;
  };

/**
 * Check if a property on a document is populated:
 * ```
 * import { IsPopulated } from "../interfaces/mongoose.gen.ts"
 *
 * if (IsPopulated<UserDocument["bestFriend"]>) { ... }
 * ```
 */
export function IsPopulated<T>(doc: T | mongoose.Types.ObjectId): doc is T {
  return doc instanceof mongoose.Document;
}

/**
 * Helper type used by `PopulatedDocument`. Returns the parent property of a string
 * representing a nested property (i.e. `friend.user` -> `friend`)
 */
type ParentProperty<T> = T extends `${infer P}.${string}` ? P : never;

/**
 * Helper type used by `PopulatedDocument`. Returns the child property of a string
 * representing a nested property (i.e. `friend.user` -> `user`).
 */
type ChildProperty<T> = T extends `${string}.${infer C}` ? C : never;

/**
 * Helper type used by `PopulatedDocument`. Removes the `ObjectId` from the general union type generated
 * for ref documents (i.e. `mongoose.Types.ObjectId | UserDocument` -> `UserDocument`)
 */
type PopulatedProperty<Root, T extends keyof Root> = Omit<Root, T> & {
  [ref in T]: Root[T] extends mongoose.Types.Array<infer U>
    ? mongoose.Types.Array<Exclude<U, mongoose.Types.ObjectId>>
    : Exclude<Root[T], mongoose.Types.ObjectId>;
};

/**
 * Populate properties on a document type:
 * ```
 * import { PopulatedDocument } from "../interfaces/mongoose.gen.ts"
 *
 * function example(user: PopulatedDocument<UserDocument, "bestFriend">) {
 *   console.log(user.bestFriend._id) // typescript knows this is populated
 * }
 * ```
 */
export type PopulatedDocument<DocType, T> = T extends keyof DocType
  ? PopulatedProperty<DocType, T>
  : ParentProperty<T> extends keyof DocType
  ? Omit<DocType, ParentProperty<T>> & {
      [ref in ParentProperty<T>]: DocType[ParentProperty<T>] extends mongoose.Types.Array<infer U>
        ? mongoose.Types.Array<
            ChildProperty<T> extends keyof U
              ? PopulatedProperty<U, ChildProperty<T>>
              : PopulatedDocument<U, ChildProperty<T>>
          >
        : ChildProperty<T> extends keyof DocType[ParentProperty<T>]
        ? PopulatedProperty<DocType[ParentProperty<T>], ChildProperty<T>>
        : PopulatedDocument<DocType[ParentProperty<T>], ChildProperty<T>>;
    }
  : DocType;

/**
 * Helper types used by the populate overloads
 */
type Unarray<T> = T extends Array<infer U> ? U : T;
type Modify<T, R> = Omit<T, keyof R> & R;

/**
 * Augment mongoose with Query.populate overloads
 */
declare module "mongoose" {
  interface Query<ResultType, DocType extends Document, THelpers = {}> {
    populate<T extends string>(
      path: T,
      select?: string | any,
      model?: string | Model<any, THelpers>,
      match?: any
    ): Query<
      ResultType extends Array<DocType>
        ? Array<PopulatedDocument<Unarray<ResultType>, T>>
        : ResultType extends DocType
        ? PopulatedDocument<Unarray<ResultType>, T>
        : ResultType,
      DocType,
      THelpers
    > &
      THelpers;

    populate<T extends string>(
      options: Modify<PopulateOptions, {path: T}> | Array<PopulateOptions>
    ): Query<
      ResultType extends Array<DocType>
        ? Array<PopulatedDocument<Unarray<ResultType>, T>>
        : ResultType extends DocType
        ? PopulatedDocument<Unarray<ResultType>, T>
        : ResultType,
      DocType,
      THelpers
    > &
      THelpers;
  }
}
