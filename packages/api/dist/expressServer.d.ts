import express, { Router } from "express";
import { LoggingOptions } from "./logger";
import { UserModel as UserMongooseModel } from "./mongooseRestFramework";
export declare function setupErrorLogging(): void;
export declare type AddRoutes = (router: Router) => void;
export declare function createRouter(rootPath: string, addRoutes: (router: Router) => void, middleware?: any[]): any[];
export declare function createRouterWithAuth(rootPath: string, addRoutes: (router: Router) => void, middleware?: any[]): any[];
export interface SetupServerOptions {
    userModel: UserMongooseModel;
    addRoutes: AddRoutes;
    loggingOptions?: LoggingOptions;
    skipListen?: boolean;
}
export declare function setupServer(options: SetupServerOptions): express.Application;
export declare function cronjob(name: string, schedule: "hourly" | "minutely" | string, callback: () => void): void;
export declare function sendToSlack(text: string, channel?: string): Promise<void>;
export interface WrapScriptOptions {
    onFinish?: (result?: any) => void | Promise<void>;
    terminateTimeout?: number;
    slackChannel?: string;
}
export declare function wrapScript(func: () => Promise<any>, options?: WrapScriptOptions): Promise<void>;
