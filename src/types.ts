import * as T from "runtypes"

export interface Action<T = any> {
    type: T
}

export interface AnyAction extends Action {
    [extraProps: string]: any
}

export type ActionCreator<P = any> = {
    (payload: P, meta: object | void): AnyAction,
    type: string
}


export type Reducer<S = any, A extends Action = AnyAction> = (
    state: S | undefined,
    action: A
) => S

export type ReducersMapObject<S = any, A extends Action = AnyAction> = {
    [key: string]: Reducer<S, A>
}

export const notEmptyStringGuard = T.String.withConstraint(s => s.length > 0)
