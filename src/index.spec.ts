import * as T from 'runtypes'
import { createStore, combineReducers } from "redux"
import { composeReducers, commonActionCreator } from './index'

test("Test combine reducer", () => {
    const state = { x: 10.5 }
    const action = { type: 'A', value: 2 }
    const reducer = composeReducers(
        (state, action) => ({ x: state.x + action.value }),
        (state, action) => ({ x: state.x * action.value })
    )
    expect(reducer(state, action)).toEqual({ x: 23 })
})

test("Test commonActionCreator reducer", () => {
    const payloadValidator = jest.fn((state, action) => true)
    const metaValidator = jest.fn((state, action) => true)
    const moduleActions = commonActionCreator('TEST')
    // @ts-ignore
    const addAction = moduleActions('ADD', payloadValidator, metaValidator)
    const payload = { id: 1 }
    const meta = { path: 'id' }
    const action = addAction(payload, meta)
    expect(action.type).toBe('TEST/ADD')
    expect(payloadValidator.mock.calls.length).toBe(1)
    expect(metaValidator.mock.calls.length).toBe(1)
    expect(payloadValidator.mock.calls[0][0]).toBe(payload)
    expect(metaValidator.mock.calls[0][0]).toBe(meta)
})
