"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var chai_1 = __importDefault(require("chai"));
var express_1 = __importDefault(require("express"));
var mongoose_1 = __importStar(require("mongoose"));
var _1 = require(".");
var mongooseRestFramework_1 = require("./mongooseRestFramework");
var passport_1 = require("./passport");
var assert = chai_1.default.assert;
mongoose_1.default.connect("mongodb://localhost:27017/example");
var userSchema = new mongoose_1.Schema({
    username: String,
    admin: { type: Boolean, default: false },
});
userSchema.plugin(passport_1.passportLocalMongoose, { usernameField: "email" });
userSchema.plugin(_1.tokenPlugin);
userSchema.plugin(mongooseRestFramework_1.createdDeletedPlugin);
userSchema.plugin(mongooseRestFramework_1.baseUserPlugin);
var UserModel = (0, mongoose_1.model)("User", userSchema);
var schema = new mongoose_1.Schema({
    name: String,
    calories: Number,
    created: Date,
    ownerId: { type: "ObjectId", ref: "User" },
    hidden: { type: Boolean, default: false },
});
var FoodModel = (0, mongoose_1.model)("Food", schema);
function getBaseServer() {
    var app = (0, express_1.default)();
    app.all("/*", function (req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "*");
        // intercepts OPTIONS method
        if (req.method === "OPTIONS") {
            res.send(200);
        }
        else {
            next();
        }
    });
    app.use(express_1.default.json());
    (0, mongooseRestFramework_1.setupAuth)(app, UserModel);
    app.use("/food", (0, mongooseRestFramework_1.gooseRestRouter)(FoodModel, {
        permissions: {
            list: [mongooseRestFramework_1.Permissions.IsAny],
            create: [mongooseRestFramework_1.Permissions.IsAuthenticated],
            read: [mongooseRestFramework_1.Permissions.IsAny],
            update: [mongooseRestFramework_1.Permissions.IsOwner],
            delete: [mongooseRestFramework_1.Permissions.IsAdmin],
        },
    }));
    app.listen(5004);
    _1.logger.info("Running on 5004");
}
getBaseServer();
