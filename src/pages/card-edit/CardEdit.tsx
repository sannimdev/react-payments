import React, { useCallback, useRef, useState } from 'react';
import { Card, CardNumberInput, CvcInput, ExpiredInput, Frame, Link, OwnerInput, PinInput } from '../../components';

const handleOnFulfill = (data: unknown) => console.log(data);

function CardEdit() {
  const [cardNumbers, setCardNumbers] = useState<string[]>([]);
  const [expiredMonth, setExpiredMonth] = useState('');
  const [expiredYear, setExpiredYear] = useState('');
  const [owner, setOwner] = useState('');
  const [cvc, setCvc] = useState('');

  const testRef = useRef<HTMLInputElement>(null);
  const expiredRef = useRef<HTMLInputElement>(null);

  const handleExpiredChange = useCallback(
    ([expiredMonth, expiredYear]: string[]) => {
      setExpiredMonth(expiredMonth);
      setExpiredYear(expiredYear);
      return;
    },
    [expiredMonth, expiredYear]
  );

  const handleCvcChange = useCallback(
    ([newCvc]: string[]) => {
      setCvc(newCvc);
    },
    [cvc]
  );

  return (
    <Frame title="카드 추가" backLink={'/'}>
      <Card owner={owner} expiredMonth={expiredMonth} expiredYear={expiredYear} numbers={cardNumbers} cvc={cvc} />
      <CardNumberInput onChange={setCardNumbers} nextRef={testRef} />
      <ExpiredInput ref={expiredRef} onChange={handleExpiredChange} onFulfill={handleOnFulfill} />
      <OwnerInput ref={testRef} onChange={setOwner} onFulfill={handleOnFulfill} />
      <CvcInput onChange={handleCvcChange} onFulfill={handleOnFulfill} />
      <PinInput onFulfill={handleOnFulfill} />
      <div className="button-box">
        <div className="button-text">
          <Link to="/card-detail">다음</Link>
        </div>
      </div>
    </Frame>
  );
}

export default React.memo(CardEdit);
