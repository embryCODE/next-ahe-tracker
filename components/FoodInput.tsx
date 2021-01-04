import React from 'react'
import { Box, IconButton, Typography } from '@material-ui/core'
import { Food } from '../types'
import { ArrowLeft, ArrowRight } from '@material-ui/icons'

interface FoodInputProps {
  food: Food
  onCountChange: (count: number) => void
}

const FoodInput: React.FC<FoodInputProps> = ({ food, onCountChange }) => {
  const countTestId = `${food.name}-count`
  const arrowDecreaseTestId = `${food.name}-decrease`
  const arrowIncreaseTestId = `${food.name}-increase`

  const handleArrowClick = (direction: string) => () => {
    const newCount = direction === 'increase' ? food.count + 0.5 : food.count - 0.5
    onCountChange(newCount)
  }

  return (
    <>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography variant="h6">{food.name}</Typography>

        <Box display="flex" justifyContent="space-between" alignItems="center">
          <IconButton size="small" data-testid={arrowDecreaseTestId} onClick={handleArrowClick('decrease')}>
            <ArrowLeft fontSize="large" />
          </IconButton>
          <Box textAlign="center" data-testid={countTestId} width="2em">
            {food.count}
          </Box>
          <IconButton size="small" data-testid={arrowIncreaseTestId} onClick={handleArrowClick('increase')}>
            <ArrowRight fontSize="large" />
          </IconButton>
        </Box>
      </Box>
    </>
  )
}

export { FoodInput }
