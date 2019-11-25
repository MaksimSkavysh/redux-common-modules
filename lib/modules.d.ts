import { AnyAction } from "./types";
export declare const EMPTY_OBJECT: Readonly<{}>;
export declare const EMPTY_ARRAY: readonly never[];
declare type Validator = (data: any) => void;
declare type ActionCreator = {
    (payload: any, meta: object | void): AnyAction;
    type: string;
};
export declare const commonActionCreator: (module: string) => (name: string, payloadValidator?: Validator | undefined, metaValidator?: Validator | undefined) => ActionCreator;
export {};
