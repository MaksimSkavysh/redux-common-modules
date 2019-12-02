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
exports.trivialModule = function (module, initialValue) {
    var _a;
    if (initialValue === void 0) { initialValue = null; }
    var moduleActions = actionCreators_1.commonActionCreator(module);
    var set = moduleActions('SET');
    var reset = moduleActions('RESET');
    var reducer = reducers_1.createReducer(initialValue, (_a = {},
        _a[set.type] = function (_, _a) {
            var payload = _a.payload;
            return payload;
        },
        _a[reset.type] = function () { return initialValue; },
        _a));
    return {
        reducer: reducer,
        set: set,
        reset: reset,
    };
};
// Trivial types
var idGuard = T.String.withConstraint(function (s) { return s.length > 0 || 'Empty id'; });
var pathGuard = T.Array(idGuard).withConstraint(function (a) { return a.length > 0 || 'path with length 0 is not allowed'; });
var positionGuard = T.Number;
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
var PatchDeepGuard = T.Record(witIdValue);
exports.commonModule = function (module, initialState) {
    var _a;
    if (initialState === void 0) { initialState = {}; }
    var moduleActions = actionCreators_1.commonActionCreator(module);
    var add = moduleActions('ADD', AddGuard);
    var remove = moduleActions('REMOVE', RemoveGuard);
    var patch = moduleActions('PATCH', PatchGuard);
    var set = moduleActions('SET');
    var reset = moduleActions('RESET');
    var patchDeep = moduleActions('PATCH_PATH', PatchDeepGuard);
    var reducer = reducers_1.createReducer(initialState, (_a = {},
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
    return {
        reducer: reducer,
        add: add,
        remove: remove,
        patch: patch,
        set: set,
        reset: reset,
        patchDeep: patchDeep,
    };
};
var inRange = R.curry(function (start, end, index) { return start <= index && index <= end; });
var SetOrderGuard = T.Array(idGuard);
exports.commonModuleNormalized = function (module, initialState) {
    var _a;
    if (initialState === void 0) { initialState = {}; }
    var moduleActions = actionCreators_1.commonActionCreator(module);
    var _b = exports.commonModule(module, initialState), byIdReducer = _b.reducer, add = _b.add, remove = _b.remove, reset = _b.reset, set = _b.set, patch = _b.patch, patchDeep = _b.patchDeep;
    var setOrder = moduleActions('SET_ORDER', SetOrderGuard);
    var swapItems = moduleActions('MOVE_ORDER');
    var orderReducer = reducers_1.createReducer(Object.keys(initialState), (_a = {},
        _a[add.type] = function (state, _a) {
            var _b = _a.payload, id = _b.id, _c = _b.position, position = _c === void 0 ? 0 : _c;
            var checkPosition = function (p) { return p === 0 || (-1 <= p && p < state.length)
                || 'Position should be in range from -1 to state.length -1'; };
            T.Number.withConstraint(checkPosition).check(position);
            return R.insert(position, id, state);
        },
        _a[remove.type] = function (state, _a) {
            var id = _a.payload.id;
            return state.filter(function (item) { return item !== id; });
        },
        _a[set.type] = function (_state, _a) {
            var payload = _a.payload;
            return Object.keys(payload);
        },
        _a[reset.type] = R.always(Object.keys(initialState)),
        _a[setOrder.type] = function (_state, _a) {
            var payload = _a.payload;
            return payload;
        },
        _a[swapItems.type] = function (state, _a) {
            var payload = _a.payload;
            var data = payload;
            var inCurrentRange = inRange(0, state.length);
            T.Record({
                from: T.Number.withConstraint(inCurrentRange),
                to: T.Number.withConstraint(inCurrentRange),
            }).check(data);
            return R.move(data.from, data.to, state);
        },
        _a));
    var reducer = redux_1.combineReducers({
        byId: byIdReducer,
        order: orderReducer,
    });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9tb2R1bGVzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7QUFBQSw0QkFBNkI7QUFDN0IseUJBQTBCO0FBRTFCLHVDQUEwQztBQUMxQyxtREFBc0Q7QUFDdEQsK0JBQXVDO0FBRTFCLFFBQUEsYUFBYSxHQUFHLFVBQUMsTUFBYyxFQUFFLFlBQXdCOztJQUF4Qiw2QkFBQSxFQUFBLG1CQUF3QjtJQUNsRSxJQUFNLGFBQWEsR0FBRyxvQ0FBbUIsQ0FBQyxNQUFNLENBQUMsQ0FBQTtJQUVqRCxJQUFNLEdBQUcsR0FBdUIsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFBO0lBQ3BELElBQU0sS0FBSyxHQUF3QixhQUFhLENBQUMsT0FBTyxDQUFDLENBQUE7SUFDekQsSUFBTSxPQUFPLEdBQUcsd0JBQWEsQ0FBQyxZQUFZO1FBQ3RDLEdBQUMsR0FBRyxDQUFDLElBQUksSUFBRyxVQUFDLENBQUMsRUFBRSxFQUFXO2dCQUFULG9CQUFPO1lBQU8sT0FBQSxPQUFPO1FBQVAsQ0FBTztRQUN2QyxHQUFDLEtBQUssQ0FBQyxJQUFJLElBQUcsY0FBTSxPQUFBLFlBQVksRUFBWixDQUFZO1lBQ2xDLENBQUE7SUFDRixPQUFPO1FBQ0gsT0FBTyxTQUFBO1FBQ1AsR0FBRyxLQUFBO1FBQ0gsS0FBSyxPQUFBO0tBQ1IsQ0FBQTtBQUNMLENBQUMsQ0FBQTtBQUdELGdCQUFnQjtBQUNoQixJQUFNLE9BQU8sR0FBRyxDQUFDLENBQUMsTUFBTSxDQUFDLGNBQWMsQ0FBQyxVQUFBLENBQUMsSUFBSSxPQUFBLENBQUMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxJQUFJLFVBQVUsRUFBMUIsQ0FBMEIsQ0FBQyxDQUFBO0FBQ3hFLElBQU0sU0FBUyxHQUFHLENBQUMsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUMsY0FBYyxDQUFDLFVBQUEsQ0FBQyxJQUFJLE9BQUEsQ0FBQyxDQUFDLE1B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