import chai from "chai";
import express, {Express} from "express";
import mongoose, {model, ObjectId, Schema} from "mongoose";
import qs from "qs";
import supertest from "supertest";

import {
  AdminOwnerTransformer,
  createdDeletedPlugin,
  gooseRestRouter,
  Permissions,
  setupAuth,
  tokenPlugin,
} from "./mongooseRestFramework";
import {passportLocalMongoose} from "./passport";

const assert = chai.assert;

mongoose.connect("mongodb://localhost:27017/mrf");

interface User {
  admin: boolean;
  username: string;
  email: string;
  age?: number;
}

interface Food {
  name: string;
  calories: number;
  created: Date;
  ownerId: mongoose.Types.ObjectId | User;
  hidden?: boolean;
  source: {
    name: string;
  };
}

const userSchema = new Schema<User>({
  username: String,
  admin: {type: Boolean, default: false},
  age: Number,
});

userSchema.plugin(passportLocalMongoose, {usernameField: "email"});
userSchema.plugin(tokenPlugin);
userSchema.plugin(createdDeletedPlugin);
userSchema.methods.postCreate = async function (body: any) {
  this.age = body.age;
  return this.save();
};

const UserModel = model<User>("User", userSchema);

const schema = new Schema<Food>({
  name: String,
  calories: Number,
  created: Date,
  ownerId: {type: "ObjectId", ref: "User"},
  source: {
    name: String,
  },
  hidden: {type: Boolean, default: false},
});

const FoodModel = model<Food>("Food", schema);

interface RequiredField {
  name: string;
  about?: string;
}

const requiredSchema = new Schema<RequiredField>({
  name: {type: String, required: true},
  about: String,
});
const RequiredModel = model<RequiredField>("Required", requiredSchema);

function getBaseServer(): Express {
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
  return app;
}

afterAll(() => {
  mongoose.connection.close();
});

async function setupDb() {
  await Promise.all([UserModel.deleteMany({}), FoodModel.deleteMany({})]);
  const [notAdmin, admin] = await Promise.all([
    UserModel.create({email: "notAdmin@example.com"}),
    UserModel.create({email: "admin@example.com", admin: true}),
  ]);
  await (notAdmin as any).setPassword("password");
  await notAdmin.save();

  await (admin as any).setPassword("securePassword");
  await admin.save();

  return [admin, notAdmin];
}

describe("mongoose rest framework", () => {
  let server: supertest.SuperTest<supertest.Test>;
  let app: express.Application;
  const OLD_ENV = process.env;

  beforeEach(function () {
    // jest.resetModules(); // Most important - it clears the cache
    process.env = {...OLD_ENV}; // Make a copy
    process.env.TOKEN_SECRET = "secret";
    process.env.TOKEN_EXPIRES_IN = "30m";
    process.env.TOKEN_ISSUER = "example.com";
    process.env.SESSION_SECRET = "session";
  });

  afterEach(function () {
    process.env = OLD_ENV;
  });

  describe("pre and post hooks", function () {
    beforeEach(async function () {
      await setupDb();
      app = getBaseServer();
      setupAuth(app, UserModel as any);
    });

    it("pre hooks change data", async function () {
      let deleteCalled = false;
      app.use(
        "/food",
        gooseRestRouter(FoodModel, {
          permissions: {
            list: [Permissions.IsAny],
            create: [Permissions.IsAny],
            read: [Permissions.IsAny],
            update: [Permissions.IsAny],
            delete: [Permissions.IsAny],
          },
          preCreate: (data: any) => {
            data.calories = 14;
            return data;
          },
          preUpdate: (data: any) => {
            data.calories = 15;
            return data;
          },
          preDelete: (data: any) => {
            deleteCalled = true;
            return data;
          },
        })
      );
      server = supertest(app);

      let res = await server
        .post("/food")
        .send({
          name: "Broccoli",
          calories: 15,
        })
        .expect(201);
      const broccoli = await FoodModel.findById(res.body.data._id);
      if (!broccoli) {
        throw new Error("Broccoli was not created");
      }
      assert.equal(broccoli.name, "Broccoli");
      // Overwritten by the pre create hook
      assert.equal(broccoli.calories, 14);

      res = await server
        .patch(`/food/${broccoli._id}`)
        .send({
          name: "Broccoli2",
        })
        .expect(200);
      assert.equal(res.body.data.name, "Broccoli2");
      // Updated by the pre update hook
      assert.equal(res.body.data.calories, 15);

      await server.delete(`/food/${broccoli._id}`).expect(204);
      assert.isTrue(deleteCalled);
    });

    it("pre hooks return null", async function () {
      const notAdmin = await UserModel.findOne({email: "notAdmin@example.com"});
      const spinach = await FoodModel.create({
        name: "Spinach",
        calories: 1,
        created: new Date("2021-12-03T00:00:20.000Z"),
        ownerId: (notAdmin as any)._id,
        hidden: false,
        source: {
          name: "Brand",
        },
      });

      app.use(
        "/food",
        gooseRestRouter(FoodModel, {
          permissions: {
            list: [Permissions.IsAny],
            create: [Permissions.IsAny],
            read: [Permissions.IsAny],
            update: [Permissions.IsAny],
            delete: [Permissions.IsAny],
          },
          preCreate: () => null,
          preUpdate: () => null,
          preDelete: () => null,
        })
      );
      server = supertest(app);

      const res = await server
        .post("/food")
        .send({
          name: "Broccoli",
          calories: 15,
        })
        .expect(403);
      const broccoli = await FoodModel.findById(res.body._id);
      assert.isNull(broccoli);

      await server
        .patch(`/food/${spinach._id}`)
        .send({
          name: "Broccoli",
        })
        .expect(403);

      await server.delete(`/food/${spinach._id}`).expect(403);
    });

    it("post hooks succeed", async function () {
      let deleteCalled = false;
      app.use(
        "/food",
        gooseRestRouter(FoodModel, {
          permissions: {
            list: [Permissions.IsAny],
            create: [Permissions.IsAny],
            read: [Permissions.IsAny],
            update: [Permissions.IsAny],
            delete: [Permissions.IsAny],
          },
          postCreate: async (data: any) => {
            data.calories = 14;
            await data.save();
            return data;
          },
          postUpdate: async (data: any) => {
            data.calories = 15;
            await data.save();
            return data;
          },
          postDelete: (data: any) => {
            deleteCalled = true;
            return data;
          },
        })
      );
      server = supertest(app);

      let res = await server
        .post("/food")
        .send({
          name: "Broccoli",
          calories: 15,
        })
        .expect(201);
      let broccoli = await FoodModel.findById(res.body.data._id);
      if (!broccoli) {
        throw new Error("Broccoli was not created");
      }
      assert.equal(broccoli.name, "Broccoli");
      // Overwritten by the pre create hook
      assert.equal(broccoli.calories, 14);

      res = await server
        .patch(`/food/${broccoli._id}`)
        .send({
          name: "Broccoli2",
        })
        .expect(200);
      broccoli = await FoodModel.findById(res.body.data._id);
      if (!broccoli) {
        throw new Error("Broccoli was not update");
      }
      assert.equal(broccoli.name, "Broccoli2");
      // Updated by the post update hook
      assert.equal(broccoli.calories, 15);

      await server.delete(`/food/${broccoli._id}`).expect(204);
      assert.isTrue(deleteCalled);
    });
  });

  describe("permissions", function () {
    beforeEach(async function () {
      const [admin, notAdmin] = await setupDb();

      await Promise.all([
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
      ]);
      app = getBaseServer();
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
      app.use(
        "/required",
        gooseRestRouter(RequiredModel, {
          permissions: {
            list: [Permissions.IsAny],
            create: [Permissions.IsAuthenticated],
            read: [Permissions.IsAny],
            update: [Permissions.IsOwner],
            delete: [Permissions.IsAdmin],
          },
        })
      );
      server = supertest(app);
    });

    describe("anonymous food", function () {
      it("list", async function () {
        const res = await server.get("/food").expect(200);
        assert.lengthOf(res.body.data, 2);
      });

      it("get", async function () {
        const res = await server.get("/food").expect(200);
        assert.lengthOf(res.body.data, 2);
        const res2 = await server.get(`/food/${res.body.data[0]._id}`).expect(200);
        assert.equal(res.body.data[0]._id, res2.body.data._id);
      });

      it("post", async function () {
        const res = await server.post("/food").send({
          name: "Broccoli",
          calories: 15,
        });
        assert.equal(res.status, 405);
      });

      it("patch", async function () {
        const res = await server.get("/food");
        const res2 = await server.patch(`/food/${res.body.data[0]._id}`).send({
          name: "Broccoli",
        });
        assert.equal(res2.status, 403);
      });

      it("delete", async function () {
        const res = await server.get("/food");
        const res2 = await server.delete(`/food/${res.body.data[0]._id}`);
        assert.equal(res2.status, 405);
      });
    });

    describe("non admin food", function () {
      let agent: supertest.SuperAgentTest;
      let token: string;
      beforeEach(async function () {
        agent = supertest.agent(app);
        const res = await agent
          .post("/auth/login")
          .send({email: "notAdmin@example.com", password: "password"})
          .expect(200);
        token = res.body.data.token;
      });

      it("list", async function () {
        const res = await agent.get("/food").set("authorization", `Bearer ${token}`);
        assert.lengthOf(res.body.data, 2);
      });

      it("get", async function () {
        const res = await agent.get("/food").set("authorization", `Bearer ${token}`);
        assert.lengthOf(res.body.data, 2);
        const res2 = await agent
          .get(`/food/${res.body.data[0]._id}`)
          .set("authorization", `Bearer ${token}`);
        assert.equal(res.body.data[0]._id, res2.body.data._id);
      });

      it("post", async function () {
        const res = await agent.post("/food").set("authorization", `Bearer ${token}`).send({
          name: "Broccoli",
          calories: 15,
        });
        assert.equal(res.status, 201);
      });

      it("patch own item", async function () {
        const res = await agent.get("/food");
        const spinach = res.body.data.find((food: Food) => food.name === "Spinach");
        const res2 = await agent
          .patch(`/food/${spinach._id}`)
          .set("authorization", `Bearer ${token}`)
          .send({
            name: "Broccoli",
          });
        assert.equal(res2.status, 200);
        assert.equal(res2.body.data.name, "Broccoli");
      });

      it("patch other item", async function () {
        const res = await agent.get("/food");
        const spinach = res.body.data.find((food: Food) => food.name === "Apple");
        const res2 = await agent
          .patch(`/food/${spinach._id}`)
          .set("authorization", `Bearer ${token}`)
          .send({
            name: "Broccoli",
          });
        assert.equal(res2.status, 403);
      });

      it("delete", async function () {
        const res = await agent.get("/food");
        const res2 = await agent.delete(`/food/${res.body.data[0]._id}`);
        assert.equal(res2.status, 405);
      });
    });

    describe("admin food", function () {
      let agent: supertest.SuperAgentTest;
      let token: string;

      beforeEach(async function () {
        agent = supertest.agent(app);
        const res = await agent
          .post("/auth/login")
          .send({email: "admin@example.com", password: "securePassword"})
          .expect(200);
        token = res.body.data.token;
      });

      it("list", async function () {
        const res = await agent.get("/food");
        assert.lengthOf(res.body.data, 2);
      });

      it("get", async function () {
        const res = await agent.get("/food");
        assert.lengthOf(res.body.data, 2);
        const res2 = await agent.get(`/food/${res.body.data[0]._id}`);
        assert.equal(res.body.data[0]._id, res2.body.data._id);
      });

      it("post", async function () {
        const res = await agent.post("/food").set("authorization", `Bearer ${token}`).send({
          name: "Broccoli",
          calories: 15,
        });
        assert.equal(res.status, 201);
      });

      it("patch", async function () {
        const res = await agent.get("/food");
        const res2 = await agent
          .patch(`/food/${res.body.data[0]._id}`)
          .set("authorization", `Bearer ${token}`)
          .send({
            name: "Broccoli",
          });
        assert.equal(res2.status, 200);
      });

      it("delete", async function () {
        const res = await agent.get("/food");
        const res2 = await agent
          .delete(`/food/${res.body.data[0]._id}`)
          .set("authorization", `Bearer ${token}`);
        assert.equal(res2.status, 204);
      });

      it("handles validation errors", async function () {
        const res = await agent.post("/required").set("authorization", `Bearer ${token}`).send({
          about: "Whoops forgot required",
        });
        assert.equal(res.status, 400);
      });
    });
  });

  describe("query and transform", function () {
    let notAdmin: any;
    let admin: any;

    beforeEach(async function () {
      [admin, notAdmin] = await setupDb();

      await Promise.all([
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
      ]);
      app = getBaseServer();
      setupAuth(app, UserModel as any);
      app.use(
        "/food",
        gooseRestRouter(FoodModel, {
          permissions: {
            list: [Permissions.IsAny],
            create: [Permissions.IsAny],
            read: [Permissions.IsAny],
            update: [Permissions.IsAny],
            delete: [Permissions.IsAny],
          },
          queryFilter: (user?: {_id: ObjectId | string; admin: boolean}) => {
            if (!user?.admin) {
              return {hidden: {$ne: true}};
            }
            return {};
          },
          transformer: AdminOwnerTransformer<Food>({
            adminReadFields: ["name", "calories", "created", "ownerId"],
            adminWriteFields: ["name", "calories", "created", "ownerId"],
            ownerReadFields: ["name", "calories", "created", "ownerId"],
            ownerWriteFields: ["name", "calories", "created"],
            authReadFields: ["name", "calories", "created"],
            authWriteFields: ["name", "calories"],
            anonReadFields: ["name"],
            anonWriteFields: [],
          }),
        })
      );
      server = supertest(app);
    });

    it("filters list for non-admin", async function () {
      const agent = supertest.agent(app);
      const res = await agent
        .post("/auth/login")
        .send({email: "notAdmin@example.com", password: "password"})
        .expect(200);
      const foodRes = await agent
        .get("/food")
        .set("authorization", `Bearer ${res.body.data.token}`)
        .expect(200);
      assert.lengthOf(foodRes.body.data, 2);
    });

    it("does not filter list for admin", async function () {
      const agent = supertest.agent(app);
      const res = await agent
        .post("/auth/login")
        .send({email: "admin@example.com", password: "securePassword"})
        .expect(200);
      const foodRes = await agent
        .get("/food")
        .set("authorization", `Bearer ${res.body.data.token}`)
        .expect(200);
      assert.lengthOf(foodRes.body.data, 3);
    });

    it("admin read transform", async function () {
      const agent = supertest.agent(app);
      const res = await agent
        .post("/auth/login")
        .send({email: "admin@example.com", password: "securePassword"})
        .expect(200);
      const foodRes = await agent
        .get("/food")
        .set("authorization", `Bearer ${res.body.data.token}`)
        .expect(200);
      assert.lengthOf(foodRes.body.data, 3);
      const spinach = foodRes.body.data.find((food: Food) => food.name === "Spinach");
      assert.isDefined(spinach.created);
      assert.isDefined(spinach.id);
      assert.isDefined(spinach.ownerId);
      assert.equal(spinach.name, "Spinach");
      assert.equal(spinach.calories, 1);
      assert.isUndefined(spinach.hidden);
    });

    it("admin write transform", async function () {
      const agent = supertest.agent(app);
      const res = await agent
        .post("/auth/login")
        .send({email: "admin@example.com", password: "securePassword"})
        .expect(200);
      const foodRes = await agent
        .get("/food")
        .set("authorization", `Bearer ${res.body.data.token}`)
        .expect(200);
      const spinach = foodRes.body.data.find((food: Food) => food.name === "Spinach");
      const spinachRes = await agent
        .patch(`/food/${spinach.id}`)
        .set("authorization", `Bearer ${res.body.data.token}`)
        .send({name: "Lettuce"})
        .expect(200);
      assert.equal(spinachRes.body.data.name, "Lettuce");
    });

    it("owner read transform", async function () {
      const agent = supertest.agent(app);
      const res = await agent
        .post("/auth/login")
        .send({email: "notAdmin@example.com", password: "password"})
        .expect(200);
      const foodRes = await agent
        .get("/food")
        .set("authorization", `Bearer ${res.body.data.token}`)
        .expect(200);
      assert.lengthOf(foodRes.body.data, 2);
      const spinach = foodRes.body.data.find((food: Food) => food.name === "Spinach");
      assert.isDefined(spinach.id);
      assert.equal(spinach.name, "Spinach");
      assert.equal(spinach.calories, 1);
      assert.isDefined(spinach.created);
      assert.isDefined(spinach.ownerId);
      assert.isUndefined(spinach.hidden);
    });

    it("owner write transform", async function () {
      const agent = supertest.agent(app);
      const res = await agent
        .post("/auth/login")
        .send({email: "notAdmin@example.com", password: "password"})
        .expect(200);
      const foodRes = await agent
        .get("/food")
        .set("authorization", `Bearer ${res.body.data.token}`)
        .expect(200);
      const spinach = foodRes.body.data.find((food: Food) => food.name === "Spinach");
      await agent.patch(`/food/${spinach.id}`).send({ownerId: admin.id}).expect(403);
    });

    it("owner write transform fails", async function () {
      const agent = supertest.agent(app);
      const res = await agent
        .post("/auth/login")
        .send({email: "notAdmin@example.com", password: "password"})
        .expect(200);
      const foodRes = await agent
        .get("/food")
        .set("authorization", `Bearer ${res.body.data.token}`)
        .expect(200);
      const spinach = foodRes.body.data.find((food: Food) => food.name === "Spinach");
      const spinachRes = await agent
        .patch(`/food/${spinach.id}`)
        .set("authorization", `Bearer ${res.body.data.token}`)
        .send({ownerId: notAdmin.id})
        .expect(403);
      assert.equal(spinachRes.body.message, "User of type owner cannot write fields: ownerId");
    });

    it("auth read transform", async function () {
      const agent = supertest.agent(app);
      const res = await agent
        .post("/auth/login")
        .send({email: "notAdmin@example.com", password: "password"})
        .expect(200);
      const foodRes = await agent
        .get("/food")
        .set("authorization", `Bearer ${res.body.data.token}`)
        .expect(200);
      assert.lengthOf(foodRes.body.data, 2);
      const spinach = foodRes.body.data.find((food: Food) => food.name === "Spinach");
      assert.isDefined(spinach.id);
      assert.equal(spinach.name, "Spinach");
      assert.equal(spinach.calories, 1);
      assert.isDefined(spinach.created);
      // Owner, so this is defined.
      assert.isDefined(spinach.ownerId);
      assert.isUndefined(spinach.hidden);

      const carrots = foodRes.body.data.find((food: Food) => food.name === "Carrots");
      assert.isDefined(carrots.id);
      assert.equal(carrots.name, "Carrots");
      assert.equal(carrots.calories, 100);
      assert.isDefined(carrots.created);
      // Not owner, so undefined.
      assert.isUndefined(carrots.ownerId);
      assert.isUndefined(spinach.hidden);
    });

    it("auth write transform", async function () {
      const agent = supertest.agent(app);
      const res = await agent
        .post("/auth/login")
        .send({email: "notAdmin@example.com", password: "password"})
        .expect(200);
      const foodRes = await agent.get("/food");
      const carrots = foodRes.body.data.find((food: Food) => food.name === "Carrots");
      const carrotRes = await agent
        .patch(`/food/${carrots.id}`)
        .set("authorization", `Bearer ${res.body.data.token}`)
        .send({calories: 2000})
        .expect(200);
      assert.equal(carrotRes.body.data.calories, 2000);
    });

    it("auth write transform fail", async function () {
      const agent = supertest.agent(app);
      const res = await agent
        .post("/auth/login")
        .send({email: "notAdmin@example.com", password: "password"})
        .expect(200);
      const foodRes = await agent.get("/food");
      const carrots = foodRes.body.data.find((food: Food) => food.name === "Carrots");
      const writeRes = await agent
        .patch(`/food/${carrots.id}`)
        .set("authorization", `Bearer ${res.body.data.token}`)
        .send({created: "2020-01-01T00:00:00Z"})
        .expect(403);
      assert.equal(writeRes.body.message, "User of type auth cannot write fields: created");
    });

    it("anon read transform", async function () {
      const agent = supertest.agent(app);
      const res = await agent.get("/food");
      assert.lengthOf(res.body.data, 2);
      assert.isDefined(res.body.data.find((f: Food) => f.name === "Spinach"));
      assert.isDefined(res.body.data.find((f: Food) => f.name === "Carrots"));
    });

    it("anon write transform fails", async function () {
      const agent = supertest.agent(app);
      const foodRes = await agent.get("/food");
      const carrots = foodRes.body.data.find((food: Food) => food.name === "Carrots");
      await agent.patch(`/food/${carrots.id}`).send({calories: 10}).expect(403);
    });
  });

  let spinach: Food;
  let apple: Food;
  let carrots: Food;
  let pizza: Food;

  describe("list options", function () {
    let notAdmin: any;
    let admin: any;

    beforeEach(async function () {
      [admin, notAdmin] = await setupDb();

      [spinach, apple, carrots, pizza] = await Promise.all([
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
      ]);
      app = getBaseServer();
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
          defaultLimit: 2,
          maxLimit: 3,
          sort: {created: "descending"},
          defaultQueryParams: {hidden: false},
          queryFields: ["hidden", "calories", "created", "source.name"],
          populatePaths: ["ownerId"],
        })
      );
      server = supertest(app);
    });

    it("list limit", async function () {
      const res = await server.get("/food?limit=1").expect(200);
      assert.lengthOf(res.body.data, 1);
      assert.equal(res.body.data[0].id, (spinach as any).id);
      assert.equal(res.body.data[0].ownerId._id, notAdmin.id);
    });

    it("list limit over", async function () {
      // This shouldn't be seen, it's the end of the list.
      await FoodModel.create({
        name: "Pizza",
        calories: 400,
        created: new Date("2021-12-02T00:00:10.000Z"),
        ownerId: admin._id,
        hidden: false,
      });
      const res = await server.get("/food?limit=4").expect(200);
      assert.lengthOf(res.body.data, 3);
      assert.equal(res.body.data[0].id, (spinach as any).id);
      assert.equal(res.body.data[1].id, (pizza as any).id);
      assert.equal(res.body.data[2].id, (carrots as any).id);
    });

    it("list page", async function () {
      // Should skip to carrots since apples are hidden
      const res = await server.get("/food?limit=1&page=2").expect(200);
      assert.lengthOf(res.body.data, 1);
      assert.equal(res.body.data[0].id, (pizza as any).id);
    });

    it("list page over", async function () {
      // Should skip to carrots since apples are hidden
      const res = await server.get("/food?limit=1&page=5").expect(200);
      assert.lengthOf(res.body.data, 0);
    });

    it("list query params", async function () {
      // Should skip to carrots since apples are hidden
      const res = await server.get("/food?hidden=true").expect(200);
      assert.lengthOf(res.body.data, 1);
      assert.equal(res.body.data[0].id, (apple as any).id);
    });

    it("list query params not in list", async function () {
      // Should skip to carrots since apples are hidden
      const res = await server.get("/food?name=Apple").expect(400);
      assert.equal(res.body.message, "name is not allowed as a query param.");
    });

    it("list query by nested param", async function () {
      // Should skip to carrots since apples are hidden
      const res = await server.get("/food?source.name=USDA").expect(200);
      assert.lengthOf(res.body.data, 1);
      assert.equal(res.body.data[0].id, (carrots as any).id);
    });

    it("query by date", async function () {
      const authRes = await server
        .post("/auth/login")
        .send({email: "admin@example.com", password: "securePassword"})
        .expect(200);
      const token = authRes.body.data.token;

      // Inclusive
      let res = await server
        .get(
          `/food?limit=3&${qs.stringify({
            created: {
              $lte: "2021-12-03T00:00:20.000Z",
              $gte: "2021-12-03T00:00:00.000Z",
            },
          })}`
        )
        .set("authorization", `Bearer ${token}`)
        .expect(200);
      assert.sameDeepMembers(
        ["2021-12-03T00:00:20.000Z", "2021-12-03T00:00:10.000Z", "2021-12-03T00:00:00.000Z"],
        res.body.data.map((d: any) => d.created)
      );

      // Inclusive one side
      res = await server
        .get(
          `/food?limit=3&${qs.stringify({
            created: {
              $lt: "2021-12-03T00:00:20.000Z",
              $gte: "2021-12-03T00:00:00.000Z",
            },
          })}`
        )
        .set("authorization", `Bearer ${token}`)
        .expect(200);
      assert.sameDeepMembers(
        ["2021-12-03T00:00:10.000Z", "2021-12-03T00:00:00.000Z"],
        res.body.data.map((d: any) => d.created)
      );

      // Inclusive both sides
      res = await server
        .get(
          `/food?limit=3&${qs.stringify({
            created: {
              $lt: "2021-12-03T00:00:20.000Z",
              $gt: "2021-12-03T00:00:00.000Z",
            },
          })}`
        )
        .set("authorization", `Bearer ${token}`)
        .expect(200);
      assert.sameDeepMembers(
        ["2021-12-03T00:00:10.000Z"],
        res.body.data.map((d: any) => d.created)
      );
    });
  });
});

describe("test token auth", function () {
  let app;
  let server: any;
  const OLD_ENV = process.env;

  beforeEach(function () {
    // jest.resetModules(); // Most important - it clears the cache
    process.env = {...OLD_ENV}; // Make a copy
    process.env.TOKEN_SECRET = "secret";
    process.env.TOKEN_EXPIRES_IN = "30m";
    process.env.TOKEN_ISSUER = "example.com";
    process.env.SESSION_SECRET = "session";
  });

  afterEach(function () {
    process.env = OLD_ENV;
  });

  beforeEach(async function () {
    await Promise.all([UserModel.deleteMany({}), FoodModel.deleteMany({})]);

    const [notAdmin, admin] = await Promise.all([
      UserModel.create({email: "notAdmin@example.com"}),
      UserModel.create({email: "admin@example.com", admin: true}),
    ]);

    await (notAdmin as any).setPassword("password");
    await notAdmin.save();

    await (admin as any).setPassword("securePassword");
    await admin.save();

    await Promise.all([
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
    ]);
    app = getBaseServer();
    setupAuth(app, UserModel as any);
    app.use(
      "/food",
      gooseRestRouter(FoodModel, {
        permissions: {
          list: [Permissions.IsAny],
          create: [Permissions.IsAuthenticated],
          read: [Permissions.IsAny],
          update: [Permissions.IsAuthenticated],
          delete: [Permissions.IsAuthenticated],
        },
        queryFilter: (user?: {admin: boolean}) => {
          if (!user?.admin) {
            return {hidden: {$ne: true}};
          }
          return {};
        },
        transformer: AdminOwnerTransformer<Food>({
          adminReadFields: ["name", "calories", "created", "ownerId"],
          adminWriteFields: ["name", "calories", "created", "ownerId"],
          ownerReadFields: ["name", "calories", "created", "ownerId"],
          ownerWriteFields: ["name", "calories", "created"],
          authReadFields: ["name", "calories", "created"],
          authWriteFields: ["name", "calories"],
          anonReadFields: ["name"],
          anonWriteFields: [],
        }),
      })
    );
    server = supertest(app);
  });

  it("completes token signup e2e", async function () {
    let res = await server
      .post("/auth/signup")
      .send({email: "new@example.com", password: "123"})
      .expect(200);
    let {userId, token} = res.body.data;
    assert.isDefined(userId);
    assert.isDefined(token);

    res = await server
      .post("/auth/login")
      .send({email: "new@example.com", password: "123"})
      .expect(200);
    userId = res.body.data.userId;
    token = res.body.data.token;
    assert.isDefined(userId);
    assert.isDefined(token);

    const food = await FoodModel.create({
      name: "Peas",
      calories: 1,
      created: new Date(),
      ownerId: userId,
    });

    const meRes = await server.get("/auth/me").set("authorization", `Bearer ${token}`).expect(200);
    assert.isDefined(meRes.body.data._id);
    assert.isDefined(meRes.body.data.id);
    assert.isUndefined(meRes.body.data.hash);
    assert.equal(meRes.body.data.email, "new@example.com");
    assert.isDefined(meRes.body.data.token);
    assert.isDefined(meRes.body.data.updated);
    assert.isDefined(meRes.body.data.created);
    assert.isFalse(meRes.body.data.admin);

    const mePatchRes = await server
      .patch("/auth/me")
      .send({email: "new2@example.com"})
      .set("authorization", `Bearer ${token}`)
      .expect(200);
    assert.isDefined(mePatchRes.body.data._id);
    assert.isDefined(mePatchRes.body.data.id);
    assert.isUndefined(mePatchRes.body.data.hash);
    assert.equal(mePatchRes.body.data.email, "new2@example.com");
    assert.isDefined(mePatchRes.body.data.token);
    assert.isDefined(mePatchRes.body.data.updated);
    assert.isDefined(mePatchRes.body.data.created);
    assert.isFalse(mePatchRes.body.data.admin);

    // Use token to see 2 foods + the one we just created
    const getRes = await server.get("/food").set("authorization", `Bearer ${token}`).expect(200);

    assert.lengthOf(getRes.body.data, 3);
    assert.isDefined(getRes.body.data.find((f: any) => f.name === "Peas"));

    const updateRes = await server
      .patch(`/food/${food._id}`)
      .set("authorization", `Bearer ${token}`)
      .send({name: "PeasAndCarrots"})
      .expect(200);
    assert.equal(updateRes.body.data.name, "PeasAndCarrots");
  });

  it("signup with extra data", async function () {
    const res = await server
      .post("/auth/signup")
      .send({email: "new@example.com", password: "123", age: 25})
      .expect(200);
    const {userId, token} = res.body.data;
    assert.isDefined(userId);
    assert.isDefined(token);

    const user = await UserModel.findOne({email: "new@example.com"});
    assert.equal(user?.age, 25);
  });

  it("completes token login e2e", async function () {
    const res = await server
      .post("/auth/login")
      .send({email: "admin@example.com", password: "securePassword"})
      .expect(200);
    const {userId, token} = res.body.data;
    assert.isDefined(userId);
    assert.isDefined(token);

    const meRes = await server.get("/auth/me").set("authorization", `Bearer ${token}`).expect(200);
    assert.isDefined(meRes.body.data._id);
    assert.isDefined(meRes.body.data.id);
    assert.isUndefined(meRes.body.data.hash);
    assert.equal(meRes.body.data.email, "admin@example.com");
    assert.isDefined(meRes.body.data.token);
    assert.isDefined(meRes.body.data.updated);
    assert.isDefined(meRes.body.data.created);
    assert.isTrue(meRes.body.data.admin);

    const mePatchRes = await server
      .patch("/auth/me")
      .send({email: "admin2@example.com"})
      .set("authorization", `Bearer ${token}`)
      .expect(200);
    assert.isDefined(mePatchRes.body.data._id);
    assert.isDefined(mePatchRes.body.data.id);
    assert.isUndefined(mePatchRes.body.data.hash);
    assert.equal(mePatchRes.body.data.email, "admin2@example.com");
    assert.isDefined(mePatchRes.body.data.token);
    assert.isDefined(mePatchRes.body.data.updated);
    assert.isDefined(mePatchRes.body.data.created);
    assert.isTrue(mePatchRes.body.data.admin);

    // Use token to see admin foods
    const getRes = await server.get("/food").set("Authorization", `Bearer ${token}`).expect(200);

    assert.lengthOf(getRes.body.data, 3);
    const food = getRes.body.data.find((f: any) => f.name === "Apple");
    assert.isDefined(food);

    const updateRes = await server
      .patch(`/food/${food.id}`)
      .set("authorization", `Bearer ${token}`)
      .send({name: "Apple Pie"})
      .expect(200);
    assert.equal(updateRes.body.data.name, "Apple Pie");
  });
});
