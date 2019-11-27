import * as T from "runtypes";
export interface Action<T = any> {
    type: T;
}
export interface AnyAction extends Action {
    [extraProps: string]: any;
}
export declare type ActionCreator<P = any> = {
    (payload: P, meta: object | void): AnyAction;
    type: string;
};
export declare type Reducer<S = any, A extends Action = AnyAction> = (state: S | undefined, action: A) => S;
export declare type ReducersMapObject<S = any, A extends Action = AnyAction> = {
    [key: string]: Reducer<S, A>;
};
export declare const notEmptyStringGuard: T.Constraint<T.String, string, unknown>;
