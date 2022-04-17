"use strict";
// Forked from https://github.com/jaredhanson/passport-local
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// The MIT License (MIT)
// Copyright (c) 2011-2014 Jared Hanson
// Permission is hereby granted, free of charge, to any person obtaining a copy of
// this software and associated documentation files (the "Software"), to deal in
// the Software without restriction, including without limitation the rights to
// use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
// the Software, and to permit persons to whom the Software is furnished to do so,
// subject to the following conditions:
// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
// FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
// COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
// IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
// CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
/**
 * Module dependencies.
 */
var passport_strategy_1 = __importDefault(require("passport-strategy"));
/**
 * `Strategy` constructor.
 *
 * The local authentication strategy authenticates requests based on the
 * credentials submitted through an HTML-based login form.
 *
 * Applications must supply a `verify` callback which accepts `username` and
 * `password` credentials, and then calls the `done` callback supplying a
 * `user`, which should be set to `false` if the credentials are not valid.
 * If an exception occurred, `err` should be set.
 *
 * Optionally, `options` can be used to change the fields in which the
 * credentials are found.
 *
 * Options:
 *   - `usernameField`  field name where the username is found, defaults to _username_
 *   - `passwordField`  field name where the password is found, defaults to _password_
 *   - `passReqToCallback`  when `true`, `req` is the first argument to the verify callback (default: `false`)
 *
 * Examples:
 *
 *     passport.use(new LocalStrategy(
 *       function(username, password, done) {
 *         User.findOne({ username: username, password: password }, function (err, user) {
 *           done(err, user);
 *         });
 *       }
 *     ));
 *
 * @param {Object} options
 * @param {Function} verify
 * @api public
 */
function Strategy(options, verify) {
    if (!verify) {
        throw new TypeError("LocalStrategy requires a verify callback");
    }
    this._usernameField = options.usernameField || "username";
    this._passwordField = options.passwordField || "password";
    passport_strategy_1.default.Strategy.call(this);
    this.name = "local";
    this._verify = verify;
    this._passReqToCallback = options.passReqToCallback;
}
/**
 * Inherit from `passport.Strategy`.
 */
util.inherits(Strategy, passport_strategy_1.default.Strategy);
/**
 * Authenticate request based on the contents of a form submission.
 *
 * @param {Object} req
 * @api protected
 */
Strategy.prototype.authenticate = function (req, options) {
    options = options || {};
    var username = lookup(req.body, this._usernameField) || lookup(req.query, this._usernameField);
    var password = lookup(req.body, this._passwordField) || lookup(req.query, this._passwordField);
    if (!username || !password) {
        return this.fail({ message: options.badRequestMessage || "Missing credentials" }, 400);
    }
    var self = this;
    function verified(err, user, info) {
        if (err) {
            return self.error(err);
        }
        if (!user) {
            return self.fail(info);
        }
        self.success(user, info);
    }
    try {
        if (self._passReqToCallback) {
            this._verify(req, username, password, verified);
        }
        else {
            this._verify(username, password, verified);
        }
    }
    catch (ex) {
        return self.error(ex);
    }
};
function lookup(obj, field) {
    if (!obj) {
        return null;
    }
    var chain = field
        .split("]")
        .join("")
        .split("[");
    for (var i = 0, len = chain.length; i < len; i++) {
        var prop = obj[chain[i]];
        if (typeof prop === "undefined") {
            return null;
        }
        if (typeof prop !== "object") {
            return prop;
        }
        obj = prop;
    }
    return null;
}
