"use strict";
// Forked from https://github.com/saintedlama/passport-local-mongoose
//
// The MIT License (MIT)
//
// Copyright (c) 2013 Christoph Walcher
//
// Permission is hereby granted, free of charge, to any person obtaining a copy of this software and
// associated documentation files (the "Software"), to deal in the Software without restriction,
// including without limitation the rights to use, copy, modify, merge, publish, distribute,
// sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in all copies or
// substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING
// BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
// NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.passportLocalMongoose = void 0;
var crypto_1 = __importDefault(require("crypto"));
// @ts-ignore
var generaterr_1 = __importDefault(require("generaterr"));
var passport_local_1 = require("passport-local");
// @ts-ignore
var scmp_1 = __importDefault(require("scmp"));
function pbkdf2(password, salt, options, callback) {
    crypto_1.default.pbkdf2(password, salt, options.iterations, options.keylen, options.digestAlgorithm, callback);
}
var AuthenticationError = (0, generaterr_1.default)("AuthenticationError");
var errors = {
    AuthenticationError: AuthenticationError,
    IncorrectUsernameError: (0, generaterr_1.default)("IncorrectUsernameError", null, {
        inherits: AuthenticationError,
    }),
    IncorrectPasswordError: (0, generaterr_1.default)("IncorrectPasswordError", null, {
        inherits: AuthenticationError,
    }),
    MissingUsernameError: (0, generaterr_1.default)("MissingUsernameError", null, { inherits: AuthenticationError }),
    MissingPasswordError: (0, generaterr_1.default)("MissingPasswordError", null, { inherits: AuthenticationError }),
    UserExistsError: (0, generaterr_1.default)("UserExistsError", null, { inherits: AuthenticationError }),
    NoSaltValueStoredError: (0, generaterr_1.default)("NoSaltValueStoredError", null, {
        inherits: AuthenticationError,
    }),
    AttemptTooSoonError: (0, generaterr_1.default)("AttemptTooSoonError", null, { inherits: AuthenticationError }),
    TooManyAttemptsError: (0, generaterr_1.default)("TooManyAttemptsError", null, { inherits: AuthenticationError }),
};
// authenticate function needs refactoring - to avoid bugs we wrapped a bit dirty
function authenticate(user, password, options, cb) {
    if (cb) {
        return doAuthenticate(user, password, options, cb);
    }
    return new Promise(function (resolve, reject) {
        doAuthenticate(user, password, options, function (err, u, error) {
            return err ? reject(err) : resolve({ user: u, error: error });
        });
    });
}
function doAuthenticate(user, password, options, cb) {
    if (options.limitAttempts) {
        var attemptsInterval = Math.pow(options.interval, Math.log(user.get(options.attemptsField) + 1));
        var calculatedInterval = attemptsInterval < options.maxInterval ? attemptsInterval : options.maxInterval;
        if (Date.now() - user.get(options.lastLoginField) < calculatedInterval) {
            user.set(options.lastLoginField, Date.now());
            user.save(function (saveErr) {
                if (saveErr) {
                    return cb(saveErr);
                }
                return cb(null, false, new errors.AttemptTooSoonError(options.errorMessages.AttemptTooSoonError));
            });
            return;
        }
        if (user.get(options.attemptsField) >= options.maxAttempts) {
            return cb(null, false, new errors.TooManyAttemptsError(options.errorMessages.TooManyAttemptsError));
        }
    }
    if (!user.get(options.saltField)) {
        return cb(null, false, new errors.NoSaltValueStoredError(options.errorMessages.NoSaltValueStoredError));
    }
    pbkdf2(password, user.get(options.saltField), options, function (err, hashBuffer) {
        if (err) {
            return cb(err);
        }
        if ((0, scmp_1.default)(hashBuffer, Buffer.from(user.get(options.hashField), options.encoding))) {
            if (options.limitAttempts) {
                user.set(options.lastLoginField, Date.now());
                user.set(options.attemptsField, 0);
                user.save(function (saveErr, savedUser) {
                    if (saveErr) {
                        return cb(saveErr);
                    }
                    return cb(null, savedUser);
                });
            }
            else {
                return cb(null, user);
            }
        }
        else {
            if (options.limitAttempts) {
                user.set(options.lastLoginField, Date.now());
                user.set(options.attemptsField, user.get(options.attemptsField) + 1);
                user.save(function (saveErr) {
                    if (saveErr) {
                        return cb(saveErr);
                    }
                    if (user.get(options.attemptsField) >= options.maxAttempts) {
                        return cb(null, false, new errors.TooManyAttemptsError(options.errorMessages.TooManyAttemptsError));
                    }
                    else {
                        return cb(null, false, new errors.IncorrectPasswordError(options.errorMessages.IncorrectPasswordError));
                    }
                });
            }
            else {
                return cb(null, false, new errors.IncorrectPasswordError(options.errorMessages.IncorrectPasswordError));
            }
        }
    });
}
var passportLocalMongoose = function (schema, opts) {
    if (opts === void 0) { opts = {}; }
    var options = __assign({}, opts);
    options.saltlen = options.saltlen || 32;
    options.iterations = options.iterations || 25000;
    options.keylen = options.keylen || 512;
    options.encoding = options.encoding || "hex";
    options.digestAlgorithm = options.digestAlgorithm || "sha256"; // To get a list of supported hashes use crypto.getHashes()
    function defaultPasswordValidator(password, cb) {
        cb(null);
    }
    function defaultPasswordValidatorAsync(password) {
        return new Promise(function (resolve, reject) {
            options.passwordValidator(password, function (err) { return (err ? reject(err) : resolve()); });
        });
    }
    options.passwordValidator = options.passwordValidator || defaultPasswordValidator;
    options.passwordValidatorAsync = options.passwordValidatorAsync || defaultPasswordValidatorAsync;
    // Populate field names with defaults if not set
    options.usernameField = options.usernameField || "username";
    options.usernameUnique = options.usernameUnique === undefined ? true : options.usernameUnique;
    // Populate username query fields with defaults if not set,
    // otherwise add username field to query fields.
    if (options.usernameQueryFields) {
        options.usernameQueryFields.push(options.usernameField);
    }
    else {
        options.usernameQueryFields = [options.usernameField];
    }
    // option to find username case insensitively
    options.usernameCaseInsensitive = Boolean(options.usernameCaseInsensitive || false);
    // option to convert username to lowercase when finding
    options.usernameLowerCase = options.usernameLowerCase || false;
    options.hashField = options.hashField || "hash";
    options.saltField = options.saltField || "salt";
    if (options.limitAttempts) {
        options.lastLoginField = options.lastLoginField || "last";
        options.attemptsField = options.attemptsField || "attempts";
        options.interval = options.interval || 100; // 100 ms
        options.maxInterval = options.maxInterval || 300000; // 5 min
        options.maxAttempts = options.maxAttempts || Infinity;
    }
    options.findByUsername =
        options.findByUsername ||
            function (model, queryParameters) {
                return model.findOne(queryParameters);
            };
    options.errorMessages = options.errorMessages || {};
    options.errorMessages.MissingPasswordError =
        options.errorMessages.MissingPasswordError || "No password was given";
    options.errorMessages.AttemptTooSoonError =
        options.errorMessages.AttemptTooSoonError || "Account is currently locked. Try again later";
    options.errorMessages.TooManyAttemptsError =
        options.errorMessages.TooManyAttemptsError ||
            "Account locked due to too many failed login attempts";
    options.errorMessages.NoSaltValueStoredError =
        options.errorMessages.NoSaltValueStoredError ||
            "Authentication not possible. No salt value stored";
    options.errorMessages.IncorrectPasswordError =
        options.errorMessages.IncorrectPasswordError || "Password or username is incorrect";
    options.errorMessages.IncorrectUsernameError =
        options.errorMessages.IncorrectUsernameError || "Password or username is incorrect";
    options.errorMessages.MissingUsernameError =
        options.errorMessages.MissingUsernameError || "No username was given";
    options.errorMessages.UserExistsError =
        options.errorMessages.UserExistsError || "A user with the given username is already registered";
    var schemaFields = {};
    if (!schema.path(options.usernameField)) {
        schemaFields[options.usernameField] = { type: String, unique: options.usernameUnique };
    }
    schemaFields[options.hashField] = { type: String, select: false };
    schemaFields[options.saltField] = { type: String, select: false };
    if (options.limitAttempts) {
        schemaFields[options.attemptsField] = { type: Number, default: 0 };
        schemaFields[options.lastLoginField] = { type: Date, default: Date.now };
    }
    schema.add(schemaFields);
    schema.pre("save", function (next) {
        if (options.usernameLowerCase && this[options.usernameField]) {
            this[options.usernameField] = this[options.usernameField].toLowerCase();
        }
        next();
    });
    schema.methods.setPassword = function (password, cb) {
        var _this = this;
        var promise = Promise.resolve()
            .then(function () {
            if (!password) {
                throw new errors.MissingPasswordError(options.errorMessages.MissingPasswordError);
            }
        })
            .then(function () { return options.passwordValidatorAsync(password); })
            .then(function () { return randomBytes(options.saltlen); })
            .then(function (saltBuffer) { return saltBuffer.toString(options.encoding); })
            .then(function (salt) {
            _this.set(options.saltField, salt);
            return salt;
        })
            .then(function (salt) { return pbkdf2Promisified(password, salt, options); })
            .then(function (hashRaw) {
            _this.set(options.hashField, Buffer.from(hashRaw, "binary").toString(options.encoding));
        })
            .then(function () { return _this; });
        if (!cb) {
            return promise;
        }
        return promise.then(function (result) { return cb(null, result); }).catch(function (err) { return cb(err); });
    };
    schema.methods.changePassword = function (oldPassword, newPassword, cb) {
        var _this = this;
        var promise = Promise.resolve()
            .then(function () {
            if (!oldPassword || !newPassword) {
                throw new errors.MissingPasswordError(options.errorMessages.MissingPasswordError);
            }
        })
            .then(function () { return _this.authenticate(oldPassword); })
            .then(function (_a) {
            var user = _a.user;
            if (!user) {
                throw new errors.IncorrectPasswordError(options.errorMessages.IncorrectPasswordError);
            }
        })
            .then(function () { return _this.setPassword(newPassword); })
            .then(function () { return _this.save(); })
            .then(function () { return _this; });
        if (!cb) {
            return promise;
        }
        return promise.then(function (result) { return cb(null, result); }).catch(function (err) { return cb(err); });
    };
    // @ts-ignore
    schema.methods.authenticate = function (password, cb) {
        var _this = this;
        var promise = Promise.resolve().then(function () {
            if (_this.get(options.saltField)) {
                return authenticate(_this, password, options);
            }
            return _this.constructor
                .findByUsername(_this.get(options.usernameField), true)
                .then(function (user) {
                if (user) {
                    return authenticate(user, password, options);
                }
                return {
                    user: false,
                    error: new errors.IncorrectUsernameError(options.errorMessages.IncorrectUsernameError),
                };
            });
        });
        if (!cb) {
            return promise;
        }
        return promise.then(function (_a) {
            var user = _a.user, error = _a.error;
            return cb(null, user, error);
        }).catch(function (err) { return cb(err); });
    };
    if (options.limitAttempts) {
        // @ts-ignore
        schema.methods.resetAttempts = function (cb) {
            var _this = this;
            var promise = Promise.resolve().then(function () {
                _this.set(options.attemptsField, 0);
                return _this.save();
            });
            if (!cb) {
                return promise;
            }
            return promise.then(function (result) { return cb(null, result); }).catch(function (err) { return cb(err); });
        };
    }
    // Passport Local Interface
    schema.statics.authenticate = function () {
        var _this = this;
        return function (username, password, cb) {
            var promise = Promise.resolve()
                .then(function () { return _this.findByUsername(username, true); })
                .then(function (user) {
                if (user) {
                    return user.authenticate(password);
                }
                return {
                    user: false,
                    error: new errors.IncorrectUsernameError(options.errorMessages.IncorrectUsernameError),
                };
            });
            if (!cb) {
                return promise;
            }
            return promise.then(function (_a) {
                var user = _a.user, error = _a.error;
                return cb(null, user, error);
            }).catch(function (err) { return cb(err); });
        };
    };
    // Passport Interface
    schema.statics.serializeUser = function () {
        return function (user, cb) {
            cb(null, user.get(options.usernameField));
        };
    };
    schema.statics.deserializeUser = function () {
        var _this = this;
        return function (username, cb) {
            _this.findByUsername(username, cb);
        };
    };
    schema.statics.register = function (user, password, cb) {
        var _this = this;
        // Create an instance of this in case user isn't already an instance
        if (!(user instanceof this)) {
            user = new this(user);
        }
        var promise = Promise.resolve()
            .then(function () {
            if (!user.get(options.usernameField)) {
                throw new errors.MissingUsernameError(options.errorMessages.MissingUsernameError);
            }
        })
            .then(function () { return _this.findByUsername(user.get(options.usernameField)); })
            .then(function (existingUser) {
            if (existingUser) {
                throw new errors.UserExistsError(options.errorMessages.UserExistsError);
            }
        })
            .then(function () { return user.setPassword(password); })
            .then(function () { return user.save(); });
        if (!cb) {
            return promise;
        }
        return promise.then(function (result) { return cb(null, result); }).catch(function (err) { return cb(err); });
    };
    schema.statics.findByUsername = function (username, findOpts, cb) {
        if (typeof opts === "function") {
            cb = opts;
            findOpts = {};
        }
        if (typeof findOpts === "boolean") {
            findOpts = {
                selectHashSaltFields: findOpts,
            };
        }
        findOpts = findOpts || {};
        findOpts.selectHashSaltFields = !!findOpts.selectHashSaltFields;
        // if specified, convert the username to lowercase
        if (username !== undefined && options.usernameLowerCase) {
            username = username.toLowerCase();
        }
        // Add each username query field
        var queryOrParameters = [];
        for (var i = 0; i < options.usernameQueryFields.length; i++) {
            var parameter = {};
            parameter[options.usernameQueryFields[i]] = options.usernameCaseInsensitive
                ? new RegExp("^" + username + "$", "i")
                : username;
            queryOrParameters.push(parameter);
        }
        var query = options.findByUsername(this, { $or: queryOrParameters });
        if (findOpts.selectHashSaltFields) {
            query.select("+" + options.hashField + " +" + options.saltField);
        }
        if (options.selectFields) {
            query.select(options.selectFields);
        }
        if (options.populateFields) {
            query.populate(options.populateFields);
        }
        if (cb) {
            query.exec(cb);
            return;
        }
        return query;
    };
    schema.statics.createStrategy = function () {
        return new passport_local_1.Strategy(options, this.authenticate());
    };
};
exports.passportLocalMongoose = passportLocalMongoose;
function pbkdf2Promisified(password, salt, options) {
    return new Promise(function (resolve, reject) {
        return pbkdf2(password, salt, options, function (err, hashRaw) {
            return err ? reject(err) : resolve(hashRaw);
        });
    });
}
function randomBytes(saltlen) {
    return new Promise(function (resolve, reject) {
        return crypto_1.default.randomBytes(saltlen, function (err, saltBuffer) { return (err ? reject(err) : resolve(saltBuffer)); });
    });
}
