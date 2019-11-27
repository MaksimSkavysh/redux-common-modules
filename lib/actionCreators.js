"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var validate = function (data, type, validator) {
    if (validator) {
        try {
            if (validator.check) {
                validator.check(data);
            }
            else {
                validator(data);
            }
        }
        catch (e) {
            throw new Error("Wrong params for action type \"" + type + "\": " + e.message);
        }
    }
};
exports.commonActionCreator = function (module) {
    return function (name, payloadValidator, metaValidator) {
        var type = module + "/" + name;
        var ac = function (payload, meta) {
            validate(payload, type, payloadValidator);
            validate(meta, type, metaValidator);
            return { type: type, payload: payload, meta: meta };
        };
        ac.type = type;
        ac.toString = function () { return type; };
        return ac;
    };
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWN0aW9uQ3JlYXRvcnMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvYWN0aW9uQ3JlYXRvcnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFJQSxJQUFNLFFBQVEsR0FBRyxVQUFDLElBQVMsRUFBRSxJQUFZLEVBQUUsU0FBaUM7SUFDeEUsSUFBSSxTQUFTLEVBQUU7UUFDWCxJQUFJO1lBQ0EsSUFBSyxTQUF1QixDQUFDLEtBQUssRUFBRTtnQkFDL0IsU0FBdUIsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUE7YUFDdkM7aUJBQU07Z0JBQ0YsU0FBdUIsQ0FBQyxJQUFJLENBQUMsQ0FBQTthQUNqQztTQUNKO1FBQUMsT0FBTyxDQUFDLEVBQUU7WUFDUixNQUFNLElBQUksS0FBSyxDQUFDLG9DQUFpQyxJQUFJLFlBQU0sQ0FBQyxDQUFDLE9BQVMsQ0FBQyxDQUFBO1NBQzFFO0tBQ0o7QUFDTCxDQUFDLENBQUE7QUFFWSxRQUFBLG1CQUFtQixHQUFHLFVBQUMsTUFBYztJQUM5QyxPQUFBLFVBQ0ksSUFBWSxFQUNaLGdCQUF3QyxFQUN4QyxhQUFxQztRQUVyQyxJQUFNLElBQUksR0FBTSxNQUFNLFNBQUksSUFBTSxDQUFBO1FBQ2hDLElBQU0sRUFBRSxHQUFrQixVQUFDLE9BQU8sRUFBRSxJQUFJO1lBQ3BDLFFBQVEsQ0FBQyxPQUFPLEVBQUUsSUFBSSxFQUFFLGdCQUFnQixDQUFDLENBQUE7WUFDekMsUUFBUSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsYUFBYSxDQUFDLENBQUE7WUFDbkMsT0FBTyxFQUFFLElBQUksTUFBQSxFQUFFLE9BQU8sU0FBQSxFQUFFLElBQUksTUFBQSxFQUFFLENBQUE7UUFDbEMsQ0FBQyxDQUFBO1FBQ0QsRUFBRSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUE7UUFDZCxFQUFFLENBQUMsUUFBUSxHQUFHLGNBQU0sT0FBQSxJQUFJLEVBQUosQ0FBSSxDQUFBO1FBQ3hCLE9BQU8sRUFBRSxDQUFBO0lBQ2IsQ0FBQztBQWRELENBY0MsQ0FBQSJ9