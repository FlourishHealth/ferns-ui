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
exports.setupLogging = exports.logger = void 0;
var fs_1 = __importDefault(require("fs"));
var winston_1 = __importDefault(require("winston"));
// Setup a default console logger.
exports.logger = winston_1.default.createLogger({
    level: "debug",
    transports: [
        new winston_1.default.transports.Console({
            debugStdout: true,
            level: "debug",
            format: winston_1.default.format.combine(winston_1.default.format.colorize(), winston_1.default.format.simple()),
        }),
    ],
});
function setupLogging(options) {
    var _a, e_1, _b;
    var _c, _d;
    exports.logger.clear();
    if (!(options === null || options === void 0 ? void 0 : options.disableConsoleLogging)) {
        var formats = [winston_1.default.format.simple()];
        if (!(options === null || options === void 0 ? void 0 : options.disableConsoleColors)) {
            formats.push(winston_1.default.format.colorize());
        }
        exports.logger.add(new winston_1.default.transports.Console({
            debugStdout: !(options === null || options === void 0 ? void 0 : options.level) || (options === null || options === void 0 ? void 0 : options.level) === "debug",
            level: (_c = options === null || options === void 0 ? void 0 : options.level) !== null && _c !== void 0 ? _c : "debug",
            format: (_a = winston_1.default.format).combine.apply(_a, __spreadArray([], __read(formats), false)),
        }));
    }
    if (!(options === null || options === void 0 ? void 0 : options.disableFileLogging)) {
        var logDirectory = (_d = options === null || options === void 0 ? void 0 : options.logDirectory) !== null && _d !== void 0 ? _d : "./log";
        if (!fs_1.default.existsSync(logDirectory)) {
            fs_1.default.mkdirSync(logDirectory);
        }
        var FILE_LOG_DEFAULTS = {
            colorize: false,
            compress: true,
            dirname: logDirectory,
            format: winston_1.default.format.simple(),
            // 30 days of retention
            maxFiles: 30,
            // 50MB max file size
            maxSize: 1024 * 1024 * 50,
            // Only readable by server user
            options: { mode: 384 },
        };
        exports.logger.add(new winston_1.default.transports.Stream(__assign(__assign({}, FILE_LOG_DEFAULTS), { level: "error", handleExceptions: true, 
            // Use stream so we can open log in append mode rather than overwriting.
            stream: fs_1.default.createWriteStream("error.log", { flags: "a" }) })));
        exports.logger.add(new winston_1.default.transports.Stream(__assign(__assign({}, FILE_LOG_DEFAULTS), { level: "info", 
            // Use stream so we can open log in append mode rather than overwriting.
            stream: fs_1.default.createWriteStream("out.log", { flags: "a" }) })));
        if (!(options === null || options === void 0 ? void 0 : options.level) || (options === null || options === void 0 ? void 0 : options.level) === "debug") {
            exports.logger.add(new winston_1.default.transports.Stream(__assign(__assign({}, FILE_LOG_DEFAULTS), { level: "debug", 
                // Use stream so we can open log in append mode rather than overwriting.
                stream: fs_1.default.createWriteStream("debug.log", { flags: "a" }) })));
        }
    }
    if (options === null || options === void 0 ? void 0 : options.transports) {
        try {
            for (var _e = __values(options.transports), _f = _e.next(); !_f.done; _f = _e.next()) {
                var transport = _f.value;
                exports.logger.add(transport);
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_f && !_f.done && (_b = _e.return)) _b.call(_e);
            }
            finally { if (e_1) throw e_1.error; }
        }
    }
    exports.logger.debug("Logger set up complete");
}
exports.setupLogging = setupLogging;
