import React, { Dispatch, MutableRefObject, SetStateAction, useCallback, useRef, useState } from 'react';
import { TCardComponentEventHandlers } from '../domain/payments/types';
import { setFocus } from '../util/input';
import { leaveOnlyNumbers } from '../util/number';

type THookNumerInputProps = {
  initValues: string[];
  maxLength: number;
} & TCardComponentEventHandlers;

type THookNumberInputs = {
  numbers: string[];
  setNumbers: Dispatch<SetStateAction<string[]>>;
  refs: MutableRefObject<HTMLInputElement[]>;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>, currentIndex: number) => void;
};

export default ({ initValues, maxLength, onChange, onFulfill }: THookNumerInputProps): THookNumberInputs => {
  const [numbers, setNumbers] = useState(initValues);
  const refs = useRef<HTMLInputElement[]>(Array.from({ length: initValues.length }));

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>, currentIndex: number) => {
      const value = leaveOnlyNumbers(event.target.value);
      const newNumbers = [...numbers.slice(0, currentIndex), value, ...numbers.slice(currentIndex + 1)];
      setNumbers(newNumbers);

      const [prevRef, nextRef] = [refs.current[currentIndex - 1], refs.current[currentIndex + 1]];
      if (value === '' && prevRef) {
        setFocus(prevRef);
      } else if (value.length === maxLength && nextRef) {
        setFocus(nextRef);
      }
      onChange?.(newNumbers);
    },
    [numbers, setNumbers, refs]
  );

  const filledInputs = numbers.filter((s) => s !== '' && s.length === maxLength);
  const isFulfilled = numbers.length === filledInputs.length;
  isFulfilled && onFulfill?.(numbers);

  return { numbers, setNumbers, refs, handleChange };
};
