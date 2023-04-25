import { useEffect } from 'react';
import { useCardContext } from '../../../context/CardContext';
import { THookCard } from '../types';

const useCard = ({ setAlias, aliasRef }: THookCard) => {
  const { card } = useCardContext();

  useEffect(() => {
    // TODO: 나중에 리팩터링
    if (card?.alias) {
      setAlias(card.alias);
      setTimeout(() => {
        aliasRef?.current?.focus();
        aliasRef?.current?.setSelectionRange?.(0, card?.alias?.length || 0);
      });
    }
  }, []);

  return { card };
};

export default useCard;
