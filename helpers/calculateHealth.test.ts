import { calculateHealth } from './calculateHealth'
import { Food, HealthStatus } from '../types'
import defaultUser from '../fixtures/defaultUser.json'
import extraCreditUser from '../fixtures/extraCreditUser.json'
import goodUser from '../fixtures/goodUser.json'
import badUser from '../fixtures/badUser.json'

const defaultFoods = (defaultUser.foods as unknown) as Food[]
const extraCreditFoods = (extraCreditUser.foods as unknown) as Food[]
const goodFoods = (goodUser.foods as unknown) as Food[]
const badFoods = (badUser.foods as unknown) as Food[]

describe('calculateHealth', function () {
  it('should run an empty test', function () {
    expect(true)
  })

  it('should throw error if no argument provided', function () {
    // @ts-ignore
    expect(() => calculateHealth()).toThrow()
  })

  it('should throw error if argument is the wrong type', function () {
    // @ts-ignore
    expect(() => calculateHealth(0)).toThrow()
    // @ts-ignore
    expect(() => calculateHealth('')).toThrow()
    // @ts-ignore
    expect(() => calculateHealth(1)).toThrow()
  })

  it('should throw error if array is empty', function () {
    expect(() => calculateHealth([])).toThrow()
  })

  it('should return ExtraCredit if all counts are 0', function () {
    expect(calculateHealth(defaultFoods)).toBe(HealthStatus.ExtraCredit)
  })

  it('should return ExtraCredit if all counts are in descending order', function () {
    expect(calculateHealth(extraCreditFoods)).toBe(HealthStatus.ExtraCredit)
  })

  it('should return ExtraCredit if all counts are in descending order or zero', function () {
    const foodsToTest = [...defaultFoods]
    foodsToTest[0].count = 1
    foodsToTest[1].count = 0

    expect(calculateHealth(foodsToTest)).toBe(HealthStatus.ExtraCredit)
  })

  it('should return Good if categories are in order', function () {
    expect(calculateHealth(goodFoods)).toBe(HealthStatus.Good)
  })

  it('should return Good if even for zeros ', function () {
    const foodsToTest = [...defaultFoods]
    foodsToTest[1].count = 1

    expect(calculateHealth(foodsToTest)).toBe(HealthStatus.Good)
  })

  it('should handle this edge case ', function () {
    const foodsToTest = [...defaultFoods]
    foodsToTest[0].count = 5
    foodsToTest[1].count = 4
    foodsToTest[2].count = 2.5
    foodsToTest[6].count = 2

    expect(calculateHealth(foodsToTest)).toBe(HealthStatus.Bad)
  })

  it('should return Bad if categories are out of order', function () {
    expect(calculateHealth(badFoods)).toBe(HealthStatus.Bad)
  })
})
