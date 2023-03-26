import React, { forwardRef, useCallback, useEffect, useRef, useState } from 'react';
import { TCardComponentProps } from '../../domain/payments/types';
import { leaveOnlyNumbers } from '../../util/number';

const MAX_LENGTH = 2;
const isFulfilled = (month: string, year: string) => {
  return [month, year].every((s) => s?.length === MAX_LENGTH);
};

function ExpiredInput(
  { onChange, onFulfill, prevRef, nextRef }: TCardComponentProps,
  forwardedRef: React.ForwardedRef<HTMLInputElement>
) {
  const [expiredMonth, setExpiredMonth] = useState('');
  const [expiredYear, setExpiredYear] = useState('');

  const monthRef = useRef<HTMLInputElement>(null);
  const yearRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!forwardedRef) return;
    if (typeof forwardedRef === 'function') {
      forwardedRef(monthRef.current);
    } else {
      forwardedRef.current = monthRef.current;
    }
  }, []);

  // TODO: This is the love code... I will trim it later.
  const expiredInputProperties = [
    {
      ref: monthRef,
      placeholder: 'MM',
      maxLength: MAX_LENGTH,
      onChange: useCallback(
        (event: React.ChangeEvent<HTMLInputElement>) => {
          const value = event.target.value;
          const parsedValue = parseInt(leaveOnlyNumbers(value), 10);
          if (value === '') {
            setExpiredMonth(value);
            prevRef?.current?.focus();
            return;
          } else if (isNaN(parsedValue)) {
            return;
          } else if (value === '00') {
            setExpiredMonth('01');
          } else if (parsedValue > 12) {
            setExpiredMonth('12');
          } else {
            setExpiredMonth(value);
          }

          if (value.length === MAX_LENGTH && yearRef) {
            yearRef?.current?.focus();
          }

          onChange?.([value, expiredYear]);
          if (isFulfilled(value, expiredYear)) {
            onFulfill?.([value, expiredYear]);
            nextRef?.current?.focus();
            return;
          }
        },
        [monthRef, expiredMonth]
      ),
      value: expiredMonth,
    },
    {
      ref: yearRef,
      placeholder: 'YY',
      maxLength: MAX_LENGTH,
      onChange: useCallback(
        (event: React.ChangeEvent<HTMLInputElement>) => {
          const value = event.target.value;
          setExpiredYear(value);
          onChange?.([expiredMonth, value]);

          if (value === '') {
            monthRef?.current?.focus();
          }

          if (isFulfilled(expiredMonth, value)) {
            onFulfill?.([expiredMonth, value]);
            nextRef?.current?.focus();
            return;
          }

          if (value.length === MAX_LENGTH) {
            (event.target.previousSibling as HTMLInputElement)?.focus();
          }
        },
        [yearRef, expiredYear]
      ),
      value: expiredYear,
    },
  ];

  return (
    <div className="input-container">
      <span className="input-title">만료일</span>
      <div className="input-box w-50">
        {expiredInputProperties.map((expiredInput) => (
          <input
            key={expiredInput.placeholder}
            className="input-basic"
            type="text"
            ref={expiredInput.ref}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              event.target.value = leaveOnlyNumbers(event.target.value);
              expiredInput.onChange(event);
            }}
            maxLength={expiredInput.maxLength}
            value={expiredInput.value}
          />
        ))}
      </div>
    </div>
  );
}

const ForwardedExpiredInput = forwardRef(ExpiredInput);
ForwardedExpiredInput.displayName = 'ExpiredInput';

export default ForwardedExpiredInput;
