import React, { createContext, useMemo } from 'react';

export const PAYMENTS_STEP = {
  LIST: 0,
  ADD: 1,
  EDIT: 2,
  DONE: 3,
} as const;

type TStep = {
  step?: number;
  onClick?: (step: number) => void;
};

type TStepContextProps = {
  children: React.ReactNode;
  step?: number;
  onClick?: (step: number) => void;
};

export const StepContext = createContext<TStep>({ step: 0 });

export function StepContextProvider({ step = 0, onClick, children }: TStepContextProps) {
  const value = useMemo(
    () => ({
      step,
      onClick,
    }),
    [step, onClick]
  );

  return <StepContext.Provider value={value}>{children}</StepContext.Provider>;
}
