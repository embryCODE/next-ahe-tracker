import { Food, HealthStatus } from '../types';
import { combineFoodsByCategory } from './combineFoodsByCategory';

export function calculateHealth(foods: Food[]): HealthStatus {
  validateFoods(foods);

  const foodsByPriority = foods
    .sort((x, y) => x.priority - y.priority)
    // Foods not eaten at all don't factor into any calculations
    .filter((food) => food.count);

  if (isGood(foodsByPriority)) return HealthStatus.Good;
  if (isWarning(foodsByPriority)) return HealthStatus.Warning;

  return HealthStatus.Bad;
}

function isGood(foods: Food[]) {
  // Loop over the foods in order of priority, starting at 0
  // If the count of each food is less than the food before it, return true
  return foods.every((food, i) => {
    let previousFood = foods[i - 1];

    if (!previousFood) return true;

    return food.count < previousFood.count;
  });
}

function isWarning(foods: Food[]) {
  const foodsByCategory = combineFoodsByCategory(foods);

  // Create an object of categories, in order of priority, with the lowest and highest counts of each
  const categoryCounts = Object.entries(foodsByCategory)
    .map(([categoryName, foods]) => {
      return {
        categoryName,
        categoryPriority: foods[0].categoryPriority,
        highestCount: getHighestCount(foods),
        lowestCount: getLowestCount(foods),
      };
    })
    .sort((x, y) => x.categoryPriority - y.categoryPriority);

  // For every category
  return categoryCounts.every((category, i) => {
    // Check against all categories after it
    const categoriesAfterThis = categoryCounts.slice(i + 1);

    // If the lowest count in the current category is greater than
    // the highest count in every category after it, return true
    return categoriesAfterThis.every(
      (categoryAfterThis) =>
        category.lowestCount > categoryAfterThis.highestCount
    );
  });
}

function validateFoods(foods: Food[]) {
  if (!foods || !Array.isArray(foods) || foods.length === 0) {
    throw new Error('Invalid arguments');
  }
}

function getHighestCount(foods: Food[]): number {
  return Math.max(...foods.map((f) => f.count));
}

function getLowestCount(foods: Food[]): number {
  return Math.min(...foods.map((f) => f.count));
}
