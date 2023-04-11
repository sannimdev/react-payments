import React, { useCallback, useMemo } from 'react';
import { ICard } from '../../domain/payments/types';
import { getShorteningString } from '../../util/string';
import '../../styles/card.css';
import { CARD_TYPES, DEFAULT_CARD_TYPE } from '../../constants';

const CARD_VISIBLE_MAX_LENGTH_NAME = 5;
const CARD_VISIBLE_NUMBER_INDEX = [0, 1];

const convertToEncryptedChars = (s = '') => '∙'.repeat(s.length);
const getViewCardNumbers = (cardNumbers: string[]) => {
  const result: string[] = [];
  return cardNumbers
    .reduce((accumulated, current, idx) => {
      if (CARD_VISIBLE_NUMBER_INDEX.includes(idx)) {
        return [...accumulated, current || ''];
      }
      return [...accumulated, convertToEncryptedChars(current)];
    }, result)
    .join('-');
};

type TCardProps = {
  card: ICard;
  onClick?: (card: ICard) => void;
  children?: React.ReactNode;
};

function Card({ card, onClick, children }: TCardProps) {
  const { name, owner, expiredMonth, expiredYear, numbers } = card;
  const cardNumber = useMemo(() => getViewCardNumbers(numbers), [numbers]);
  const cardType = useMemo(() => {
    const [vendor, type] = numbers.slice(0, 2);
    return (
      CARD_TYPES.find(({ cardNumberPrefix }) => cardNumberPrefix[0] === vendor && cardNumberPrefix[1] === type) ||
      DEFAULT_CARD_TYPE
    );
  }, [numbers]);
  const displayCardName = name || cardType.cardName;

  const handleCardClick = useCallback(() => {
    onClick?.(card);
  }, []);

  return (
    <div className="card-wrap">
      <div className="card-box" onClick={handleCardClick}>
        <div className="small-card" style={{ backgroundColor: cardType.color }}>
          <div className="card-top">{displayCardName && <span className="card-text">{displayCardName}</span>}</div>
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
              <span className="card-text">{owner && getShorteningString(owner, CARD_VISIBLE_MAX_LENGTH_NAME)}</span>
              <span className="card-text">
                {expiredMonth} / {expiredYear}
              </span>
            </div>
          </div>
        </div>
      </div>
      {children && <div className="card-portal">{children}</div>}
    </div>
  );
}

export default Card;
