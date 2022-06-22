export type Interval = {
  start: number
  end: number
}

export enum PointType {
  taken,
  free,
}

export type ITimelinePoint = {
  type: PointType
  value: number
  start: boolean
}

export type ITest = {
  takenIntervals: Interval[]
  freeIntervals: Interval[]
  newFreeIntervals: Interval[]
}
