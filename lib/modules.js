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
var validate = function (data, validator) {
    if (validator) {
        if (validator.check) {
            validator.check(data);
        }
        else {
            validator(data);
        }
    }
};
exports.commonActionCreator = function (module) {
    return function (name, payloadValidator, metaValidator) {
        var type = module + "/" + name;
        var ac = function (payload, meta) {
            validate(payload, payloadValidator);
            validate(meta, metaValidator);
            return { type: type, payload: payload, meta: meta };
        };
        ac.type = type;
        ac.toString = function () { return type; };
        return ac;
    };
};
// Trivial types
var check = function (guard) { return function (data) { return guard.check(data); }; };
var id = T.String.withConstraint(function (s) { return s.length > 0 || 'Empty id'; });
var pathGuard = T.Array(id).withConstraint(function (a) { return a.length > 0 || 'path with length 0 is not allowed'; });
var positionGuard = T.Number.Or(T.Undefined);
var valueGuard = T.Record({});
// Composite types
var withIdGuard = { id: id };
var withPathGuard = { path: pathGuard };
var withValueGuard = { value: valueGuard };
var withPositionGuard = { position: positionGuard };
var AddGuard = T.Record(__assign(__assign(__assign({}, withIdGuard), withValueGuard), withPositionGuard))
    .And(T.Partial(withPositionGuard));
exports.commonModule = function (params) {
    var _a;
    var module = params.module, initialState = params.initialState, _b = params.normalize, normalize = _b === void 0 ? false : _b;
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
    var byIdReducer = reducers_1.createReducer(initialState, (_a = {},
        _a[add.type] = function (state, action) {
            var data = action.payload;
            return R.assoc(data.id, __assign(__assign({}, data.value), { id: data.id }), state);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9tb2R1bGVzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7QUFBQSw0QkFBNkI7QUFDN0IseUJBQTBCO0FBRTFCLHVDQUEwQztBQUcxQyxJQUFNLFFBQVEsR0FBRyxVQUFDLElBQVMsRUFBRSxTQUFpQztJQUMxRCxJQUFJLFNBQVMsRUFBRTtRQUNYLElBQUssU0FBdUIsQ0FBQyxLQUFLLEVBQUU7WUFDL0IsU0FBdUIsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUE7U0FDdkM7YUFBTTtZQUNGLFNBQXVCLENBQUMsSUFBSSxDQUFDLENBQUE7U0FDakM7S0FDSjtBQUNMLENBQUMsQ0FBQTtBQUVZLFFBQUEsbUJBQW1CLEdBQUcsVUFBQyxNQUFjO0lBQzlDLE9BQUEsVUFDSSxJQUFZLEVBQ1osZ0JBQXdDLEVBQ3hDLGFBQXFDO1FBRXJDLElBQU0sSUFBSSxHQUFNLE1BQU0sU0FBSSxJQUFNLENBQUE7UUFDaEMsSUFBTSxFQUFFLEdBQWtCLFVBQUMsT0FBTyxFQUFFLElBQUk7WUFDcEMsUUFBUSxDQUFDLE9BQU8sRUFBRSxnQkFBZ0IsQ0FBQyxDQUFBO1lBQ25DLFFBQVEsQ0FBQyxJQUFJLEVBQUUsYUFBYSxDQUFDLENBQUE7WUFDN0IsT0FBTyxFQUFFLElBQUksTUFBQSxFQUFFLE9BQU8sU0FBQSxFQUFFLElBQUksTUFBQSxFQUFFLENBQUE7UUFDbEMsQ0FBQyxDQUFBO1FBQ0QsRUFBRSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUE7UUFDZCxFQUFFLENBQUMsUUFBUSxHQUFHLGNBQU0sT0FBQSxJQUFJLEVBQUosQ0FBSSxDQUFBO1FBQ3hCLE9BQU8sRUFBRSxDQUFBO0lBQ2IsQ0FBQztBQWRELENBY0MsQ0FBQTtBQUdMLGdCQUFnQjtBQUNoQixJQUFNLEtBQUssR0FBRyxVQUFDLEtBQWdCLElBQUssT0FBQSxVQUFDLElBQVMsSUFBSyxPQUFBLEtBQUss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