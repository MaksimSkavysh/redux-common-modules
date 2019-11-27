import * as T from 'runtypes'
import * as R from 'ramda'
import { ActionCreator } from "./types"
import { createReducer } from "./reducers"

type Validator = (data: any) => void

function isRuntype(v: Validator | T.Runtype): v is T.Runtype {
    return (v as T.Runtype).check !== undefined;
}

export const commonActionCreator = (module: string) =>
    (
        name: string,
        payloadValidator?: Validator | T.Runtype,
        metaValidator?: Validator | T.Runtype
    ): ActionCreator => {
        const type = `${module}/${name}`
        const ac: ActionCreator = (payload, meta) => {
            if (payloadValidator) {
                isRuntype(payloadValidator) ? payloadValidator.check(payload) : payloadValidator(payload)
            }
            if (metaValidator) {
                isRuntype(metaValidator) ? metaValidator.check(meta) : metaValidator(meta)
            }
            return { type, payload, meta }
        }
        ac.type = type
        ac.toString = () => type
        return ac
    }


// Trivial types
const check = (guard: T.Runtype) => (data: any) => guard.check(data)

const idGuard = T.String.withConstraint(s => s.length > 0 || 'Empty id').Or(T.Number)
const pathGuard = T.Array(idGuard).withConstraint(a => a.length > 0 || 'path with length 0 is not allowed')
const positionGuard = T.Number
const valueGuard = T.Unknown

type Id = T.Static<typeof idGuard>
type Path = T.Static<typeof pathGuard>
type Position = T.Static<typeof positionGuard>
type Value = T.Static<typeof valueGuard>

// Composite types
const withIdGuard = T.Record({ id: idGuard })
const withPathGuard = T.Record({ path: pathGuard })
const withValueGuard = T.Record({ value: valueGuard })
const withPositionGuard = T.Partial({ position: positionGuard })

const AddGuard = withIdGuard.And(withValueGuard).And(withPositionGuard)
type AddPayload = ActionCreator<T.Static<typeof AddGuard>>

export const commonModule = (params: { module: string, initialState: any, normalize?: boolean }) => {
    const { module, initialState, normalize = false } = params
    const moduleActions = commonActionCreator(module)

    const add: AddPayload = moduleActions('ADD', AddGuard)
    const remove = moduleActions('REMOVE')
    const patch = moduleActions('PATCH')
    const set = moduleActions('SET')
    const reset = moduleActions('RESET')

    const patchPath = moduleActions('PATCH_PATH')
    const assocPath = moduleActions('SET_PATH')
    const dissocPath = moduleActions('RESET_PATH')

    const setOrder = moduleActions('SET_ORDER')
    const swapItems = moduleActions('MOVE_ORDER')

    const byIdReducer = createReducer(initialState, {
        // [add.type]: (state: typeof initialState, { payload }) => {
        //     const data = idValueType.check(payload)
        //     return R.assoc(data.id, { ...data.value, id: data.id }, state)
        // },
        // [remove]: (state, { payload: { id } }) => {
        //     pathType.check(ids)
        //     return R.omit(ids, state)
        // },
        // [patch]: (state, { payload }) => {
        //     const data = idValueType.check(payload)
        //     return R.over(R.lensProp(data.id), R.mergeLeft(data.value), state)
        // },
        // [set]: (_state, { payload }) => T.Unknown.withConstraint(isNotNil).check(payload),
        // [reset]: R.always(initialState),
        // [patchPath]: (state, { payload }) => {
        //     const data = pathValueType.check(payload)
        //     return R.over(R.lensPath(data.path), R.mergeLeft(data.value), state)
        // },
        // [assocPath]: (state, { payload }) => {
        //     const data = pathValueType.check(payload)
        //     return R.assocPath(data.path, data.value, state)
        // },
        // [dissocPath]: (state, { payload: { path } }) => {
        //     R.dissocPath(pathType.check(path), state)
        // },
    })
    //
    // const orderReducer = normalize && createReducer(Object.keys(initialState), {
    //     [add]: (state, { payload: { id, position = 0 } }) => R.insert(position, id, state),
    //     [remove]: (state, { payload: { id } }) => state.filter(item => item !== id),
    //     [set]: (_state, { payload }) => Object.keys(payload),
    //     [reset]: Object.keys(initialState),
    //
    //     [setOrder]: (_state, { payload }) => T.Array(idType).check(payload),
    //     [swapItems]: (state, { payload: { from, to } }) => {
    //         const inCurrentRange = inRange(0, state.length)
    //         T.Record({
    //             from: T.Number.withConstraint(inCurrentRange),
    //             to: T.Number.withConstraint(inCurrentRange),
    //         })
    //         return R.move(from, to, state)
    //     },
    // })
    //
    // const reducer = normalize ? combineReducers({ byId: byIdReducer, order: orderReducer }) : byIdReducer
    //
    return {
        // reducer,
        add,
        remove,
        patch,
        set,
        reset,
        patchPath,
        assocPath,
        dissocPath,
        setOrder,
        swapItems,
    }
}
