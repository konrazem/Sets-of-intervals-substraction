"use strict";
exports.__esModule = true;
var lodash_1 = require("lodash");
var PointType;
(function (PointType) {
    PointType[PointType["taken"] = 0] = "taken";
    PointType[PointType["free"] = 1] = "free";
})(PointType || (PointType = {}));
var tests = [
    {
        takenIntervals: [
            {
                start: 10,
                end: 12
            },
            {
                start: 15,
                end: 16
            },
        ],
        freeIntervals: [
            {
                start: 8,
                end: 9
            },
            {
                start: 11,
                end: 12
            },
            {
                start: 15,
                end: 17
            },
        ],
        newFreeIntervals: [
            { start: 8, end: 9 },
            { start: 16, end: 17 },
        ]
    },
];
var getTimelinePoints = function (_a) {
    var takenIntervals = _a.takenIntervals, freeIntervals = _a.freeIntervals;
    // FILL TIMELINE WITH BASKET POINTS
    var points = [];
    for (var _i = 0, takenIntervals_1 = takenIntervals; _i < takenIntervals_1.length; _i++) {
        var item = takenIntervals_1[_i];
        var type = PointType.taken;
        points.push({ type: type, value: item.start, start: true });
        points.push({ type: type, value: item.end, start: false });
    }
    for (var _b = 0, freeIntervals_1 = freeIntervals; _b < freeIntervals_1.length; _b++) {
        var item = freeIntervals_1[_b];
        var type = PointType.free;
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
var getFreeIntervals = function (test) {
    // FLAGS
    var dangerFlag = false;
    var freeFlag = false;
    var output = [];
    var start = null;
    var end = null;
    for (var _i = 0, _a = getTimelinePoints(test); _i < _a.length; _i++) {
        var point = _a[_i];
        // SET FLAGS. MORE IMP ARE THOSE WITH END!
        if (point.type === PointType.taken && !point.start && dangerFlag) {
            dangerFlag = false;
        }
        if (point.type === PointType.free && !point.start && freeFlag) {
            freeFlag = false;
        }
        if (point.type === PointType.taken && point.start && !dangerFlag) {
            dangerFlag = true;
        }
        if (point.type === PointType.free && point.start && !freeFlag) {
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
var runTests = function () {
    var i = 0;
    for (var _i = 0, tests_1 = tests; _i < tests_1.length; _i++) {
        var test = tests_1[_i];
        i = i + 1;
        var res = getFreeIntervals(test);
        console.log("--------- TEST ".concat(i, " ----------"));
        console.log(res);
    }
};
runTests();
