export type RequireOnlyOne<T, Keys extends keyof T = keyof T> = Pick<T, Exclude<keyof T, Keys>> &
  {
    [K in Keys]-?: Required<Pick<T, K>> & Partial<Record<Exclude<Keys, K>, undefined>>;
  }[Keys];

export type ChangeValues<T extends {}, V> = {
  [key in T]: V;
};

export type FromEntries<T extends {}> = [keyof T, T[keyof T]][];
