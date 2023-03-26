import React from 'react';
import { TCardComponentEventHandlers } from '../../domain/payments/types';
import '../../styles/input.css';
import useNumberInput from '../../hooks/useNumberInput';

const CARD_NUMBER_INPUT_TYPES = ['text', 'text', 'password', 'password'];
const CARD_NUMBER_MAX_LENGTH = 4;

function CardNumberInput({ onChange, onFulfill, nextRef }: TCardComponentEventHandlers) {
  const {
    numbers: cardNumbers,
    refs,
    handleChange,
  } = useNumberInput({ initValues: ['', '', '', ''], maxLength: 4, onChange, onFulfill, nextRef });

  return (
    <div className="input-container">
      <span className="input-title">카드 번호</span>
      <div className="input-box">
        {CARD_NUMBER_INPUT_TYPES.map((type, idx) => (
          <input
            key={idx}
            className="input-basic"
            type={type}
            maxLength={CARD_NUMBER_MAX_LENGTH}
            ref={(el) => (refs.current[idx] = el as HTMLInputElement)}
            onChange={(event) => handleChange(event, idx)}
            value={cardNumbers[idx]}
          />
        ))}
      </div>
    </div>
  );
}

export default React.memo(CardNumberInput);
