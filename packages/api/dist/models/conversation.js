"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Conversation = exports.Message = exports.messagingPlugin = void 0;
/**
 * Contains the APIs and model plugins to send and receive messages. Currently supporst Twilio and
 * Expo push notifications.
 */
var expo_server_sdk_1 = __importDefault(require("expo-server-sdk"));
var mongoose_1 = require("mongoose");
var logger_1 = require("../logger");
var axios_1 = __importDefault(require("axios"));
var expo = new expo_server_sdk_1.default({ accessToken: process.env.EXPO_ACCESS_TOKEN });
// TODO make these adjustable by the calling app.
var DEFAULT_USER_MODEL = "User";
var DEFAULT_CONVERSATION_MODEL = "Conversation";
function isPopulated(field) {
    if (Array.isArray(field)) {
        if (field.length === 0) {
            return false;
        }
        else {
            return field[0]._bsontype === "ObjectId";
        }
    }
    else {
        return field._bsontype === "ObjectId";
    }
}
function messagingPlugin(schema, options) {
    if (options === void 0) { options = {}; }
    schema.add({ expoToken: { type: String } });
    schema.add({
        messagingMethods: {
            push: { enabled: { type: Boolean, default: true }, optedOut: { type: Boolean, default: false } },
            sms: { enabled: { type: Boolean, default: true }, optedOut: { type: Boolean, default: false } },
        },
    });
}
exports.messagingPlugin = messagingPlugin;
var PushStatus = new mongoose_1.Schema({
    // Expo returns a push ticket which tells us whether the Expo servers have accepted our push message.
    userId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: DEFAULT_USER_MODEL,
    },
    ticketStatus: { type: String, enum: ["ok", "error"] },
    // When a ticket is successful, we get a ticket id for querying for push receipt.
    ticketId: String,
    // If there was an error communicating with Expo, that message and type will be storied here.
    ticketErrorMessage: String,
    ticketErrorType: {
        type: String,
        enum: ["DeviceNotRegistered", "InvalidCredentials", "MessageTooBig", "MessageRateExceeded"],
    },
    // Receipts come from the iOS and Google push servers and represent whether the push was actually delivered.
    receiptStatus: { type: String, enum: ["ok", "error"] },
    receiptErrorMessage: String,
    receiptErrorDetails: String,
});
var messageSchema = new mongoose_1.Schema({
    text: { type: String },
    // Not required, if not specified, shows up as a system message. Your app should handle this
    // on the frontend.
    from: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: DEFAULT_USER_MODEL,
    },
    conversationId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: DEFAULT_CONVERSATION_MODEL,
        required: true,
    },
    pushStatuses: [PushStatus],
    // TODO: Add support for threading messages and replies.
});
var backoffSecs = [5, 5, 5, 15, 30];
messageSchema.methods = {
    // Ask the Expo server for push receipts to see what the status from Google/Apple is for push.
    updatePushReceipts: function (backoffIndex) {
        if (backoffIndex === void 0) { backoffIndex = 1; }
        return __awaiter(this, void 0, void 0, function () {
            var ids, res, _loop_1, this_1, _a, _b, ticketId, count, _c, _d, status_1;
            var e_1, _e, e_2, _f;
            var _this = this;
            return __generator(this, function (_g) {
                switch (_g.label) {
                    case 0:
                        ids = this.pushStatuses
                            .map(function (s) {
                            if (s.ticketStatus === "ok" && s.ticketId && !s.receiptStatus) {
                                return s.ticketId;
                            }
                            return null;
                        })
                            .filter(function (s) { return s; });
                        return [4 /*yield*/, axios_1.default.post("https://exp.host/--/api/v2/push/getReceipts", {
                                ids: ids,
                            })];
                    case 1:
                        res = _g.sent();
                        _loop_1 = function (ticketId) {
                            var receipt = res.data.data[ticketId];
                            var pushStatus = this_1.pushStatuses.find(function (s) { return s.ticketId === ticketId; });
                            if (!pushStatus) {
                                logger_1.logger.error("Could not update push status for ticketId " + ticketId + " in message " + this_1._id);
                                return "continue";
                            }
                            pushStatus.receiptStatus = receipt.status;
                            if (receipt.status === "error") {
                                pushStatus.receiptErrorMessage = receipt.message;
                                pushStatus.receiptErrorDetails = receipt.details;
                            }
                        };
                        this_1 = this;
                        try {
                            for (_a = __values(Object.keys(res.data.data)), _b = _a.next(); !_b.done; _b = _a.next()) {
                                ticketId = _b.value;
                                _loop_1(ticketId);
                            }
                        }
                        catch (e_1_1) { e_1 = { error: e_1_1 }; }
                        finally {
                            try {
                                if (_b && !_b.done && (_e = _a.return)) _e.call(_a);
                            }
                            finally { if (e_1) throw e_1.error; }
                        }
                        return [4 /*yield*/, this.save()];
                    case 2:
                        _g.sent();
                        count = 0;
                        try {
                            for (_c = __values(this.pushStatuses), _d = _c.next(); !_d.done; _d = _c.next()) {
                                status_1 = _d.value;
                                if (!status_1.receiptStatus) {
                                    count += 1;
                                }
                            }
                        }
                        catch (e_2_1) { e_2 = { error: e_2_1 }; }
                        finally {
                            try {
                                if (_d && !_d.done && (_f = _c.return)) _f.call(_c);
                            }
                            finally { if (e_2) throw e_2.error; }
                        }
                        if (count > 0) {
                            if (backoffIndex >= backoffSecs.length) {
                                logger_1.logger.warn("Missing " + count + "/" + this.pushStatuses.length + " push receipts after" + " 60s, giving up.");
                                return [2 /*return*/];
                            }
                            setTimeout(function () { return _this.updatePushReceipts(backoffIndex + 1); }, backoffSecs[backoffIndex]);
                        }
                        return [2 /*return*/];
                }
            });
        });
    },
};
messageSchema.statics = {
    createFromMessageData: function (messageData) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.create({
                        from: messageData.from,
                        text: messageData.text,
                        conversationId: messageData.conversationId,
                    })];
            });
        });
    },
};
exports.Message = (0, mongoose_1.model)("Message", messageSchema);
var conversationSchema = new mongoose_1.Schema({
    members: [
        {
            userId: {
                type: mongoose_1.Schema.Types.ObjectId,
                ref: DEFAULT_USER_MODEL,
                required: true,
            },
        },
    ],
});
function isExpoPushTicketSuccess(data) {
    return data.status === "ok";
}
function isExpoPushTicketError(data) {
    return data.status === "error";
}
conversationSchema.methods = {
    // Actually send the message. If the members have push tokens, sends the message via push. Can
    // also send va SMS if enabled. This function should be called from a worker or not awaited from
    // a request handler as it will try to update the push status for up to 1 minute.
    sendMessage: function (message) {
        return __awaiter(this, void 0, void 0, function () {
            var promises, members;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        promises = [];
                        if (!!isPopulated(this.members)) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.populate("members")];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.populate("members.userId")];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3:
                        members = this.members.filter(function (m) { return m._id !== message.from; });
                        logger_1.logger.debug("Sending message " + message._id + " to " + members.length + " members");
                        this.sendPushNotifications(message, members);
                        return [2 /*return*/];
                }
            });
        });
    },
    // Private method to perform the push notification sending. Call sendMessage instead.
    sendPushNotifications: function (message, members) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var pushNotificationData, pushMembers, members_1, members_1_1, member, data, tickets, error_1, conversation, i, member, ticket;
            var e_3, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        pushNotificationData = {};
                        pushMembers = [];
                        try {
                            for (members_1 = __values(members), members_1_1 = members_1.next(); !members_1_1.done; members_1_1 = members_1.next()) {
                                member = members_1_1.value;
                                data = exports.Conversation.getPushDataForMember(message, member);
                                if (data !== null) {
                                    pushNotificationData.push(data);
                                    pushMembers.push(member);
                                }
                            }
                        }
                        catch (e_3_1) { e_3 = { error: e_3_1 }; }
                        finally {
                            try {
                                if (members_1_1 && !members_1_1.done && (_b = members_1.return)) _b.call(members_1);
                            }
                            finally { if (e_3) throw e_3.error; }
                        }
                        tickets = [];
                        _c.label = 1;
                    case 1:
                        _c.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, expo.sendPushNotificationsAsync(pushNotificationData)];
                    case 2:
                        tickets = _c.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        error_1 = _c.sent();
                        logger_1.logger.error(error_1);
                        return [3 /*break*/, 4];
                    case 4:
                        logger_1.logger.debug("Result from sending message " + message._id + ": " + JSON.stringify(tickets));
                        return [4 /*yield*/, exports.Conversation.findById(message.conversationId)];
                    case 5:
                        conversation = _c.sent();
                        if (!conversation) {
                            throw new Error("Cannot find conversation " + message.conversationId);
                        }
                        for (i = 0; i < pushMembers.length; i++) {
                            member = pushMembers[i];
                            ticket = tickets[i];
                            if (isExpoPushTicketSuccess(ticket)) {
                                message.pushStatuses.push({
                                    userId: member.userId,
                                    ticketStatus: ticket.status,
                                    ticketId: ticket.id,
                                });
                            }
                            else if (isExpoPushTicketError(ticket)) {
                                message.pushStatuses.push({
                                    userId: member.userId,
                                    ticketStatus: ticket.status,
                                    ticketErrorMessage: ticket.message,
                                    ticketErrorType: (_a = ticket.details) === null || _a === void 0 ? void 0 : _a.error,
                                });
                            }
                            else {
                                logger_1.logger.error("Unknown push ticket status", ticket, member);
                            }
                        }
                        return [4 /*yield*/, message.updatePushReceipts()];
                    case 6:
                        _c.sent();
                        return [2 /*return*/];
                }
            });
        });
    },
    addMember: function (member) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, _b, member_1, result;
            var e_4, _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        if (this.members.length >= 1000) {
                            throw new Error("Conversations are limited to 1000 members.");
                        }
                        try {
                            for (_a = __values(this.members), _b = _a.next(); !_b.done; _b = _a.next()) {
                                member_1 = _b.value;
                                if (member_1.userId === member_1.userId) {
                                    logger_1.logger.warn("Cannot add member for user " + member_1.userId + ", already is a member");
                                    return [2 /*return*/];
                                }
                            }
                        }
                        catch (e_4_1) { e_4 = { error: e_4_1 }; }
                        finally {
                            try {
                                if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
                            }
                            finally { if (e_4) throw e_4.error; }
                        }
                        this.members.push(member);
                        return [4 /*yield*/, this.save()];
                    case 1:
                        result = _d.sent();
                        if (!exports.Conversation.onMemberAdded) return [3 /*break*/, 3];
                        return [4 /*yield*/, exports.Conversation.onMemberAdded(this, member)];
                    case 2:
                        _d.sent();
                        _d.label = 3;
                    case 3: return [2 /*return*/, result];
                }
            });
        });
    },
    removeMember: function (member) {
        return __awaiter(this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.members.pull({ userId: member.userId });
                        return [4 /*yield*/, this.save()];
                    case 1:
                        result = _a.sent();
                        if (!exports.Conversation.onMemberRemoved) return [3 /*break*/, 3];
                        return [4 /*yield*/, exports.Conversation.onMemberRemoved(this, member)];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3: return [2 /*return*/, result];
                }
            });
        });
    },
};
conversationSchema.statics = {
    createConversationForUser: function (user, extraData) {
        this.create(__assign({ members: [{ userId: user._id }] }, extraData));
    },
    getPushDataForMember: function (message, member) {
        var _a, _b, _c, _d;
        if (!member.expoToken ||
            !((_b = (_a = member.messageMethods) === null || _a === void 0 ? void 0 : _a.push) === null || _b === void 0 ? void 0 : _b.enabled) ||
            ((_d = (_c = member.messageMethods) === null || _c === void 0 ? void 0 : _c.push) === null || _d === void 0 ? void 0 : _d.optedOut)) {
            return null;
        }
        var pushToken = member.expoToken;
        if (!expo_server_sdk_1.default.isExpoPushToken(pushToken)) {
            logger_1.logger.error("Push token " + pushToken + " for member " + member._id + " is not a valid Expo push token");
            return null;
        }
        return {
            to: pushToken,
            sound: "default",
            body: "This is a test notification",
            data: { withSome: "data" },
        };
    },
    sendMessageToMember: function (message, member) {
        var _a, _b, _c, _d;
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_e) {
                if (member.expoToken &&
                    ((_b = (_a = member.messageMethods) === null || _a === void 0 ? void 0 : _a.push) === null || _b === void 0 ? void 0 : _b.enabled) &&
                    !((_d = (_c = member.messageMethods) === null || _c === void 0 ? void 0 : _c.push) === null || _d === void 0 ? void 0 : _d.optedOut)) {
                }
                return [2 /*return*/];
            });
        });
    },
};
exports.Conversation = (0, mongoose_1.model)("Conversation", conversationSchema);
