import React, { useContext, useEffect, useState } from 'react'
import { Box, Button, debounce, Typography } from '@material-ui/core'
import { Food, HealthStatus } from '../types'
import { FoodInput } from './FoodInput'
import axios from 'axios'
import { updateFoods } from '../data/net'
import HealthContext from '../data/HealthContext'
import { calculateHealth, combineFoodsByCategory } from '../helpers'

const debouncedUpdateFoods = debounce(
  (foods) =>
    updateFoods(foods)
      .then(() => {
        console.log('Foods were saved')
      })
      .catch((err) => {
        console.error('Foods were not saved:', err)
      }),
  1000
)

function renderStatus(health: HealthStatus) {
  switch (health) {
    case HealthStatus.ExtraCredit:
      return (
        <>
          Extra credit!
          <Box ml={1} fontSize={24} component="span">
            💪
          </Box>
        </>
      )
    case HealthStatus.Good:
      return (
        <>
          All good!
          <Box ml={1} fontSize={24} component="span">
            ✔
          </Box>
        </>
      )
    case HealthStatus.Bad:
      return (
        <>
          Doh!
          <Box ml={1} fontSize={24} component="span">
            🤦
          </Box>
        </>
      )
    default:
      return null
  }
}

const TrackerForm: React.FC = () => {
  const [foods, setFoods] = useState<Food[] | undefined>()
  const [health, setHealth] = useContext(HealthContext)

  useEffect(() => {
    axios.get<Food[]>('/api/foods').then((res) => {
      setFoods(res.data)
    })
  }, [])

  useEffect(() => {
    if (foods === undefined) return

    // noinspection JSIgnoredPromiseFromCall
    debouncedUpdateFoods(foods)
    setHealth(calculateHealth(foods))
  }, [foods])

  if (foods === undefined) {
    return <div>Loading...</div>
  }

  const foodsByCategory = combineFoodsByCategory(foods)

  const handleCountChange = (id: string) => (count: number) => {
    const updatedFoods = foods.map((f) => {
      return f.id === id ? { ...f, count } : f
    })

    setFoods(updatedFoods)
  }

  const handleResetAll = () => {
    setFoods(foods.map((f) => ({ ...f, count: 0 })))
  }

  return (
    <Box py={1} position="relative">
      <Box position="absolute" top={8} right={0}>
        {renderStatus(health)}
      </Box>

      <form>
        {Object.entries(foodsByCategory).map(([key, value]) => {
          return (
            <Box key={key}>
              <Typography variant="h4">{key}</Typography>
              <Box my={2}>
                {value
                  .sort((x, y) => x.priority - y.priority)
                  .map((food) => (
                    <FoodInput key={food.name} food={food} onCountChange={handleCountChange(food.id)} />
                  ))}
              </Box>
            </Box>
          )
        })}
      </form>

      <Box mt={3}>
        <Button variant="contained" color="primary" onClick={handleResetAll}>
          Reset all
        </Button>
      </Box>
    </Box>
  )
}

export { TrackerForm }
