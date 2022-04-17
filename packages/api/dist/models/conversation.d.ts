import { Types, Schema, Document } from "mongoose";
import { MessageModel, ConversationSchema as GeneratedConversationSchema, ConversationModel as GeneratedConversationModel, ConversationDocument } from "./interfaces";
declare type StringOrObjectId = string | Types.ObjectId;
export interface MessageData {
    text: string;
    from: StringOrObjectId;
    conversationId: StringOrObjectId;
}
export declare function messagingPlugin(schema: Schema, options?: {
    expiresIn?: number;
}): void;
export declare const Message: MessageModel;
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
export declare const Conversation: ConversationModel;
export {};
