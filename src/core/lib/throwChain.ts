/** A null-op throw func. Useful for chaining commands. */
export function throwError(msg: string) {
  throw new Error(msg);
}
