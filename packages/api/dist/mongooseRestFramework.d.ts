import express from "express";
import { Model, ObjectId, Schema } from "mongoose";
export interface Env {
    NODE_ENV?: string;
    PORT?: string;
    SENTRY_DSN?: string;
    SLACK_WEBHOOK?: string;
    TOKEN_SECRET?: string;
    TOKEN_EXPIRES_IN?: string;
    TOKEN_ISSUER?: string;
    SESSION_SECRET?: string;
}
export declare type RESTMethod = "list" | "create" | "read" | "update" | "delete";
interface GooseTransformer<T> {
    transform?: (obj: Partial<T>, method: "create" | "update", user?: User) => Partial<T> | undefined;
    serialize?: (obj: T, user?: User) => Partial<T> | undefined;
}
interface User {
    _id: ObjectId | string;
    id: string;
    admin: boolean;
    isAnonymous?: boolean;
    token?: string;
}
export interface UserModel extends Model<User> {
    createAnonymousUser?: (id?: string) => Promise<User>;
    postCreate?: (body: any) => Promise<void>;
    createStrategy(): any;
    serializeUser(): any;
    deserializeUser(): any;
}
export declare type PermissionMethod<T> = (method: RESTMethod, user?: User, obj?: T) => boolean | Promise<boolean>;
interface RESTPermissions<T> {
    create: PermissionMethod<T>[];
    list: PermissionMethod<T>[];
    read: PermissionMethod<T>[];
    update: PermissionMethod<T>[];
    delete: PermissionMethod<T>[];
}
interface GooseRESTOptions<T> {
    permissions: RESTPermissions<T>;
    queryFields?: string[];
    queryFilter?: (user?: User, query?: Record<string, any>) => Record<string, any> | null;
    transformer?: GooseTransformer<T>;
    sort?: string | {
        [key: string]: "ascending" | "descending";
    };
    defaultQueryParams?: {
        [key: string]: any;
    };
    populatePaths?: string[];
    defaultLimit?: number;
    maxLimit?: number;
    endpoints?: (router: any) => void;
    preCreate?: (value: any, request: express.Request) => T | null;
    preUpdate?: (value: any, request: express.Request) => T | null;
    preDelete?: (value: any, request: express.Request) => T | null;
    postCreate?: (value: any, request: express.Request) => void | Promise<void>;
    postUpdate?: (value: any, request: express.Request) => void | Promise<void>;
    postDelete?: (request: express.Request) => void | Promise<void>;
}
export declare const OwnerQueryFilter: (user?: User | undefined) => {
    ownerId: string;
} | null;
export declare const Permissions: {
    IsAuthenticatedOrReadOnly: (method: RESTMethod, user?: User | undefined) => boolean;
    IsOwnerOrReadOnly: (method: RESTMethod, user?: User | undefined, obj?: any) => boolean;
    IsAny: () => boolean;
    IsOwner: (method: RESTMethod, user?: User | undefined, obj?: any) => any;
    IsAdmin: (method: RESTMethod, user?: User | undefined) => boolean;
    IsAuthenticated: (method: RESTMethod, user?: User | undefined) => boolean;
};
export declare function checkPermissions<T>(method: RESTMethod, permissions: PermissionMethod<T>[], user?: User, obj?: T): Promise<boolean>;
export declare function tokenPlugin(schema: Schema, options?: {
    expiresIn?: number;
}): void;
export interface BaseUser {
    admin: boolean;
    email: string;
}
export declare function baseUserPlugin(schema: Schema): void;
export interface IsDeleted {
    deleted: boolean;
}
export declare function isDeletedPlugin(schema: Schema, defaultValue?: boolean): void;
export interface CreatedDeleted {
    updated: Date;
    created: Date;
}
export declare function createdDeletedPlugin(schema: Schema): void;
export declare function firebaseJWTPlugin(schema: Schema): void;
export declare function authenticateMiddleware(anonymous?: boolean): any;
export declare function signupUser(userModel: UserModel, email: string, password: string, body?: any): Promise<any>;
export declare function setupAuth(app: express.Application, userModel: UserModel): void;
export declare function AdminOwnerTransformer<T>(options: {
    anonReadFields?: string[];
    authReadFields?: string[];
    ownerReadFields?: string[];
    adminReadFields?: string[];
    anonWriteFields?: string[];
    authWriteFields?: string[];
    ownerWriteFields?: string[];
    adminWriteFields?: string[];
}): GooseTransformer<T>;
export declare function gooseRestRouter<T>(model: Model<any>, options: GooseRESTOptions<T>): express.Router;
export {};
