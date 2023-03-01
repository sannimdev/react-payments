import React, { Dispatch, MutableRefObject, SetStateAction, useCallback, useRef, useState } from 'react';
import { setFocus } from '../util/input';
import { replaceNumberOnly } from '../util/number';

type THookNumerInputProps = {
  initValues: string[];
  maxLength: number;
  onChange?: (numbers: string[]) => void;
  onFulfill?: (numbers: string[]) => void;
};

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
      const value = replaceNumberOnly(event.target.value);
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

  const isFulfilled = numbers.length === numbers.filter((s) => s !== '' && s.length === maxLength).length;
  if (isFulfilled) {
    onFulfill?.(numbers);
  }

  return { numbers, setNumbers, refs, handleChange };
};
