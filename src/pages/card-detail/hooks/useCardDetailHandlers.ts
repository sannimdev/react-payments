import { useCallback } from 'react';
import { saveCard } from '../../../services/cardStorage';
import { useStepContext } from '../../../context/StepContext';
import { PAYMENTS_STEP } from '../../../domain/payments/constants';
import { THookCardDetailHandlers } from '../types';

const useCardDetailHandlers = ({ card, newAlias }: THookCardDetailHandlers) => {
  const { setStep } = useStepContext();
  const { name } = card;

  const handleConfirm = useCallback(
    (event: React.FormEvent) => {
      try {
        // 아래의 코드는 서버에 전송한다고 가정... id값은 서버단 코드에서 만들어진다고 가정...
        saveCard({
          ...card,
          alias: newAlias || name,
        });

        setStep?.(PAYMENTS_STEP.LIST);
      } catch (error) {
        console.error(error);
        alert('알 수 없는 오류가 발생하여 별명을 지정할 수 없었습니다. 다시 시도해 주세요.');
      } finally {
        event.preventDefault();
      }
    },
    [newAlias]
  );

  return { handleConfirm };
};

export default useCardDetailHandlers;
