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
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.gooseRestRouter = exports.AdminOwnerTransformer = exports.setupAuth = exports.signupUser = exports.authenticateMiddleware = exports.firebaseJWTPlugin = exports.createdDeletedPlugin = exports.isDeletedPlugin = exports.baseUserPlugin = exports.tokenPlugin = exports.checkPermissions = exports.Permissions = exports.OwnerQueryFilter = void 0;
var body_parser_1 = __importDefault(require("body-parser"));
var express_1 = __importDefault(require("express"));
var express_session_1 = __importDefault(require("express-session"));
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var mongoose_1 = __importDefault(require("mongoose"));
var passport_1 = __importDefault(require("passport"));
var passport_anonymous_1 = require("passport-anonymous");
var passport_jwt_1 = require("passport-jwt");
var passport_local_1 = require("passport-local");
var logger_1 = require("./logger");
// TODOS:
// Support bulk actions
// Support more complex query fields
// Rate limiting
var SPECIAL_QUERY_PARAMS = ["limit", "page"];
var OwnerQueryFilter = function (user) {
    if (user) {
        return { ownerId: user === null || user === void 0 ? void 0 : user.id };
    }
    // Return a null, so we know to return no results.
    return null;
};
exports.OwnerQueryFilter = OwnerQueryFilter;
exports.Permissions = {
    IsAuthenticatedOrReadOnly: function (method, user) {
        if ((user === null || user === void 0 ? void 0 : user.id) && !(user === null || user === void 0 ? void 0 : user.isAnonymous)) {
            return true;
        }
        return method === "list" || method === "read";
    },
    IsOwnerOrReadOnly: function (method, user, obj) {
        // When checking if we can possibly perform the action, return true.
        if (!obj) {
            return true;
        }
        if (user === null || user === void 0 ? void 0 : user.admin) {
            return true;
        }
        if ((user === null || user === void 0 ? void 0 : user.id) && (obj === null || obj === void 0 ? void 0 : obj.ownerId) && String(obj === null || obj === void 0 ? void 0 : obj.ownerId) === String(user === null || user === void 0 ? void 0 : user.id)) {
            return true;
        }
        return method === "list" || method === "read";
    },
    IsAny: function () {
        return true;
    },
    IsOwner: function (method, user, obj) {
        // When checking if we can possibly perform the action, return true.
        if (!obj) {
            return true;
        }
        if (!user) {
            return false;
        }
        if (user === null || user === void 0 ? void 0 : user.admin) {
            return true;
        }
        return (user === null || user === void 0 ? void 0 : user.id) && (obj === null || obj === void 0 ? void 0 : obj.ownerId) && String(obj === null || obj === void 0 ? void 0 : obj.ownerId) === String(user === null || user === void 0 ? void 0 : user.id);
    },
    IsAdmin: function (method, user) {
        return Boolean(user === null || user === void 0 ? void 0 : user.admin);
    },
    IsAuthenticated: function (method, user) {
        if (!user) {
            return false;
        }
        return Boolean(user.id);
    },
};
// Defaults closed
function checkPermissions(method, permissions, user, obj) {
    return __awaiter(this, void 0, void 0, function () {
        var anyTrue, permissions_1, permissions_1_1, perm, e_1_1;
        var e_1, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    anyTrue = false;
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 6, 7, 8]);
                    permissions_1 = __values(permissions), permissions_1_1 = permissions_1.next();
                    _b.label = 2;
                case 2:
                    if (!!permissions_1_1.done) return [3 /*break*/, 5];
                    perm = permissions_1_1.value;
                    return [4 /*yield*/, perm(method, user, obj)];
                case 3:
                    // May or may not be a promise.
                    if (!(_b.sent())) {
                        return [2 /*return*/, false];
                    }
                    else {
                        anyTrue = true;
                    }
                    _b.label = 4;
                case 4:
                    permissions_1_1 = permissions_1.next();
                    return [3 /*break*/, 2];
                case 5: return [3 /*break*/, 8];
                case 6:
                    e_1_1 = _b.sent();
                    e_1 = { error: e_1_1 };
                    return [3 /*break*/, 8];
                case 7:
                    try {
                        if (permissions_1_1 && !permissions_1_1.done && (_a = permissions_1.return)) _a.call(permissions_1);
                    }
                    finally { if (e_1) throw e_1.error; }
                    return [7 /*endfinally*/];
                case 8: return [2 /*return*/, anyTrue];
            }
        });
    });
}
exports.checkPermissions = checkPermissions;
function tokenPlugin(schema, options) {
    if (options === void 0) { options = {}; }
    schema.add({ token: { type: String, index: true } });
    schema.pre("save", function (next) {
        // Add created when creating the object
        if (!this.token) {
            var tokenOptions = {
                expiresIn: "10h",
            };
            if (process.env.TOKEN_EXPIRES_IN) {
                tokenOptions.expiresIn = process.env.TOKEN_EXPIRES_IN;
            }
            if (process.env.TOKEN_ISSUER) {
                tokenOptions.issuer = process.env.TOKEN_ISSUER;
            }
            var secretOrKey = process.env.TOKEN_SECRET;
            if (!secretOrKey) {
                throw new Error("TOKEN_SECRET must be set in env.");
            }
            this.token = jsonwebtoken_1.default.sign({ id: this._id.toString() }, secretOrKey, tokenOptions);
        }
        // On any save, update the updated field.
        this.updated = new Date();
        next();
    });
}
exports.tokenPlugin = tokenPlugin;
function baseUserPlugin(schema) {
    schema.add({ admin: { type: Boolean, default: false } });
    schema.add({ email: { type: String, index: true } });
}
exports.baseUserPlugin = baseUserPlugin;
function isDeletedPlugin(schema, defaultValue) {
    if (defaultValue === void 0) { defaultValue = false; }
    schema.add({ deleted: { type: Boolean, default: defaultValue, index: true } });
    schema.pre("find", function () {
        var query = this.getQuery();
        if (query && query.deleted === undefined) {
            this.where({ deleted: { $ne: true } });
        }
    });
}
exports.isDeletedPlugin = isDeletedPlugin;
function createdDeletedPlugin(schema) {
    schema.add({ updated: { type: Date, index: true } });
    schema.add({ created: { type: Date, index: true } });
    schema.pre("save", function (next) {
        if (this.disableCreatedDeletedPlugin === true) {
            next();
            return;
        }
        // If we aren't specifying created, use now.
        if (!this.created) {
            this.created = new Date();
        }
        // All writes change the updated time.
        this.updated = new Date();
        next();
    });
    schema.pre("update", function (next) {
        this.update({}, { $set: { updated: new Date() } });
        next();
    });
}
exports.createdDeletedPlugin = createdDeletedPlugin;
function firebaseJWTPlugin(schema) {
    schema.add({ firebaseId: { type: String, index: true } });
}
exports.firebaseJWTPlugin = firebaseJWTPlugin;
function authenticateMiddleware(anonymous) {
    if (anonymous === void 0) { anonymous = false; }
    var strategies = ["jwt"];
    if (anonymous) {
        strategies.push("anonymous");
    }
    return passport_1.default.authenticate(strategies, { session: false });
}
exports.authenticateMiddleware = authenticateMiddleware;
function signupUser(userModel, email, password, body) {
    return __awaiter(this, void 0, void 0, function () {
        var user, e_2, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 7, , 8]);
                    return [4 /*yield*/, userModel.register({ email: email }, password)];
                case 1:
                    user = _a.sent();
                    if (!user.postCreate) return [3 /*break*/, 5];
                    delete body.email;
                    delete body.password;
                    _a.label = 2;
                case 2:
                    _a.trys.push([2, 4, , 5]);
                    return [4 /*yield*/, user.postCreate(body)];
                case 3:
                    _a.sent();
                    return [3 /*break*/, 5];
                case 4:
                    e_2 = _a.sent();
                    logger_1.logger.error("Error in user.postCreate", e_2);
                    throw e_2;
                case 5: return [4 /*yield*/, user.save()];
                case 6:
                    _a.sent();
                    if (!user.token) {
                        throw new Error("Token not created");
                    }
                    return [2 /*return*/, user];
                case 7:
                    error_1 = _a.sent();
                    throw error_1;
                case 8: return [2 /*return*/];
            }
        });
    });
}
exports.signupUser = signupUser;
// TODO allow customization
function setupAuth(app, userModel) {
    var _this = this;
    passport_1.default.use(new passport_anonymous_1.Strategy());
    passport_1.default.use("signup", new passport_local_1.Strategy({
        usernameField: "email",
        passwordField: "password",
        passReqToCallback: true,
    }, function (req, email, password, done) { return __awaiter(_this, void 0, void 0, function () {
        var _a, _b, e_3;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    _c.trys.push([0, 2, , 3]);
                    _a = done;
                    _b = [undefined];
                    return [4 /*yield*/, signupUser(userModel, email, password, req.body)];
                case 1:
                    _a.apply(void 0, _b.concat([_c.sent()]));
                    return [3 /*break*/, 3];
                case 2:
                    e_3 = _c.sent();
                    return [2 /*return*/, done(e_3)];
                case 3: return [2 /*return*/];
            }
        });
    }); }));
    passport_1.default.use("login", new passport_local_1.Strategy({
        usernameField: "email",
        passwordField: "password",
    }, function (email, password, done) { return __awaiter(_this, void 0, void 0, function () {
        var user, validate, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, userModel.findOne({ email: email })];
                case 1:
                    user = _a.sent();
                    if (!user) {
                        logger_1.logger.debug("Could not find login user for", email);
                        return [2 /*return*/, done(null, false, { message: "User not found" })];
                    }
                    return [4 /*yield*/, user.authenticate(password)];
                case 2:
                    validate = _a.sent();
                    if (!validate) {
                        logger_1.logger.debug("Invalid password for", email);
                        return [2 /*return*/, done(null, false, { message: "Wrong Password" })];
                    }
                    return [2 /*return*/, done(null, user, { message: "Logged in Successfully" })];
                case 3:
                    error_2 = _a.sent();
                    logger_1.logger.error("Login error", error_2);
                    return [2 /*return*/, done(error_2)];
                case 4: return [2 /*return*/];
            }
        });
    }); }));
    if (!userModel.createStrategy) {
        throw new Error("setupAuth userModel must have .createStrategy()");
    }
    if (!userModel.serializeUser) {
        throw new Error("setupAuth userModel must have .serializeUser()");
    }
    if (!userModel.deserializeUser) {
        throw new Error("setupAuth userModel must have .deserializeUser()");
    }
    // use static serialize and deserialize of model for passport session support
    passport_1.default.serializeUser(userModel.serializeUser());
    passport_1.default.deserializeUser(userModel.deserializeUser());
    if (process.env.TOKEN_SECRET) {
        logger_1.logger.debug("Setting up JWT Authentication");
        var customExtractor = function (req) {
            var _a, _b, _c;
            var token = null;
            if ((_a = req === null || req === void 0 ? void 0 : req.cookies) === null || _a === void 0 ? void 0 : _a.jwt) {
                token = req.cookies.jwt;
            }
            else if ((_b = req === null || req === void 0 ? void 0 : req.headers) === null || _b === void 0 ? void 0 : _b.authorization) {
                token = (_c = req === null || req === void 0 ? void 0 : req.headers) === null || _c === void 0 ? void 0 : _c.authorization.split(" ")[1];
            }
            return token;
        };
        var secretOrKey = process.env.TOKEN_SECRET;
        if (!secretOrKey) {
            throw new Error("TOKEN_SECRET must be set in env.");
        }
        var jwtOpts = {
            // jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme("Bearer"),
            jwtFromRequest: customExtractor,
            secretOrKey: secretOrKey,
            issuer: process.env.TOKEN_ISSUER,
        };
        passport_1.default.use("jwt", new passport_jwt_1.Strategy(jwtOpts, function (payload, done) {
            return __awaiter(this, void 0, void 0, function () {
                var user, e_4;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!payload) {
                                return [2 /*return*/, done(null, false)];
                            }
                            _a.label = 1;
                        case 1:
                            _a.trys.push([1, 3, , 4]);
                            return [4 /*yield*/, userModel.findById(payload.id)];
                        case 2:
                            user = _a.sent();
                            return [3 /*break*/, 4];
                        case 3:
                            e_4 = _a.sent();
                            logger_1.logger.warn("[jwt] Error finding user from id", e_4);
                            return [2 /*return*/, done(e_4, false)];
                        case 4:
                            if (!user) return [3 /*break*/, 5];
                            return [2 /*return*/, done(null, user)];
                        case 5:
                            if (!userModel.createAnonymousUser) return [3 /*break*/, 7];
                            logger_1.logger.info("[jwt] Creating anonymous user");
                            return [4 /*yield*/, userModel.createAnonymousUser()];
                        case 6:
                            user = _a.sent();
                            return [2 /*return*/, done(null, user)];
                        case 7:
                            logger_1.logger.info("[jwt] No user found from token");
                            return [2 /*return*/, done(null, false)];
                    }
                });
            });
        }));
    }
    var router = express_1.default.Router();
    router.post("/login", passport_1.default.authenticate("login", { session: false }), function (req, res) {
        return res.json({ data: { userId: req.user._id, token: req.user.token } });
    });
    router.post("/signup", passport_1.default.authenticate("signup", { session: false }), function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, res.json({ data: { userId: req.user._id, token: req.user.token } })];
            });
        });
    });
    router.get("/me", authenticateMiddleware(), function (req, res) { return __awaiter(_this, void 0, void 0, function () {
        var data, dataObject;
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    if (!((_a = req.user) === null || _a === void 0 ? void 0 : _a.id)) {
                        return [2 /*return*/, res.status(401).send()];
                    }
                    return [4 /*yield*/, userModel.findById(req.user.id)];
                case 1:
                    data = _b.sent();
                    if (!data) {
                        return [2 /*return*/, res.status(404).send()];
                    }
                    dataObject = data.toObject();
                    dataObject.id = data._id;
                    return [2 /*return*/, res.json({ data: dataObject })];
            }
        });
    }); });
    router.patch("/me", authenticateMiddleware(), function (req, res) { return __awaiter(_this, void 0, void 0, function () {
        var data, dataObject, e_5;
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    if (!((_a = req.user) === null || _a === void 0 ? void 0 : _a.id)) {
                        return [2 /*return*/, res.status(401).send()];
                    }
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, userModel.findOneAndUpdate({ _id: req.user.id }, req.body, { new: true })];
                case 2:
                    data = _b.sent();
                    if (data === null) {
                        return [2 /*return*/, res.status(404).send()];
                    }
                    dataObject = data.toObject();
                    dataObject.id = data._id;
                    return [2 /*return*/, res.json({ data: dataObject })];
                case 3:
                    e_5 = _b.sent();
                    return [2 /*return*/, res.status(403).send({ message: e_5.message })];
                case 4: return [2 /*return*/];
            }
        });
    }); });
    app.use((0, express_session_1.default)({
        secret: process.env.SESSION_SECRET,
        resave: true,
        saveUninitialized: true,
    }));
    app.use(body_parser_1.default.urlencoded({ extended: false }));
    app.use(passport_1.default.initialize());
    app.use(passport_1.default.session());
    app.set("etag", false);
    app.use("/auth", router);
}
exports.setupAuth = setupAuth;
function getUserType(user, obj) {
    if (user === null || user === void 0 ? void 0 : user.admin) {
        return "admin";
    }
    if (obj && user && String(obj === null || obj === void 0 ? void 0 : obj.ownerId) === String(user === null || user === void 0 ? void 0 : user.id)) {
        return "owner";
    }
    if (user === null || user === void 0 ? void 0 : user.id) {
        return "auth";
    }
    return "anon";
}
function AdminOwnerTransformer(options) {
    function pickFields(obj, fields) {
        var e_6, _a;
        var newData = {};
        try {
            for (var fields_1 = __values(fields), fields_1_1 = fields_1.next(); !fields_1_1.done; fields_1_1 = fields_1.next()) {
                var field = fields_1_1.value;
                if (obj[field] !== undefined) {
                    newData[field] = obj[field];
                }
            }
        }
        catch (e_6_1) { e_6 = { error: e_6_1 }; }
        finally {
            try {
                if (fields_1_1 && !fields_1_1.done && (_a = fields_1.return)) _a.call(fields_1);
            }
            finally { if (e_6) throw e_6.error; }
        }
        return newData;
    }
    return {
        transform: function (obj, method, user) {
            var _a, _b, _c, _d;
            var userType = getUserType(user, obj);
            var allowedFields;
            if (userType === "admin") {
                allowedFields = (_a = options.adminWriteFields) !== null && _a !== void 0 ? _a : [];
            }
            else if (userType === "owner") {
                allowedFields = (_b = options.ownerWriteFields) !== null && _b !== void 0 ? _b : [];
            }
            else if (userType === "auth") {
                allowedFields = (_c = options.authWriteFields) !== null && _c !== void 0 ? _c : [];
            }
            else {
                allowedFields = (_d = options.anonWriteFields) !== null && _d !== void 0 ? _d : [];
            }
            var unallowedFields = Object.keys(obj).filter(function (k) { return !allowedFields.includes(k); });
            if (unallowedFields.length) {
                throw new Error("User of type " + userType + " cannot write fields: " + unallowedFields.join(", "));
            }
            return obj;
        },
        serialize: function (obj, user) {
            var _a, _b, _c, _d;
            var userType = getUserType(user, obj);
            if (userType === "admin") {
                return pickFields(obj, __spreadArray(__spreadArray([], __read(((_a = options.adminReadFields) !== null && _a !== void 0 ? _a : [])), false), ["id"], false));
            }
            else if (userType === "owner") {
                return pickFields(obj, __spreadArray(__spreadArray([], __read(((_b = options.ownerReadFields) !== null && _b !== void 0 ? _b : [])), false), ["id"], false));
            }
            else if (userType === "auth") {
                return pickFields(obj, __spreadArray(__spreadArray([], __read(((_c = options.authReadFields) !== null && _c !== void 0 ? _c : [])), false), ["id"], false));
            }
            else {
                return pickFields(obj, __spreadArray(__spreadArray([], __read(((_d = options.anonReadFields) !== null && _d !== void 0 ? _d : [])), false), ["id"], false));
            }
        },
    };
}
exports.AdminOwnerTransformer = AdminOwnerTransformer;
function gooseRestRouter(model, options) {
    var _this = this;
    var router = express_1.default.Router();
    function transform(data, method, user) {
        var _a, _b;
        if (!((_a = options.transformer) === null || _a === void 0 ? void 0 : _a.transform)) {
            return data;
        }
        // TS doesn't realize this is defined otherwise...
        var transformFn = (_b = options.transformer) === null || _b === void 0 ? void 0 : _b.transform;
        if (!Array.isArray(data)) {
            return transformFn(data, method, user);
        }
        else {
            return data.map(function (d) { return transformFn(d, method, user); });
        }
    }
    function serialize(data, user) {
        var serializeFn = function (serializeData, seralizeUser) {
            var _a, _b;
            var dataObject = serializeData.toObject();
            dataObject.id = serializeData._id;
            if ((_a = options.transformer) === null || _a === void 0 ? void 0 : _a.serialize) {
                return (_b = options.transformer) === null || _b === void 0 ? void 0 : _b.serialize(dataObject, seralizeUser);
            }
            else {
                return dataObject;
            }
        };
        if (!Array.isArray(data)) {
            return serializeFn(data, user);
        }
        else {
            return data.map(function (d) { return serializeFn(d, user); });
        }
    }
    // Do before the other router options so endpoints take priority.
    if (options.endpoints) {
        options.endpoints(router);
    }
    // TODO Toggle anonymous auth middleware based on settings for route.
    router.post("/", authenticateMiddleware(true), function (req, res) { return __awaiter(_this, void 0, void 0, function () {
        var body, data, e_7, e_8;
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, checkPermissions("create", options.permissions.create, req.user)];
                case 1:
                    if (!(_b.sent())) {
                        logger_1.logger.warn("Access to CREATE on " + model.name + " denied for " + ((_a = req.user) === null || _a === void 0 ? void 0 : _a.id));
                        return [2 /*return*/, res.status(405).send()];
                    }
                    try {
                        body = transform(req.body, "create", req.user);
                    }
                    catch (e) {
                        return [2 /*return*/, res.status(403).send({ message: e.message })];
                    }
                    if (options.preCreate) {
                        try {
                            body = options.preCreate(body, req);
                        }
                        catch (e) {
                            return [2 /*return*/, res.status(400).send({ message: "Pre Create error: " + e.message })];
                        }
                        if (body === null) {
                            return [2 /*return*/, res.status(403).send({ message: "Pre Create returned null" })];
                        }
                    }
                    _b.label = 2;
                case 2:
                    _b.trys.push([2, 4, , 5]);
                    return [4 /*yield*/, model.create(body)];
                case 3:
                    data = _b.sent();
                    return [3 /*break*/, 5];
                case 4:
                    e_7 = _b.sent();
                    return [2 /*return*/, res.status(400).send({ message: e_7.message })];
                case 5:
                    if (!options.postCreate) return [3 /*break*/, 9];
                    _b.label = 6;
                case 6:
                    _b.trys.push([6, 8, , 9]);
                    return [4 /*yield*/, options.postCreate(data, req)];
                case 7:
                    _b.sent();
                    return [3 /*break*/, 9];
                case 8:
                    e_8 = _b.sent();
                    return [2 /*return*/, res.status(400).send({ message: "Post Create error: " + e_8.message })];
                case 9: return [2 /*return*/, res.status(201).json({ data: serialize(data, req.user) })];
            }
        });
    }); });
    // TODO add rate limit
    router.get("/", authenticateMiddleware(true), function (req, res) { return __awaiter(_this, void 0, void 0, function () {
        var query, _a, _b, queryParam, _c, _d, queryParam, queryFilter, e_9, limit, builtQuery, _e, _f, populatePath, data, e_10;
        var e_11, _g, e_12, _h, e_13, _j;
        var _k, _l, _m, _o, _p, _q, _r;
        return __generator(this, function (_s) {
            switch (_s.label) {
                case 0: return [4 /*yield*/, checkPermissions("list", options.permissions.list, req.user)];
                case 1:
                    if (!(_s.sent())) {
                        logger_1.logger.warn("Access to LIST on " + model.name + " denied for " + ((_k = req.user) === null || _k === void 0 ? void 0 : _k.id));
                        return [2 /*return*/, res.status(403).send()];
                    }
                    query = {};
                    try {
                        for (_a = __values(Object.keys((_l = options.defaultQueryParams) !== null && _l !== void 0 ? _l : [])), _b = _a.next(); !_b.done; _b = _a.next()) {
                            queryParam = _b.value;
                            query[queryParam] = ((_m = options.defaultQueryParams) !== null && _m !== void 0 ? _m : {})[queryParam];
                        }
                    }
                    catch (e_11_1) { e_11 = { error: e_11_1 }; }
                    finally {
                        try {
                            if (_b && !_b.done && (_g = _a.return)) _g.call(_a);
                        }
                        finally { if (e_11) throw e_11.error; }
                    }
                    try {
                        // TODO we can make this much more complicated with ands and ors, but for now, simple queries
                        // will do.
                        for (_c = __values(Object.keys(req.query)), _d = _c.next(); !_d.done; _d = _c.next()) {
                            queryParam = _d.value;
                            if (((_o = options.queryFields) !== null && _o !== void 0 ? _o : []).concat(SPECIAL_QUERY_PARAMS).includes(queryParam)) {
                                // Not sure if this is necessary or if mongoose does the right thing.
                                if (req.query[queryParam] === "true") {
                                    query[queryParam] = true;
                                }
                                else if (req.query[queryParam] === "false") {
                                    query[queryParam] = false;
                                }
                                else {
                                    query[queryParam] = req.query[queryParam];
                                }
                            }
                            else {
                                logger_1.logger.debug("Unallowed query param", queryParam);
                                return [2 /*return*/, res.status(400).json({ message: queryParam + " is not allowed as a query param." })];
                            }
                        }
                    }
                    catch (e_12_1) { e_12 = { error: e_12_1 }; }
                    finally {
                        try {
                            if (_d && !_d.done && (_h = _c.return)) _h.call(_c);
                        }
                        finally { if (e_12) throw e_12.error; }
                    }
                    // Special operators. NOTE: these request Mongo Atlas.
                    if (req.query.$search) {
                        mongoose_1.default.connection.db.collection(model.collection.collectionName);
                    }
                    if (req.query.$autocomplete) {
                        mongoose_1.default.connection.db.collection(model.collection.collectionName);
                    }
                    if (!options.queryFilter) return [3 /*break*/, 6];
                    queryFilter = void 0;
                    _s.label = 2;
                case 2:
                    _s.trys.push([2, 4, , 5]);
                    return [4 /*yield*/, options.queryFilter(req.user, query)];
                case 3:
                    queryFilter = _s.sent();
                    return [3 /*break*/, 5];
                case 4:
                    e_9 = _s.sent();
                    return [2 /*return*/, res.status(400).json({ message: "Query filter error: " + e_9 })];
                case 5:
                    // If the query filter returns null specifically, we know this is a query that shouldn't
                    // return any results.
                    if (queryFilter === null) {
                        return [2 /*return*/, res.json({ data: [] })];
                    }
                    query = __assign(__assign({}, query), queryFilter);
                    _s.label = 6;
                case 6:
                    limit = (_p = options.defaultLimit) !== null && _p !== void 0 ? _p : 100;
                    if (Number(req.query.limit)) {
                        limit = Math.min(Number(req.query.limit), (_q = options.maxLimit) !== null && _q !== void 0 ? _q : 500);
                    }
                    builtQuery = model.find(query).limit(limit);
                    if (req.query.page) {
                        builtQuery = builtQuery.skip((Number(req.query.page) - 1) * limit);
                    }
                    if (options.sort) {
                        builtQuery = builtQuery.sort(options.sort);
                    }
                    try {
                        // TODO: we should handle nested serializers here.
                        for (_e = __values((_r = options.populatePaths) !== null && _r !== void 0 ? _r : []), _f = _e.next(); !_f.done; _f = _e.next()) {
                            populatePath = _f.value;
                            builtQuery = builtQuery.populate(populatePath);
                        }
                    }
                    catch (e_13_1) { e_13 = { error: e_13_1 }; }
                    finally {
                        try {
                            if (_f && !_f.done && (_j = _e.return)) _j.call(_e);
                        }
                        finally { if (e_13) throw e_13.error; }
                    }
                    _s.label = 7;
                case 7:
                    _s.trys.push([7, 9, , 10]);
                    return [4 /*yield*/, builtQuery.exec()];
                case 8:
                    data = _s.sent();
                    return [3 /*break*/, 10];
                case 9:
                    e_10 = _s.sent();
                    logger_1.logger.error("List error: " + e_10.stack);
                    return [2 /*return*/, res.status(500).send()];
                case 10:
                    // TODO add pagination
                    try {
                        return [2 /*return*/, res.json({ data: serialize(data, req.user) })];
                    }
                    catch (e) {
                        logger_1.logger.error("Serialization error", e);
                        return [2 /*return*/, res.status(500).send()];
                    }
                    return [2 /*return*/];
            }
        });
    }); });
    router.get("/:id", authenticateMiddleware(true), function (req, res) { return __awaiter(_this, void 0, void 0, function () {
        var data;
        var _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0: return [4 /*yield*/, checkPermissions("read", options.permissions.read, req.user)];
                case 1:
                    if (!(_c.sent())) {
                        logger_1.logger.warn("Access to READ on " + model.name + " denied for " + ((_a = req.user) === null || _a === void 0 ? void 0 : _a.id));
                        return [2 /*return*/, res.status(405).send()];
                    }
                    return [4 /*yield*/, model.findById(req.params.id)];
                case 2:
                    data = _c.sent();
                    if (!data) {
                        return [2 /*return*/, res.status(404).send()];
                    }
                    return [4 /*yield*/, checkPermissions("read", options.permissions.read, req.user, data)];
                case 3:
                    if (!(_c.sent())) {
                        logger_1.logger.warn("Access to READ on " + model.name + ":" + req.params.id + " denied for " + ((_b = req.user) === null || _b === void 0 ? void 0 : _b.id));
                        return [2 /*return*/, res.status(403).send()];
                    }
                    return [2 /*return*/, res.json({ data: serialize(data, req.user) })];
            }
        });
    }); });
    router.put("/:id", authenticateMiddleware(true), function (req, res) { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            // Patch is what we want 90% of the time
            return [2 /*return*/, res.status(500)];
        });
    }); });
    router.patch("/:id", authenticateMiddleware(true), function (req, res) { return __awaiter(_this, void 0, void 0, function () {
        var doc, body, e_14, e_15;
        var _a, _b, _c;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0: return [4 /*yield*/, checkPermissions("update", options.permissions.update, req.user)];
                case 1:
                    if (!(_d.sent())) {
                        logger_1.logger.warn("Access to PATCH on " + model.name + " denied for " + ((_a = req.user) === null || _a === void 0 ? void 0 : _a.id));
                        return [2 /*return*/, res.status(405).send()];
                    }
                    return [4 /*yield*/, model.findById(req.params.id)];
                case 2:
                    doc = _d.sent();
                    if (!doc) {
                        return [2 /*return*/, res.status(404).send()];
                    }
                    return [4 /*yield*/, checkPermissions("update", options.permissions.update, req.user, doc)];
                case 3:
                    if (!(_d.sent())) {
                        logger_1.logger.warn("Patch not allowed for user " + ((_b = req.user) === null || _b === void 0 ? void 0 : _b.id) + " on doc " + doc._id);
                        return [2 /*return*/, res.status(403).send()];
                    }
                    try {
                        body = transform(req.body, "update", req.user);
                    }
                    catch (e) {
                        logger_1.logger.warn("Patch failed for user " + ((_c = req.user) === null || _c === void 0 ? void 0 : _c.id) + ": " + e.message);
                        return [2 /*return*/, res.status(403).send({ message: e.message })];
                    }
                    if (options.preUpdate) {
                        try {
                            body = options.preUpdate(body, req);
                        }
                        catch (e) {
                            return [2 /*return*/, res.status(400).send({ message: "Pre Update error: " + e.message })];
                        }
                        if (body === null) {
                            return [2 /*return*/, res.status(403).send({ message: "Pre Update returned null" })];
                        }
                    }
                    _d.label = 4;
                case 4:
                    _d.trys.push([4, 6, , 7]);
                    return [4 /*yield*/, model.findOneAndUpdate({ _id: req.params.id }, body, { new: true })];
                case 5:
                    doc = _d.sent();
                    return [3 /*break*/, 7];
                case 6:
                    e_14 = _d.sent();
                    return [2 /*return*/, res.status(400).send({ message: e_14.message })];
                case 7:
                    if (!options.postUpdate) return [3 /*break*/, 11];
                    _d.label = 8;
                case 8:
                    _d.trys.push([8, 10, , 11]);
                    return [4 /*yield*/, options.postUpdate(doc, req)];
                case 9:
                    _d.sent();
                    return [3 /*break*/, 11];
                case 10:
                    e_15 = _d.sent();
                    return [2 /*return*/, res.status(400).send({ message: "Post Update error: " + e_15.message })];
                case 11: return [2 /*return*/, res.json({ data: serialize(doc, req.user) })];
            }
        });
    }); });
    router.delete("/:id", authenticateMiddleware(true), function (req, res) { return __awaiter(_this, void 0, void 0, function () {
        var data, body, e_16, e_17;
        var _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0: return [4 /*yield*/, checkPermissions("delete", options.permissions.delete, req.user)];
                case 1:
                    if (!(_c.sent())) {
                        logger_1.logger.warn("Access to DELETE on " + model.name + " denied for " + ((_a = req.user) === null || _a === void 0 ? void 0 : _a.id));
                        return [2 /*return*/, res.status(405).send()];
                    }
                    return [4 /*yield*/, model.findById(req.params.id)];
                case 2:
                    data = _c.sent();
                    if (!data) {
                        return [2 /*return*/, res.status(404).send()];
                    }
                    return [4 /*yield*/, checkPermissions("delete", options.permissions.delete, req.user, data)];
                case 3:
                    if (!(_c.sent())) {
                        logger_1.logger.warn("Access to DELETE on " + model.name + ":" + req.params.id + " denied for " + ((_b = req.user) === null || _b === void 0 ? void 0 : _b.id));
                        return [2 /*return*/, res.status(403).send()];
                    }
                    if (options.preDelete) {
                        try {
                            body = options.preDelete(data, req);
                            if (body === null) {
                                return [2 /*return*/, res.status(403).send({ message: "Pre Delete returned null" })];
                            }
                        }
                        catch (e) {
                            return [2 /*return*/, res.status(400).send({ message: "Pre Delete error: " + e.message })];
                        }
                    }
                    if (!(Object.keys(model.schema.paths).includes("deleted") &&
                        model.schema.paths.deleted.instance === "Boolean")) return [3 /*break*/, 5];
                    data.deleted = true;
                    return [4 /*yield*/, data.save()];
                case 4:
                    _c.sent();
                    return [3 /*break*/, 8];
                case 5:
                    _c.trys.push([5, 7, , 8]);
                    return [4 /*yield*/, data.remove()];
                case 6:
                    _c.sent();
                    return [3 /*break*/, 8];
                case 7:
                    e_16 = _c.sent();
                    return [2 /*return*/, res.status(400).send({ message: e_16.message })];
                case 8:
                    if (!options.postDelete) return [3 /*break*/, 12];
                    _c.label = 9;
                case 9:
                    _c.trys.push([9, 11, , 12]);
                    return [4 /*yield*/, options.postDelete(req)];
                case 10:
                    _c.sent();
                    return [3 /*break*/, 12];
                case 11:
                    e_17 = _c.sent();
                    return [2 /*return*/, res.status(400).send({ message: "Post Delete error: " + e_17.message })];
                case 12: return [2 /*return*/, res.status(204).send()];
            }
        });
    }); });
    return router;
}
exports.gooseRestRouter = gooseRestRouter;
