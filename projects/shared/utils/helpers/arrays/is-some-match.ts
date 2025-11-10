export function isSomeMatch<T, K extends keyof T>(
  array: T[] | string[],
  value?: T[K] | string,
  field?: K,
): boolean {
  if (!field) {
    return (array as string[]).some((item) => item === value);
  }

  return (array as T[]).some((item) => item[field] === value);
}
