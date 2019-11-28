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
exports.commonModule = function (params) {
    var _a, _b;
    var module = params.module, initialState = params.initialState, _c = params.normalize, normalize = _c === void 0 ? false : _c;
    var moduleActions = actionCreators_1.commonActionCreator(module);
    var add = moduleActions('ADD', AddGuard);
    var remove = moduleActions('REMOVE', RemoveGuard);
    var patch = moduleActions('PATCH', PatchGuard);
    var set = moduleActions('SET');
    var reset = moduleActions('RESET');
    //
    // const patchPath = moduleActions('PATCH_PATH')
    // const assocPath = moduleActions('SET_PATH')
    // const dissocPath = moduleActions('RESET_PATH')
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
        _a));
    //
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
        // patchPath,
        // assocPath,
        // dissocPath,
        setOrder: setOrder,
        swapItems: swapItems,
    };
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9tb2R1bGVzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7QUFBQSw0QkFBNkI7QUFDN0IseUJBQTBCO0FBRTFCLHVDQUEwQztBQUMxQyxtREFBc0Q7QUFDdEQsK0JBQXVDO0FBRXZDLElBQU0sT0FBTyxHQUFHLENBQUMsQ0FBQyxLQUFLLENBQUMsVUFBQyxLQUFLLEVBQUUsR0FBRyxFQUFFLEtBQUssSUFBSyxPQUFBLEtBQUssSUFBSSxLQUFLLElBQUksS0FBSyxJQUFJLEdBQUcsRUFBOUIsQ0FBOEIsQ0FBQyxDQUFBO0FBRTlFLGdCQUFnQjtBQUNoQixJQUFNLE9BQU8sR0FBRyxDQUFDLENBQUMsTUFBTSxDQUFDLGNBQWMsQ0FBQyxVQUFBLENBQUMsSUFBSSxPQUFBLENBQUMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxJQUFJLFVBQVUsRUFBMUIsQ0FBMEIsQ0FBQyxDQUFBO0FBQ3hFLElBQU0sU0FBUyxHQUFHLENBQUMsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUMsY0FBYyxDQUFDLFVBQUEsQ0FBQyxJQUFJLE9BQUEsQ0FBQyxDQUFDLE1BQU0sR0FBRyxDQUFDLElBQUksbUNBQW1DLEVBQW5ELENBQW1ELENBQUMsQ0FBQTtBQUMzRyxJQUFNLGFBQWEsR0FBRyxDQUFDLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUE7QUFDOUMsSUFBTSxVQUFVLEdBQUcsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsQ0FBQTtBQUUvQixrQkFBa0I7QUFDbEIsSUFBTSxXQUFXLEdBQUcsRUFBRSxFQUFFLEVBQUUsT0FBTyxFQUFFLENBQUE7QUFDbkMsSUFBTSxjQUFjLEdBQUcsRUFBRSxLQUFLLEVBQUUsVUFBVSxFQUFFLENBQUE7QUFDNUMsSUFBTSxVQUFVLEdBQUcsRUFBRSxFQUFFLEVBQUUsT0FBTyxFQUFFLEtB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