import React, { ForwardedRef, forwardRef } from 'react';
import { TCardComponentProps } from '../../domain/payments/types';
import '../../styles/input.css';
import useNumberInput from '../../hooks/useNumberInput';
import { InputContainer } from '../InputContainer';

const CARD_NUMBER_INPUT_TYPES = ['text', 'text', 'password', 'password'];
const CARD_NUMBER_MAX_LENGTH = 4;

function CardNumberInput(
  { onChange, onFulfill, nextRef }: TCardComponentProps,
  forwardedRef: ForwardedRef<HTMLInputElement>
) {
  const {
    numbers: cardNumbers,
    refs,
    handleChange,
  } = useNumberInput({
    initValues: ['', '', '', ''],
    maxLength: CARD_NUMBER_MAX_LENGTH,
    onChange,
    onFulfill,
    nextRef,
    forwardedRef,
  });

  return (
    <InputContainer caption="카드 번호">
      {CARD_NUMBER_INPUT_TYPES.map((type, idx) => (
        <input
          required
          ref={(el: HTMLInputElement) => (refs.current[idx] = el)}
          key={idx}
          className="input-basic"
          type={type}
          maxLength={CARD_NUMBER_MAX_LENGTH}
          onChange={(event) => handleChange(event, idx)}
          value={cardNumbers[idx]}
        />
      ))}
    </InputContainer>
  );
}

const ForwardedCardNumberInput = forwardRef(CardNumberInput);
ForwardedCardNumberInput.displayName = 'CardNumberInput';
export default React.memo(ForwardedCardNumberInput);
