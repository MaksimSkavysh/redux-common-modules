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
    var moduleActions = exports.commonActionCreator(module);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9tb2R1bGVzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7QUFBQSw0QkFBNkI7QUFDN0IseUJBQTBCO0FBRTFCLHVDQUEwQztBQUcxQyxJQUFNLFFBQVEsR0FBRyxVQUFDLElBQVMsRUFBRSxTQUFpQztJQUMxRCxJQUFJLFNBQVMsRUFBRTtRQUNYLElBQUssU0FBdUIsQ0FBQyxLQUFLLEVBQUU7WUFDL0IsU0FBdUIsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUE7U0FDdkM7YUFBTTtZQUNGLFNBQXVCLENBQUMsSUFBSSxDQUFDLENBQUE7U0FDakM7S0FDSjtBQUNMLENBQUMsQ0FBQTtBQUVZLFFBQUEsbUJBQW1CLEdBQUcsVUFBQyxNQUFjO0lBQzlDLE9BQUEsVUFDSSxJQUFZLEVBQ1osZ0JBQXdDLEVBQ3hDLGFBQXFDO1FBRXJDLElBQU0sSUFBSSxHQUFNLE1BQU0sU0FBSSxJQUFNLENBQUE7UUFDaEMsSUFBTSxFQUFFLEdBQWtCLFVBQUMsT0FBTyxFQUFFLElBQUk7WUFDcEMsUUFBUSxDQUFDLE9BQU8sRUFBRSxnQkFBZ0IsQ0FBQyxDQUFBO1lBQ25DLFFBQVEsQ0FBQyxJQUFJLEVBQUUsYUFBYSxDQUFDLENBQUE7WUFDN0IsT0FBTyxFQUFFLElBQUksTUFBQSxFQUFFLE9BQU8sU0FBQSxFQUFFLElBQUksTUFBQSxFQUFFLENBQUE7UUFDbEMsQ0FBQyxDQUFBO1FBQ0QsRUFBRSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUE7UUFDZCxFQUFFLENBQUMsUUFBUSxHQUFHLGNBQU0sT0FBQSxJQUFJLEVBQUosQ0FBSSxDQUFBO1FBQ3hCLE9BQU8sRUFBRSxDQUFBO0lBQ2IsQ0FBQztBQWRELENBY0MsQ0FBQTtBQUdMLGdCQUFnQjtBQUNoQixJQUFNLE9BQU8sR0FBRyxDQUFDLENBQUMsTUFBTSxDQUFDLGNBQWMsQ0FBQyxVQUFBLENBQUMsSUFBSSxP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