"use strict";
exports.__esModule = true;
exports.getFreeIntervals = void 0;
var lodash_1 = require("lodash");
var types_1 = require("../types");
var getTimelinePoints_1 = require("./getTimelinePoints");
var getFreeIntervals = function (test) {
    // FLAGS
    var dangerFlag = false;
    var freeFlag = false;
    var output = [];
    var start = null;
    var end = null;
    for (var _i = 0, _a = (0, getTimelinePoints_1.getTimelinePoints)(test); _i < _a.length; _i++) {
        var point = _a[_i];
        // SET FLAGS. MORE IMP ARE THOSE WITH END!
        if (point.type === types_1.PointType.taken && !point.start && dangerFlag) {
            dangerFlag = false;
        }
        if (point.type === types_1.PointType.free && !point.start && freeFlag) {
            freeFlag = false;
        }
        if (point.type === types_1.PointType.taken && point.start && !dangerFlag) {
            dangerFlag = true;
        }
        if (point.type === types_1.PointType.free && point.start && !freeFlag) {
            freeFlag = true;
        }
        // ANALIZE POINT
        // IF DANGER FLAG IS OFF AND THERE IS FREE FLAG UP AND THERE WAS START THERE MUST BE NEW START POINT DENOTED
        if (freeFlag && !dangerFlag) {
            // IT IS START
            start = point.value;
        }
        // IF FREE FLAG IS DOWN
        if (start && !freeFlag && !dangerFlag) {
            end = point.value;
        }
        // IF DANGER FLAG IS UP
        if (start && dangerFlag && start !== point.value) {
            end = point.value;
        }
        if (start && end) {
            output.push({ start: start, end: end });
            start = null;
            end = null;
        }
    }
    console.log('-------- TAKEN INTERVALS -----------');
    console.table(test.takenIntervals);
    console.log('-------- FREE INTERVALS -----------');
    console.table(test.freeIntervals);
    console.log('-------- NEW FREE INTERVALS -----------');
    console.table(test.newFreeIntervals);
    return (0, lodash_1.isEqual)(output, test.newFreeIntervals);
};
exports.getFreeIntervals = getFreeIntervals;
