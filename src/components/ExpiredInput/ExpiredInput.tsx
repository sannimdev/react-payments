import React, { useEffect, useRef, useState } from 'react';
import { replaceNumberOnly } from '../../util/number';

const MAX_LENGTH = 2;
type TExpiredInputChange = {
  onChange?: (expiredMonth: string, expiredYear: string) => void;
};

const setFocus = (element: HTMLInputElement) => {
  element.focus();
  element.setSelectionRange(element.value.length, element.value.length);
};

function ExpiredInput({ onChange }: TExpiredInputChange) {
  const [expiredMonth, setExpiredMonth] = useState('');
  const [expiredYear, setExpiredYear] = useState('');

  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const [monthRefs, yearRefs] = [inputRefs.current[0], inputRefs.current[1]];

  useEffect(() => {
    if (onChange) onChange(expiredMonth, expiredYear);
  }, [expiredMonth, expiredYear]);

  const expiredInputProperties = [
    {
      placeholder: 'MM',
      maxLength: MAX_LENGTH,
      onChange: (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        const parsedValue = parseInt(replaceNumberOnly(value), 10);
        if (value === '') {
          setExpiredMonth(value);
          return;
        } else if (isNaN(parsedValue)) {
          return;
        } else if (parsedValue > 12) {
          setExpiredMonth('12');
        } else {
          setExpiredMonth(value);
        }

        if (value.length === MAX_LENGTH && yearRefs) {
          setFocus(yearRefs);
        }
      },
      value: expiredMonth,
    },
    {
      placeholder: 'YY',
      maxLength: MAX_LENGTH,
      onChange: (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setExpiredYear(value);

        if (value.length === 0 && monthRefs) {
          setFocus(monthRefs);
        }
      },
      value: expiredYear,
    },
  ];

  return (
    <div className="input-container">
      <span className="input-title">만료일</span>
      <div className="input-box w-50">
        {expiredInputProperties.map((expiredInput, idx) => (
          <input
            key={expiredInput.placeholder}
            className="input-basic"
            type="text"
            ref={(el) => (inputRefs.current[idx] = el)}
            {...expiredInput}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              expiredInput.onChange(event);
            }}
            value={expiredInput.value}
          />
        ))}
      </div>
    </div>
  );
}

export default ExpiredInput;
