import { render, screen, waitFor } from '@testing-library/react'
import { FoodInput } from './FoodInput'
import { Food } from '../types'
import defaultUser from '../fixtures/defaultUser.json'
import userEvent from '@testing-library/user-event'

const defaultFoods = (defaultUser.foods as unknown) as Food[]

describe('FoodInput', () => {
  it('should run an empty test', function () {
    expect(true)
  })

  it('renders without crashing', () => {
    render(<FoodInput food={defaultFoods[0]} onCountChange={() => {}} />)
  })

  it('renders the food name in a heading', () => {
    render(<FoodInput food={defaultFoods[0]} onCountChange={() => {}} />)

    expect(screen.getByRole('heading')).toHaveTextContent('Vegetables')
  })

  it('renders the food count', () => {
    const food = defaultFoods[0]

    render(<FoodInput food={food} onCountChange={() => {}} />)

    expect(screen.getByTestId('Vegetables-count')).toHaveTextContent(food.count.toString())
  })

  it('increases the food count when right arrow is clicked', () => {
    const food = defaultFoods[0]

    render(<FoodInput food={food} onCountChange={() => {}} />)

    expect(screen.getByTestId('Vegetables-count')).toHaveTextContent(food.count.toString())

    userEvent.click(screen.getByTestId('Vegetables-increase'))

    waitFor(() => expect(screen.getByTestId('Vegetables-count')).toHaveTextContent((food.count + 0.5).toString()))
  })

  it('decreases the food count when left arrow is clicked', () => {
    const food = defaultFoods[0]

    render(<FoodInput food={food} onCountChange={() => {}} />)

    expect(screen.getByTestId('Vegetables-count')).toHaveTextContent(food.count.toString())
    userEvent.click(screen.getByTestId('Vegetables-increase'))
    waitFor(() => expect(screen.getByTestId('Vegetables-count')).toHaveTextContent((food.count + 0.5).toString()))
    userEvent.click(screen.getByTestId('Vegetables-decrease'))
    waitFor(() => expect(screen.getByTestId('Vegetables-count')).toHaveTextContent(food.count.toString()))
  })
})
