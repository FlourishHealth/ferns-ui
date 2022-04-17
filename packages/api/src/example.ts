import chai from "chai";
import express from "express";
import mongoose, {model, Schema} from "mongoose";

import {logger, tokenPlugin} from ".";
import {
  baseUserPlugin,
  createdDeletedPlugin,
  gooseRestRouter,
  Permissions,
  setupAuth,
} from "./mongooseRestFramework";
import {passportLocalMongoose} from "./passport";

const assert = chai.assert;

mongoose.connect("mongodb://localhost:27017/example");

interface User {
  admin: boolean;
  username: string;
}

interface Food {
  name: string;
  calories: number;
  created: Date;
  ownerId: mongoose.Types.ObjectId | User;
  hidden?: boolean;
}

const userSchema = new Schema<User>({
  username: String,
  admin: {type: Boolean, default: false},
});

userSchema.plugin(passportLocalMongoose, {usernameField: "email"});
userSchema.plugin(tokenPlugin);
userSchema.plugin(createdDeletedPlugin);
userSchema.plugin(baseUserPlugin);
const UserModel = model<User>("User", userSchema);

const schema = new Schema<Food>({
  name: String,
  calories: Number,
  created: Date,
  ownerId: {type: "ObjectId", ref: "User"},
  hidden: {type: Boolean, default: false},
});

const FoodModel = model<Food>("Food", schema);

function getBaseServer() {
  const app = express();

  app.all("/*", function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "*");
    // intercepts OPTIONS method
    if (req.method === "OPTIONS") {
      res.send(200);
    } else {
      next();
    }
  });
  app.use(express.json());
  setupAuth(app, UserModel as any);
  app.use(
    "/food",
    gooseRestRouter(FoodModel, {
      permissions: {
        list: [Permissions.IsAny],
        create: [Permissions.IsAuthenticated],
        read: [Permissions.IsAny],
        update: [Permissions.IsOwner],
        delete: [Permissions.IsAdmin],
      },
    })
  );
  app.listen(5004);
  logger.info("Running on 5004");
}
getBaseServer();
