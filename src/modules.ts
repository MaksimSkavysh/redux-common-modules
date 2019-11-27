import * as T from 'runtypes'
import * as R from 'ramda'
import { ActionCreator, AnyAction, ModuleAction } from "./types"
import { createReducer } from "./reducers"

type Validator = (data: any) => void
const validate = (data: any, validator?: Validator | T.Runtype) => {
    if (validator) {
        if ((validator as T.Runtype).check) {
            (validator as T.Runtype).check(data)
        } else {
            (validator as Validator)(data)
        }
    }
}

export const commonActionCreator = (module: string) =>
    (
        name: string,
        payloadValidator?: Validator | T.Runtype,
        metaValidator?: Validator | T.Runtype
    ): ActionCreator => {
        const type = `${module}/${name}`
        const ac: ActionCreator = (payload, meta) => {
            validate(payload, payloadValidator)
            validate(meta, metaValidator)
            return { type, payload, meta }
        }
        ac.type = type
        ac.toString = () => type
        return ac
    }


// Trivial types
const check = (guard: T.Runtype) => (data: any) => guard.check(data)

const id = T.String.withConstraint(s => s.length > 0 || 'Empty id')
const pathGuard = T.Array(id).withConstraint(a => a.length > 0 || 'path with length 0 is not allowed')
const positionGuard = T.Number.Or(T.Undefined)
const valueGuard = T.Record({})

// Composite types
const withIdGuard = { id }
const withPathGuard = { path: pathGuard }
const withValueGuard = { value: valueGuard }
const withPositionGuard = { position: positionGuard }

const AddGuard = T.Record({ ...withIdGuard, ...withValueGuard, ...withPositionGuard })
    .And(T.Partial(withPositionGuard))
type AddPayload = T.Static<typeof AddGuard>

export const commonModule = (params: { module: string, initialState: any, normalize?: boolean }) => {
    const { module, initialState, normalize = false } = params
    const moduleActions = commonActionCreator(module)

    const add: ActionCreator<AddPayload> = moduleActions('ADD', AddGuard)
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
        [add.type]: (state, action) => {
            const data: AddPayload = action.payload
            return R.assoc(data.id, { ...data.value, id: data.id }, state)
        },
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
