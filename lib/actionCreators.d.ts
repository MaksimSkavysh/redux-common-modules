import * as T from "runtypes";
import { ActionCreator } from "./types";
declare type Validator = (data: any) => void;
export declare const commonActionCreator: (module: string) => (name: string, payloadValidator?: T.Runtype<unknown> | Validator | undefined, metaValidator?: T.Runtype<unknown> | Validator | undefined) => ActionCreator<any, void | object>;
export {};
