export type IEnumObjectValue = string | number | boolean | symbol;

export interface IEnumObject<T extends IEnumObjectValue = string> {
  label: string;
  value: T;
}

export class EnumObject<Val extends IEnumObjectValue = string> implements IEnumObject<Val> {
  constructor(
    public label: string,
    public value: Val
  ) {}
}

export class AsyncEnumObject<Val extends IEnumObjectValue = string> implements IEnumObject<Val> {
  private innerLabel?: string;
  private innerValue?: Val;

  private labelGetter?: () => string;
  private valueGetter?: () => Val;

  get label(): string {
    return this.labelGetter == undefined ? this.innerLabel : this.labelGetter();
  }
  get value(): Val {
    return this.valueGetter == undefined ? this.innerValue : this.valueGetter();
  }

  constructor(labelGetter: string | (() => string), valueGetter: Val | (() => Val)) {
    if (typeof labelGetter === 'function') {
      this.innerLabel = '';
      this.labelGetter = labelGetter;
    } else {
      this.innerLabel = labelGetter;
      this.labelGetter = undefined;
    }

    if (typeof valueGetter === 'function') {
      this.innerValue = undefined;
      this.valueGetter = valueGetter;
    } else {
      this.innerValue = valueGetter;
      this.valueGetter = undefined;
    }
  }
}
