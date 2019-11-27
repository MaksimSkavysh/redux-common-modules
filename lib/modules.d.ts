import { ActionCreator } from "./types";
export declare const commonModule: (params: {
    module: string;
    initialState: any;
    normalize?: boolean | undefined;
}) => {
    reducer: import("./types").Reducer<any, import("./types").AnyAction>;
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
