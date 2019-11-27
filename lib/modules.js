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
var withValueGuard = { value: valueGuard };
var witIdValue = { id: idGuard, value: valueGuard };
var withPathGuard = { path: pathGuard };
var withPositionGuard = { position: positionGuard };
var AddGuard = T.Record(witIdValue).And(T.Partial(withPositionGuard));
var RemoveGuard = T.Record(withIdGuard);
var PatchGuard = T.Record(witIdValue);
exports.commonModule = function (params) {
    var _a, _b;
    var module = params.module, initialState = params.initialState, _c = params.normalize, normalize = _c === void 0 ? false : _c;
    var moduleActions = actionCreators_1.commonActionCreator(module);
    var add = moduleActions('ADD', AddGuard);
    var remove = moduleActions('REMOVE', RemoveGuard);
    var patch = moduleActions('PATCH', pathGuard);
    var set = moduleActions('SET');
    var reset = moduleActions('RESET');
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
        _a[patch.type] = function (state, action) {
            var data = action.payload;
            return R.over(R.lensProp(data.id), R.mergeLeft(data.value), state);
        },
        _a[set.type] = function (_state, _a) {
            var payload = _a.payload;
            return payload;
        },
        _a[reset.type] = R.always(initialState),
        _a));
    //
    var orderReducer = normalize && reducers_1.createReducer(Object.keys(initialState), (_b = {},
        _b[add.type] = function (state, _a) {
            var _b = _a.payload, id = _b.id, _c = _b.position, position = _c === void 0 ? 0 : _c;
            return R.insert(position, id, state);
        },
        _b[remove.type] = function (state, _a) {
            var id = _a.payload.id;
            return state.filter(function (item) { return item !== id; });
        },
        _b[set.type] = function (_state, _a) {
            var payload = _a.payload;
            return Object.keys(payload);
        },
        _b[reset.type] = R.always(Object.keys(initialState)),
        _b));
    //
    // const reducer = normalize ? combineReducers({ byId: byIdReducer, order: orderReducer }) : byIdReducer
    //
    return {
        reducer: byIdReducer,
        add: add,
        remove: remove,
    };
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9tb2R1bGVzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7QUFBQSw0QkFBNkI7QUFDN0IseUJBQTBCO0FBRTFCLHVDQUEwQztBQUMxQyxtREFBc0Q7QUFFdEQsZ0JBQWdCO0FBQ2hCLElBQU0sT0FBTyxHQUFHLENBQUMsQ0FBQyxNQUFNLENBQUMsY0FBYyxDQUFDLFVBQUEsQ0FBQyxJQUFJLE9BQUEsQ0FBQyxDQUFDLE1BQU0sR0FBRyxDQUFDLElBQUksVUFBVSxFQUExQixDQUEwQixDQUFDLENBQUE7QUFDeEUsSUFBTSxTQUFTLEdBQUcsQ0FBQyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQyxjQUFjLENBQUMsVUFBQSxDQUFDLElBQUksT0FBQSxDQUFDLENBQUMsTUFBTSxHQUFHLENBQUMsSUFBSSxtQ0FBbUMsRUFBbkQsQ0FBbUQsQ0FBQyxDQUFBO0FBQzNHLElBQU0sYUFBYSxHQUFHLENBQUMsQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQTtBQUM5QyxJQUFNLFVBQVUsR0FBRyxDQUFDLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxDQUFBO0FBRS9CLGtCQUFrQjtBQUNsQixJQUFNLFdBQVcsR0FBRyxFQUFFLEVBQUUsRUFBRSxPQUFPLEVBQUUsQ0FBQTtBQUNuQyxJQUFNLGNBQWMsR0FBRyxFQUFFLEtBQUssRUFBRSxVQUFVLEVBQUUsQ0FBQTtBQUM1QyxJQUFNLFVBQVUsR0FBRyxFQUFFLEVBQUUsRUFBRSxPQUFPLEVBQUUsS0FBSyxFQUFFLFVBQVUsRUFBRSxDQUFBO0FBQ3JELElBQU0sYUFBYSxHQUFHLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxDQUFBO0FBQ3pDLElBQU0saUJBQWlCLEdBQUcsRUFBRSxRQUFRLEVBQUUsYUFBYSxFQUFFLENBQUE7QUFHckQsSUFBTSxRQUFRLEdBQUcsQ0FB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