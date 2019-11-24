import { createStore } from 'redux'
import { createReducer, composeReducers, reducerWithPath } from './reducers'

test("Test createReducer", () => {
    const state = { x: 10 }
    const action1 = { type: 'A', value: 2 }
    const action2 = { type: 'B', value: 10 }
    const reducer = createReducer(
        { x: 0 },
        {
            A: (state, action) => ({ x: state.x + action.value }),
            B: (state, action) => ({ x: state.x - action.value }),
        }
    )
    expect(reducer(state, action1)).toEqual({ x: 12 })
    expect(reducer(state, action2)).toEqual({ x: 0 })
})

test("Test createReducer wrong params", () => {
    expect(() => {
        createReducer({}, {
            // @ts-ignore
            A: 1,
        })
    }).toThrow('Wrong handlers map type')
})

test("Test compose reducers", () => {
    const state = { x: 10.5 }
    const action = { type: 'A', value: 2 }
    const reducer = composeReducers(
        (state, action) => ({ x: state.x + action.value }),
        (state, action) => ({ x: state.x * action.value })
    )
    expect(reducer(state, action)).toEqual({ x: 23 })
})

test("Test reducerWithPath basic actions", () => {
    const reducer = reducerWithPath(
        {},
        (action) => action.path,
        (state, action) => ((state || 0) + action.value)
    )
    const state = {}
    expect(reducer(state, { type: 'a', path: [] })).toBe(state)
    const action = { type: 'a', value: 2, path: ['a'] }
    expect(reducer(state, action)).toEqual({ a: 2 })
})

test("Test reducerWithPath logic", () => {
    const reducer = reducerWithPath(
        {},
        (action) => action.path,
        (state, action) => action.value
    )
    const store = createStore(reducer)
    const { getState, dispatch } = store


    dispatch({ type: 'a', value: {}, path: ['a'] })
    dispatch({ type: 'a', value: [], path: ['b'] })
    expect(getState()).toEqual({ a: {}, b: [] })


    dispatch({ type: 'a', value: 's', path: ['a', 'b', 'c'] })
    expect(getState()).toEqual({ a: { b: { c: 's' } }, b: [] })


    dispatch({ type: 'a', value: {}, path: ['a'] })
    dispatch({ type: 'a', value: null, path: ['b', 1, '1'] })
    expect(getState()).toEqual({ a: {}, b: [undefined, { '1': null }] })


    dispatch({ type: 'a', value: null, path: 'a' })
    dispatch({ type: 'a', value: null, path: 'b' })
    expect(getState()).toEqual({ a: null, b: null })


    dispatch({ type: 'a', value: 2, path: 'a.b.c' })
    expect(getState()).toEqual({ a: { b: { c: 2 } }, b: null })
})
