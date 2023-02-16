import React, { useState } from 'react';
import { Card } from './components/Card';
import { CardNumberInput } from './components/CardNumberInput';
import { ExpiredInput } from './components/ExpiredInput';
import { OwnerInput } from './components/OwnerInput';

function App() {
  const [cardNumbers, setCardNumbers] = useState<string[]>([]);
  const [expiredMonth, setExpiredMonth] = useState<number>(0);
  const [expiredYear, setExpiredYear] = useState<number>(0);
  const [owner, setOwner] = useState<string>('');

  const handleCardNumberChange = (cardNumbers: string[]) => {
    setCardNumbers(cardNumbers);
    return;
  };

  const handleExpiredChange = (expiredMonth: number, expiredYear: number) => {
    setExpiredMonth(expiredMonth);
    setExpiredYear(expiredYear);
    return;
  };

  const handleOwnerChange = (owner: string) => {
    setOwner(owner);
  };
  return (
    <div className="App">
      <Card
        cardName="복카드"
        owner={owner}
        expiredMonth={expiredMonth}
        expiredYear={expiredYear}
        numbers={cardNumbers}
      />
      <CardNumberInput onCardNumberChange={handleCardNumberChange} />
      <ExpiredInput onExpiredChange={handleExpiredChange} />
      <OwnerInput onOwnerChanged={handleOwnerChange} />
    </div>
  );
}

export default App;
