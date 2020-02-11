import { ActionCreator, AnyAction, Reducer } from "./types";
export declare const trivialModule: (module: string, initialValue?: any) => {
    reducer: Reducer<any, AnyAction>;
    set: ActionCreator<any, void | object>;
    reset: ActionCreator<void, void | object>;
};
export declare const commonModule: (module: string, initialState?: object) => {
    reducer: Reducer<any, AnyAction>;
    add: ActionCreator<{
        id: string;
        value: {};
    } & {
        position?: number | undefined;
    }, void | object>;
    remove: ActionCreator<{
        id: string;
    }, void | object>;
    patch: ActionCreator<{
        id: string;
        value: {};
    }, void | object>;
    set: ActionCreator<object, void | object>;
    reset: ActionCreator<void, void | object>;
    patchDeep: ActionCreator<{
        id: string;
        value: {};
    }, void | object>;
};
declare type SwapItemsPayload = {
    from: number;
    to: number;
};
export declare const commonModuleNormalized: (module: string, initialState?: {}) => {
    reducer: import("redux").Reducer<{
        byId: any;
        order: any;
    }, import("redux").AnyAction>;
    add: ActionCreator<{
        id: string;
        value: {};
    } & {
        position?: number | undefined;
    }, void | object>;
    remove: ActionCreator<{
        id: string;
    }, void | object>;
    patch: ActionCreator<{
        id: string;
        value: {};
    }, void | object>;
    set: ActionCreator<object, void | object>;
    reset: ActionCreator<void, void | object>;
    setOrder: ActionCreator<string[], void | object>;
    swapItems: ActionCreator<SwapItemsPayload, void | object>;
    patchDeep: ActionCreator<{
        id: string;
        value: {};
    }, void | object>;
};
export {};
