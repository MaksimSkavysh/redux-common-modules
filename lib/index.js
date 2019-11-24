"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EMPTY_OBJECT = Object.freeze({});
exports.EMPTY_ARRAY = Object.freeze([]);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFJYSxRQUFBLFlBQVksR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxDQUFBO0FBQ2hDLFFBQUEsV0FBVyxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLENBQUE7QUFXL0IsUUFBQSxtQkFBbUIsR0FBRyxVQUFDLE1BQWM7SUFDOUMsT0FBQSxVQUFDLElBQVksRUFBRSxnQkFBNEIsRUFBRSxhQUF5QjtRQUNsRSxJQUFNLElBQUksR0FBTSxNQUFNLFNBQUksSUFBTSxDQUFBO1FBQ2hDLElBQU0sRUFBRSxHQUFrQixVQUFDLE9BQU8sRUFBRSxJQUFJO1lBQ3BDLGdCQUFnQixJQUFJLGdCQUFnQixDQUFDLE9BQU8sQ0FBQyxDQUFBO1lBQzdDLGFBQWEsSUFBSSxhQUFhLENBQUMsSUFBSSxDQUFDLENBQUE7WUFDcEMsT0FBTyxFQUFFLElBQUksTUFBQSxFQUFFLE9BQU8sU0FBQSxFQUFFLElBQUksTUFBQSxFQUFFLENBQUE7UUFDbEMsQ0FBQyxDQUFBO1FBQ0QsRUFBRSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUE7UUFDZCxFQUFFLENBQUMsUUFBUSxHQUFHLGNBQU0sT0FBQSxJQUFJLEVBQUosQ0FBSSxDQUFBO1FBQ3hCLE9BQU8sRUFBRSxDQUFBO0lBQ2IsQ0FBQztBQVZELENBVUMsQ0FBQSJ9