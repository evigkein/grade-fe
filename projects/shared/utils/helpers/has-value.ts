export function hasValue(value: unknown): boolean {
  if (typeof value === 'number') {
    return !isNaN(value);
  }
  return value !== undefined && value !== null;
}
