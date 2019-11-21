import { composeReducers } from './index'

test("Combine reducer", () => {
    const state = { x: 10.5 }
    const action = { type: 'A', value: 2 }
    const reducer = composeReducers(
        (state, action) => ({ x: state.x + action.value }),
        (state, action) => ({ x: state.x * action.value })
    )
    expect(reducer(state, action)).toEqual({ x: 23 })
})
