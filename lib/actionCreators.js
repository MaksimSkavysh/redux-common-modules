"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWN0aW9uQ3JlYXRvcnMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvYWN0aW9uQ3JlYXRvcnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFJQSxJQUFNLFFBQVEsR0FBRyxVQUFDLElBQVMsRUFBRSxTQUFpQztJQUMxRCxJQUFJLFNBQVMsRUFBRTtRQUNYLElBQUssU0FBdUIsQ0FBQyxLQUFLLEVBQUU7WUFDL0IsU0FBdUIsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUE7U0FDdkM7YUFBTTtZQUNGLFNBQXVCLENBQUMsSUFBSSxDQUFDLENBQUE7U0FDakM7S0FDSjtBQUNMLENBQUMsQ0FBQTtBQUVZLFFBQUEsbUJBQW1CLEdBQUcsVUFBQyxNQUFjO0lBQzlDLE9BQUEsVUFDSSxJQUFZLEVBQ1osZ0JBQXdDLEVBQ3hDLGFBQXFDO1FBRXJDLElBQU0sSUFBSSxHQUFNLE1BQU0sU0FBSSxJQUFNLENBQUE7UUFDaEMsSUFBTSxFQUFFLEdBQWtCLFVBQUMsT0FBTyxFQUFFLElBQUk7WUFDcEMsUUFBUSxDQUFDLE9BQU8sRUFBRSxnQkFBZ0IsQ0FBQyxDQUFBO1lBQ25DLFFBQVEsQ0FBQyxJQUFJLEVBQUUsYUFBYSxDQUFDLENBQUE7WUFDN0IsT0FBTyxFQUFFLElBQUksTUFBQSxFQUFFLE9BQU8sU0FBQSxFQUFFLElBQUksTUFBQSxFQUFFLENBQUE7UUFDbEMsQ0FBQyxDQUFBO1FBQ0QsRUFBRSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUE7UUFDZCxFQUFFLENBQUMsUUFBUSxHQUFHLGNBQU0sT0FBQSxJQUFJLEVBQUosQ0FBSSxDQUFBO1FBQ3hCLE9BQU8sRUFBRSxDQUFBO0lBQ2IsQ0FBQztBQWRELENBY0MsQ0FBQSJ9