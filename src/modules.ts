import * as T from 'runtypes'
import * as R from 'ramda'
import { ActionCreator, AnyAction, Reducer } from "./types"
import { createReducer } from "./reducers"
import { commonActionCreator } from "./actionCreators"
import { combineReducers } from "redux"

export const trivialModule = (module: string, initialValue: any = null) => {
    const moduleActions = commonActionCreator(module)

    const set: ActionCreator<any> = moduleActions('SET')
    const reset: ActionCreator<void> = moduleActions('RESET')
    const reducer = createReducer(initialValue, {
        [set.type]: (_, { payload }) => payload,
        [reset.type]: () => initialValue,
    })
    return {
        reducer,
        set,
        reset,
    }
}


// Trivial types
const idGuard = T.String.withConstraint(s => s.length > 0 || 'Empty id')
const pathGuard = T.Array(idGuard).withConstraint(a => a.length > 0 || 'path with length 0 is not allowed')
const positionGuard = T.Number
const valueGuard = T.Record({})

// Composite types
const withIdGuard = { id: idGuard }
const withValueGuard = { value: valueGuard }
const witIdValue = { id: idGuard, value: valueGuard }
const withPathGuard = { path: pathGuard }
const withPositionGuard = { position: positionGuard }


const AddGuard = T.Record(witIdValue).And(T.Partial(withPositionGuard))
type AddPayload = T.Static<typeof AddGuard>

const RemoveGuard = T.Record(withIdGuard)
type RemovePayload = T.Static<typeof RemoveGuard>

const PatchGuard = T.Record(witIdValue)
type PatchPayload = T.Static<typeof PatchGuard>

const PatchDeepGuard = T.Record(witIdValue)
type PatchDeepPayload = T.Static<typeof PatchGuard>

export const commonModule = (module: string, initialState: object = {}) => {
    T.String.check(module)
    const moduleActions = commonActionCreator(module)

    const add: ActionCreator<AddPayload> = moduleActions('ADD', AddGuard)
    const remove: ActionCreator<RemovePayload> = moduleActions('REMOVE', RemoveGuard)
    const patch: ActionCreator<PatchPayload> = moduleActions('PATCH', PatchGuard)
    const set: ActionCreator<typeof initialState> = moduleActions('SET')
    const reset: ActionCreator<void> = moduleActions('RESET')
    const patchDeep: ActionCreator<PatchDeepPayload> = moduleActions('PATCH_PATH', PatchDeepGuard)

    const reducer = createReducer(initialState, {
        [add.type]: (state, action) => {
            const data: AddPayload = action.payload
            return R.assoc(data.id, { ...data.value, id: data.id }, state)
        },
        [remove.type]: (state, { payload }) => {
            const data: RemovePayload = payload
            return R.dissoc(data.id, state)
        },
        [patch.type]: (state, action) => {
            const data: PatchPayload = action.payload
            return R.over(R.lensProp(data.id), R.mergeLeft(data.value), state)
        },
        [set.type]: (_state, { payload }) => payload,
        [reset.type]: R.always(initialState),
        [patchDeep.type]: (state, action) => {
            const data: PatchDeepPayload = action.payload
            return R.over(R.lensProp(data.id), R.mergeDeepLeft(data.value), state)
        },
    })

    return {
        reducer,
        add,
        remove,
        patch,
        set,
        reset,
        patchDeep,
    }
}
const inRange = R.curry((start, end, index) => start <= index && index <= end)

const SetOrderGuard = T.Array(idGuard)
type SetOrderPayload = T.Static<typeof SetOrderGuard>

type SwapItemsPayload = { from: number, to: number }

export const commonModuleNormalized = (module: string, initialState = {}) => {
    const moduleActions = commonActionCreator(module)

    const {
        reducer: byIdReducer,
        add,
        remove,
        reset,
        set,
        patch,
        patchDeep,
    } = commonModule(module, initialState)

    const setOrder: ActionCreator<SetOrderPayload> = moduleActions('SET_ORDER', SetOrderGuard)
    const swapItems: ActionCreator<SwapItemsPayload> = moduleActions('MOVE_ORDER')

    const orderReducer = createReducer(Object.keys(initialState), {
        [add.type]: (state, { payload: { id, position = 0 } }) => {
            const checkPosition = (p: number) =>  p === 0 || (-1 <= p && p < state.length)
                || 'Position should be in range from -1 to state.length -1'
            T.Number.withConstraint(checkPosition).check(position)
            return R.insert(position, id, state)
        },
        [remove.type]: (state, { payload: { id } }) => state.filter((item: any) => item !== id),
        [set.type]: (_state, { payload }) => Object.keys(payload),
        [reset.type]: R.always(Object.keys(initialState)),

        [setOrder.type]: (_state, { payload }) => payload,
        [swapItems.type]: (state, { payload }) => {
            const data: SwapItemsPayload = payload
            const inCurrentRange = inRange(0, state.length)
            T.Record({
                from: T.Number.withConstraint(inCurrentRange),
                to: T.Number.withConstraint(inCurrentRange),
            }).check(data)
            return R.move(data.from, data.to, state)
        },
    })

    const reducer = combineReducers({
        byId: byIdReducer,
        order: orderReducer,
    })

    return {
        reducer,
        add,
        remove,
        patch,
        set,
        reset,
        setOrder,
        swapItems,
        patchDeep,
    }
}
