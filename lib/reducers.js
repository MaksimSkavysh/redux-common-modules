"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var T = require("runtypes");
var types_1 = require("./types");
var R = require("ramda");
exports.composeReducers = function () {
    var reducers = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        reducers[_i] = arguments[_i];
    }
    return function (state, action) {
        return reducers.reduceRight(function (curState, reducer) { return reducer(curState, action); }, state);
    };
};
exports.createReducer = function (initialState, reducersMap) {
    Object.keys(reducersMap).forEach(function (key) {
        if (!types_1.notEmptyStringGuard.guard(key) || !T.Function.guard(reducersMap[key])) {
            throw new Error('Wrong handlers map type, should be: { [actionType]: reducerFunction }');
        }
    });
    return function (state, action) {
        if (action.type && reducersMap[action.type]) {
            return reducersMap[action.type](state, action);
        }
        return state;
    };
};
var pathCheck = function (a) { return a.length > 0 || 'Path with length 0 is not allowed'; };
var idGuard = T.String
    .withConstraint(function (s) { return s.length > 0 || 'Empty string could not be Id'; }).Or(T.Number);
var reducerPathGuard = T.String.withConstraint(pathCheck)
    .Or(T.Array(idGuard).withConstraint(pathCheck));
exports.reducerWithPath = function (initialState, getPath, reducer) {
    return function (state, action) {
        var path = getPath(action);
        if (path && reducerPathGuard.guard(path)) {
            if (typeof path == "string") {
                path = path.split('.');
            }
            var inner = R.path(path, state);
            return R.assocPath(path, reducer(inner, action), state);
        }
        return state || {};
    };
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVkdWNlcnMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvcmVkdWNlcnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSw0QkFBNkI7QUFDN0IsaUNBQW9GO0FBQ3BGLHlCQUEwQjtBQUNiLFFBQUEsZUFBZSxHQUFHO0lBQUMsa0JBQXNCO1NBQXRCLFVBQXNCLEVBQXRCLHFCQUFzQixFQUF0QixJQUFzQjtRQUF0Qiw2QkFBc0I7O0lBQWMsT0FBQSxVQUFDLEtBQUssRUFBRSxNQUFNO1FBQzlFLE9BQUEsUUFBUSxDQUFDLFdBQVcsQ0FBQyxVQUFDLFFBQVEsRUFBRSxPQUFPLElBQUssT0FBQSxPQUFPLENBQUMsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUF6QixDQUF5QixFQUFFLEtBQUssQ0FBQztJQUE3RSxDQUE2RTtBQURiLENBQ2EsQ0FBQTtBQUVwRSxRQUFBLGFBQWEsR0FBRyxVQUFDLFlBQWlCLEVBQUUsV0FBOEI7SUFDM0UsTUFBTSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxPQUFPLENBQUMsVUFBQyxHQUFHO1FBQ2pDLElBQUksQ0FBQywyQkFBbUIsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRTtZQUN4RSxNQUFNLElBQUksS0FBSyxDQUFDLHVFQUF1RSxDQUFDLENBQUE7U0FDM0Y7SUFDTCxDQUFDLENBQUMsQ0FBQTtJQUNGLE9BQU8sVUFBQyxLQUFLLEVBQUUsTUFBTTtRQUNqQixJQUFJLE1BQU0sQ0FBQyxJQUFJLElBQUksV0FBVyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsRUFBRTtZQUN6QyxPQUFPLFdBQVcsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsS0FBSyxFQUFFLE1BQU0sQ0FBQyxDQUFBO1NBQ2pEO1FBQ0QsT0FBTyxLQUFLLENBQUE7SUFDaEIsQ0FBQyxDQUFBO0FBQ0wsQ0FBQyxDQUFBO0FBSUQsSUFBTSxTQUFTLEdBQUcsVUFBQyxDQUFPLElBQUssT0FBQSxDQUFDLENBQUMsTUFBTSxHQUFHLENBQUMsSUFBSSxtQ0FBbUMsRUFBbkQsQ0FBbUQsQ0FBQTtBQUNsRixJQUFNLE9BQU8sR0FBRyxDQUFDLENBQUMsTUFBTTtLQUNuQixjQUFjLENBQUMsVUFBQSxDQUFDLElBQUksT0FBQSxDQUFDLENBQUMsTUFBTSxHQUFHLENBQUMsSUFBSSw4QkFBOEIsRUFBOUMsQ0FBOEMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUE7QUFDckYsSUFBTSxnQkFBZ0IsR0FBRyxDQUFDLENBQUMsTUFBTSxDQUFDLGNBQWMsQ0FBQyxTQUFTLENBQUM7S0FDdEQsRUFBRSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUMsY0FBYyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUE7QUFFdEMsUUFBQSxlQUFlLEdBQUcsVUFBQyxZQUFpQixFQUFFLE9BQXdCLEVBQUUsT0FBZ0I7SUFDekYsT0FBQSxVQUFDLEtBQUssRUFBRSxNQUFNO1FBQ1YsSUFBSSxJQUFJLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFBO1FBQzFCLElBQUksSUFBSSxJQUFJLGdCQUFnQixDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsRUFBRTtZQUN0QyxJQUFJLE9BQU8sSUFBSSxJQUFJLFFBQVEsRUFBRTtnQkFDekIsSUFBSSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUE7YUFDekI7WUFDRCxJQUFNLEtBQUssR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxLQUFLLENBQUMsQ0FBQTtZQUNqQyxPQUFPLENBQUMsQ0FBQyxTQUFTLENBQUMsSUFBSSxFQUFFLE9BQU8sQ0FBQyxLQUFLLEVBQUUsTUFBTSxDQUFDLEVBQUUsS0FBSyxDQUFDLENBQUE7U0FDMUQ7UUFDRCxPQUFPLEtBQUssSUFBSSxFQUFFLENBQUE7SUFDdEIsQ0FBQztBQVZELENBVUMsQ0FBQSJ9