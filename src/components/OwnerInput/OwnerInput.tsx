import React, { useCallback, useState } from 'react';
import { TCardComponentProps } from '../../domain/payments/types';

const MAX_LENGTH = 30;
function OwnerInput({ onChange, onFulfill }: TCardComponentProps<string>) {
  const [owner, setOwner] = useState('');

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value;

      setOwner(value);
      onChange?.(value);

      if (value?.length === MAX_LENGTH) {
        onFulfill?.(value);
      }
    },
    [owner]
  );

  return (
    <div className="input-container">
      <span className="input-title">카드 소유자 이름(선택)</span>
      <input
        type="text"
        className="input-basic"
        placeholder="카드에 표시된 이름과 동일하게 입력하세요."
        maxLength={MAX_LENGTH}
        onChange={handleChange}
        value={owner}
      />
    </div>
  );
}

export default OwnerInput;
