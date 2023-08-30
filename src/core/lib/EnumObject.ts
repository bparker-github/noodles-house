import type { RequireOnlyOne } from '..';

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

interface _IAsyncEnumObject<T extends IEnumObjectValue = string> {
  innerLabel: string;
  labelGetter: () => string;

  innerValue: T;
  valueGetter: () => T;
}
export type IAsyncEnumObject<T extends IEnumObjectValue = string> = RequireOnlyOne<
  RequireOnlyOne<_IAsyncEnumObject<T>, 'innerLabel' | 'labelGetter'>,
  'innerValue' | 'valueGetter'
>;

export class AsyncEnumObject<Val extends IEnumObjectValue = string> implements IEnumObject<Val> {
  private labelGetter: () => string;
  private valueGetter: () => Val;

  get label(): string {
    return this.labelGetter();
  }
  get value(): Val {
    return this.valueGetter();
  }

  constructor(labelGetter: string | (() => string), valueGetter: Val | (() => Val)) {
    if (typeof labelGetter === 'function') {
      this.labelGetter = labelGetter;
    } else {
      this.labelGetter = () => labelGetter;
    }

    if (typeof valueGetter === 'function') {
      this.valueGetter = valueGetter;
    } else {
      this.valueGetter = () => valueGetter;
    }
  }
}
