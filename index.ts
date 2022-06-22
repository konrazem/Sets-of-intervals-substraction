import { getFreeIntervals } from './helpers/getFreeIntervals'
import { tests } from './tests'

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
