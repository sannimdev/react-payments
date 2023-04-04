import React, { useContext } from 'react';
import StepContext, { STEP_INITIAL_DATA } from './context/StepContext';
import { CardDetail, CardEdit, CardList } from './pages';

function App() {
  const { step } = useContext(StepContext);

  if (step === 0) {
    return (
      <StepContext.Provider value={STEP_INITIAL_DATA}>
        <CardList />
      </StepContext.Provider>
    );
  } else if (step === 1 || step === 2) {
    return (
      <StepContext.Provider value={STEP_INITIAL_DATA}>
        <CardEdit />
      </StepContext.Provider>
    );
  }
  return <CardDetail />;
}

export default App;
