"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var T = require("runtypes");
exports.notEmptyStringGuard = T.String.withConstraint(function (s) { return s.length > 0; });
exports.actionGuard = T.Record({ type: exports.notEmptyStringGuard });
exports.idGuard = T.String
    .withConstraint(function (s) { return s.length > 0 || 'Empty string could not be Id'; }).Or(T.Number);
exports.pathGuard = T.Array(exports.idGuard)
    .withConstraint(function (a) { return a.length > 0 || 'Path with length 0 is not allowed'; });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHlwZXMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvdHlwZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSw0QkFBNkI7QUFtQmhCLFFBQUEsbUJBQW1CLEdBQUcsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxjQUFjLENBQUMsVUFBQSxDQUFDLElBQUksT0FBQSxDQUFDLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBWixDQUFZLENBQUMsQ0FBQTtBQUVoRSxRQUFBLFdBQVcsR0FBRyxDQUFDLENBQUMsTUFBTSxDQUFDLEVBQUUsSUFBSSxFQUFFLDJCQUFtQixFQUFFLENBQUMsQ0FBQTtBQUVyRCxRQUFBLE9BQU8sR0FBRyxDQUFDLENBQUMsTUFBTTtLQUMxQixjQUFjLENBQUMsVUFBQSxDQUFDLElBQUksT0FBQSxDQUFDLENBQUMsTUFBTSxHQUFHLENBQUMsSUFBSSw4QkFBOEIsRUFBOUMsQ0FBOEMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUE7QUFFeEUsUUFBQSxTQUFTLEdBQUcsQ0FBQyxDQUFDLEtBQUssQ0FBQyxlQUFPLENBQUM7S0FDcEMsY0FBYyxDQUFDLFVBQUEsQ0FBQyxJQUFJLE9BQUEsQ0FBQyxDQUFDLE1BQU0sR0FBRyxDQUFDLElBQUksbUNBQW1DLEVBQW5ELENBQW1ELENBQUMsQ0FBQSJ9