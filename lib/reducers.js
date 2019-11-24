"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var T = require("runtypes");
var types_1 = require("./types");
var R = require("ramda");
var index_1 = require("./index");
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
        if (types_1.actionGuard.guard(action) && reducersMap[action.type]) {
            return reducersMap[action.type](state, action);
        }
        return state;
    };
};
var pathCheck = function (a) { return a.length > 0 || 'Path with length 0 is not allowed'; };
exports.reducerPathGuard = T.String.withConstraint(pathCheck)
    .Or(T.Array(types_1.idGuard).withConstraint(pathCheck));
exports.reducerWithPath = function (initialState, getPath, reducer) {
    return function (state, action) {
        var path = getPath(action);
        if (path && exports.reducerPathGuard.guard(path)) {
            if (typeof path == "string") {
                path = path.split('.');
            }
            var inner = R.path(path, state);
            return R.assocPath(path, reducer(inner, action), state);
        }
        return state || index_1.EMPTY_OBJECT;
    };
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVkdWNlcnMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvcmVkdWNlcnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSw0QkFBNkI7QUFDN0IsaUNBQXFIO0FBQ3JILHlCQUEwQjtBQUMxQixpQ0FBc0M7QUFFekIsUUFBQSxlQUFlLEdBQUc7SUFBQyxrQkFBc0I7U0FBdEIsVUFBc0IsRUFBdEIscUJBQXNCLEVBQXRCLElBQXNCO1FBQXRCLDZCQUFzQjs7SUFBYyxPQUFBLFVBQUMsS0FBSyxFQUFFLE1BQU07UUFDOUUsT0FBQSxRQUFRLENBQUMsV0FBVyxDQUFDLFVBQUMsUUFBUSxFQUFFLE9BQU8sSUFBSyxPQUFBLE9BQU8sQ0FBQyxRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQXpCLENBQXlCLEVBQUUsS0FBSyxDQUFDO0lBQTdFLENBQTZFO0FBRGIsQ0FDYSxDQUFBO0FBRXBFLFFBQUEsYUFBYSxHQUFHLFVBQUMsWUFBaUIsRUFBRSxXQUE4QjtJQUMzRSxNQUFNLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxVQUFDLEdBQUc7UUFDakMsSUFBSSxDQUFDLDJCQUFtQixDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFO1lBQ3hFLE1BQU0sSUFBSSxLQUFLLENBQUMsdUVBQXVFLENBQUMsQ0FBQTtTQUMzRjtJQUNMLENBQUMsQ0FBQyxDQUFBO0lBQ0YsT0FBTyxVQUFDLEtBQUssRUFBRSxNQUFNO1FBQ2pCLElBQUksbUJBQVcsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLElBQUksV0FBVyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsRUFBRTtZQUN2RCxPQUFPLFdBQVcsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsS0FBSyxFQUFFLE1BQU0sQ0FBQyxDQUFBO1NBQ2pEO1FBQ0QsT0FBTyxLQUFLLENBQUE7SUFDaEIsQ0FBQyxDQUFBO0FBQ0wsQ0FBQyxDQUFBO0FBSUQsSUFBTSxTQUFTLEdBQUcsVUFBQyxDQUFPLElBQUssT0FBQSxDQUFDLENBQUMsTUFBTSxHQUFHLENBQUMsSUFBSSxtQ0FBbUMsRUFBbkQsQ0FBbUQsQ0FBQTtBQUNyRSxRQUFBLGdCQUFnQixHQUFHLENBQUMsQ0FBQyxNQUFNLENBQUMsY0FBYyxDQUFDLFNBQVMsQ0FBQztLQUM3RCxFQUFFLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxlQUFPLENBQUMsQ0FBQyxjQUFjLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQTtBQUN0QyxRQUFBLGVBQWUsR0FBRyxVQUFDLFlBQWlCLEVBQUUsT0FBd0IsRUFBRSxPQUFnQjtJQUN6RixPQUFBLFVBQUMsS0FBSyxFQUFFLE1BQU07UUFDVixJQUFJLElBQUksR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUE7UUFDMUIsSUFBSSxJQUFJLElBQUksd0JBQWdCLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxFQUFFO1lBQ3RDLElBQUksT0FBTyxJQUFJLElBQUksUUFBUSxFQUFFO2dCQUN6QixJQUFJLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQTthQUN6QjtZQUNELElBQU0sS0FBSyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLEtBQUssQ0FBQyxDQUFBO1lBQ2pDLE9BQU8sQ0FBQyxDQUFDLFNBQVMsQ0FBQyxJQUFJLEVBQUUsT0FBTyxDQUFDLEtBQUssRUFBRSxNQUFNLENBQUMsRUFBRSxLQUFLLENBQUMsQ0FBQTtTQUMxRDtRQUNELE9BQU8sS0FBSyxJQUFJLG9CQUFZLENBQUE7SUFDaEMsQ0FBQztBQVZELENBVUMsQ0FBQSJ9