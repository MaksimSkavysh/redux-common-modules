import { createStore } from 'redux'
import { commonModule } from './modules'
import { createReducer } from "./reducers"

const {
    reducer,
    add,
    remove,
} = commonModule({ module: 'TEST', initialState: {} })

test("Test Add action", () => {
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

