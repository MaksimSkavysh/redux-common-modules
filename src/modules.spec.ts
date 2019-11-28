import { createStore } from 'redux'
import { commonModule } from './modules'
import { createReducer } from "./reducers"

test("Test Add action", () => {
    const { reducer, add } = commonModule({ module: 'TEST', initialState: {} })
    const state = {}
    const payload = { id: 't1', value: { name: 't1' } }
    const action = add(payload)
    expect(action).toEqual({ type: 'TEST/ADD', payload: payload })
    // @ts-ignore
    expect(() => add({ id: 1, value: 'asd' })).toThrow()
    expect(() => add({ id: '', value: 'asd' })).toThrow()
    // @ts-ignore
    expect(() => add({ id: 'id-1' })).toThrow()
    expect(reducer(state, action)).toEqual({
        t1: {
            id: "t1",
            name: "t1"
        }
    })
})

const {
    reducer,
    add,
    patch,
    remove,
    swapItems,
    setOrder,
    set,
    reset,
} = commonModule({ module: 'TEST', initialState: {}, normalize: true })
const store = createStore(reducer, {})
const { getState, dispatch } = store

test("Test initial state", () => {
    dispatch(add({ id: 'id1', value: { name: 'n1' } }))
    expect(getState()).toEqual({
        byId: {
            id1: { id: "id1", name: "n1" },
        },
        order: ["id1"]
    })

    dispatch(add({ id: 'id2', value: { name: 'n2', a: { b: 1 } }, position: -1 }))
    expect(getState()).toEqual({
        byId: {
            id1: { id: "id1", name: "n1" },
            id2: { id: "id2", name: "n2", a: { b: 1 } },
        },
        order: ["id1", "id2"]
    })

    dispatch(patch({ id: "id2", value: { name: "patched_name", a: { c: 2 } } }))
    expect(getState()).toEqual({
        byId: {
            id1: { id: "id1", name: "n1" },
            id2: { id: "id2", name: "patched_name", a: { c: 2 } },
        },
        order: ["id1", "id2"]
    })

    dispatch(swapItems({ from: 0, to: 1 }))
    expect(getState().order).toEqual(["id2", "id1"])

    dispatch(setOrder(["id1", "id2"]))
    expect(getState().order).toEqual(["id1", "id2"])

    dispatch(remove({ id: "id2" }))
    expect(getState()).toEqual({
        byId: {
            id1: { id: "id1", name: "n1" },
        },
        order: ["id1"]
    })

    dispatch(reset({}))
    expect(getState()).toEqual({ byId: {}, order: [] })

    dispatch(set({
        id1: { id: "id1", name: "n1" },
    }))
    expect(getState()).toEqual({
        byId: {
            id1: { id: "id1", name: "n1" },
        },
        order: [ "id1" ]
    })
})
