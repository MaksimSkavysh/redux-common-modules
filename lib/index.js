"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var T = require("runtypes");
var R = require("ramda");
exports.EMPTY_OBJECT = Object.freeze({});
exports.EMPTY_ARRAY = Object.freeze([]);
exports.composeReducers = function () {
    var reducers = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        reducers[_i] = arguments[_i];
    }
    return function (state, action) {
        return reducers.reduceRight(function (curState, reducer) { return reducer(curState, action); }, state);
    };
};
var idType = T.String.withConstraint(function (s) { return s.length > 0 || 'Empty id'; }).Or(T.Number);
var pathType = T.Array(idType).withConstraint(function (a) { return a.length > 0 || 'path with length 0 is not allowed'; });
var valueType = T.Unknown;
var idValueType = T.Record({ id: idType, value: valueType });
var pathValueType = T.Record({ path: pathType, value: valueType });
exports.reducerWithPath = function (reducer, getPath) {
    return function (state, action) {
        var path = getPath(action);
        if (path) {
            pathType.check(path);
            var inner = R.path(path, state);
            return R.assocPath(path, reducer(inner, action), state);
        }
        return state || exports.EMPTY_OBJECT;
    };
};
exports.commonActionCreator = function (module) {
    return function (name, payloadValidator, metaValidator) {
        var type = module + "/" + name;
        var ac = function (payload, meta) {
            payloadValidator && payloadValidator(payload);
            metaValidator && metaValidator(meta);
            return { type: type, payload: payload, meta: meta };
        };
        ac.type = type;
        ac.toString = function () { return type; };
        return ac;
    };
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSw0QkFBNkI7QUFDN0IseUJBQTBCO0FBSWIsUUFBQSxZQUFZLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsQ0FBQTtBQUNoQyxRQUFBLFdBQVcsR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxDQUFBO0FBRS9CLFFBQUEsZUFBZSxHQUFHO0lBQUMsa0JBQTBCO1NBQTFCLFVBQTBCLEVBQTFCLHFCQUEwQixFQUExQixJQUEwQjtRQUExQiw2QkFBMEI7O0lBQUssT0FBQSxVQUFDLEtBQVUsRUFBRSxNQUFXO1FBQ25GLE9BQUEsUUFBUSxDQUFDLFdBQVcsQ0FBQyxVQUFDLFFBQVEsRUFBRSxPQUFPLElBQUssT0FBQSxPQUFPLENBQUMsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUF6QixDQUF5QixFQUFFLEtBQUssQ0FBQztJQUE3RSxDQUE2RTtBQURsQixDQUNrQixDQUFBO0FBR2pGLElBQU0sTUFBTSxHQUFHLENBQUMsQ0FBQyxNQUFNLENBQUMsY0FBYyxDQUFDLFVBQUEsQ0FBQyxJQUFJLE9BQUEsQ0FBQyxDQUFDLE1BQU0sR0FBRyxDQUFDLElBQUksVUFBVSxFQUExQixDQUEwQixDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQTtBQUNwRixJQUFNLFFBQVEsR0FBRyxDQUFDLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDLGNBQWMsQ0FBQyxVQUFBLENBQUMsSUFBSSxPQUFBLENBQUMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxJQUFJLG1DQUFtQyxFQUFuRCxDQUFtRCxDQUFDLENBQUE7QUFDekcsSUFBTSxTQUFTLEdBQUcsQ0FBQyxDQUFDLE9BQU8sQ0FBQTtBQUMzQixJQUFNLFdBQVcsR0FBRyxDQUFDLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsU0FBUyxFQUFFLENBQUMsQ0FBQTtBQUM5RCxJQUFNLGFBQWEsR0FBRyxDQUFDLENBQUMsTUFBTSxDQUFDLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxLQUFLLEVBQUUsU0FBUyxFQUFFLENBQUMsQ0FBQTtBQUV2RCxRQUFBLGVBQWUsR0FBRyxVQUFDLE9BQW9CLEVBQUUsT0FBMEM7SUFDNUYsT0FBQSxVQUFDLEtBQVUsRUFBRSxNQUFXO1FBQ3BCLElBQUksSUFBSSxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQTtRQUMxQixJQUFJLElBQUksRUFBRTtZQUNOLFFBQVEsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUE7WUFDcEIsSUFBTSxLQUFLLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsS0FBSyxDQUFDLENBQUE7WUFDakMsT0FBTyxDQUFDLENBQUMsU0FBUyxDQUFDLElBQUksRUFBRSxPQUFPLENBQUMsS0FBSyxFQUFFLE1BQU0sQ0FBQyxFQUFFLEtBQUssQ0FBQyxDQUFBO1NBQzFEO1FBQ0QsT0FBTyxLQUFLLElBQUksb0JBQVksQ0FBQTtJQUNoQyxDQUFDO0FBUkQsQ0FRQyxDQUFBO0FBRVEsUUFBQSxtQkFBbUIsR0FBRyxVQUFDLE1BQWM7SUFDOUMsT0FBQSxVQUFDLElBQVksRUFBRSxnQkFBc0MsRUFBRSxhQUFtQztRQUN0RixJQUFNLElBQUksR0FBTSxNQUFNLFNBQUksSUFBTSxDQUFBO1FBQ2hDLElBQU0sRUFBRSxHQUFHLFVBQUMsT0FBWSxFQUFFLElBQW1CO1lBQ3pDLGdCQUFnQixJQUFJLGdCQUFnQixDQUFDLE9BQU8sQ0FBQyxDQUFBO1lBQzdDLGFBQWEsSUFBSSxhQUFhLENBQUMsSUFBSSxDQUFDLENBQUE7WUFDcEMsT0FBTyxFQUFFLElBQUksTUFBQSxFQUFFLE9BQU8sU0FBQSxFQUFFLElBQUksTUFBQSxFQUFFLENBQUE7UUFDbEMsQ0FBQyxDQUFBO1FBQ0QsRUFBRSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUE7UUFDZCxFQUFFLENBQUMsUUFBUSxHQUFHLGNBQU0sT0FBQSxJQUFJLEVBQUosQ0FBSSxDQUFBO1FBQ3hCLE9BQU8sRUFBRSxDQUFBO0lBQ2IsQ0FBQztBQVZELENBVUMsQ0FBQSJ9