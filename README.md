# redux-common-modules

### composeReducers

`(reducer1, reducer2, ..., reducerN) => reducerFn`

Compose reducers right to left
```typescript
    const state = { x: 1 }
    const action = { type: 'A', value: 2 }
    const reducerAdd = (state, action) => ({ x: state.x + action.value })
    const reducerMultiply = (state, action) => ({ x: state.x * action.value })
    const reducer = composeReducers(reducerAdd, reducerMultiply)
    reducer(state, action)// { x: 4 }
```

### createReducer

Create reducer:

`(initialState, { [actionType]: handlerFn }) => reducerFn`

```typescript
    const INITIAL_STATE = { x: 10 }
    const reducer = createReducer(
        INITIAL_STATE,
        { 'ACTION-TYPE-1': (state, action) => ({ x: state.x + action.value }) }
    )
    const action = { type: 'ACTION-TYPE-1', value: 2 }
    reducer(state, action) // { x: 12 }
```

### reducerWithPath

Creates a reducer that applies to part of the state

`(initialState, getPath, reducer) => newReducer`

`initialState` - initial state, could be any value

`getPath` - function to get path from action, should return string or list of strings. See example below

`reducer` - common reducer to apply on state part

```typescript
    const reducer = reducerWithPath(
        {},
        (action) => action.path,
        (state, action) => ((state || 0) + action.value)
    )
    const state = { a: { b: 2 } }
    expect(reducer(state, { type: 'a', path: [] })).toEqual({ a: { b: 2 } })
    const action = { type: 'a', value: 2, path: ['a', 'b'] } // path could be 'a.b'
    expect(reducer(state, action)).toEqual({ a: { b: 4 } })
```
