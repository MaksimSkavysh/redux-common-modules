import * as T from 'runtypes';
import { ActionCreator } from "./types";
declare type Validator = (data: any) => void;
export declare const commonActionCreator: (module: string) => (name: string, payloadValidator?: T.Runtype<unknown> | Validator | undefined, metaValidator?: T.Runtype<unknown> | Validator | undefined) => ActionCreator<any>;
export declare const commonModule: (params: {
    module: string;
    initialState: any;
    normalize?: boolean | undefined;
}) => {
    add: ActionCreator<{
        id: string | number;
    } & {
        value: unknown;
    } & {
        position?: number | undefined;
    }>;
    remove: ActionCreator<any>;
    patch: ActionCreator<any>;
    set: ActionCreator<any>;
    reset: ActionCreator<any>;
    patchPath: ActionCreator<any>;
    assocPath: ActionCreator<any>;
    dissocPath: ActionCreator<any>;
    setOrder: ActionCreator<any>;
    swapItems: ActionCreator<any>;
};
export {};
