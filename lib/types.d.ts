import * as T from "runtypes";
export interface Action<T = any> {
    type: T;
}
export interface AnyAction extends Action {
    [extraProps: string]: any;
}
export declare type Reducer<S = any, A extends Action = AnyAction> = (state: S | undefined, action: A) => S;
export declare type ReducersMapObject<S = any, A extends Action = AnyAction> = {
    [key: string]: Reducer<S, A>;
};
export declare const notEmptyStringGuard: T.Constraint<T.String, string, unknown>;
export declare const actionGuard: T.Record<{
    type: T.Constraint<T.String, string, unknown>;
}, false>;
export declare const idGuard: T.Union2<T.Constraint<T.String, string, unknown>, T.Number>;
export declare const pathGuard: T.Constraint<T.Array<T.Union2<T.Constraint<T.String, string, unknown>, T.Number>, false>, (string | number)[], unknown>;
