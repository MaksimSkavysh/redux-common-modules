import { AnyAction } from "./types";
declare type Validator = (data: any) => void;
declare type ActionCreator<P = any> = {
    (payload: P, meta: object | void): AnyAction;
    type: string;
};
export declare const commonActionCreator: (module: string) => (name: string, payloadValidator?: Validator | undefined, metaValidator?: Validator | undefined) => ActionCreator<any>;
export {};
