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
        if (state === void 0) { state = initialState; }
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVkdWNlcnMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvcmVkdWNlcnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSw0QkFBNkI7QUFDN0IsaUNBQW9GO0FBQ3BGLHlCQUEwQjtBQUNiLFFBQUEsZUFBZSxHQUFHO0lBQUMsa0JBQXNCO1NBQXRCLFVBQXNCLEVBQXRCLHFCQUFzQixFQUF0QixJQUFzQjtRQUF0Qiw2QkFBc0I7O0lBQWMsT0FBQSxVQUFDLEtBQUssRUFBRSxNQUFNO1FBQzlFLE9BQUEsUUFBUSxDQUFDLFdBQVcsQ0FBQyxVQUFDLFFBQVEsRUFBRSxPQUFPLElBQUssT0FBQSxPQUFPLENBQUMsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUF6QixDQUF5QixFQUFFLEtBQUssQ0FBQztJQUE3RSxDQUE2RTtBQURiLENBQ2EsQ0FBQTtBQUVwRSxRQUFBLGFBQWEsR0FBRyxVQUFDLFlBQWlCLEVBQUUsV0FBOEI7SUFDM0UsTUFBTSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxPQUFPLENBQUMsVUFBQyxHQUFHO1FBQ2pDLElBQUksQ0FBQywyQkFBbUIsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRTtZQUN4RSxNQUFNLElBQUksS0FBSyxDQUFDLHVFQUF1RSxDQUFDLENBQUE7U0FDM0Y7SUFDTCxDQUFDLENBQUMsQ0FBQTtJQUNGLE9BQU8sVUFBQyxLQUFvQixFQUFFLE1BQU07UUFBNUIsc0JBQUEsRUFBQSxvQkFBb0I7UUFDeEIsSUFBSSxNQUFNLENBQUMsSUFBSSxJQUFJLFdBQVcsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEVBQUU7WUFDekMsT0FBTyxXQUFXLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLEtBQUssRUFBRSxNQUFNLENBQUMsQ0FBQTtTQUNqRDtRQUNELE9BQU8sS0FBSyxDQUFBO0lBQ2hCLENBQUMsQ0FBQTtBQUNMLENBQUMsQ0FBQTtBQUlELElBQU0sU0FBUyxHQUFHLFVBQUMsQ0FBTyxJQUFLLE9BQUEsQ0FBQyxDQUFDLE1BQU0sR0FBRyxDQUFDLElBQUksbUNBQW1DLEVBQW5ELENBQW1ELENBQUE7QUFDbEYsSUFBTSxPQUFPLEdBQUcsQ0FBQyxDQUFDLE1BQU07S0FDbkIsY0FBYyxDQUFDLFVBQUEsQ0FBQyxJQUFJLE9BQUEsQ0FBQyxDQUFDLE1BQU0sR0FBRyxDQUFDLElBQUksOEJBQThCLEVBQTlDLENBQThDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFBO0FBQ3JGLElBQU0sZ0JBQWdCLEdBQUcsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxjQUFjLENBQUMsU0FBUyxDQUFDO0tBQ3RELEVBQUUsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDLGNBQWMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFBO0FBRXRDLFFBQUEsZUFBZSxHQUFHLFVBQUMsWUFBaUIsRUFBRSxPQUF3QixFQUFFLE9BQWdCO0lBQ3pGLE9BQUEsVUFBQyxLQUFLLEVBQUUsTUFBTTtRQUNWLElBQUksSUFBSSxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQTtRQUMxQixJQUFJLElBQUksSUFBSSxnQkFBZ0IsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEVBQUU7WUFDdEMsSUFBSSxPQUFPLElBQUksSUFBSSxRQUFRLEVBQUU7Z0JBQ3pCLElBQUksR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFBO2FBQ3pCO1lBQ0QsSUFBTSxLQUFLLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsS0FBSyxDQUFDLENBQUE7WUFDakMsT0FBTyxDQUFDLENBQUMsU0FBUyxDQUFDLElBQUksRUFBRSxPQUFPLENBQUMsS0FBSyxFQUFFLE1BQU0sQ0FBQyxFQUFFLEtBQUssQ0FBQyxDQUFBO1NBQzFEO1FBQ0QsT0FBTyxLQUFLLElBQUksRUFBRSxDQUFBO0lBQ3RCLENBQUM7QUFWRCxDQVVDLENBQUEifQ==