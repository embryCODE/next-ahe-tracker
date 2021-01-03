import React, { useContext, useEffect, useState } from 'react';
import { Box, debounce } from '@material-ui/core';
import { Food } from '../types';
import { FoodInput } from './components/FoodInput';
import axios from 'axios';
import { updateFoods } from '../data/net';
import HealthContext from '../data/HealthContext';
import { calculateHealth } from '../helpers';
import { combineFoodsByCategory } from '../helpers';

const debouncedUpdateFoods = debounce(
  (foods) =>
    updateFoods(foods)
      .then(() => {
        console.log('Foods were saved');
      })
      .catch((err) => {
        console.error('Foods were not saved:', err);
      }),
  1000
);

const TrackerForm: React.FC = () => {
  const [foods, setFoods] = useState<Food[] | undefined>();
  const [, setHealth] = useContext(HealthContext);

  useEffect(() => {
    axios.get<Food[]>('/api/foods').then((res) => {
      setFoods(res.data);
    });
  }, []);

  useEffect(() => {
    if (foods === undefined) return;

    // noinspection JSIgnoredPromiseFromCall
    debouncedUpdateFoods(foods);
    setHealth(calculateHealth(foods));
  }, [foods]);

  if (foods === undefined) {
    return <div>Loading...</div>;
  }

  const handleCountChange = (id: string) => (count: number) => {
    const updatedFoods = foods.map((f) => {
      return f.id === id ? { ...f, count } : f;
    });

    setFoods(updatedFoods);
  };

  const foodsByCategory = combineFoodsByCategory(foods)

  return (
    <form>
      {Object.entries(foodsByCategory).map(([key, value]) => {
        return (
          <Box key={key}>
            <h2>{key}</h2>
            <Box>
              {value
                .sort((x, y) => x.priority - y.priority)
                .map((food) => (
                  <FoodInput
                    key={food.name}
                    food={food}
                    onCountChange={handleCountChange(food.id)}
                  />
                ))}
            </Box>
          </Box>
        );
      })}
    </form>
  );
};

export { TrackerForm };
