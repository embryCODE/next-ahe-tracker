import { Dispatch, SetStateAction } from 'react';

export enum HealthStatus {
  'Unknown',
  'Bad',
  'Warning',
  'Good',
}

export interface Food {
  id: string;
  priority: number;
  name: string;
  count: number;
  category: string;
  categoryPriority: number
}

export type HealthContextValue = [
  HealthStatus,
  Dispatch<SetStateAction<HealthStatus>>
];
