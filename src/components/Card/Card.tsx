import React from 'react';
import { ICard } from '../../domain/payments/types';
import '../../styles/card.css';

const CARD_DELIMITER = ' - ';

function Card({ cardName, owner, expiredMonth, expiredYear, numbers }: ICard) {
  const cardNumber = numbers?.join(CARD_DELIMITER);

  return (
    <div className="card-box">
      <div className="small-card">
        <div className="card-top">{cardName && <span className="card-text">{cardName}</span>}</div>
        <div className="card-middle">
          <div className="small-card__chip"></div>
        </div>
        <div className="card-bottom">
          <div className="card-bottom__number">
            <span className="card-text">{cardNumber}</span>
          </div>
        </div>
        <div className="card-bottom">
          <div className="card-bottom__info">
            <span className="card-text">{owner}</span>
            <span className="card-text">
              {expiredMonth} / {expiredYear}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card;
