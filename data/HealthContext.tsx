import { createContext, Dispatch, SetStateAction } from 'react';
import { HealthContextValue, HealthStatus } from '../types';

const fakeDispatch = () => {
  throw new Error('You must provide a setHealthStatus method');
};

const healthContextValue: HealthContextValue = [
  HealthStatus.Good,
  fakeDispatch as Dispatch<SetStateAction<HealthStatus>>,
];

export default createContext(healthContextValue);
