"use strict";
exports.__esModule = true;
exports.getTimelinePoints = void 0;
var types_1 = require("../types");
var getTimelinePoints = function (_a) {
    var takenIntervals = _a.takenIntervals, freeIntervals = _a.freeIntervals;
    // FILL TIMELINE WITH BASKET POINTS
    var points = [];
    for (var _i = 0, takenIntervals_1 = takenIntervals; _i < takenIntervals_1.length; _i++) {
        var item = takenIntervals_1[_i];
        var type = types_1.PointType.taken;
        points.push({ type: type, value: item.start, start: true });
        points.push({ type: type, value: item.end, start: false });
    }
    for (var _b = 0, freeIntervals_1 = freeIntervals; _b < freeIntervals_1.length; _b++) {
        var item = freeIntervals_1[_b];
        var type = types_1.PointType.free;
        points.push({ type: type, value: item.start, start: true });
        points.push({ type: type, value: item.end, start: false });
    }
    // SORT POINTS
    var sortedTimeline = points.sort(function (a, b) {
        if (a.value > b.value) {
            return 1;
        }
        return -1;
    });
    return points;
};
exports.getTimelinePoints = getTimelinePoints;
