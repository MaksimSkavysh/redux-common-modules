"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9tb2R1bGVzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBUWEsUUFBQSxtQkFBbUIsR0FBRyxVQUFDLE1BQWM7SUFDOUMsT0FBQSxVQUFDLElBQVksRUFBRSxnQkFBNEIsRUFBRSxhQUF5QjtRQUNsRSxJQUFNLElBQUksR0FBTSxNQUFNLFNBQUksSUFBTSxDQUFBO1FBQ2hDLElBQU0sRUFBRSxHQUFrQixVQUFDLE9BQU8sRUFBRSxJQUFJO1lBQ3BDLGdCQUFnQixJQUFJLGdCQUFnQixDQUFDLE9BQU8sQ0FBQyxDQUFBO1lBQzdDLGFBQWEsSUFBSSxhQUFhLENBQUMsSUFBSSxDQUFDLENBQUE7WUFDcEMsT0FBTyxFQUFFLElBQUksTUFBQSxFQUFFLE9BQU8sU0FBQSxFQUFFLElBQUksTUFBQSxFQUFFLENBQUE7UUFDbEMsQ0FBQyxDQUFBO1FBQ0QsRUFBRSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUE7UUFDZCxFQUFFLENBQUMsUUFBUSxHQUFHLGNBQU0sT0FBQSxJQUFJLEVBQUosQ0FBSSxDQUFBO1FBQ3hCLE9BQU8sRUFBRSxDQUFBO0lBQ2IsQ0FBQztBQVZELENBVUMsQ0FBQSJ9