"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.composeReducers = function () {
    var reducers = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        reducers[_i] = arguments[_i];
    }
    return function (state, action) {
        return reducers.reduceRight(function (curState, reducer) { return reducer(curState, action); }, state);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFJYSxRQUFBLGVBQWUsR0FBRztJQUFDLGtCQUEwQjtTQUExQixVQUEwQixFQUExQixxQkFBMEIsRUFBMUIsSUFBMEI7UUFBMUIsNkJBQTBCOztJQUFLLE9BQUEsVUFBQyxLQUFVLEVBQUUsTUFBVztRQUNuRixPQUFBLFFBQVEsQ0FBQyxXQUFXLENBQUMsVUFBQyxRQUFRLEVBQUUsT0FBTyxJQUFLLE9BQUEsT0FBTyxDQUFDLFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBekIsQ0FBeUIsRUFBRSxLQUFLLENBQUM7SUFBN0UsQ0FBNkU7QUFEbEIsQ0FDa0IsQ0FBQTtBQUVwRSxRQUFBLG1CQUFtQixHQUFHLFVBQUMsTUFBYztJQUM5QyxPQUFBLFVBQUMsSUFBWSxFQUFFLGdCQUFzQyxFQUFFLGFBQW1DO1FBQ3RGLElBQU0sSUFBSSxHQUFNLE1BQU0sU0FBSSxJQUFNLENBQUE7UUFDaEMsSUFBTSxFQUFFLEdBQUcsVUFBQyxPQUFZLEVBQUUsSUFBbUI7WUFDekMsZ0JBQWdCLElBQUksZ0JBQWdCLENBQUMsT0FBTyxDQUFDLENBQUE7WUFDN0MsYUFBYSxJQUFJLGFBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQTtZQUNwQyxPQUFPLEVBQUUsSUFBSSxNQUFBLEVBQUUsT0FBTyxTQUFBLEVBQUUsSUFBSSxNQUFBLEVBQUUsQ0FBQTtRQUNsQyxDQUFDLENBQUE7UUFDRCxFQUFFLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQTtRQUNkLEVBQUUsQ0FBQyxRQUFRLEdBQUcsY0FBTSxPQUFBLElBQUksRUFBSixDQUFJLENBQUE7UUFDeEIsT0FBTyxFQUFFLENBQUE7SUFDYixDQUFDO0FBVkQsQ0FVQyxDQUFBIn0=