import { Schema } from "mongoose";
export interface Options {
    saltlen: number;
    iterations: number;
    keylen: number;
    encoding: string;
    digestAlgorithm: string;
}
export declare const passportLocalMongoose: (schema: Schema, opts?: Partial<Options>) => void;
