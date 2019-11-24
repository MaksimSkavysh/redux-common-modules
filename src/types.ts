import * as T from "runtypes"

export interface Action<T = any> {
    type: T
}

export interface AnyAction extends Action {
    [extraProps: string]: any
}

export type Reducer<S = any, A extends Action = AnyAction> = (
    state: S | undefined,
    action: A
) => S

export type ReducersMapObject<S = any, A extends Action = AnyAction> = {
    [key: string]: Reducer<S, A>
}

export const notEmptyStringGuard = T.String.withConstraint(s => s.length > 0)

export const actionGuard = T.Record({ type: notEmptyStringGuard })

export const idGuard = T.String
    .withConstraint(s => s.length > 0 || 'Empty string could not be Id').Or(T.Number)

export const pathGuard = T.Array(idGuard)
    .withConstraint(a => a.length > 0 || 'Path with length 0 is not allowed')
