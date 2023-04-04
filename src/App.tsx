import React, { useContext } from 'react';
import { StepContext, StepContextProvider } from './context/StepContext';
import { CardDetail, CardEdit, CardList } from './pages';

function App() {
  const stepContext = useContext(StepContext);

  const { step } = stepContext;

  if (step === 0) {
    return (
      <StepContextProvider>
        <CardList />
      </StepContextProvider>
    );
  } else if (step === 1 || step === 2) {
    return (
      <StepContextProvider>
        <CardEdit />
      </StepContextProvider>
    );
  }
  return <CardDetail />;
}

export default App;
