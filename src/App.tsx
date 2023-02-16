import React, { useState } from 'react';
import { Card } from './components/Card';
import { CardNumberInput } from './components/CardNumberInput';

function App() {
  const [cardNumbers, setCardNumbers] = useState<string[]>([]);
  const handleCardNumberChange = (cardNumbers: string[]) => {
    setCardNumbers(cardNumbers);
    return;
  };
  return (
    <div className="App">
      <Card cardName="복카드" owner="홍길동" expiredMonth={10} expiredYear={23} numbers={cardNumbers} />
      <CardNumberInput onCardNumberChange={handleCardNumberChange} />
    </div>
  );
}

export default App;
