import React, { Dispatch, MutableRefObject, SetStateAction, useCallback, useEffect, useRef, useState } from 'react';
import { TCardComponentProps } from '../domain/payments/types';
import { setFocus } from '../util/input';
import { leaveOnlyNumbers } from '../util/number';

type THookNumerInputProps = {
  initValues: string[];
  minLength?: number;
  maxLength: number;
} & TCardComponentProps;

type THookNumberInputs = {
  numbers: string[];
  setNumbers: Dispatch<SetStateAction<string[]>>;
  refs: MutableRefObject<HTMLInputElement[]>;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>, currentIndex: number) => void;
};

export default ({
  initValues,
  minLength = 0,
  maxLength,
  onChange,
  onFulfill,
  prevRef,
  nextRef,
  forwardedRef,
}: THookNumerInputProps): THookNumberInputs => {
  const [numbers, setNumbers] = useState(initValues);
  const refs = useRef<HTMLInputElement[]>(Array.from({ length: initValues.length }));

  useEffect(() => {
    if (!forwardedRef) return;
    if (typeof forwardedRef === 'function') {
      forwardedRef(refs.current[0]);
    } else {
      forwardedRef.current = refs.current[0];
    }
  }, []);

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>, currentIndex: number) => {
      const value = leaveOnlyNumbers(event.target.value);
      const newNumbers = [...numbers.slice(0, currentIndex), value, ...numbers.slice(currentIndex + 1)];
      setNumbers(newNumbers);

      const [prevFocusedRef, nextFocusedRef] = [refs.current[currentIndex - 1], refs.current[currentIndex + 1]];
      if (value === '') {
        if (prevFocusedRef) {
          setFocus(prevFocusedRef);
          return;
        }
        prevRef?.current?.focus();
      } else if (value.length === maxLength && nextFocusedRef) {
        setFocus(nextFocusedRef);
      }
      onChange?.(newNumbers);
    },
    [numbers, setNumbers, refs]
  );

  const filledInputs = numbers.filter((s) => s !== '' && s.length === maxLength);
  const isFulfilled =
    numbers.length === filledInputs.length &&
    filledInputs.every((input) => input.length >= minLength && input.length <= maxLength);
  if (isFulfilled) {
    setTimeout(() => onFulfill?.(numbers));
    nextRef?.current?.focus();
  }

  return { numbers, setNumbers, refs, handleChange };
};

/*
setTimeout...
  react_devtools_backend.js:2655 Warning:
  Cannot update a component (`CardEdit`) while rendering a different component (`CardNumberInput`).
  To locate the bad setState() call inside `CardNumberInput`,
    follow the stack trace as described in https://reactjs.org/link/setstate-in-render
*/
