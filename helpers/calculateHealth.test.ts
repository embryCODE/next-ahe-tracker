import { calculateHealth } from './calculateHealth';
import { Food, HealthStatus } from '../types';
import defaultUser from '../fixtures/defaultUser.json';
import goodUser from '../fixtures/goodUser.json';
import warningUser from '../fixtures/warningUser.json';
import badUser from '../fixtures/badUser.json';

const defaultFoods = (defaultUser.foods as unknown) as Food[];
const goodFoods = (goodUser.foods as unknown) as Food[];
const warningFoods = (warningUser.foods as unknown) as Food[];
const badFoods = (badUser.foods as unknown) as Food[];

describe('calculateHealth', function () {
  it('should run an empty test', function () {
    expect(true);
  });

  it('should throw error if no argument provided', function () {
    // @ts-ignore
    expect(() => calculateHealth()).toThrow();
  });

  it('should throw error if argument is the wrong type', function () {
    // @ts-ignore
    expect(() => calculateHealth(0)).toThrow();
    // @ts-ignore
    expect(() => calculateHealth('')).toThrow();
    // @ts-ignore
    expect(() => calculateHealth(1)).toThrow();
  });

  it('should throw error if array is empty', function () {
    expect(() => calculateHealth([])).toThrow();
  });

  it('should return Good if all counts are the 0', function () {
    expect(calculateHealth(defaultFoods)).toBe(HealthStatus.Good);
  });

  it('should return Good if all counts are in descending order', function () {
    expect(calculateHealth(goodFoods)).toBe(HealthStatus.Good);
  });

  it('should return Warning if categories are in order', function () {
    expect(calculateHealth(warningFoods)).toBe(HealthStatus.Warning);
  });

  it('should return Bad if categories are out of order', function () {
    expect(calculateHealth(badFoods)).toBe(HealthStatus.Bad);
  });
});
