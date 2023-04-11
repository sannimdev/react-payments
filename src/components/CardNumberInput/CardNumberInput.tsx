import React, { ForwardedRef, forwardRef } from 'react';
import { TCardComponentProps } from '../../domain/payments/types';
import '../../styles/input.css';
import useNumberInput from '../../hooks/useNumberInput';
import { InputContainer } from '../InputContainer';
import { CARD_INPUT } from '../../constants';

const CARD_NUMBER_EACH_LENGTH = CARD_INPUT.CARD_NUMBER.EACH_LENGTH;
const CARD_NUMBER_INPUT_TYPES = ['text', 'text', 'password', 'password'];

type TCardNumberInputProps = TCardComponentProps & {
  values?: string[];
};

function CardNumberInput(
  { onFocus, onChange, onFulfill, nextRef, values }: TCardNumberInputProps,
  forwardedRef: ForwardedRef<HTMLInputElement>
) {
  const {
    numbers: cardNumbers,
    refs,
    handleFocus,
    handleChange,
    handleKeyDown,
  } = useNumberInput({
    initValues: ['', '', '', ''],
    maxLength: CARD_NUMBER_EACH_LENGTH,
    onChange,
    onFocus,
    onFulfill,
    nextRef,
    forwardedRef,
    values,
  });

  return (
    <InputContainer title="카드 번호">
      {CARD_NUMBER_INPUT_TYPES.map((type, idx) => (
        <input
          required
          ref={(el: HTMLInputElement) => (refs.current[idx] = el)}
          key={idx}
          className="input-basic input-dash"
          type={type}
          minLength={CARD_NUMBER_EACH_LENGTH}
          maxLength={CARD_NUMBER_EACH_LENGTH}
          onFocus={(event) => handleFocus(event, idx)}
          onChange={(event) => handleChange(event, idx)}
          onKeyDown={(event) => handleKeyDown(event, idx)}
          value={cardNumbers[idx] || ''}
        />
      ))}
    </InputContainer>
  );
}

const ForwardedCardNumberInput = forwardRef(CardNumberInput);
ForwardedCardNumberInput.displayName = 'CardNumberInput';
export default React.memo(ForwardedCardNumberInput);
