import axios from 'axios';
import { Food } from '../types';

export const updateFoods = async (foods: Food[]): Promise<Food[]> => {
  return axios.post<Food[]>(`/api/foods`, foods).then((res) => {
    return res.data;
  });
};
