export interface EnumObject<T = string> {
  label: string;
  value: T;
  onClick?: (v: T) => void;
}
