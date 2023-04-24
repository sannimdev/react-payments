import { ICard } from '../../domain/payments/types';

export type TCardAlias = {
  alias: string;
  setAlias: React.Dispatch<React.SetStateAction<string>>;
  aliasRef: React.RefObject<HTMLInputElement>;
  handleAliasChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export type THookCard = TCardAlias;

export type THookCardDetailHandlers = {
  card: ICard;
};
