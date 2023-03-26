import React, { forwardRef, useCallback, useState } from 'react';
import { TCardComponentEventHandlers } from '../../domain/payments/types';

const MAX_LENGTH = 30;
function OwnerInput({ onChange, onFulfill }: TCardComponentEventHandlers<string>, ref: any) {
  const [owner, setOwner] = useState('');

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value;

      setOwner(value);
      onChange?.(value);

      if (value?.length) {
        onFulfill?.(value);
      }
    },
    [owner]
  );

  return (
    <div className="input-container">
      <span className="input-title">카드 소유자 이름(선택)</span>
      <input
        ref={ref}
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

const ForwardedOwnerInput = forwardRef(OwnerInput);
ForwardedOwnerInput.displayName = 'OwnerInput';

export default ForwardedOwnerInput;
