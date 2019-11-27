import * as T from "runtypes"

export interface Action<T = any> {
    type: T
}

export interface AnyAction extends Action {
    [extraProps: string]: any
}

export interface ModuleAction<P = any, M = any> extends AnyAction {
    payload: P,
    meta?: M,
}

export type ActionCreator<P = any, M = object | void> = {
    (payload: P, meta?: M): ModuleAction<P, M>,
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
