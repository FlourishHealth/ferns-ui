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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var chai_1 = __importDefault(require("chai"));
var express_1 = __importDefault(require("express"));
var mongoose_1 = __importStar(require("mongoose"));
var qs_1 = __importDefault(require("qs"));
var supertest_1 = __importDefault(require("supertest"));
var mongooseRestFramework_1 = require("./mongooseRestFramework");
var passport_1 = require("./passport");
var assert = chai_1.default.assert;
mongoose_1.default.connect("mongodb://localhost:27017/mrf");
var userSchema = new mongoose_1.Schema({
    username: String,
    admin: { type: Boolean, default: false },
    age: Number,
});
userSchema.plugin(passport_1.passportLocalMongoose, { usernameField: "email" });
userSchema.plugin(mongooseRestFramework_1.tokenPlugin);
userSchema.plugin(mongooseRestFramework_1.createdDeletedPlugin);
userSchema.methods.postCreate = function (body) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            this.age = body.age;
            return [2 /*return*/, this.save()];
        });
    });
};
var UserModel = (0, mongoose_1.model)("User", userSchema);
var schema = new mongoose_1.Schema({
    name: String,
    calories: Number,
    created: Date,
    ownerId: { type: "ObjectId", ref: "User" },
    source: {
        name: String,
    },
    hidden: { type: Boolean, default: false },
});
var FoodModel = (0, mongoose_1.model)("Food", schema);
var requiredSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    about: String,
});
var RequiredModel = (0, mongoose_1.model)("Required", requiredSchema);
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
    return app;
}
afterAll(function () {
    mongoose_1.default.connection.close();
});
function setupDb() {
    return __awaiter(this, void 0, void 0, function () {
        var _a, notAdmin, admin;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, Promise.all([UserModel.deleteMany({}), FoodModel.deleteMany({})])];
                case 1:
                    _b.sent();
                    return [4 /*yield*/, Promise.all([
                            UserModel.create({ email: "notAdmin@example.com" }),
                            UserModel.create({ email: "admin@example.com", admin: true }),
                        ])];
                case 2:
                    _a = __read.apply(void 0, [_b.sent(), 2]), notAdmin = _a[0], admin = _a[1];
                    return [4 /*yield*/, notAdmin.setPassword("password")];
                case 3:
                    _b.sent();
                    return [4 /*yield*/, notAdmin.save()];
                case 4:
                    _b.sent();
                    return [4 /*yield*/, admin.setPassword("securePassword")];
                case 5:
                    _b.sent();
                    return [4 /*yield*/, admin.save()];
                case 6:
                    _b.sent();
                    return [2 /*return*/, [admin, notAdmin]];
            }
        });
    });
}
describe("mongoose rest framework", function () {
    var server;
    var app;
    var OLD_ENV = process.env;
    beforeEach(function () {
        // jest.resetModules(); // Most important - it clears the cache
        process.env = __assign({}, OLD_ENV); // Make a copy
        process.env.TOKEN_SECRET = "secret";
        process.env.TOKEN_EXPIRES_IN = "30m";
        process.env.TOKEN_ISSUER = "example.com";
        process.env.SESSION_SECRET = "session";
    });
    afterEach(function () {
        process.env = OLD_ENV;
    });
    describe("pre and post hooks", function () {
        beforeEach(function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, setupDb()];
                        case 1:
                            _a.sent();
                            app = getBaseServer();
                            (0, mongooseRestFramework_1.setupAuth)(app, UserModel);
                            return [2 /*return*/];
                    }
                });
            });
        });
        it("pre hooks change data", function () {
            return __awaiter(this, void 0, void 0, function () {
                var deleteCalled, res, broccoli;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            deleteCalled = false;
                            app.use("/food", (0, mongooseRestFramework_1.gooseRestRouter)(FoodModel, {
                                permissions: {
                                    list: [mongooseRestFramework_1.Permissions.IsAny],
                                    create: [mongooseRestFramework_1.Permissions.IsAny],
                                    read: [mongooseRestFramework_1.Permissions.IsAny],
                                    update: [mongooseRestFramework_1.Permissions.IsAny],
                                    delete: [mongooseRestFramework_1.Permissions.IsAny],
                                },
                                preCreate: function (data) {
                                    data.calories = 14;
                                    return data;
                                },
                                preUpdate: function (data) {
                                    data.calories = 15;
                                    return data;
                                },
                                preDelete: function (data) {
                                    deleteCalled = true;
                                    return data;
                                },
                            }));
                            server = (0, supertest_1.default)(app);
                            return [4 /*yield*/, server
                                    .post("/food")
                                    .send({
                                    name: "Broccoli",
                                    calories: 15,
                                })
                                    .expect(201)];
                        case 1:
                            res = _a.sent();
                            return [4 /*yield*/, FoodModel.findById(res.body.data._id)];
                        case 2:
                            broccoli = _a.sent();
                            if (!broccoli) {
                                throw new Error("Broccoli was not created");
                            }
                            assert.equal(broccoli.name, "Broccoli");
                            // Overwritten by the pre create hook
                            assert.equal(broccoli.calories, 14);
                            return [4 /*yield*/, server
                                    .patch("/food/" + broccoli._id)
                                    .send({
                                    name: "Broccoli2",
                                })
                                    .expect(200)];
                        case 3:
                            res = _a.sent();
                            assert.equal(res.body.data.name, "Broccoli2");
                            // Updated by the pre update hook
                            assert.equal(res.body.data.calories, 15);
                            return [4 /*yield*/, server.delete("/food/" + broccoli._id).expect(204)];
                        case 4:
                            _a.sent();
                            assert.isTrue(deleteCalled);
                            return [2 /*return*/];
                    }
                });
            });
        });
        it("pre hooks return null", function () {
            return __awaiter(this, void 0, void 0, function () {
                var notAdmin, spinach, res, broccoli;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, UserModel.findOne({ email: "notAdmin@example.com" })];
                        case 1:
                            notAdmin = _a.sent();
                            return [4 /*yield*/, FoodModel.create({
                                    name: "Spinach",
                                    calories: 1,
                                    created: new Date("2021-12-03T00:00:20.000Z"),
                                    ownerId: notAdmin._id,
                                    hidden: false,
                                    source: {
                                        name: "Brand",
                                    },
                                })];
                        case 2:
                            spinach = _a.sent();
                            app.use("/food", (0, mongooseRestFramework_1.gooseRestRouter)(FoodModel, {
                                permissions: {
                                    list: [mongooseRestFramework_1.Permissions.IsAny],
                                    create: [mongooseRestFramework_1.Permissions.IsAny],
                                    read: [mongooseRestFramework_1.Permissions.IsAny],
                                    update: [mongooseRestFramework_1.Permissions.IsAny],
                                    delete: [mongooseRestFramework_1.Permissions.IsAny],
                                },
                                preCreate: function () { return null; },
                                preUpdate: function () { return null; },
                                preDelete: function () { return null; },
                            }));
                            server = (0, supertest_1.default)(app);
                            return [4 /*yield*/, server
                                    .post("/food")
                                    .send({
                                    name: "Broccoli",
                                    calories: 15,
                                })
                                    .expect(403)];
                        case 3:
                            res = _a.sent();
                            return [4 /*yield*/, FoodModel.findById(res.body._id)];
                        case 4:
                            broccoli = _a.sent();
                            assert.isNull(broccoli);
                            return [4 /*yield*/, server
                                    .patch("/food/" + spinach._id)
                                    .send({
                                    name: "Broccoli",
                                })
                                    .expect(403)];
                        case 5:
                            _a.sent();
                            return [4 /*yield*/, server.delete("/food/" + spinach._id).expect(403)];
                        case 6:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            });
        });
        it("post hooks succeed", function () {
            return __awaiter(this, void 0, void 0, function () {
                var deleteCalled, res, broccoli;
                var _this = this;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            deleteCalled = false;
                            app.use("/food", (0, mongooseRestFramework_1.gooseRestRouter)(FoodModel, {
                                permissions: {
                                    list: [mongooseRestFramework_1.Permissions.IsAny],
                                    create: [mongooseRestFramework_1.Permissions.IsAny],
                                    read: [mongooseRestFramework_1.Permissions.IsAny],
                                    update: [mongooseRestFramework_1.Permissions.IsAny],
                                    delete: [mongooseRestFramework_1.Permissions.IsAny],
                                },
                                postCreate: function (data) { return __awaiter(_this, void 0, void 0, function () {
                                    return __generator(this, function (_a) {
                                        switch (_a.label) {
                                            case 0:
                                                data.calories = 14;
                                                return [4 /*yield*/, data.save()];
                                            case 1:
                                                _a.sent();
                                                return [2 /*return*/, data];
                                        }
                                    });
                                }); },
                                postUpdate: function (data) { return __awaiter(_this, void 0, void 0, function () {
                                    return __generator(this, function (_a) {
                                        switch (_a.label) {
                                            case 0:
                                                data.calories = 15;
                                                return [4 /*yield*/, data.save()];
                                            case 1:
                                                _a.sent();
                                                return [2 /*return*/, data];
                                        }
                                    });
                                }); },
                                postDelete: function (data) {
                                    deleteCalled = true;
                                    return data;
                                },
                            }));
                            server = (0, supertest_1.default)(app);
                            return [4 /*yield*/, server
                                    .post("/food")
                                    .send({
                                    name: "Broccoli",
                                    calories: 15,
                                })
                                    .expect(201)];
                        case 1:
                            res = _a.sent();
                            return [4 /*yield*/, FoodModel.findById(res.body.data._id)];
                        case 2:
                            broccoli = _a.sent();
                            if (!broccoli) {
                                throw new Error("Broccoli was not created");
                            }
                            assert.equal(broccoli.name, "Broccoli");
                            // Overwritten by the pre create hook
                            assert.equal(broccoli.calories, 14);
                            return [4 /*yield*/, server
                                    .patch("/food/" + broccoli._id)
                                    .send({
                                    name: "Broccoli2",
                                })
                                    .expect(200)];
                        case 3:
                            res = _a.sent();
                            return [4 /*yield*/, FoodModel.findById(res.body.data._id)];
                        case 4:
                            broccoli = _a.sent();
                            if (!broccoli) {
                                throw new Error("Broccoli was not update");
                            }
                            assert.equal(broccoli.name, "Broccoli2");
                            // Updated by the post update hook
                            assert.equal(broccoli.calories, 15);
                            return [4 /*yield*/, server.delete("/food/" + broccoli._id).expect(204)];
                        case 5:
                            _a.sent();
                            assert.isTrue(deleteCalled);
                            return [2 /*return*/];
                    }
                });
            });
        });
    });
    describe("permissions", function () {
        beforeEach(function () {
            return __awaiter(this, void 0, void 0, function () {
                var _a, admin, notAdmin;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0: return [4 /*yield*/, setupDb()];
                        case 1:
                            _a = __read.apply(void 0, [_b.sent(), 2]), admin = _a[0], notAdmin = _a[1];
                            return [4 /*yield*/, Promise.all([
                                    FoodModel.create({
                                        name: "Spinach",
                                        calories: 1,
                                        created: new Date(),
                                        ownerId: notAdmin._id,
                                    }),
                                    FoodModel.create({
                                        name: "Apple",
                                        calories: 100,
                                        created: new Date().getTime() - 10,
                                        ownerId: admin._id,
                                    }),
                                ])];
                        case 2:
                            _b.sent();
                            app = getBaseServer();
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
                            app.use("/required", (0, mongooseRestFramework_1.gooseRestRouter)(RequiredModel, {
                                permissions: {
                                    list: [mongooseRestFramework_1.Permissions.IsAny],
                                    create: [mongooseRestFramework_1.Permissions.IsAuthenticated],
                                    read: [mongooseRestFramework_1.Permissions.IsAny],
                                    update: [mongooseRestFramework_1.Permissions.IsOwner],
                                    delete: [mongooseRestFramework_1.Permissions.IsAdmin],
                                },
                            }));
                            server = (0, supertest_1.default)(app);
                            return [2 /*return*/];
                    }
                });
            });
        });
        describe("anonymous food", function () {
            it("list", function () {
                return __awaiter(this, void 0, void 0, function () {
                    var res;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, server.get("/food").expect(200)];
                            case 1:
                                res = _a.sent();
                                assert.lengthOf(res.body.data, 2);
                                return [2 /*return*/];
                        }
                    });
                });
            });
            it("get", function () {
                return __awaiter(this, void 0, void 0, function () {
                    var res, res2;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, server.get("/food").expect(200)];
                            case 1:
                                res = _a.sent();
                                assert.lengthOf(res.body.data, 2);
                                return [4 /*yield*/, server.get("/food/" + res.body.data[0]._id).expect(200)];
                            case 2:
                                res2 = _a.sent();
                                assert.equal(res.body.data[0]._id, res2.body.data._id);
                                return [2 /*return*/];
                        }
                    });
                });
            });
            it("post", function () {
                return __awaiter(this, void 0, void 0, function () {
                    var res;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, server.post("/food").send({
                                    name: "Broccoli",
                                    calories: 15,
                                })];
                            case 1:
                                res = _a.sent();
                                assert.equal(res.status, 405);
                                return [2 /*return*/];
                        }
                    });
                });
            });
            it("patch", function () {
                return __awaiter(this, void 0, void 0, function () {
                    var res, res2;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, server.get("/food")];
                            case 1:
                                res = _a.sent();
                                return [4 /*yield*/, server.patch("/food/" + res.body.data[0]._id).send({
                                        name: "Broccoli",
                                    })];
                            case 2:
                                res2 = _a.sent();
                                assert.equal(res2.status, 403);
                                return [2 /*return*/];
                        }
                    });
                });
            });
            it("delete", function () {
                return __awaiter(this, void 0, void 0, function () {
                    var res, res2;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, server.get("/food")];
                            case 1:
                                res = _a.sent();
                                return [4 /*yield*/, server.delete("/food/" + res.body.data[0]._id)];
                            case 2:
                                res2 = _a.sent();
                                assert.equal(res2.status, 405);
                                return [2 /*return*/];
                        }
                    });
                });
            });
        });
        describe("non admin food", function () {
            var agent;
            var token;
            beforeEach(function () {
                return __awaiter(this, void 0, void 0, function () {
                    var res;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                agent = supertest_1.default.agent(app);
                                return [4 /*yield*/, agent
                                        .post("/auth/login")
                                        .send({ email: "notAdmin@example.com", password: "password" })
                                        .expect(200)];
                            case 1:
                                res = _a.sent();
                                token = res.body.data.token;
                                return [2 /*return*/];
                        }
                    });
                });
            });
            it("list", function () {
                return __awaiter(this, void 0, void 0, function () {
                    var res;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, agent.get("/food").set("authorization", "Bearer " + token)];
                            case 1:
                                res = _a.sent();
                                assert.lengthOf(res.body.data, 2);
                                return [2 /*return*/];
                        }
                    });
                });
            });
            it("get", function () {
                return __awaiter(this, void 0, void 0, function () {
                    var res, res2;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, agent.get("/food").set("authorization", "Bearer " + token)];
                            case 1:
                                res = _a.sent();
                                assert.lengthOf(res.body.data, 2);
                                return [4 /*yield*/, agent
                                        .get("/food/" + res.body.data[0]._id)
                                        .set("authorization", "Bearer " + token)];
                            case 2:
                                res2 = _a.sent();
                                assert.equal(res.body.data[0]._id, res2.body.data._id);
                                return [2 /*return*/];
                        }
                    });
                });
            });
            it("post", function () {
                return __awaiter(this, void 0, void 0, function () {
                    var res;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, agent.post("/food").set("authorization", "Bearer " + token).send({
                                    name: "Broccoli",
                                    calories: 15,
                                })];
                            case 1:
                                res = _a.sent();
                                assert.equal(res.status, 201);
                                return [2 /*return*/];
                        }
                    });
                });
            });
            it("patch own item", function () {
                return __awaiter(this, void 0, void 0, function () {
                    var res, spinach, res2;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, agent.get("/food")];
                            case 1:
                                res = _a.sent();
                                spinach = res.body.data.find(function (food) { return food.name === "Spinach"; });
                                return [4 /*yield*/, agent
                                        .patch("/food/" + spinach._id)
                                        .set("authorization", "Bearer " + token)
                                        .send({
                                        name: "Broccoli",
                                    })];
                            case 2:
                                res2 = _a.sent();
                                assert.equal(res2.status, 200);
                                assert.equal(res2.body.data.name, "Broccoli");
                                return [2 /*return*/];
                        }
                    });
                });
            });
            it("patch other item", function () {
                return __awaiter(this, void 0, void 0, function () {
                    var res, spinach, res2;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, agent.get("/food")];
                            case 1:
                                res = _a.sent();
                                spinach = res.body.data.find(function (food) { return food.name === "Apple"; });
                                return [4 /*yield*/, agent
                                        .patch("/food/" + spinach._id)
                                        .set("authorization", "Bearer " + token)
                                        .send({
                                        name: "Broccoli",
                                    })];
                            case 2:
                                res2 = _a.sent();
                                assert.equal(res2.status, 403);
                                return [2 /*return*/];
                        }
                    });
                });
            });
            it("delete", function () {
                return __awaiter(this, void 0, void 0, function () {
                    var res, res2;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, agent.get("/food")];
                            case 1:
                                res = _a.sent();
                                return [4 /*yield*/, agent.delete("/food/" + res.body.data[0]._id)];
                            case 2:
                                res2 = _a.sent();
                                assert.equal(res2.status, 405);
                                return [2 /*return*/];
                        }
                    });
                });
            });
        });
        describe("admin food", function () {
            var agent;
            var token;
            beforeEach(function () {
                return __awaiter(this, void 0, void 0, function () {
                    var res;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                agent = supertest_1.default.agent(app);
                                return [4 /*yield*/, agent
                                        .post("/auth/login")
                                        .send({ email: "admin@example.com", password: "securePassword" })
                                        .expect(200)];
                            case 1:
                                res = _a.sent();
                                token = res.body.data.token;
                                return [2 /*return*/];
                        }
                    });
                });
            });
            it("list", function () {
                return __awaiter(this, void 0, void 0, function () {
                    var res;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, agent.get("/food")];
                            case 1:
                                res = _a.sent();
                                assert.lengthOf(res.body.data, 2);
                                return [2 /*return*/];
                        }
                    });
                });
            });
            it("get", function () {
                return __awaiter(this, void 0, void 0, function () {
                    var res, res2;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, agent.get("/food")];
                            case 1:
                                res = _a.sent();
                                assert.lengthOf(res.body.data, 2);
                                return [4 /*yield*/, agent.get("/food/" + res.body.data[0]._id)];
                            case 2:
                                res2 = _a.sent();
                                assert.equal(res.body.data[0]._id, res2.body.data._id);
                                return [2 /*return*/];
                        }
                    });
                });
            });
            it("post", function () {
                return __awaiter(this, void 0, void 0, function () {
                    var res;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, agent.post("/food").set("authorization", "Bearer " + token).send({
                                    name: "Broccoli",
                                    calories: 15,
                                })];
                            case 1:
                                res = _a.sent();
                                assert.equal(res.status, 201);
                                return [2 /*return*/];
                        }
                    });
                });
            });
            it("patch", function () {
                return __awaiter(this, void 0, void 0, function () {
                    var res, res2;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, agent.get("/food")];
                            case 1:
                                res = _a.sent();
                                return [4 /*yield*/, agent
                                        .patch("/food/" + res.body.data[0]._id)
                                        .set("authorization", "Bearer " + token)
                                        .send({
                                        name: "Broccoli",
                                    })];
                            case 2:
                                res2 = _a.sent();
                                assert.equal(res2.status, 200);
                                return [2 /*return*/];
                        }
                    });
                });
            });
            it("delete", function () {
                return __awaiter(this, void 0, void 0, function () {
                    var res, res2;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, agent.get("/food")];
                            case 1:
                                res = _a.sent();
                                return [4 /*yield*/, agent
                                        .delete("/food/" + res.body.data[0]._id)
                                        .set("authorization", "Bearer " + token)];
                            case 2:
                                res2 = _a.sent();
                                assert.equal(res2.status, 204);
                                return [2 /*return*/];
                        }
                    });
                });
            });
            it("handles validation errors", function () {
                return __awaiter(this, void 0, void 0, function () {
                    var res;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, agent.post("/required").set("authorization", "Bearer " + token).send({
                                    about: "Whoops forgot required",
                                })];
                            case 1:
                                res = _a.sent();
                                assert.equal(res.status, 400);
                                return [2 /*return*/];
                        }
                    });
                });
            });
        });
    });
    describe("query and transform", function () {
        var notAdmin;
        var admin;
        beforeEach(function () {
            return __awaiter(this, void 0, void 0, function () {
                var _a;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0: return [4 /*yield*/, setupDb()];
                        case 1:
                            _a = __read.apply(void 0, [_b.sent(), 2]), admin = _a[0], notAdmin = _a[1];
                            return [4 /*yield*/, Promise.all([
                                    FoodModel.create({
                                        name: "Spinach",
                                        calories: 1,
                                        created: new Date(),
                                        ownerId: notAdmin._id,
                                    }),
                                    FoodModel.create({
                                        name: "Apple",
                                        calories: 100,
                                        created: new Date().getTime() - 10,
                                        ownerId: admin._id,
                                        hidden: true,
                                    }),
                                    FoodModel.create({
                                        name: "Carrots",
                                        calories: 100,
                                        created: new Date().getTime() - 10,
                                        ownerId: admin._id,
                                    }),
                                ])];
                        case 2:
                            _b.sent();
                            app = getBaseServer();
                            (0, mongooseRestFramework_1.setupAuth)(app, UserModel);
                            app.use("/food", (0, mongooseRestFramework_1.gooseRestRouter)(FoodModel, {
                                permissions: {
                                    list: [mongooseRestFramework_1.Permissions.IsAny],
                                    create: [mongooseRestFramework_1.Permissions.IsAny],
                                    read: [mongooseRestFramework_1.Permissions.IsAny],
                                    update: [mongooseRestFramework_1.Permissions.IsAny],
                                    delete: [mongooseRestFramework_1.Permissions.IsAny],
                                },
                                queryFilter: function (user) {
                                    if (!(user === null || user === void 0 ? void 0 : user.admin)) {
                                        return { hidden: { $ne: true } };
                                    }
                                    return {};
                                },
                                transformer: (0, mongooseRestFramework_1.AdminOwnerTransformer)({
                                    adminReadFields: ["name", "calories", "created", "ownerId"],
                                    adminWriteFields: ["name", "calories", "created", "ownerId"],
                                    ownerReadFields: ["name", "calories", "created", "ownerId"],
                                    ownerWriteFields: ["name", "calories", "created"],
                                    authReadFields: ["name", "calories", "created"],
                                    authWriteFields: ["name", "calories"],
                                    anonReadFields: ["name"],
                                    anonWriteFields: [],
                                }),
                            }));
                            server = (0, supertest_1.default)(app);
                            return [2 /*return*/];
                    }
                });
            });
        });
        it("filters list for non-admin", function () {
            return __awaiter(this, void 0, void 0, function () {
                var agent, res, foodRes;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            agent = supertest_1.default.agent(app);
                            return [4 /*yield*/, agent
                                    .post("/auth/login")
                                    .send({ email: "notAdmin@example.com", password: "password" })
                                    .expect(200)];
                        case 1:
                            res = _a.sent();
                            return [4 /*yield*/, agent
                                    .get("/food")
                                    .set("authorization", "Bearer " + res.body.data.token)
                                    .expect(200)];
                        case 2:
                            foodRes = _a.sent();
                            assert.lengthOf(foodRes.body.data, 2);
                            return [2 /*return*/];
                    }
                });
            });
        });
        it("does not filter list for admin", function () {
            return __awaiter(this, void 0, void 0, function () {
                var agent, res, foodRes;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            agent = supertest_1.default.agent(app);
                            return [4 /*yield*/, agent
                                    .post("/auth/login")
                                    .send({ email: "admin@example.com", password: "securePassword" })
                                    .expect(200)];
                        case 1:
                            res = _a.sent();
                            return [4 /*yield*/, agent
                                    .get("/food")
                                    .set("authorization", "Bearer " + res.body.data.token)
                                    .expect(200)];
                        case 2:
                            foodRes = _a.sent();
                            assert.lengthOf(foodRes.body.data, 3);
                            return [2 /*return*/];
                    }
                });
            });
        });
        it("admin read transform", function () {
            return __awaiter(this, void 0, void 0, function () {
                var agent, res, foodRes, spinach;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            agent = supertest_1.default.agent(app);
                            return [4 /*yield*/, agent
                                    .post("/auth/login")
                                    .send({ email: "admin@example.com", password: "securePassword" })
                                    .expect(200)];
                        case 1:
                            res = _a.sent();
                            return [4 /*yield*/, agent
                                    .get("/food")
                                    .set("authorization", "Bearer " + res.body.data.token)
                                    .expect(200)];
                        case 2:
                            foodRes = _a.sent();
                            assert.lengthOf(foodRes.body.data, 3);
                            spinach = foodRes.body.data.find(function (food) { return food.name === "Spinach"; });
                            assert.isDefined(spinach.created);
                            assert.isDefined(spinach.id);
                            assert.isDefined(spinach.ownerId);
                            assert.equal(spinach.name, "Spinach");
                            assert.equal(spinach.calories, 1);
                            assert.isUndefined(spinach.hidden);
                            return [2 /*return*/];
                    }
                });
            });
        });
        it("admin write transform", function () {
            return __awaiter(this, void 0, void 0, function () {
                var agent, res, foodRes, spinach, spinachRes;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            agent = supertest_1.default.agent(app);
                            return [4 /*yield*/, agent
                                    .post("/auth/login")
                                    .send({ email: "admin@example.com", password: "securePassword" })
                                    .expect(200)];
                        case 1:
                            res = _a.sent();
                            return [4 /*yield*/, agent
                                    .get("/food")
                                    .set("authorization", "Bearer " + res.body.data.token)
                                    .expect(200)];
                        case 2:
                            foodRes = _a.sent();
                            spinach = foodRes.body.data.find(function (food) { return food.name === "Spinach"; });
                            return [4 /*yield*/, agent
                                    .patch("/food/" + spinach.id)
                                    .set("authorization", "Bearer " + res.body.data.token)
                                    .send({ name: "Lettuce" })
                                    .expect(200)];
                        case 3:
                            spinachRes = _a.sent();
                            assert.equal(spinachRes.body.data.name, "Lettuce");
                            return [2 /*return*/];
                    }
                });
            });
        });
        it("owner read transform", function () {
            return __awaiter(this, void 0, void 0, function () {
                var agent, res, foodRes, spinach;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            agent = supertest_1.default.agent(app);
                            return [4 /*yield*/, agent
                                    .post("/auth/login")
                                    .send({ email: "notAdmin@example.com", password: "password" })
                                    .expect(200)];
                        case 1:
                            res = _a.sent();
                            return [4 /*yield*/, agent
                                    .get("/food")
                                    .set("authorization", "Bearer " + res.body.data.token)
                                    .expect(200)];
                        case 2:
                            foodRes = _a.sent();
                            assert.lengthOf(foodRes.body.data, 2);
                            spinach = foodRes.body.data.find(function (food) { return food.name === "Spinach"; });
                            assert.isDefined(spinach.id);
                            assert.equal(spinach.name, "Spinach");
                            assert.equal(spinach.calories, 1);
                            assert.isDefined(spinach.created);
                            assert.isDefined(spinach.ownerId);
                            assert.isUndefined(spinach.hidden);
                            return [2 /*return*/];
                    }
                });
            });
        });
        it("owner write transform", function () {
            return __awaiter(this, void 0, void 0, function () {
                var agent, res, foodRes, spinach;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            agent = supertest_1.default.agent(app);
                            return [4 /*yield*/, agent
                                    .post("/auth/login")
                                    .send({ email: "notAdmin@example.com", password: "password" })
                                    .expect(200)];
                        case 1:
                            res = _a.sent();
                            return [4 /*yield*/, agent
                                    .get("/food")
                                    .set("authorization", "Bearer " + res.body.data.token)
                                    .expect(200)];
                        case 2:
                            foodRes = _a.sent();
                            spinach = foodRes.body.data.find(function (food) { return food.name === "Spinach"; });
                            return [4 /*yield*/, agent.patch("/food/" + spinach.id).send({ ownerId: admin.id }).expect(403)];
                        case 3:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            });
        });
        it("owner write transform fails", function () {
            return __awaiter(this, void 0, void 0, function () {
                var agent, res, foodRes, spinach, spinachRes;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            agent = supertest_1.default.agent(app);
                            return [4 /*yield*/, agent
                                    .post("/auth/login")
                                    .send({ email: "notAdmin@example.com", password: "password" })
                                    .expect(200)];
                        case 1:
                            res = _a.sent();
                            return [4 /*yield*/, agent
                                    .get("/food")
                                    .set("authorization", "Bearer " + res.body.data.token)
                                    .expect(200)];
                        case 2:
                            foodRes = _a.sent();
                            spinach = foodRes.body.data.find(function (food) { return food.name === "Spinach"; });
                            return [4 /*yield*/, agent
                                    .patch("/food/" + spinach.id)
                                    .set("authorization", "Bearer " + res.body.data.token)
                                    .send({ ownerId: notAdmin.id })
                                    .expect(403)];
                        case 3:
                            spinachRes = _a.sent();
                            assert.equal(spinachRes.body.message, "User of type owner cannot write fields: ownerId");
                            return [2 /*return*/];
                    }
                });
            });
        });
        it("auth read transform", function () {
            return __awaiter(this, void 0, void 0, function () {
                var agent, res, foodRes, spinach, carrots;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            agent = supertest_1.default.agent(app);
                            return [4 /*yield*/, agent
                                    .post("/auth/login")
                                    .send({ email: "notAdmin@example.com", password: "password" })
                                    .expect(200)];
                        case 1:
                            res = _a.sent();
                            return [4 /*yield*/, agent
                                    .get("/food")
                                    .set("authorization", "Bearer " + res.body.data.token)
                                    .expect(200)];
                        case 2:
                            foodRes = _a.sent();
                            assert.lengthOf(foodRes.body.data, 2);
                            spinach = foodRes.body.data.find(function (food) { return food.name === "Spinach"; });
                            assert.isDefined(spinach.id);
                            assert.equal(spinach.name, "Spinach");
                            assert.equal(spinach.calories, 1);
                            assert.isDefined(spinach.created);
                            // Owner, so this is defined.
                            assert.isDefined(spinach.ownerId);
                            assert.isUndefined(spinach.hidden);
                            carrots = foodRes.body.data.find(function (food) { return food.name === "Carrots"; });
                            assert.isDefined(carrots.id);
                            assert.equal(carrots.name, "Carrots");
                            assert.equal(carrots.calories, 100);
                            assert.isDefined(carrots.created);
                            // Not owner, so undefined.
                            assert.isUndefined(carrots.ownerId);
                            assert.isUndefined(spinach.hidden);
                            return [2 /*return*/];
                    }
                });
            });
        });
        it("auth write transform", function () {
            return __awaiter(this, void 0, void 0, function () {
                var agent, res, foodRes, carrots, carrotRes;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            agent = supertest_1.default.agent(app);
                            return [4 /*yield*/, agent
                                    .post("/auth/login")
                                    .send({ email: "notAdmin@example.com", password: "password" })
                                    .expect(200)];
                        case 1:
                            res = _a.sent();
                            return [4 /*yield*/, agent.get("/food")];
                        case 2:
                            foodRes = _a.sent();
                            carrots = foodRes.body.data.find(function (food) { return food.name === "Carrots"; });
                            return [4 /*yield*/, agent
                                    .patch("/food/" + carrots.id)
                                    .set("authorization", "Bearer " + res.body.data.token)
                                    .send({ calories: 2000 })
                                    .expect(200)];
                        case 3:
                            carrotRes = _a.sent();
                            assert.equal(carrotRes.body.data.calories, 2000);
                            return [2 /*return*/];
                    }
                });
            });
        });
        it("auth write transform fail", function () {
            return __awaiter(this, void 0, void 0, function () {
                var agent, res, foodRes, carrots, writeRes;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            agent = supertest_1.default.agent(app);
                            return [4 /*yield*/, agent
                                    .post("/auth/login")
                                    .send({ email: "notAdmin@example.com", password: "password" })
                                    .expect(200)];
                        case 1:
                            res = _a.sent();
                            return [4 /*yield*/, agent.get("/food")];
                        case 2:
                            foodRes = _a.sent();
                            carrots = foodRes.body.data.find(function (food) { return food.name === "Carrots"; });
                            return [4 /*yield*/, agent
                                    .patch("/food/" + carrots.id)
                                    .set("authorization", "Bearer " + res.body.data.token)
                                    .send({ created: "2020-01-01T00:00:00Z" })
                                    .expect(403)];
                        case 3:
                            writeRes = _a.sent();
                            assert.equal(writeRes.body.message, "User of type auth cannot write fields: created");
                            return [2 /*return*/];
                    }
                });
            });
        });
        it("anon read transform", function () {
            return __awaiter(this, void 0, void 0, function () {
                var agent, res;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            agent = supertest_1.default.agent(app);
                            return [4 /*yield*/, agent.get("/food")];
                        case 1:
                            res = _a.sent();
                            assert.lengthOf(res.body.data, 2);
                            assert.isDefined(res.body.data.find(function (f) { return f.name === "Spinach"; }));
                            assert.isDefined(res.body.data.find(function (f) { return f.name === "Carrots"; }));
                            return [2 /*return*/];
                    }
                });
            });
        });
        it("anon write transform fails", function () {
            return __awaiter(this, void 0, void 0, function () {
                var agent, foodRes, carrots;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            agent = supertest_1.default.agent(app);
                            return [4 /*yield*/, agent.get("/food")];
                        case 1:
                            foodRes = _a.sent();
                            carrots = foodRes.body.data.find(function (food) { return food.name === "Carrots"; });
                            return [4 /*yield*/, agent.patch("/food/" + carrots.id).send({ calories: 10 }).expect(403)];
                        case 2:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            });
        });
    });
    var spinach;
    var apple;
    var carrots;
    var pizza;
    describe("list options", function () {
        var notAdmin;
        var admin;
        beforeEach(function () {
            return __awaiter(this, void 0, void 0, function () {
                var _a, _b;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0: return [4 /*yield*/, setupDb()];
                        case 1:
                            _a = __read.apply(void 0, [_c.sent(), 2]), admin = _a[0], notAdmin = _a[1];
                            return [4 /*yield*/, Promise.all([
                                    FoodModel.create({
                                        name: "Spinach",
                                        calories: 1,
                                        created: new Date("2021-12-03T00:00:20.000Z"),
                                        ownerId: notAdmin._id,
                                        hidden: false,
                                        source: {
                                            name: "Brand",
                                        },
                                    }),
                                    FoodModel.create({
                                        name: "Apple",
                                        calories: 100,
                                        created: new Date("2021-12-03T00:00:30.000Z"),
                                        ownerId: admin._id,
                                        hidden: true,
                                    }),
                                    FoodModel.create({
                                        name: "Carrots",
                                        calories: 100,
                                        created: new Date("2021-12-03T00:00:00.000Z"),
                                        ownerId: admin._id,
                                        hidden: false,
                                        source: {
                                            name: "USDA",
                                        },
                                    }),
                                    FoodModel.create({
                                        name: "Pizza",
                                        calories: 400,
                                        created: new Date("2021-12-03T00:00:10.000Z"),
                                        ownerId: admin._id,
                                        hidden: false,
                                    }),
                                ])];
                        case 2:
                            _b = __read.apply(void 0, [_c.sent(), 4]), spinach = _b[0], apple = _b[1], carrots = _b[2], pizza = _b[3];
                            app = getBaseServer();
                            (0, mongooseRestFramework_1.setupAuth)(app, UserModel);
                            app.use("/food", (0, mongooseRestFramework_1.gooseRestRouter)(FoodModel, {
                                permissions: {
                                    list: [mongooseRestFramework_1.Permissions.IsAny],
                                    create: [mongooseRestFramework_1.Permissions.IsAuthenticated],
                                    read: [mongooseRestFramework_1.Permissions.IsAny],
                                    update: [mongooseRestFramework_1.Permissions.IsOwner],
                                    delete: [mongooseRestFramework_1.Permissions.IsAdmin],
                                },
                                defaultLimit: 2,
                                maxLimit: 3,
                                sort: { created: "descending" },
                                defaultQueryParams: { hidden: false },
                                queryFields: ["hidden", "calories", "created", "source.name"],
                                populatePaths: ["ownerId"],
                            }));
                            server = (0, supertest_1.default)(app);
                            return [2 /*return*/];
                    }
                });
            });
        });
        it("list limit", function () {
            return __awaiter(this, void 0, void 0, function () {
                var res;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, server.get("/food?limit=1").expect(200)];
                        case 1:
                            res = _a.sent();
                            assert.lengthOf(res.body.data, 1);
                            assert.equal(res.body.data[0].id, spinach.id);
                            assert.equal(res.body.data[0].ownerId._id, notAdmin.id);
                            return [2 /*return*/];
                    }
                });
            });
        });
        it("list limit over", function () {
            return __awaiter(this, void 0, void 0, function () {
                var res;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: 
                        // This shouldn't be seen, it's the end of the list.
                        return [4 /*yield*/, FoodModel.create({
                                name: "Pizza",
                                calories: 400,
                                created: new Date("2021-12-02T00:00:10.000Z"),
                                ownerId: admin._id,
                                hidden: false,
                            })];
                        case 1:
                            // This shouldn't be seen, it's the end of the list.
                            _a.sent();
                            return [4 /*yield*/, server.get("/food?limit=4").expect(200)];
                        case 2:
                            res = _a.sent();
                            assert.lengthOf(res.body.data, 3);
                            assert.equal(res.body.data[0].id, spinach.id);
                            assert.equal(res.body.data[1].id, pizza.id);
                            assert.equal(res.body.data[2].id, carrots.id);
                            return [2 /*return*/];
                    }
                });
            });
        });
        it("list page", function () {
            return __awaiter(this, void 0, void 0, function () {
                var res;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, server.get("/food?limit=1&page=2").expect(200)];
                        case 1:
                            res = _a.sent();
                            assert.lengthOf(res.body.data, 1);
                            assert.equal(res.body.data[0].id, pizza.id);
                            return [2 /*return*/];
                    }
                });
            });
        });
        it("list page over", function () {
            return __awaiter(this, void 0, void 0, function () {
                var res;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, server.get("/food?limit=1&page=5").expect(200)];
                        case 1:
                            res = _a.sent();
                            assert.lengthOf(res.body.data, 0);
                            return [2 /*return*/];
                    }
                });
            });
        });
        it("list query params", function () {
            return __awaiter(this, void 0, void 0, function () {
                var res;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, server.get("/food?hidden=true").expect(200)];
                        case 1:
                            res = _a.sent();
                            assert.lengthOf(res.body.data, 1);
                            assert.equal(res.body.data[0].id, apple.id);
                            return [2 /*return*/];
                    }
                });
            });
        });
        it("list query params not in list", function () {
            return __awaiter(this, void 0, void 0, function () {
                var res;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, server.get("/food?name=Apple").expect(400)];
                        case 1:
                            res = _a.sent();
                            assert.equal(res.body.message, "name is not allowed as a query param.");
                            return [2 /*return*/];
                    }
                });
            });
        });
        it("list query by nested param", function () {
            return __awaiter(this, void 0, void 0, function () {
                var res;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, server.get("/food?source.name=USDA").expect(200)];
                        case 1:
                            res = _a.sent();
                            assert.lengthOf(res.body.data, 1);
                            assert.equal(res.body.data[0].id, carrots.id);
                            return [2 /*return*/];
                    }
                });
            });
        });
        it("query by date", function () {
            return __awaiter(this, void 0, void 0, function () {
                var authRes, token, res;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, server
                                .post("/auth/login")
                                .send({ email: "admin@example.com", password: "securePassword" })
                                .expect(200)];
                        case 1:
                            authRes = _a.sent();
                            token = authRes.body.data.token;
                            return [4 /*yield*/, server
                                    .get("/food?limit=3&" + qs_1.default.stringify({
                                    created: {
                                        $lte: "2021-12-03T00:00:20.000Z",
                                        $gte: "2021-12-03T00:00:00.000Z",
                                    },
                                }))
                                    .set("authorization", "Bearer " + token)
                                    .expect(200)];
                        case 2:
                            res = _a.sent();
                            assert.sameDeepMembers(["2021-12-03T00:00:20.000Z", "2021-12-03T00:00:10.000Z", "2021-12-03T00:00:00.000Z"], res.body.data.map(function (d) { return d.created; }));
                            return [4 /*yield*/, server
                                    .get("/food?limit=3&" + qs_1.default.stringify({
                                    created: {
                                        $lt: "2021-12-03T00:00:20.000Z",
                                        $gte: "2021-12-03T00:00:00.000Z",
                                    },
                                }))
                                    .set("authorization", "Bearer " + token)
                                    .expect(200)];
                        case 3:
                            // Inclusive one side
                            res = _a.sent();
                            assert.sameDeepMembers(["2021-12-03T00:00:10.000Z", "2021-12-03T00:00:00.000Z"], res.body.data.map(function (d) { return d.created; }));
                            return [4 /*yield*/, server
                                    .get("/food?limit=3&" + qs_1.default.stringify({
                                    created: {
                                        $lt: "2021-12-03T00:00:20.000Z",
                                        $gt: "2021-12-03T00:00:00.000Z",
                                    },
                                }))
                                    .set("authorization", "Bearer " + token)
                                    .expect(200)];
                        case 4:
                            // Inclusive both sides
                            res = _a.sent();
                            assert.sameDeepMembers(["2021-12-03T00:00:10.000Z"], res.body.data.map(function (d) { return d.created; }));
                            return [2 /*return*/];
                    }
                });
            });
        });
    });
});
describe("test token auth", function () {
    var app;
    var server;
    var OLD_ENV = process.env;
    beforeEach(function () {
        // jest.resetModules(); // Most important - it clears the cache
        process.env = __assign({}, OLD_ENV); // Make a copy
        process.env.TOKEN_SECRET = "secret";
        process.env.TOKEN_EXPIRES_IN = "30m";
        process.env.TOKEN_ISSUER = "example.com";
        process.env.SESSION_SECRET = "session";
    });
    afterEach(function () {
        process.env = OLD_ENV;
    });
    beforeEach(function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, notAdmin, admin;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, Promise.all([UserModel.deleteMany({}), FoodModel.deleteMany({})])];
                    case 1:
                        _b.sent();
                        return [4 /*yield*/, Promise.all([
                                UserModel.create({ email: "notAdmin@example.com" }),
                                UserModel.create({ email: "admin@example.com", admin: true }),
                            ])];
                    case 2:
                        _a = __read.apply(void 0, [_b.sent(), 2]), notAdmin = _a[0], admin = _a[1];
                        return [4 /*yield*/, notAdmin.setPassword("password")];
                    case 3:
                        _b.sent();
                        return [4 /*yield*/, notAdmin.save()];
                    case 4:
                        _b.sent();
                        return [4 /*yield*/, admin.setPassword("securePassword")];
                    case 5:
                        _b.sent();
                        return [4 /*yield*/, admin.save()];
                    case 6:
                        _b.sent();
                        return [4 /*yield*/, Promise.all([
                                FoodModel.create({
                                    name: "Spinach",
                                    calories: 1,
                                    created: new Date(),
                                    ownerId: notAdmin._id,
                                }),
                                FoodModel.create({
                                    name: "Apple",
                                    calories: 100,
                                    created: new Date().getTime() - 10,
                                    ownerId: admin._id,
                                    hidden: true,
                                }),
                                FoodModel.create({
                                    name: "Carrots",
                                    calories: 100,
                                    created: new Date().getTime() - 10,
                                    ownerId: admin._id,
                                }),
                            ])];
                    case 7:
                        _b.sent();
                        app = getBaseServer();
                        (0, mongooseRestFramework_1.setupAuth)(app, UserModel);
                        app.use("/food", (0, mongooseRestFramework_1.gooseRestRouter)(FoodModel, {
                            permissions: {
                                list: [mongooseRestFramework_1.Permissions.IsAny],
                                create: [mongooseRestFramework_1.Permissions.IsAuthenticated],
                                read: [mongooseRestFramework_1.Permissions.IsAny],
                                update: [mongooseRestFramework_1.Permissions.IsAuthenticated],
                                delete: [mongooseRestFramework_1.Permissions.IsAuthenticated],
                            },
                            queryFilter: function (user) {
                                if (!(user === null || user === void 0 ? void 0 : user.admin)) {
                                    return { hidden: { $ne: true } };
                                }
                                return {};
                            },
                            transformer: (0, mongooseRestFramework_1.AdminOwnerTransformer)({
                                adminReadFields: ["name", "calories", "created", "ownerId"],
                                adminWriteFields: ["name", "calories", "created", "ownerId"],
                                ownerReadFields: ["name", "calories", "created", "ownerId"],
                                ownerWriteFields: ["name", "calories", "created"],
                                authReadFields: ["name", "calories", "created"],
                                authWriteFields: ["name", "calories"],
                                anonReadFields: ["name"],
                                anonWriteFields: [],
                            }),
                        }));
                        server = (0, supertest_1.default)(app);
                        return [2 /*return*/];
                }
            });
        });
    });
    it("completes token signup e2e", function () {
        return __awaiter(this, void 0, void 0, function () {
            var res, _a, userId, token, food, meRes, mePatchRes, getRes, updateRes;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, server
                            .post("/auth/signup")
                            .send({ email: "new@example.com", password: "123" })
                            .expect(200)];
                    case 1:
                        res = _b.sent();
                        _a = res.body.data, userId = _a.userId, token = _a.token;
                        assert.isDefined(userId);
                        assert.isDefined(token);
                        return [4 /*yield*/, server
                                .post("/auth/login")
                                .send({ email: "new@example.com", password: "123" })
                                .expect(200)];
                    case 2:
                        res = _b.sent();
                        userId = res.body.data.userId;
                        token = res.body.data.token;
                        assert.isDefined(userId);
                        assert.isDefined(token);
                        return [4 /*yield*/, FoodModel.create({
                                name: "Peas",
                                calories: 1,
                                created: new Date(),
                                ownerId: userId,
                            })];
                    case 3:
                        food = _b.sent();
                        return [4 /*yield*/, server.get("/auth/me").set("authorization", "Bearer " + token).expect(200)];
                    case 4:
                        meRes = _b.sent();
                        assert.isDefined(meRes.body.data._id);
                        assert.isDefined(meRes.body.data.id);
                        assert.isUndefined(meRes.body.data.hash);
                        assert.equal(meRes.body.data.email, "new@example.com");
                        assert.isDefined(meRes.body.data.token);
                        assert.isDefined(meRes.body.data.updated);
                        assert.isDefined(meRes.body.data.created);
                        assert.isFalse(meRes.body.data.admin);
                        return [4 /*yield*/, server
                                .patch("/auth/me")
                                .send({ email: "new2@example.com" })
                                .set("authorization", "Bearer " + token)
                                .expect(200)];
                    case 5:
                        mePatchRes = _b.sent();
                        assert.isDefined(mePatchRes.body.data._id);
                        assert.isDefined(mePatchRes.body.data.id);
                        assert.isUndefined(mePatchRes.body.data.hash);
                        assert.equal(mePatchRes.body.data.email, "new2@example.com");
                        assert.isDefined(mePatchRes.body.data.token);
                        assert.isDefined(mePatchRes.body.data.updated);
                        assert.isDefined(mePatchRes.body.data.created);
                        assert.isFalse(mePatchRes.body.data.admin);
                        return [4 /*yield*/, server.get("/food").set("authorization", "Bearer " + token).expect(200)];
                    case 6:
                        getRes = _b.sent();
                        assert.lengthOf(getRes.body.data, 3);
                        assert.isDefined(getRes.body.data.find(function (f) { return f.name === "Peas"; }));
                        return [4 /*yield*/, server
                                .patch("/food/" + food._id)
                                .set("authorization", "Bearer " + token)
                                .send({ name: "PeasAndCarrots" })
                                .expect(200)];
                    case 7:
                        updateRes = _b.sent();
                        assert.equal(updateRes.body.data.name, "PeasAndCarrots");
                        return [2 /*return*/];
                }
            });
        });
    });
    it("signup with extra data", function () {
        return __awaiter(this, void 0, void 0, function () {
            var res, _a, userId, token, user;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, server
                            .post("/auth/signup")
                            .send({ email: "new@example.com", password: "123", age: 25 })
                            .expect(200)];
                    case 1:
                        res = _b.sent();
                        _a = res.body.data, userId = _a.userId, token = _a.token;
                        assert.isDefined(userId);
                        assert.isDefined(token);
                        return [4 /*yield*/, UserModel.findOne({ email: "new@example.com" })];
                    case 2:
                        user = _b.sent();
                        assert.equal(user === null || user === void 0 ? void 0 : user.age, 25);
                        return [2 /*return*/];
                }
            });
        });
    });
    it("completes token login e2e", function () {
        return __awaiter(this, void 0, void 0, function () {
            var res, _a, userId, token, meRes, mePatchRes, getRes, food, updateRes;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, server
                            .post("/auth/login")
                            .send({ email: "admin@example.com", password: "securePassword" })
                            .expect(200)];
                    case 1:
                        res = _b.sent();
                        _a = res.body.data, userId = _a.userId, token = _a.token;
                        assert.isDefined(userId);
                        assert.isDefined(token);
                        return [4 /*yield*/, server.get("/auth/me").set("authorization", "Bearer " + token).expect(200)];
                    case 2:
                        meRes = _b.sent();
                        assert.isDefined(meRes.body.data._id);
                        assert.isDefined(meRes.body.data.id);
                        assert.isUndefined(meRes.body.data.hash);
                        assert.equal(meRes.body.data.email, "admin@example.com");
                        assert.isDefined(meRes.body.data.token);
                        assert.isDefined(meRes.body.data.updated);
                        assert.isDefined(meRes.body.data.created);
                        assert.isTrue(meRes.body.data.admin);
                        return [4 /*yield*/, server
                                .patch("/auth/me")
                                .send({ email: "admin2@example.com" })
                                .set("authorization", "Bearer " + token)
                                .expect(200)];
                    case 3:
                        mePatchRes = _b.sent();
                        assert.isDefined(mePatchRes.body.data._id);
                        assert.isDefined(mePatchRes.body.data.id);
                        assert.isUndefined(mePatchRes.body.data.hash);
                        assert.equal(mePatchRes.body.data.email, "admin2@example.com");
                        assert.isDefined(mePatchRes.body.data.token);
                        assert.isDefined(mePatchRes.body.data.updated);
                        assert.isDefined(mePatchRes.body.data.created);
                        assert.isTrue(mePatchRes.body.data.admin);
                        return [4 /*yield*/, server.get("/food").set("Authorization", "Bearer " + token).expect(200)];
                    case 4:
                        getRes = _b.sent();
                        assert.lengthOf(getRes.body.data, 3);
                        food = getRes.body.data.find(function (f) { return f.name === "Apple"; });
                        assert.isDefined(food);
                        return [4 /*yield*/, server
                                .patch("/food/" + food.id)
                                .set("authorization", "Bearer " + token)
                                .send({ name: "Apple Pie" })
                                .expect(200)];
                    case 5:
                        updateRes = _b.sent();
                        assert.equal(updateRes.body.data.name, "Apple Pie");
                        return [2 /*return*/];
                }
            });
        });
    });
});
