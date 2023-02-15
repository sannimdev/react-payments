import React from 'react';
import { Card } from './components/Card';

function App() {
  return (
    <div className="App">
      <Card
        cardName="복카드"
        owner="홍길동"
        expiredMonth={10}
        expiredYear={23}
        numbers={['1111', '2222', '3333', '4444']}
      />
    </div>
  );
}

export default App;
