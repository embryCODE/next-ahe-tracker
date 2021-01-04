import { Food } from '../types'

export function combineFoodsByCategory(foods: Food[]): Record<string, Food[]> {
  return foods.reduce<Record<string, Food[]>>((acc, curr) => {
    if (acc[curr.category]) {
      acc[curr.category].push(curr)
    } else {
      acc[curr.category] = [curr]
    }

    return acc
  }, {})
}
