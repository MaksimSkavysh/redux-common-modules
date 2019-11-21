import * as T from 'runtypes'
import * as R from 'ramda'
type reducerType = (state: any, action: any) => any
type validatorType = (data: any) => void

export const EMPTY_OBJECT = Object.freeze({})
export const EMPTY_ARRAY = Object.freeze([])

export const composeReducers = (...reducers: reducerType[]) => (state: any, action: any) =>
    reducers.reduceRight((curState, reducer) => reducer(curState, action), state)


const idType = T.String.withConstraint(s => s.length > 0 || 'Empty id').Or(T.Number)
const pathType = T.Array(idType).withConstraint(a => a.length > 0 || 'path with length 0 is not allowed')
const valueType = T.Unknown
const idValueType = T.Record({ id: idType, value: valueType })
const pathValueType = T.Record({ path: pathType, value: valueType })

export const reducerWithPath = (reducer: reducerType, getPath: (arg: any) => (string | number)[]) =>
    (state: any, action: any) => {
        let path = getPath(action)
        if (path) {
            pathType.check(path)
            const inner = R.path(path, state)
            return R.assocPath(path, reducer(inner, action), state)
        }
        return state || EMPTY_OBJECT
    }

export const commonActionCreator = (module: string) =>
    (name: string, payloadValidator?: (data: any) => void, metaValidator?: (data: any) => void) => {
        const type = `${module}/${name}`
        const ac = (payload: any, meta: object | void) => {
            payloadValidator && payloadValidator(payload)
            metaValidator && metaValidator(meta)
            return { type, payload, meta }
        }
        ac.type = type
        ac.toString = () => type
        return ac
    }
