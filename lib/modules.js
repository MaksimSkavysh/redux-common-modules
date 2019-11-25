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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9tb2R1bGVzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBRWEsUUFBQSxZQUFZLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsQ0FBQTtBQUNoQyxRQUFBLFdBQVcsR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxDQUFBO0FBTy9CLFFBQUEsbUJBQW1CLEdBQUcsVUFBQyxNQUFjO0lBQzlDLE9BQUEsVUFBQyxJQUFZLEVBQUUsZ0JBQTRCLEVBQUUsYUFBeUI7UUFDbEUsSUFBTSxJQUFJLEdBQU0sTUFBTSxTQUFJLElBQU0sQ0FBQTtRQUNoQyxJQUFNLEVBQUUsR0FBa0IsVUFBQyxPQUFPLEVBQUUsSUFBSTtZQUNwQyxnQkFBZ0IsSUFBSSxnQkFBZ0IsQ0FBQyxPQUFPLENBQUMsQ0FBQTtZQUM3QyxhQUFhLElBQUksYUFBYSxDQUFDLElBQUksQ0FBQyxDQUFBO1lBQ3BDLE9BQU8sRUFBRSxJQUFJLE1BQUEsRUFBRSxPQUFPLFNBQUEsRUFBRSxJQUFJLE1BQUEsRUFBRSxDQUFBO1FBQ2xDLENBQUMsQ0FBQTtRQUNELEVBQUUsQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFBO1FBQ2QsRUFBRSxDQUFDLFFBQVEsR0FBRyxjQUFNLE9BQUEsSUFBSSxFQUFKLENBQUksQ0FBQTtRQUN4QixPQUFPLEVBQUUsQ0FBQTtJQUNiLENBQUM7QUFWRCxDQVVDLENBQUEifQ==