import * as T from 'runtypes'
import * as R from 'ramda'
import { ActionCreator, AnyAction, Reducer } from "./types"
import { createReducer } from "./reducers"
import { commonActionCreator } from "./actionCreators"
import { combineReducers } from "redux"

const inRange = R.curry((start, end, index) => start <= index && index <= end)

// Trivial types
const idGuard = T.String.withConstraint(s => s.length > 0 || 'Empty id')
const pathGuard = T.Array(idGuard).withConstraint(a => a.length > 0 || 'path with length 0 is not allowed')
const positionGuard = T.Number.Or(T.Undefined)
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

const SetOrderGuard = T.Array(idGuard)
type SetOrderPayload = T.Static<typeof SetOrderGuard>

type SwapItemsPayload = { from: number, to: number }

export const commonModule = (params: { module: string, initialState: any, normalize?: boolean }) => {
    const { module, initialState, normalize = false } = params
    const moduleActions = commonActionCreator(module)

    const add: ActionCreator<AddPayload> = moduleActions('ADD', AddGuard)
    const remove: ActionCreator<RemovePayload> = moduleActions('REMOVE', RemoveGuard)
    const patch: ActionCreator<PatchPayload> = moduleActions('PATCH', PatchGuard)
    const set = moduleActions('SET')
    const reset = moduleActions('RESET')
    //
    // const patchPath = moduleActions('PATCH_PATH')
    // const assocPath = moduleActions('SET_PATH')
    // const dissocPath = moduleActions('RESET_PATH')
    //
    const setOrder: ActionCreator<SetOrderPayload> = moduleActions('SET_ORDER', SetOrderGuard)
    const swapItems: ActionCreator<SwapItemsPayload> = moduleActions('MOVE_ORDER')

    const byIdReducer = createReducer(initialState, {
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
    const orderReducer = normalize && createReducer(Object.keys(initialState), {
        [add.type]: (state, { payload: { id, position = 0 } }) => {
            const checkPosition = (p: number) =>  p === 0 || (-1 <= p && p < state.length)
            T.Number.withConstraint(p => checkPosition(p)
                || 'Position should be in range from -1 to state.length -1').check(position)
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
            })
            return R.move(data.from, data.to, state)
        },
    })

    const reducer: Reducer = normalize && orderReducer
        ? combineReducers({byId: byIdReducer, order: orderReducer })
        : byIdReducer

    return {
        reducer,
        add,
        remove,
        patch,
        set,
        reset,
        // patchPath,
        // assocPath,
        // dissocPath,
        setOrder,
        swapItems,
    }
}
