import { ITest } from './types'

export const tests: ITest[] = [
  {
    takenIntervals: [
      {
        start: 10,
        end: 12,
      },
      {
        start: 15,
        end: 16,
      },
    ],

    freeIntervals: [
      {
        start: 8,
        end: 9,
      },
      {
        start: 11,
        end: 12,
      },
      {
        start: 15,
        end: 17,
      },
    ],

    newFreeIntervals: [
      { start: 8, end: 9 },
      { start: 16, end: 17 },
    ],
  },
  {
    takenIntervals: [
      {
        start: 10,
        end: 12,
      },
    ],

    freeIntervals: [
      {
        start: 12,
        end: 13,
      },
    ],

    newFreeIntervals: [{ start: 12, end: 13 }],
  },
  {
    takenIntervals: [
      {
        start: 10,
        end: 13,
      },
    ],

    freeIntervals: [
      {
        start: 12,
        end: 13,
      },
    ],

    newFreeIntervals: [],
  },
  {
    takenIntervals: [
      {
        start: 10,
        end: 14,
      },
    ],

    freeIntervals: [
      {
        start: 9,
        end: 13,
      },
    ],

    newFreeIntervals: [{ start: 9, end: 10 }],
  },
  {
    // BETWEEN
    takenIntervals: [
      {
        start: 10,
        end: 14,
      },
      {
        start: 15,
        end: 16,
      },
    ],

    freeIntervals: [
      {
        start: 9,
        end: 17,
      },
    ],

    newFreeIntervals: [
      { start: 9, end: 10 },
      { start: 14, end: 15 },
      { start: 16, end: 17 },
    ],
  },
  {
    // EMPTY
    takenIntervals: [],

    freeIntervals: [],

    newFreeIntervals: [],
  },
  {
    // CUT
    takenIntervals: [
      {
        start: 50,
        end: 100,
      },
      {
        start: 110,
        end: 120,
      },
    ],

    freeIntervals: [
      {
        start: 50,
        end: 120,
      },
    ],

    newFreeIntervals: [{ start: 100, end: 110 }],
  },
  {
    // WITH 0  START
    takenIntervals: [
      {
        start: 0,
        end: 100,
      },
      {
        start: 110,
        end: 120,
      },
    ],

    freeIntervals: [
      {
        start: 0,
        end: 120,
      },
    ],

    newFreeIntervals: [{ start: 100, end: 110 }],
  },
  {
    // WITH EMPTY TAKEN INT
    takenIntervals: [],

    freeIntervals: [
      {
        start: 200,
        end: 300,
      },
    ],

    newFreeIntervals: [{ start: 200, end: 300 }],
  },
  {
    // WITH EMPTY FREE INT
    takenIntervals: [
      {
        start: 200,
        end: 300,
      },
    ],

    freeIntervals: [],
    newFreeIntervals: [],
  },
]
