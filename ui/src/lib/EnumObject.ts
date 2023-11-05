export interface IEnumObject<T = string> {
  label: string;
  value: T;
}

export class EnumObject<Val = string> implements IEnumObject<Val> {
  constructor(
    public label: string,
    public value: Val
  ) {}
}
