import { Document, Schema, Types } from "mongoose";
import { ConversationDocument, ConversationModel as GeneratedConversationModel, ConversationSchema as GeneratedConversationSchema } from "./interfaces";
export { MessageSchema, MessageModel, MessageDocument } from "./interfaces";
export declare function userMessagingPlugin(schema: Schema): void;
export declare function messagePlugin(messageSchema: Schema): void;
interface ConversationMember {
    _id: Types.ObjectId;
    userId: Types.ObjectId | Document<any>;
}
export interface ConversationSchema extends GeneratedConversationSchema {
}
export interface ConversationModel extends GeneratedConversationModel {
    onMemberAdded?: (this: ConversationModel, doc: ConversationDocument, member: ConversationMember) => Promise<void> | void;
    onMemberRemoved?: (this: ConversationModel, doc: ConversationDocument, member: ConversationMember) => Promise<void> | void;
}
export declare function conversationPlugin(conversationSchema: Schema): void;
