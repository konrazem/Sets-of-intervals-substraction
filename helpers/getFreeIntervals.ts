import { isEqual } from 'lodash'
import { ITest, Interval, PointType } from '../types'
import { getTimelinePoints } from './getTimelinePoints'

export const getFreeIntervals = (test: ITest) => {
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
