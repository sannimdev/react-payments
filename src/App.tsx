import React, { useContext, useEffect } from 'react';
import { Router } from './components/Router';
import { Routes } from './components/Routes/Routes';

function App() {
  return (
    <Router>
      <Routes />
    </Router>
  );
}

export default App;
