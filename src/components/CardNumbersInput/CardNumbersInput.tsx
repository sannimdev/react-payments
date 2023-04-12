import React, { useEffect, useRef } from 'react';
import { InputContainer } from '../InputContainer';
import NumberInput from './NumberInput';
import { CARD_INPUT } from '../../constants';

export type TInputEventHandler = {
  onChange?: (values: string[]) => void;
  onKeyDown?: () => void;
};

type TCardNumbersInput = {
  values: string[];
} & TInputEventHandler;

const { CARD_NUMBER } = CARD_INPUT;

function CardNumbersInput({ values, onChange }: TCardNumbersInput) {
  const refs = Array.from({ length: values.length }, () => useRef() as React.RefObject<HTMLInputElement>);

  useEffect(() => {
    const lengths = values.map((value) => value.length);
    const targetIndex = lengths.findIndex((length) => length !== CARD_NUMBER.EACH_LENGTH);

    if (!targetIndex) return;

    const nextInput = refs[targetIndex]?.current;
    if (nextInput !== document.activeElement) {
      nextInput?.focus();
    }
  }, [values]);

  const handleChange = (value: string, index: number) => {
    // const value = event.target.value;
    const newCardNumbers = [...values];
    newCardNumbers[index] = value;

    onChange?.(newCardNumbers);
    if (value.length === CARD_NUMBER.EACH_LENGTH) {
      focusNext(index);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    const [target, key] = [event.target as HTMLInputElement, event.key];
    const [length, position] = [target.value.length, target.selectionStart];

    const triggerKeys = {
      previous: ['ArrowUp', 'ArrowLeft', 'Backspace'],
      next: ['ArrowDown', 'ArrowRight', 'Enter'],
    };

    if (triggerKeys.previous.includes(key) && position === 0) {
      focusPrev(index);
    } else if (triggerKeys.next.includes(key) && position === length) {
      focusNext(index);
    }
  };

  const focusPrev = (index: number) => {
    refs[index - 1]?.current?.focus();
  };

  const focusNext = (index: number) => {
    refs[index + 1]?.current?.focus();
  };

  return (
    <div>
      <InputContainer caption="카드 번호">
        {values.map((value, idx) => (
          <NumberInput
            key={idx}
            required
            type={CARD_NUMBER.TYPES[idx]}
            ref={refs[idx]}
            onChange={(newValue) => handleChange(newValue, idx)}
            onKeyDown={(event) => handleKeyDown(event, idx)}
            maxLength={CARD_NUMBER.EACH_LENGTH}
            minLength={CARD_NUMBER.EACH_LENGTH}
            value={value}
          />
        ))}
      </InputContainer>
    </div>
  );
}

export default CardNumbersInput;