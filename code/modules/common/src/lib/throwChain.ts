/** A null-op throw func. Useful for chaining commands. */
export function throwError(msg: string) {
  throw new Error(msg);
}

export function doGetOrThrow<T>(func: () => T, errorMessage: string): NonNullable<T> {
  const found = func();

  if (!found) {
    throw new Error(errorMessage);
  }

  return found;
}
