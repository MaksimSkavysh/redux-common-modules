import { ActionCreator } from "./types";
export declare const commonModule: (params: {
    module: string;
    initialState: any;
    normalize?: boolean | undefined;
}) => {
    reducer: import("./types").Reducer<any, import("./types").AnyAction>;
    add: ActionCreator<{
        id: string;
        value: {};
    } & {
        position?: number | undefined;
    }, void | object>;
    remove: ActionCreator<{
        id: string;
    }, void | object>;
};
