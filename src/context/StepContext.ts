import { createContext } from 'react';

const PAYMENTS_STEP = {
  LIST: 0,
  ADD: 1,
  EDIT: 2,
  DONE: 3,
} as const;

export const STEP_INITIAL_DATA = {
  step: PAYMENTS_STEP.LIST,
};

const StepContext = createContext(STEP_INITIAL_DATA);

export default StepContext;
