import React, { useEffect, useRef, useState } from 'react';
// import { TCardNumber, TCardNumbers } from '../../domain/payments/types';

type TCardNumberInputProps = {
  onCardNumberChange?: (cardNumbers: string[]) => void;
};

const CARD_NUMBER_INPUT_TYPES = ['text', 'text', 'password', 'password'];
const CARD_NUMBER_MAX_LENGTH = 4;
const NUMBER_KEYS = Array.from({ length: 10 }, (_, idx) => String(idx));
const ALLOWED_SPECIAL_KEYS = ['Tab', 'Backspace', 'Delete'];
const ALLOWED_KEYS = [...NUMBER_KEYS, ...ALLOWED_SPECIAL_KEYS];

function CardNumberInput({ onCardNumberChange }: TCardNumberInputProps) {
  const [cardNumbers, setCardNumbers] = useState<string[]>([]);
  const cardNumberInputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    if (onCardNumberChange) onCardNumberChange(cardNumbers);
  }, [cardNumbers]);

  const onKeyDown = (event: React.KeyboardEvent) => {
    if (!ALLOWED_KEYS.includes(event.key)) event.preventDefault();
  };

  const onChange = () => {
    const cardNumbers = cardNumberInputRefs.current?.map((input) => input?.value || '');
    setCardNumbers(cardNumbers);
  };

  return (
    <div className="input-box">
      {CARD_NUMBER_INPUT_TYPES.map((type, idx) => (
        <input
          key={idx}
          type={type}
          className="input-basic"
          onKeyDown={onKeyDown}
          onChange={onChange}
          ref={(el) => (cardNumberInputRefs.current[idx] = el)}
          maxLength={CARD_NUMBER_MAX_LENGTH}
        />
      ))}
    </div>
  );
}

export default CardNumberInput;
