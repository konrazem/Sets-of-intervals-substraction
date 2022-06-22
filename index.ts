import { isEqual } from 'lodash'

type Interval = {
  start: number
  end: number
}

enum PointType {
  taken,
  free,
}

type ITimelinePoint = {
  type: PointType
  value: number
  start: boolean
}

type ITest = {
  takenIntervals: Interval[]
  freeIntervals: Interval[]
  newFreeIntervals: Interval[]
}

const tests: ITest[] = [
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

const getTimelinePoints = ({
  takenIntervals,
  freeIntervals,
}: ITest): ITimelinePoint[] => {
  // FILL TIMELINE WITH BASKET POINTS
  const points: ITimelinePoint[] = []

  for (const item of takenIntervals) {
    const type = PointType.taken

    points.push({ type, value: item.start, start: true })
    points.push({ type, value: item.end, start: false })
  }

  for (const item of freeIntervals) {
    const type = PointType.free

    points.push({ type, value: item.start, start: true })
    points.push({ type, value: item.end, start: false })
  }

  // SORT POINTS
  const sortedTimeline = points.sort((a, b) => {
    if (a.value > b.value) {
      return 1
    }

    return -1
  })

  return points
}

const getFreeIntervals = (test: ITest) => {
  // FLAGS
  let dangerFlag = false
  let freeFlag = false
  const output: Interval[] = []

  let start: number | null = null
  let end: number | null = null

  for (const point of getTimelinePoints(test)) {
    // SET FLAGS. MORE IMP ARE THOSE WITH END!
    if (point.type === PointType.taken && !point.start && dangerFlag) {
      dangerFlag = false
    }

    if (point.type === PointType.free && !point.start && freeFlag) {
      freeFlag = false
    }

    if (point.type === PointType.taken && point.start && !dangerFlag) {
      dangerFlag = true
    }

    if (point.type === PointType.free && point.start && !freeFlag) {
      freeFlag = true
    }

    // ANALIZE POINT
    // IF DANGER FLAG IS OFF AND THERE IS FREE FLAG UP AND THERE WAS START THERE MUST BE NEW START POINT DENOTED
    if (freeFlag && !dangerFlag) {
      // IT IS START
      start = point.value
    }

    // IF FREE FLAG IS DOWN
    if (start && !freeFlag && !dangerFlag) {
      end = point.value
    }

    // IF DANGER FLAG IS UP
    if (start && dangerFlag && start !== point.value) {
      end = point.value
    }

    if (start && end) {
      output.push({ start, end })
      start = null
      end = null
    }
  }

  console.log('-------- TAKEN INTERVALS -----------')

  console.table(test.takenIntervals)

  console.log('-------- FREE INTERVALS -----------')

  console.table(test.freeIntervals)

  console.log('-------- NEW FREE INTERVALS -----------')

  console.table(test.newFreeIntervals)

  return isEqual(output, test.newFreeIntervals)
}

const runTests = () => {
  let i = 0

  for (const test of tests) {
    i = i + 1
    const res = getFreeIntervals(test)

    console.log(`--------- TEST ${i} ----------`)
    console.log(res)
  }
}

runTests()
