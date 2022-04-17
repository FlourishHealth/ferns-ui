import winston from "winston";
export declare const logger: winston.Logger;
export interface LoggingOptions {
    level?: "debug" | "info" | "warn" | "error";
    transports?: winston.transport[];
    disableFileLogging?: boolean;
    disableConsoleLogging?: boolean;
    disableConsoleColors?: boolean;
    logDirectory?: string;
}
export declare function setupLogging(options?: LoggingOptions): void;
