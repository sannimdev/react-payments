import { ICard, ICardDetailMessage, ICardType } from './types';

export const CARD_INPUT = {
  CARD_NAME: {
    MAX_LENGTH: 5,
  },
  CARD_NUMBER: {
    TYPES: ['text', 'text', 'password', 'password'],
    LENGTH: 4,
    EACH_LENGTH: 4,
  },
  EXPIRED: {
    MONTH: {
      PARSED_MIN_VALUE: 1,
      PARSED_MAX_VALUE: 12,
      LENGTH: 2,
    },
    YEAR: {
      LENGTH: 2,
    },
  },
  OWNER: {
    MIN_LENGTH: 1,
    MAX_LENGTH: 30,
    VISIBLE_LENGTH: 5,
  },
  CVC: {
    LENGTH: 3,
  },
  PIN: {
    EACH_LENGTH: 1,
    LENGTH: 4,
    EDITABLE_LENGTH: 2,
  },
} as const;

export const CARD_VIRTUAL_KEYBOARD = {
  NUMBER_KEYS: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => String(n)),
  FUNCTION_KEY_DELETE: '지움',
  FUNCTION_KEY_RESET: '초기화',
  CLICK_TRACING_DELAY: 200,
  ACTIVE_BUTTON_CLASSNAME: 'active',
} as const;

/////////////

export const CARD_DEFAULT_VALUE: ICard = {
  numbers: '1111-1111-1234-1234'.split('-'),
  name: '신용카드',
  expiredMonth: '12',
  expiredYear: '28',
  cvc: '000',
  owner: '홍길동',
  pin: '0000',
};

export const DEFAULT_CARD_TYPE: ICardType = {
  id: 0,
  name: CARD_DEFAULT_VALUE.name as string,
  color: '#94dacd',
  numberPrefix: [],
};

export const CARD_TYPES: ICardType[] = [
  { id: 1, name: '포코', color: '#e24141', numberPrefix: ['1111', '1111'] },
  { id: 2, name: '준', color: '#547ce4', numberPrefix: ['2222', '2222'] },
  { id: 3, name: '현석', color: '#de5ab9', numberPrefix: ['3333', '3333'] },
  { id: 4, name: '윤호', color: '#73bc6d', numberPrefix: ['4444', '4444'] },
  { id: 5, name: '환오', color: '#1cc6a6', numberPrefix: ['5555', '5555'] },
  { id: 6, name: '태은', color: '#e76e9a', numberPrefix: ['6666', '6666'] },
  { id: 7, name: '준일', color: '#f37d3b', numberPrefix: ['7777', '7777'] },
  { id: 8, name: '은규', color: '#fbcd58', numberPrefix: ['8888', '8888'] },
];

export const PAYMENTS_STEP = {
  LIST: 1,
  ADD: 2,
  EDIT: 3,
  DONE: 4,
  UPDATING_CARD_ALIAS: 5,
} as const;

export const CARD_DETAIL_MESSAGE: ICardDetailMessage[] = [
  {
    step: PAYMENTS_STEP.DONE,
    message: '카드 등록이 완료되었습니다',
  },
  {
    step: PAYMENTS_STEP.UPDATING_CARD_ALIAS,
    message: '카드 별칭을 수정할 수 있습니다',
  },
];
