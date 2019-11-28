import * as T from 'runtypes'
import { notEmptyStringGuard, Reducer, ReducersMapObject, AnyAction } from "./types"
import * as R from "ramda"
export const composeReducers = (...reducers: Reducer[]): Reducer => (state, action) =>
    reducers.reduceRight((curState, reducer) => reducer(curState, action), state)

export const createReducer = (initialState: any, reducersMap: ReducersMapObject) : Reducer => {
    Object.keys(reducersMap).forEach((key) => {
        if (!notEmptyStringGuard.guard(key) || !T.Function.guard(reducersMap[key])) {
            throw new Error('Wrong handlers map type, should be: { [actionType]: reducerFunction }')
        }
    })
    return (state = initialState, action) => {
        if (action.type && reducersMap[action.type]) {
            return reducersMap[action.type](state, action)
        }
        return state
    }
}

type Path = (string | number)[] | string
type GetPathFunction = (arg: AnyAction) => Path
const pathCheck = (a: Path) => a.length > 0 || 'Path with length 0 is not allowed'
const idGuard = T.String
    .withConstraint(s => s.length > 0 || 'Empty string could not be Id').Or(T.Number)
const reducerPathGuard = T.String.withConstraint(pathCheck)
    .Or(T.Array(idGuard).withConstraint(pathCheck))

export const reducerWithPath = (initialState: any, getPath: GetPathFunction, reducer: Reducer): Reducer =>
    (state, action) => {
        let path = getPath(action)
        if (path && reducerPathGuard.guard(path)) {
            if (typeof path == "string") {
                path = path.split('.')
            }
            const inner = R.path(path, state)
            return R.assocPath(path, reducer(inner, action), state)
        }
        return state || {}
    }
