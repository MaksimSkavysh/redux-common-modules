import { ActionCreator, AnyAction, Reducer } from "./types";
declare type SwapItemsPayload = {
    from: number;
    to: number;
};
export declare const commonModule: (params: {
    module: string;
    initialState: any;
    normalize?: boolean | undefined;
}) => {
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
    set: ActionCreator<any, void | object>;
    reset: ActionCreator<any, void | object>;
    setOrder: ActionCreator<string[], void | object>;
    swapItems: ActionCreator<SwapItemsPayload, void | object>;
    patchDeep: ActionCreator<{
        id: string;
        value: {};
    }, void | object>;
};
export {};
