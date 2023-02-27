import React, { useEffect, useRef, useState } from 'react';
import { replaceNumberOnly } from '../../util/number';
import { TCardComponentProps } from '../../domain/payments/types';
import '../../styles/input.css';

const CARD_NUMBER_INPUT_TYPES = ['text', 'text', 'password', 'password'];
const CARD_NUMBER_MAX_LENGTH = 4;

function CardNumberInput({ onChange }: TCardComponentProps<string[]>) {
  const [cardNumbers, setCardNumbers] = useState<string[]>([]);
  const [lastFocusIndex, setLastFocusIndex] = useState(0);
  const refs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    const lengths = cardNumbers.map((numbers) => numbers.length);
    const lastIndexOfMaxLength = lengths.lastIndexOf(CARD_NUMBER_MAX_LENGTH);
    if (lastFocusIndex === lastIndexOfMaxLength) focusNext(lastFocusIndex);

    onChange?.(cardNumbers);
  }, [cardNumbers]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>, currentIndex: number) => {
    const changedValue = replaceNumberOnly(event.target.value);
    console.log(replaceNumberOnly);

    setLastFocusIndex(currentIndex);
    setCardNumbers([...cardNumbers.slice(0, currentIndex), changedValue, ...cardNumbers.slice(currentIndex + 1)]);
  };

  const focusNext = (index: number) => {
    refs.current[index + 1]?.focus();
  };

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
            ref={(el) => (refs.current[idx] = el)}
            onChange={(event) => handleChange(event, idx)}
            value={cardNumbers[idx]}
          />
        ))}
      </div>
    </div>
  );
}

export default CardNumberInput;
