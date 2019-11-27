import * as T from 'runtypes';
import { ActionCreator, AnyAction } from "./types";
declare type Validator = (data: any) => void;
export declare const commonActionCreator: (module: string) => (name: string, payloadValidator?: T.Runtype<unknown> | Validator | undefined, metaValidator?: T.Runtype<unknown> | Validator | undefined) => ActionCreator<any, void | object>;
export declare const commonModule: (params: {
    module: string;
    initialState: any;
    normalize?: boolean | undefined;
}) => {
    reducer: import("./types").Reducer<any, AnyAction>;
    add: ActionCreator<{
        value: {};
        id: string;
    } & {
        position?: number | undefined;
    }, void | object>;
    remove: ActionCreator<{
        id: string;
    }, void | object>;
};
export {};
