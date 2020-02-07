# redux-state-consistency

## composeReducers
Compose reducers right to left
```typescript
    const state = { x: 1 }
    const action = { type: 'A', value: 2 }
    const reducerAdd = (state, action) => ({ x: state.x + action.value })
    const reducerMultiply = (state, action) => ({ x: state.x * action.value })
    const reducer = composeReducers(reducerAdd, reducerMultiply)
    reducer(state, action)// { x: 4 }
```
