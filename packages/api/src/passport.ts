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

import crypto from "crypto";
// @ts-ignore
import generaterr from "generaterr";
import {Schema} from "mongoose";
import {Strategy as LocalStrategy} from "passport-local";
// @ts-ignore
import scmp from "scmp";

function pbkdf2(password: string, salt: string, options: Options, callback?: any) {
  crypto.pbkdf2(
    password,
    salt,
    options.iterations,
    options.keylen,
    options.digestAlgorithm,
    callback
  );
}

const AuthenticationError = generaterr("AuthenticationError");

const errors = {
  AuthenticationError,
  IncorrectUsernameError: generaterr("IncorrectUsernameError", null, {
    inherits: AuthenticationError,
  }),
  IncorrectPasswordError: generaterr("IncorrectPasswordError", null, {
    inherits: AuthenticationError,
  }),
  MissingUsernameError: generaterr("MissingUsernameError", null, {inherits: AuthenticationError}),
  MissingPasswordError: generaterr("MissingPasswordError", null, {inherits: AuthenticationError}),
  UserExistsError: generaterr("UserExistsError", null, {inherits: AuthenticationError}),
  NoSaltValueStoredError: generaterr("NoSaltValueStoredError", null, {
    inherits: AuthenticationError,
  }),
  AttemptTooSoonError: generaterr("AttemptTooSoonError", null, {inherits: AuthenticationError}),
  TooManyAttemptsError: generaterr("TooManyAttemptsError", null, {inherits: AuthenticationError}),
};

// authenticate function needs refactoring - to avoid bugs we wrapped a bit dirty
function authenticate(user: any, password: string, options: Partial<Options>, cb?: any) {
  if (cb) {
    return doAuthenticate(user, password, options, cb);
  }

  return new Promise((resolve, reject) => {
    doAuthenticate(user, password, options, (err: any, u: any, error: any) =>
      err ? reject(err) : resolve({user: u, error})
    );
  });
}

function doAuthenticate(user: any, password: string, options: any, cb?: any) {
  if (options.limitAttempts) {
    const attemptsInterval = Math.pow(
      options.interval,
      Math.log(user.get(options.attemptsField) + 1)
    );
    const calculatedInterval =
      attemptsInterval < options.maxInterval ? attemptsInterval : options.maxInterval;

    if (Date.now() - user.get(options.lastLoginField) < calculatedInterval) {
      user.set(options.lastLoginField, Date.now());
      user.save(function (saveErr: any) {
        if (saveErr) {
          return cb(saveErr);
        }
        return cb(
          null,
          false,
          new errors.AttemptTooSoonError(options.errorMessages.AttemptTooSoonError)
        );
      });
      return;
    }

    if (user.get(options.attemptsField) >= options.maxAttempts) {
      return cb(
        null,
        false,
        new errors.TooManyAttemptsError(options.errorMessages.TooManyAttemptsError)
      );
    }
  }

  if (!user.get(options.saltField)) {
    return cb(
      null,
      false,
      new errors.NoSaltValueStoredError(options.errorMessages.NoSaltValueStoredError)
    );
  }

  pbkdf2(password, user.get(options.saltField), options, function (err: any, hashBuffer: any) {
    if (err) {
      return cb(err);
    }

    if (scmp(hashBuffer, Buffer.from(user.get(options.hashField), options.encoding))) {
      if (options.limitAttempts) {
        user.set(options.lastLoginField, Date.now());
        user.set(options.attemptsField, 0);
        user.save(function (saveErr: any, savedUser: any) {
          if (saveErr) {
            return cb(saveErr);
          }
          return cb(null, savedUser);
        });
      } else {
        return cb(null, user);
      }
    } else {
      if (options.limitAttempts) {
        user.set(options.lastLoginField, Date.now());
        user.set(options.attemptsField, user.get(options.attemptsField) + 1);
        user.save(function (saveErr: any) {
          if (saveErr) {
            return cb(saveErr);
          }
          if (user.get(options.attemptsField) >= options.maxAttempts) {
            return cb(
              null,
              false,
              new errors.TooManyAttemptsError(options.errorMessages.TooManyAttemptsError)
            );
          } else {
            return cb(
              null,
              false,
              new errors.IncorrectPasswordError(options.errorMessages.IncorrectPasswordError)
            );
          }
        });
      } else {
        return cb(
          null,
          false,
          new errors.IncorrectPasswordError(options.errorMessages.IncorrectPasswordError)
        );
      }
    }
  });
}

export interface Options {
  saltlen: number;
  iterations: number;
  keylen: number;
  encoding: string;
  digestAlgorithm: string;
}

export const passportLocalMongoose = function (schema: Schema, opts: Partial<Options> = {}) {
  const options: any = {...opts};
  options.saltlen = options.saltlen || 32;
  options.iterations = options.iterations || 25000;
  options.keylen = options.keylen || 512;
  options.encoding = options.encoding || "hex";
  options.digestAlgorithm = options.digestAlgorithm || "sha256"; // To get a list of supported hashes use crypto.getHashes()

  function defaultPasswordValidator(password: string, cb: any) {
    cb(null);
  }

  function defaultPasswordValidatorAsync(password: string): Promise<void> {
    return new Promise((resolve, reject) => {
      options.passwordValidator(password, (err: any) => (err ? reject(err) : resolve()));
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
  } else {
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
    function (model: any, queryParameters: any) {
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

  const schemaFields = {};

  if (!schema.path(options.usernameField)) {
    schemaFields[options.usernameField] = {type: String, unique: options.usernameUnique};
  }
  schemaFields[options.hashField] = {type: String, select: false};
  schemaFields[options.saltField] = {type: String, select: false};

  if (options.limitAttempts) {
    schemaFields[options.attemptsField] = {type: Number, default: 0};
    schemaFields[options.lastLoginField] = {type: Date, default: Date.now};
  }

  schema.add(schemaFields);

  schema.pre("save", function (next) {
    if (options.usernameLowerCase && this[options.usernameField]) {
      this[options.usernameField] = this[options.usernameField].toLowerCase();
    }

    next();
  });

  schema.methods.setPassword = function (password: string, cb?: any): Promise<any> {
    const promise = Promise.resolve()
      .then(() => {
        if (!password) {
          throw new errors.MissingPasswordError(options.errorMessages.MissingPasswordError);
        }
      })
      .then(() => options.passwordValidatorAsync(password))
      .then(() => randomBytes(options.saltlen))
      .then((saltBuffer: any) => (saltBuffer as any).toString(options.encoding))
      .then((salt) => {
        this.set(options.saltField, salt);

        return salt;
      })
      .then((salt) => pbkdf2Promisified(password, salt, options))
      .then((hashRaw) => {
        this.set(
          options.hashField,
          (Buffer as any).from(hashRaw, "binary").toString(options.encoding)
        );
      })
      .then(() => this);

    if (!cb) {
      return promise;
    }

    return promise.then((result) => cb(null, result)).catch((err) => cb(err));
  };

  schema.methods.changePassword = function (oldPassword: string, newPassword: string, cb?: any) {
    const promise = Promise.resolve()
      .then(() => {
        if (!oldPassword || !newPassword) {
          throw new errors.MissingPasswordError(options.errorMessages.MissingPasswordError);
        }
      })
      .then(() => this.authenticate(oldPassword))
      .then(({user}) => {
        if (!user) {
          throw new errors.IncorrectPasswordError(options.errorMessages.IncorrectPasswordError);
        }
      })
      .then(() => this.setPassword(newPassword))
      .then(() => this.save())
      .then(() => this);

    if (!cb) {
      return promise;
    }

    return promise.then((result) => cb(null, result)).catch((err) => cb(err));
  };

  // @ts-ignore
  schema.methods.authenticate = function (password: string, cb: any) {
    const promise = Promise.resolve().then(() => {
      if (this.get(options.saltField)) {
        return authenticate(this, password, options);
      }

      return (this.constructor as any)
        .findByUsername(this.get(options.usernameField), true)
        .then((user: any) => {
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

    return promise.then(({user, error}) => cb(null, user, error)).catch((err) => cb(err));
  };

  if (options.limitAttempts) {
    // @ts-ignore
    schema.methods.resetAttempts = function (cb: any) {
      const promise = Promise.resolve().then(() => {
        this.set(options.attemptsField, 0);
        return this.save();
      });

      if (!cb) {
        return promise;
      }

      return promise.then((result) => cb(null, result)).catch((err) => cb(err));
    };
  }

  // Passport Local Interface
  schema.statics.authenticate = function () {
    return (username: any, password: string, cb: any) => {
      const promise = Promise.resolve()
        .then(() => (this as any).findByUsername(username, true))
        .then((user) => {
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

      return promise.then(({user, error}) => cb(null, user, error)).catch((err) => cb(err));
    };
  };

  // Passport Interface
  schema.statics.serializeUser = function () {
    return function (user: any, cb: any) {
      cb(null, user.get(options.usernameField));
    };
  };

  schema.statics.deserializeUser = function () {
    return (username: any, cb: any) => {
      (this as any).findByUsername(username, cb);
    };
  };

  schema.statics.register = function (user: any, password: string, cb: any): Promise<any> {
    // Create an instance of this in case user isn't already an instance
    if (!(user instanceof this)) {
      user = new this(user);
    }

    const promise = Promise.resolve()
      .then(() => {
        if (!user.get(options.usernameField)) {
          throw new errors.MissingUsernameError(options.errorMessages.MissingUsernameError);
        }
      })
      .then(() => (this as any).findByUsername(user.get(options.usernameField)))
      .then((existingUser) => {
        if (existingUser) {
          throw new errors.UserExistsError(options.errorMessages.UserExistsError);
        }
      })
      .then(() => user.setPassword(password))
      .then(() => user.save());

    if (!cb) {
      return promise;
    }

    return promise.then((result) => cb(null, result)).catch((err) => cb(err));
  };

  schema.statics.findByUsername = function (username: any | RegExp, findOpts: any, cb: any) {
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
    const queryOrParameters = [];
    for (let i = 0; i < options.usernameQueryFields.length; i++) {
      const parameter = {};
      parameter[options.usernameQueryFields[i]] = options.usernameCaseInsensitive
        ? new RegExp(`^${username}$`, "i")
        : username;
      queryOrParameters.push(parameter);
    }

    const query = options.findByUsername(this, {$or: queryOrParameters});

    if (findOpts.selectHashSaltFields) {
      query.select(`+${options.hashField} +${options.saltField}`);
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
    return new LocalStrategy(options, (this as any).authenticate());
  };
};

function pbkdf2Promisified(password: any, salt: any, options: any) {
  return new Promise((resolve, reject) =>
    pbkdf2(password, salt, options, (err: any, hashRaw: any) =>
      err ? reject(err) : resolve(hashRaw)
    )
  );
}

function randomBytes(saltlen: number) {
  return new Promise((resolve, reject) =>
    crypto.randomBytes(saltlen, (err, saltBuffer) => (err ? reject(err) : resolve(saltBuffer)))
  );
}
