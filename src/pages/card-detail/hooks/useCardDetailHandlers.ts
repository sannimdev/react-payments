import { useCallback } from 'react';
import { saveCard } from '../../../domain/payments/cardStorage';
import { useStepContext } from '../../../context/StepContext';
import { PAYMENTS_STEP } from '../../../constants';
import { THookCardDetailHandlers } from '../types';

const useCardDetailHandlers = ({ card }: THookCardDetailHandlers) => {
  const { setStep } = useStepContext();
  const { alias, name } = card;

  const handleConfirm = useCallback(
    (event: React.FormEvent) => {
      try {
        saveCard({
          ...card,
          alias: alias || name,
        });

        setStep?.(PAYMENTS_STEP.LIST);
      } catch (error) {
        console.error(error);
        alert('알 수 없는 오류가 발생하여 별명을 지정할 수 없었습니다. 다시 시도해 주세요.');
      } finally {
        event.preventDefault();
      }
    },
    [alias, card, setStep]
  );

  return { handleConfirm };
};

export default useCardDetailHandlers;
