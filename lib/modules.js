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
var redux_1 = require("redux");
var inRange = R.curry(function (start, end, index) { return start <= index && index <= end; });
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
var SetOrderGuard = T.Array(idGuard);
var PatchDeepGuard = T.Record(witIdValue);
exports.commonModule = function (params) {
    var _a, _b;
    var module = params.module, initialState = params.initialState, _c = params.normalize, normalize = _c === void 0 ? false : _c;
    var moduleActions = actionCreators_1.commonActionCreator(module);
    var add = moduleActions('ADD', AddGuard);
    var remove = moduleActions('REMOVE', RemoveGuard);
    var patch = moduleActions('PATCH', PatchGuard);
    var set = moduleActions('SET');
    var reset = moduleActions('RESET');
    var patchDeep = moduleActions('PATCH_PATH', PatchDeepGuard);
    //
    var setOrder = moduleActions('SET_ORDER', SetOrderGuard);
    var swapItems = moduleActions('MOVE_ORDER');
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
        _a[patchDeep.type] = function (state, action) {
            var data = action.payload;
            return R.over(R.lensProp(data.id), R.mergeDeepLeft(data.value), state);
        },
        _a));
    var orderReducer = normalize && reducers_1.createReducer(Object.keys(initialState), (_b = {},
        _b[add.type] = function (state, _a) {
            var _b = _a.payload, id = _b.id, _c = _b.position, position = _c === void 0 ? 0 : _c;
            var checkPosition = function (p) { return p === 0 || (-1 <= p && p < state.length); };
            T.Number.withConstraint(function (p) { return checkPosition(p)
                || 'Position should be in range from -1 to state.length -1'; }).check(position);
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
        _b[setOrder.type] = function (_state, _a) {
            var payload = _a.payload;
            return payload;
        },
        _b[swapItems.type] = function (state, _a) {
            var payload = _a.payload;
            var data = payload;
            var inCurrentRange = inRange(0, state.length);
            T.Record({
                from: T.Number.withConstraint(inCurrentRange),
                to: T.Number.withConstraint(inCurrentRange),
            });
            return R.move(data.from, data.to, state);
        },
        _b));
    var reducer = normalize && orderReducer
        ? redux_1.combineReducers({ byId: byIdReducer, order: orderReducer })
        : byIdReducer;
    return {
        reducer: reducer,
        add: add,
        remove: remove,
        patch: patch,
        set: set,
        reset: reset,
        setOrder: setOrder,
        swapItems: swapItems,
        patchDeep: patchDeep,
    };
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9tb2R1bGVzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7QUFBQSw0QkFBNkI7QUFDN0IseUJBQTBCO0FBRTFCLHVDQUEwQztBQUMxQyxtREFBc0Q7QUFDdEQsK0JBQXVDO0FBRXZDLElBQU0sT0FBTyxHQUFHLENBQUMsQ0FBQyxLQUFLLENBQUMsVUFBQyxLQUFLLEVBQUUsR0FBRyxFQUFFLEtBQUssSUFBSyxPQUFBLEtBQUssSUFBSSxLQUFLLElBQUksS0FBSyxJQUFJLEdBQUcsRUFBOUIsQ0FBOEIsQ0FBQyxDQUFBO0FBRTlFLGdCQUFnQjtBQUNoQixJQUFNLE9BQU8sR0FBRyxDQUFDLENBQUMsTUFBTSxDQUFDLGNBQWMsQ0FBQyxVQUFBLENBQUMsSUFBSSxPQUFBLENBQUMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxJQUFJLFVBQVUsRUFBMUIsQ0FBMEIsQ0FBQyxDQUFBO0FBQ3hFLElBQU0sU0FBUyxHQUFHLENBQUMsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUMsY0FBYyxDQUFDLFVBQUEsQ0FBQyxJQUFJLE9BQUEsQ0FBQyxDQUFDLE1BQU0sR0FBRyxDQUFDLElBQUksbUNBQW1DLEVBQW5ELENBQW1ELENBQUMsQ0FBQTtBQUMzRyxJQUFNLGFBQWEsR0FBRyxDQUFDLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUE7QUFDOUMsSUFBTSxVQUFVLEdBQUcsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsQ0FBQTtBQUUvQixrQkFBa0I7QUFDbEIsSUFBTSxXQUFXLEdBQUcsRUFBRSxFQUFFLEVBQUUsT0FBTyxFQUFFLENBQUE7QUFDbkMsSUFBTSxjQUFjLEdBQUcsRUFBRSxLQUFLLEVBQUUsVUFBVSxFQUFFLENBQUE7QUFDNUMsSUFBTSxVQUFVLEdBQUcsRUFBRSxFQUFFLEVBQUUsT0FBTyxFQUFFLEtB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