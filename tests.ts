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
]
