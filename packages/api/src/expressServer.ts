import * as Sentry from "@sentry/node";
import axios from "axios";
import cron from "cron";
import express, {Router} from "express";
import cloneDeep from "lodash/cloneDeep";
import onFinished from "on-finished";
import passport from "passport";

import {logger, LoggingOptions, setupLogging} from "./logger";
import {Env, setupAuth, UserModel as UserMongooseModel} from "./mongooseRestFramework";

const SLOW_READ_MAX = 200;
const SLOW_WRITE_MAX = 500;

export function setupErrorLogging() {
  const dsn = (process.env as Env).SENTRY_DSN;
  if (process.env.NODE_ENV === "production") {
    if (!dsn) {
      throw new Error("You must set SENTRY_DSN in the environment.");
    }
    Sentry.init({dsn});
  }
}

export type AddRoutes = (router: Router) => void;

const logRequestsFinished = function (req: any, res: any, startTime: [number, number]) {
  const diff = process.hrtime(startTime);
  const diffInMs = Math.round(diff[0] * 1000 + diff[1] * 0.000001);
  let pathName = "unknown";
  if (req.route && req.routeMount) {
    pathName = `${req.routeMount}${req.route.path}`;
  } else if (req.route) {
    pathName = req.route.path;
  } else if (res.statusCode < 400) {
    logger.warn(`Request without route: ${req.originalUrl}`);
  }

  logger.debug(`${req.method} -> ${req.originalUrl} ${res.statusCode} ${`${diffInMs}ms`}`);
  if (diffInMs > SLOW_READ_MAX && req.method === "GET") {
    logger.warn("Slow GET request", {
      requestTime: diffInMs,
      pathName,
      url: req.originalUrl,
    });
  } else if (diffInMs > SLOW_WRITE_MAX) {
    logger.warn("Slow write request", {
      requestTime: diffInMs,
      pathName,
      url: req.originalUrl,
    });
  }
};

function logRequests(req: any, res: any, next: any) {
  const startTime = process.hrtime();

  let userString = "";
  if (req.user) {
    userString = ` <${req.user?.admin ? "Admin" : req.user?.testUser ? "Test User" : "User"}:${
      req.user.id
    }>`;
  }

  let body = "";
  if (req.body && Object.keys(req.body).length > 0) {
    const bodyCopy = cloneDeep(req.body);
    if (bodyCopy.password) {
      bodyCopy.password = "<PASSWORD>";
    }
    body = ` Body: ${JSON.stringify(bodyCopy)}`;
  }

  logger.debug(`${req.method} <- ${req.url}${userString}${body}`);
  onFinished(res, () => logRequestsFinished(req, res, startTime));
  next();
}

export function createRouter(
  rootPath: string,
  addRoutes: (router: Router) => void,
  middleware: any[] = []
) {
  function routePathMiddleware(req: any, res: any, next: any) {
    if (!req.routeMount) {
      req.routeMount = [];
    }
    req.routeMount.push(rootPath);
    next();
  }

  const router = express.Router();
  router.use(routePathMiddleware);
  addRoutes(router);
  return [rootPath, ...middleware, router];
}

export function createRouterWithAuth(
  rootPath: string,
  addRoutes: (router: Router) => void,
  middleware: any[] = []
) {
  return createRouter(rootPath, addRoutes, [
    passport.authenticate("firebase-jwt", {session: false}),
    ...middleware,
  ]);
}

function initializeRoutes(UserModel: UserMongooseModel, addRoutes: AddRoutes) {
  if (!process.env.SESSION_SECRET && process.env.NODE_ENV === "production") {
    throw new Error("You must provide a SESSION_SECRET in env.");
  }

  const app = express();

  app.use(Sentry.Handlers.requestHandler());

  app.all("/*", function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "*");
    if (req.method === "OPTIONS") {
      res.send(200);
    } else {
      next();
    }
  });

  app.use(express.json());

  app.use(logRequests);

  setupAuth(app as any, UserModel as any);

  // Adds all the user
  addRoutes(app);

  // The error handler must be before any other error middleware and after all controllers
  app.use(Sentry.Handlers.errorHandler());

  app.use(function onError(_err: any, _req: any, res: any, _next: any) {
    logger.error("Fallthrough error", _err);
    res.statusCode = 500;
    res.end(`${res.sentry}\n`);
  });

  logger.debug("Listening on routes:");
  app._router.stack.forEach((r: any) => {
    if (r.route && r.route.path) {
      logger.debug(`[Route] ${r.route.path}`);
    }
  });

  return app;
}

export interface SetupServerOptions {
  userModel: UserMongooseModel;
  addRoutes: AddRoutes;
  loggingOptions?: LoggingOptions;
  skipListen?: boolean;
}

// Sets up the routes and returns a function to launch the API.
export function setupServer(options: SetupServerOptions) {
  const UserModel = options.userModel;
  const addRoutes = options.addRoutes;

  setupLogging(options.loggingOptions);

  let app: express.Application;
  try {
    app = initializeRoutes(UserModel, addRoutes);
  } catch (e) {
    logger.error("Error initializing routes", e);
    throw e;
  }

  if (!options.skipListen) {
    const port = process.env.PORT || "9000";
    try {
      app.listen(port, () => {
        logger.info(`Listening at on port ${port}`);
      });
    } catch (err) {
      logger.error(`Error trying to start HTTP server: ${err}\n${(err as any).stack}`);
      process.exit(1);
    }
  }
  return app;
}

// Convenience method to execute cronjobs with an always-running server.
export function cronjob(
  name: string,
  schedule: "hourly" | "minutely" | string,
  callback: () => void
) {
  if (schedule === "hourly") {
    schedule = "0 * * * *";
  } else if (schedule === "minutely") {
    schedule = "* * * * *";
  }
  logger.info(`Adding cronjob ${name}, running at: ${schedule}`);
  try {
    new cron.CronJob({
      cronTime: schedule,
      onTick: callback,
      start: true,
      timeZone: "America/Chicago",
    });
  } catch (e) {
    throw new Error(`Failed to create cronjob: ${e}`);
  }
}

// Convenience method to send data to a Slack webhook.
export async function sendToSlack(text: string, channel = "bots") {
  const slackWebhookUrl = (process.env as Env).SLACK_WEBHOOK;
  if (!slackWebhookUrl) {
    throw new Error("You must set SLACK_WEBHOOK in the environment.");
  }
  try {
    await axios.post(slackWebhookUrl, {
      text,
      channel,
    });
  } catch (e) {
    logger.error("Error posting to slack", (e as any).text);
  }
}

export interface WrapScriptOptions {
  onFinish?: (result?: any) => void | Promise<void>;
  terminateTimeout?: number; // in seconds, defaults to 300. Set to 0 to have no termination timeout.
  slackChannel?: string;
}
// Wrap up a script with some helpers, such as catching errors, reporting them to sentry, notifying
// Slack of runs, etc. Also supports timeouts.
export async function wrapScript(func: () => Promise<any>, options: WrapScriptOptions = {}) {
  const name = require.main?.filename.split("/").slice(-1)[0].replace(".ts", "");
  logger.info(`Running script ${name}`);
  sendToSlack(`Running script ${name}`, options.slackChannel);

  if (options.terminateTimeout !== 0) {
    const warnTime = ((options.terminateTimeout ?? 300) / 2) * 1000;
    const closeTime = (options.terminateTimeout ?? 300) * 1000;
    setTimeout(() => {
      const msg = `Script ${name} is taking a while, currently ${warnTime / 1000} seconds`;
      sendToSlack(msg);
      logger.warn(msg);
    }, warnTime);

    setTimeout(async () => {
      const msg = `Script ${name} took too long, exiting`;
      await sendToSlack(msg);
      logger.error(msg);
      Sentry.captureException(new Error(`Script ${name} took too long, exiting`));
      await Sentry.flush();
      process.exit(2);
    }, closeTime);
  }

  let result: any;
  try {
    result = await func();
    if (options.onFinish) {
      await options.onFinish(result);
    }
  } catch (e) {
    Sentry.captureException(e);
    logger.error(`Error running script ${name}: ${e}\n${(e as Error).stack}`);
    sendToSlack(`Error running script ${name}: ${e}\n${(e as Error).stack}`);
    await Sentry.flush();
    process.exit(1);
  }
  await sendToSlack(`Success running script ${name}: ${result}`);
  // Unclear why we have to exit here to prevent the script for continuing to run.
  process.exit(0);
}
