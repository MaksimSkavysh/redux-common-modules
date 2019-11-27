"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var T = require("runtypes");
var reducers_1 = require("./reducers");
function isRuntype(v) {
    return v.check !== undefined;
}
exports.commonActionCreator = function (module) {
    return function (name, payloadValidator, metaValidator) {
        var type = module + "/" + name;
        var ac = function (payload, meta) {
            if (payloadValidator) {
                isRuntype(payloadValidator) ? payloadValidator.check(payload) : payloadValidator(payload);
            }
            if (metaValidator) {
                isRuntype(metaValidator) ? metaValidator.check(meta) : metaValidator(meta);
            }
            return { type: type, payload: payload, meta: meta };
        };
        ac.type = type;
        ac.toString = function () { return type; };
        return ac;
    };
};
// Trivial types
var check = function (guard) { return function (data) { return guard.check(data); }; };
var idGuard = T.String.withConstraint(function (s) { return s.length > 0 || 'Empty id'; }).Or(T.Number);
var pathGuard = T.Array(idGuard).withConstraint(function (a) { return a.length > 0 || 'path with length 0 is not allowed'; });
var positionGuard = T.Number;
var valueGuard = T.Unknown;
// Composite types
var withIdGuard = T.Record({ id: idGuard });
var withPathGuard = T.Record({ path: pathGuard });
var withValueGuard = T.Record({ value: valueGuard });
var withPositionGuard = T.Partial({ position: positionGuard });
var AddGuard = withIdGuard.And(withValueGuard).And(withPositionGuard);
exports.commonModule = function (params) {
    var module = params.module, initialState = params.initialState, _a = params.normalize, normalize = _a === void 0 ? false : _a;
    var moduleActions = exports.commonActionCreator(module);
    var add = moduleActions('ADD', AddGuard);
    var remove = moduleActions('REMOVE');
    var patch = moduleActions('PATCH');
    var set = moduleActions('SET');
    var reset = moduleActions('RESET');
    var patchPath = moduleActions('PATCH_PATH');
    var assocPath = moduleActions('SET_PATH');
    var dissocPath = moduleActions('RESET_PATH');
    var setOrder = moduleActions('SET_ORDER');
    var swapItems = moduleActions('MOVE_ORDER');
    var byIdReducer = reducers_1.createReducer(initialState, {
    // [add.type]: (state: typeof initialState, { payload }) => {
    //     const data = idValueType.check(payload)
    //     return R.assoc(data.id, { ...data.value, id: data.id }, state)
    // },
    // [remove]: (state, { payload: { id } }) => {
    //     pathType.check(ids)
    //     return R.omit(ids, state)
    // },
    // [patch]: (state, { payload }) => {
    //     const data = idValueType.check(payload)
    //     return R.over(R.lensProp(data.id), R.mergeLeft(data.value), state)
    // },
    // [set]: (_state, { payload }) => T.Unknown.withConstraint(isNotNil).check(payload),
    // [reset]: R.always(initialState),
    // [patchPath]: (state, { payload }) => {
    //     const data = pathValueType.check(payload)
    //     return R.over(R.lensPath(data.path), R.mergeLeft(data.value), state)
    // },
    // [assocPath]: (state, { payload }) => {
    //     const data = pathValueType.check(payload)
    //     return R.assocPath(data.path, data.value, state)
    // },
    // [dissocPath]: (state, { payload: { path } }) => {
    //     R.dissocPath(pathType.check(path), state)
    // },
    });
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
        // reducer,
        add: add,
        remove: remove,
        patch: patch,
        set: set,
        reset: reset,
        patchPath: patchPath,
        assocPath: assocPath,
        dissocPath: dissocPath,
        setOrder: setOrder,
        swapItems: swapItems,
    };
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9tb2R1bGVzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsNEJBQTZCO0FBRzdCLHVDQUEwQztBQUkxQyxTQUFTLFNBQVMsQ0FBQyxDQUF3QjtJQUN2QyxPQUFRLENBQWUsQ0FBQyxLQUFLLEtBQUssU0FBUyxDQUFDO0FBQ2hELENBQUM7QUFFWSxRQUFBLG1CQUFtQixHQUFHLFVBQUMsTUFBYztJQUM5QyxPQUFBLFVBQ0ksSUFBWSxFQUNaLGdCQUF3QyxFQUN4QyxhQUFxQztRQUVyQyxJQUFNLElBQUksR0FBTSxNQUFNLFNBQUksSUFBTSxDQUFBO1FBQ2hDLElBQU0sRUFBRSxHQUFrQixVQUFDLE9BQU8sRUFBRSxJQUFJO1lBQ3BDLElBQUksZ0JBQWdCLEVBQUU7Z0JBQ2xCLFNBQVMsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLENBQUMsQ0FBQyxnQkFBZ0IsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLGdCQUFnQixDQUFDLE9BQU8sQ0FBQyxDQUFBO2FBQzVGO1lBQ0QsSUFBSSxhQUFhLEVBQUU7Z0JBQ2YsU0FBUyxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLENBQUE7YUFDN0U7WUFDRCxPQUFPLEVBQUUsSUFBSSxNQUFBLEVBQUUsT0FBTyxTQUFBLEVBQUUsSUFBSSxNQUFBLEVBQUUsQ0FBQTtRQUNsQyxDQUFDLENBQUE7UUFDRCxFQUFFLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQTtRQUNkLEVBQUUsQ0FBQyxRQUFRLEdBQUcsY0FBTSxPQUFBLElBQUksRUFBSixDQUFJLENBQUE7UUFDeEIsT0FBTyxFQUFFLENBQUE7SUFDYixDQUFDO0FBbEJELENBa0JDLENBQUE7QUFHTCxnQkFBZ0I7QUFDaEIsSUFBTSxLQUFL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