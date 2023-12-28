export type RequireOnlyOne<T, Keys extends keyof T = keyof T> = Pick<T, Exclude<keyof T, Keys>> &
  {
    [K in Keys]-?: Required<Pick<T, K>> & Partial<Record<Exclude<Keys, K>, undefined>>;
  }[Keys];

export type ChangeValues<T extends {}, V> = {
  [key in T]: T[key] extends Object
    ? ChangeValues<T[key], V>
    : T[key] extends Array<infer F>
      ? Array<ChangeValues<F, V>>
      : V;
};
