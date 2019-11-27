"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var T = require("runtypes");
var R = require("ramda");
var reducers_1 = require("./reducers");
var actionCreators_1 = require("./actionCreators");
// Trivial types
var idGuard = T.String.withConstraint(function (s) { return s.length > 0 || 'Empty id'; });
var pathGuard = T.Array(idGuard).withConstraint(function (a) { return a.length > 0 || 'path with length 0 is not allowed'; });
var positionGuard = T.Number.Or(T.Undefined);
var valueGuard = T.Record({});
// Composite types
var withIdGuard = { id: idGuard };
var withPathGuard = { path: pathGuard };
var withValueGuard = { value: valueGuard };
var withPositionGuard = { position: positionGuard };
var AddGuard = T.Record(__assign(__assign({}, withIdGuard), withValueGuard))
    .And(T.Partial(withPositionGuard));
var RemoveGuard = T.Record(withIdGuard);
exports.commonModule = function (params) {
    var _a;
    var module = params.module, initialState = params.initialState, _b = params.normalize, normalize = _b === void 0 ? false : _b;
    var moduleActions = actionCreators_1.commonActionCreator(module);
    var add = moduleActions('ADD', AddGuard);
    var remove = moduleActions('REMOVE', RemoveGuard);
    // const patch = moduleActions('PATCH')
    // const set = moduleActions('SET')
    // const reset = moduleActions('RESET')
    //
    // const patchPath = moduleActions('PATCH_PATH')
    // const assocPath = moduleActions('SET_PATH')
    // const dissocPath = moduleActions('RESET_PATH')
    //
    // const setOrder = moduleActions('SET_ORDER')
    // const swapItems = moduleActions('MOVE_ORDER')
    var byIdReducer = reducers_1.createReducer(initialState, (_a = {},
        _a[add.type] = function (state, action) {
            var data = action.payload;
            return R.assoc(data.id, __assign(__assign({}, data.value), { id: data.id }), state);
        },
        _a[remove.type] = function (state, _a) {
            var payload = _a.payload;
            var data = payload;
            return R.dissoc(data.id, state);
        },
        _a));
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
        reducer: byIdReducer,
        add: add,
        remove: remove,
    };
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9tb2R1bGVzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7QUFBQSw0QkFBNkI7QUFDN0IseUJBQTBCO0FBRTFCLHVDQUEwQztBQUMxQyxtREFBc0Q7QUFFdEQsZ0JBQWdCO0FBQ2hCLElBQU0sT0FBTyxHQUFHLENBQUMsQ0FBQyxNQUFNLENBQUMsY0FBYyxDQUFDLFVBQUEsQ0FBQyxJQUFJLE9BQUEsQ0FBQyxDQUFDLE1BQU0sR0FBRyxDQUFDLElBQUksVUFBVSxFQUExQixDQUEwQixDQUFDLENBQUE7QUFDeEUsSUFBTSxTQUFTLEdBQUcsQ0FBQyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQyxjQUFjLENBQUMsVUFBQSxDQUFDLElBQUksT0FBQSxDQUFDLENBQUMsTUFBTSxHQUFHLENBQUMsSUFBSSxtQ0FBbUMsRUFBbkQsQ0FBbUQsQ0FBQyxDQUFBO0FBQzNHLElBQU0sYUFBYSxHQUFHLENBQUMsQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQTtBQUM5QyxJQUFNLFVBQVUsR0FBRyxDQUFDLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxDQUFBO0FBRS9CLGtCQUFrQjtBQUNsQixJQUFNLFdBQVcsR0FBRyxFQUFFLEVBQUUsRUFBRSxPQUFPLEVBQUUsQ0FBQTtBQUNuQyxJQUFNLGFBQWEsR0FBRyxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsQ0FBQTtBQUN6QyxJQUFNLGNBQWMsR0FBRyxFQUFFLEtBQUssRUFBRSxVQUFVLEVBQUUsQ0FBQTtBQUM1QyxJQUFNLGlCQUFpQixHQUFHLEVBQUUsUUFBUSxFQUFFLGFBQWEsRUFBRSxDQUFBO0FBRXJELElBQU0sUUFBUSxHQUFHLENBQUMsQ0FBQyxNQUFNLHVCQUFNLFdBQVcsR0FBSyxjQUFjLEVBQUc7S0FDM0QsR0FBRyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxDQUFBO0FBR3RDLElBQU0sV0FBVyxHQUFHLENBQUMsQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLENBQUE7QUFHNUIsUUFBQSxZQUFZLEdBQUcsVUFBQyxNQUFrRTs7SUFDbkYsSUFBQSxzQkFBTSxFQUFFLGtDQUFZLEVBQUUscUJBQWlCLEVBQWpCLHNDQUFpQixDQUFXO0lBQzFELElBQU0sYUFBYSxHQUFHLG9DQUFtQixDQUFDLE1BQU0sQ0FBQyxDQUFBO0lBRWpELElBQU0sR0FBRyxHQUE4QixhQUFhLENBQUMsS0FBSyxFQUFFLFFBQVEsQ0FBQyxDQUFBO0lBQ3JFLElBQU0sTUFBTSxHQUFpQyxhQUFhLENBQUMsUUFBUSxFQUFFLFdBQVcsQ0FBQyxDQUFBO0lBQ2pGLHVDQUF1QztJQUN2QyxtQ0FBbUM7SUFDbkMsdUNBQXVDO0lBQ3ZDLEVBQUU7SUFDRixnREFBZ0Q7SUFDaEQsOENBQThDO0lBQzlDLGlEQUFpRDtJQUNqRCxFQUFFO0lBQ0YsOENBQThDO0lBQzlDLGdEQUFnRDtJQUVoRCxJQUFNLFdBQVcsR0FBRyx3QkFBYSxDQUFDLFlBQVk7UUFDMUMsR0FBQyxHQUFHLENBQUMsSUFBSSxJQUFHLFVBQUMsS0FBSyxFQUFFLE1BQU07WUFDdEIsSUFBTSxJQUFJLEdBQWUsTUFBTSxDQUFDLE9BQU8sQ0FBQTtZQUN2QyxPQUFPLENBQUMsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEVBQUUsd0JBQU8sSUFBSSxDQUFDLEtBQUssS0FBRSxFQUFFLEVBQUUsSUFBSSxDQUFDLEVBQUUsS0FBSSxLQUFLLENBQUMsQ0FBQTtRQUNsRSxDQUFDO1FBQ0QsR0FBQyxNQUFNLENBQUMsSUFBSSxJQUFHLFVBQUMsS0FBSyxFQUFFLEVBQVc7Z0JBQVQsb0JBQU87WUFDNUIsSUFBTSxJQUFJLEdBQWtCLE9BQU8sQ0FBQTtZQUNuQyxPQUFPLENBQUMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEVBQUUsRUFBRSxLQUFLLENBQUMsQ0FBQTtRQUNuQyxDQUFDO1lBa0JILENBQUE7SUFDRixFQUFFO0lBQ0YsK0VBQStFO0lBQy9FLDBGQUEwRjtJQUMxRixtRkFBbUY7SUFDbkYsNERBQTREO0lBQzVELDBDQUEwQztJQUMxQyxFQUFFO0lBQ0YsMkVBQTJFO0lBQzNFLDJEQUEyRDtJQUMzRCwwREFBMEQ7SUFDMUQscUJBQXFCO0lBQ3JCLDZEQUE2RDtJQUM3RCwyREFBMkQ7SUFDM0QsYUFBYTtJQUNiLHlDQUF5QztJQUN6QyxTQUFTO0lBQ1QsS0FBSztJQUNMLEVBQUU7SUFDRix3R0FBd0c7SUFDeEcsRUFBRTtJQUNGLE9BQU87UUFDSCxPQUFPLEVBQUUsV0FBVztRQUNwQixHQUFHLEtBQUE7UUFDSCxNQUFNLFFBQUE7S0FTVCxDQUFBO0FBQ0wsQ0FBQyxDQUFBIn0=