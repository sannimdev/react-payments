import React from 'react';
import { Card } from '../../components';
import { Frame } from '../../components/Frame';
import { PAYMENTS_STEP, useStepContext } from '../../context/StepContext';
import { getEnrolledCards } from '../../domain/payments/cardStorage';
import { ICard } from '../../domain/payments/types';
import './CardList.css';

function CardList() {
  const { setStep } = useStepContext();

  const enrolledCards: ICard[] = getEnrolledCards();

  const handleClick = () => {
    setStep && setStep(PAYMENTS_STEP.ADD);
  };

  return (
    <Frame title="카드 목록">
      <ul>
        <li>
          <div className="empty-card" onClick={handleClick}>
            +
          </div>
        </li>
        {enrolledCards.map(({ cardName, owner, numbers, expiredMonth, expiredYear, alias, cvc }) => (
          <li key={numbers.join('')}>
            <Card
              cardName={cardName}
              owner={owner}
              numbers={numbers}
              expiredMonth={expiredMonth}
              expiredYear={expiredYear}
              alias={alias}
              cvc={cvc}
            />
          </li>
        ))}
      </ul>
    </Frame>
  );
}

export default CardList;
