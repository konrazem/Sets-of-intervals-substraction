import { ITest, ITimelinePoint, PointType } from '../types'

export const getTimelinePoints = ({
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
