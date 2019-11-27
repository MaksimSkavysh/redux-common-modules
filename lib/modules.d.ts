import * as T from 'runtypes';
import { ActionCreator } from "./types";
declare type Validator = (data: any) => void;
export declare const commonActionCreator: (module: string) => (name: string, payloadValidator?: T.Runtype<unknown> | Validator | undefined, metaValidator?: T.Runtype<unknown> | Validator | undefined) => ActionCreator<any, void | object>;
export declare const commonModule: (params: {
    module: string;
    initialState: any;
    normalize?: boolean | undefined;
}) => {
    add: ActionCreator<{
        position: number | undefined;
        value: {};
        id: string;
    } & {
        position?: number | undefined;
    }, void | object>;
    remove: ActionCreator<any, void | object>;
    patch: ActionCreator<any, void | object>;
    set: ActionCreator<any, void | object>;
    reset: ActionCreator<any, void | object>;
    patchPath: ActionCreator<any, void | object>;
    assocPath: ActionCreator<any, void | object>;
    dissocPath: ActionCreator<any, void | object>;
    setOrder: ActionCreator<any, void | object>;
    swapItems: ActionCreator<any, void | object>;
};
export {};
