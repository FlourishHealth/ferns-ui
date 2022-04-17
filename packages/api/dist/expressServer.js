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
exports.wrapScript = exports.sendToSlack = exports.cronjob = exports.setupServer = exports.createRouterWithAuth = exports.createRouter = exports.setupErrorLogging = void 0;
var Sentry = __importStar(require("@sentry/node"));
var axios_1 = __importDefault(require("axios"));
var cron_1 = __importDefault(require("cron"));
var express_1 = __importDefault(require("express"));
var cloneDeep_1 = __importDefault(require("lodash/cloneDeep"));
var on_finished_1 = __importDefault(require("on-finished"));
var passport_1 = __importDefault(require("passport"));
var logger_1 = require("./logger");
var mongooseRestFramework_1 = require("./mongooseRestFramework");
var SLOW_READ_MAX = 200;
var SLOW_WRITE_MAX = 500;
function setupErrorLogging() {
    var dsn = process.env.SENTRY_DSN;
    if (process.env.NODE_ENV === "production") {
        if (!dsn) {
            throw new Error("You must set SENTRY_DSN in the environment.");
        }
        Sentry.init({ dsn: dsn });
    }
}
exports.setupErrorLogging = setupErrorLogging;
var logRequestsFinished = function (req, res, startTime) {
    var diff = process.hrtime(startTime);
    var diffInMs = Math.round(diff[0] * 1000 + diff[1] * 0.000001);
    var pathName = "unknown";
    if (req.route && req.routeMount) {
        pathName = "" + req.routeMount + req.route.path;
    }
    else if (req.route) {
        pathName = req.route.path;
    }
    else if (res.statusCode < 400) {
        logger_1.logger.warn("Request without route: " + req.originalUrl);
    }
    logger_1.logger.debug(req.method + " -> " + req.originalUrl + " " + res.statusCode + " " + (diffInMs + "ms"));
    if (diffInMs > SLOW_READ_MAX && req.method === "GET") {
        logger_1.logger.warn("Slow GET request", {
            requestTime: diffInMs,
            pathName: pathName,
            url: req.originalUrl,
        });
    }
    else if (diffInMs > SLOW_WRITE_MAX) {
        logger_1.logger.warn("Slow write request", {
            requestTime: diffInMs,
            pathName: pathName,
            url: req.originalUrl,
        });
    }
};
function logRequests(req, res, next) {
    var _a, _b;
    var startTime = process.hrtime();
    var userString = "";
    if (req.user) {
        userString = " <" + (((_a = req.user) === null || _a === void 0 ? void 0 : _a.admin) ? "Admin" : ((_b = req.user) === null || _b === void 0 ? void 0 : _b.testUser) ? "Test User" : "User") + ":" + req.user.id + ">";
    }
    var body = "";
    if (req.body && Object.keys(req.body).length > 0) {
        var bodyCopy = (0, cloneDeep_1.default)(req.body);
        if (bodyCopy.password) {
            bodyCopy.password = "<PASSWORD>";
        }
        body = " Body: " + JSON.stringify(bodyCopy);
    }
    logger_1.logger.debug(req.method + " <- " + req.url + userString + body);
    (0, on_finished_1.default)(res, function () { return logRequestsFinished(req, res, startTime); });
    next();
}
function createRouter(rootPath, addRoutes, middleware) {
    if (middleware === void 0) { middleware = []; }
    function routePathMiddleware(req, res, next) {
        if (!req.routeMount) {
            req.routeMount = [];
        }
        req.routeMount.push(rootPath);
        next();
    }
    var router = express_1.default.Router();
    router.use(routePathMiddleware);
    addRoutes(router);
    return __spreadArray(__spreadArray([rootPath], __read(middleware), false), [router], false);
}
exports.createRouter = createRouter;
function createRouterWithAuth(rootPath, addRoutes, middleware) {
    if (middleware === void 0) { middleware = []; }
    return createRouter(rootPath, addRoutes, __spreadArray([
        passport_1.default.authenticate("firebase-jwt", { session: false })
    ], __read(middleware), false));
}
exports.createRouterWithAuth = createRouterWithAuth;
function initializeRoutes(UserModel, addRoutes) {
    if (!process.env.SESSION_SECRET && process.env.NODE_ENV === "production") {
        throw new Error("You must provide a SESSION_SECRET in env.");
    }
    var app = (0, express_1.default)();
    app.use(Sentry.Handlers.requestHandler());
    app.all("/*", function (req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "*");
        if (req.method === "OPTIONS") {
            res.send(200);
        }
        else {
            next();
        }
    });
    app.use(express_1.default.json());
    app.use(logRequests);
    (0, mongooseRestFramework_1.setupAuth)(app, UserModel);
    // Adds all the user
    addRoutes(app);
    // The error handler must be before any other error middleware and after all controllers
    app.use(Sentry.Handlers.errorHandler());
    app.use(function onError(_err, _req, res, _next) {
        logger_1.logger.error("Fallthrough error", _err);
        res.statusCode = 500;
        res.end(res.sentry + "\n");
    });
    logger_1.logger.debug("Listening on routes:");
    app._router.stack.forEach(function (r) {
        if (r.route && r.route.path) {
            logger_1.logger.debug("[Route] " + r.route.path);
        }
    });
    return app;
}
// Sets up the routes and returns a function to launch the API.
function setupServer(options) {
    var UserModel = options.userModel;
    var addRoutes = options.addRoutes;
    (0, logger_1.setupLogging)(options.loggingOptions);
    var app;
    try {
        app = initializeRoutes(UserModel, addRoutes);
    }
    catch (e) {
        logger_1.logger.error("Error initializing routes", e);
        throw e;
    }
    if (!options.skipListen) {
        var port_1 = process.env.PORT || "9000";
        try {
            app.listen(port_1, function () {
                logger_1.logger.info("Listening at on port " + port_1);
            });
        }
        catch (err) {
            logger_1.logger.error("Error trying to start HTTP server: " + err + "\n" + err.stack);
            process.exit(1);
        }
    }
    return app;
}
exports.setupServer = setupServer;
// Convenience method to execute cronjobs with an always-running server.
function cronjob(name, schedule, callback) {
    if (schedule === "hourly") {
        schedule = "0 * * * *";
    }
    else if (schedule === "minutely") {
        schedule = "* * * * *";
    }
    logger_1.logger.info("Adding cronjob " + name + ", running at: " + schedule);
    try {
        new cron_1.default.CronJob({
            cronTime: schedule,
            onTick: callback,
            start: true,
            timeZone: "America/Chicago",
        });
    }
    catch (e) {
        throw new Error("Failed to create cronjob: " + e);
    }
}
exports.cronjob = cronjob;
// Convenience method to send data to a Slack webhook.
function sendToSlack(text, channel) {
    if (channel === void 0) { channel = "bots"; }
    return __awaiter(this, void 0, void 0, function () {
        var slackWebhookUrl, e_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    slackWebhookUrl = process.env.SLACK_WEBHOOK;
                    if (!slackWebhookUrl) {
                        throw new Error("You must set SLACK_WEBHOOK in the environment.");
                    }
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, axios_1.default.post(slackWebhookUrl, {
                            text: text,
                            channel: channel,
                        })];
                case 2:
                    _a.sent();
                    return [3 /*break*/, 4];
                case 3:
                    e_1 = _a.sent();
                    logger_1.logger.error("Error posting to slack", e_1.text);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.sendToSlack = sendToSlack;
// Wrap up a script with some helpers, such as catching errors, reporting them to sentry, notifying
// Slack of runs, etc. Also supports timeouts.
function wrapScript(func, options) {
    var _a, _b, _c;
    if (options === void 0) { options = {}; }
    return __awaiter(this, void 0, void 0, function () {
        var name, warnTime_1, closeTime, result, e_2;
        var _this = this;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    name = (_a = require.main) === null || _a === void 0 ? void 0 : _a.filename.split("/").slice(-1)[0].replace(".ts", "");
                    logger_1.logger.info("Running script " + name);
                    sendToSlack("Running script " + name, options.slackChannel);
                    if (options.terminateTimeout !== 0) {
                        warnTime_1 = (((_b = options.terminateTimeout) !== null && _b !== void 0 ? _b : 300) / 2) * 1000;
                        closeTime = ((_c = options.terminateTimeout) !== null && _c !== void 0 ? _c : 300) * 1000;
                        setTimeout(function () {
                            var msg = "Script " + name + " is taking a while, currently " + warnTime_1 / 1000 + " seconds";
                            sendToSlack(msg);
                            logger_1.logger.warn(msg);
                        }, warnTime_1);
                        setTimeout(function () { return __awaiter(_this, void 0, void 0, function () {
                            var msg;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        msg = "Script " + name + " took too long, exiting";
                                        return [4 /*yield*/, sendToSlack(msg)];
                                    case 1:
                                        _a.sent();
                                        logger_1.logger.error(msg);
                                        Sentry.captureException(new Error("Script " + name + " took too long, exiting"));
                                        return [4 /*yield*/, Sentry.flush()];
                                    case 2:
                                        _a.sent();
                                        process.exit(2);
                                        return [2 /*return*/];
                                }
                            });
                        }); }, closeTime);
                    }
                    _d.label = 1;
                case 1:
                    _d.trys.push([1, 5, , 7]);
                    return [4 /*yield*/, func()];
                case 2:
                    result = _d.sent();
                    if (!options.onFinish) return [3 /*break*/, 4];
                    return [4 /*yield*/, options.onFinish(result)];
                case 3:
                    _d.sent();
                    _d.label = 4;
                case 4: return [3 /*break*/, 7];
                case 5:
                    e_2 = _d.sent();
                    Sentry.captureException(e_2);
                    logger_1.logger.error("Error running script " + name + ": " + e_2 + "\n" + e_2.stack);
                    sendToSlack("Error running script " + name + ": " + e_2 + "\n" + e_2.stack);
                    return [4 /*yield*/, Sentry.flush()];
                case 6:
                    _d.sent();
                    process.exit(1);
                    return [3 /*break*/, 7];
                case 7: return [4 /*yield*/, sendToSlack("Success running script " + name + ": " + result)];
                case 8:
                    _d.sent();
                    // Unclear why we have to exit here to prevent the script for continuing to run.
                    process.exit(0);
                    return [2 /*return*/];
            }
        });
    });
}
exports.wrapScript = wrapScript;
