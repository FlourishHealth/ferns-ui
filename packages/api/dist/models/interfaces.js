"use strict";
/* tslint:disable */
/* eslint-disable */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IsPopulated = void 0;
var mongoose_1 = __importDefault(require("mongoose"));
/**
 * Check if a property on a document is populated:
 * ```
 * import { IsPopulated } from "../interfaces/mongoose.gen.ts"
 *
 * if (IsPopulated<UserDocument["bestFriend"]>) { ... }
 * ```
 */
function IsPopulated(doc) {
    return doc instanceof mongoose_1.default.Document;
}
exports.IsPopulated = IsPopulated;
