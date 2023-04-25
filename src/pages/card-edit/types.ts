type TReactSetter<T> = React.Dispatch<React.SetStateAction<T>>;
type TEditProperty<T> = { value: T; set: TReactSetter<T> };

export type TCardEditProperties = {
  cardNumbers: TEditProperty<string[]>;
  expiredMonth: TEditProperty<string>;
  expiredYear: TEditProperty<string>;
  owner: TEditProperty<string>;
  cvc: TEditProperty<string>;
  pin: TEditProperty<string>;
  cardTypeSelected: TEditProperty<boolean>;
};

export type TCardEditRefs = {
  refs: { [key: string]: React.RefObject<HTMLInputElement | HTMLButtonElement> };
};
