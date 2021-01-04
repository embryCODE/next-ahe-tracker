import React from 'react';
import { TextField } from '@material-ui/core';
import { Food } from '../types';

interface FoodInputProps {
  food: Food;
  onCountChange: (count: number) => void;
}

const FoodInput: React.FC<FoodInputProps> = ({ food, onCountChange }) => {
  return (
    <TextField
      fullWidth={true}
      type={'number'}
      label={food.name}
      value={food.count}
      onChange={(e) => onCountChange(parseFloat(e.target.value) || 0)}
      inputProps={{ step: '0.5' }}
    />
  );
};

export { FoodInput };
