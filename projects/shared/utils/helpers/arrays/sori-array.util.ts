export function sortArray<T>(
  array: T[],
  field: keyof T,
  isStraight = false
): T[] {
  return array.slice().sort((a, b) => {
    const comparison = a[field] > b[field] ? 1 : -1;
    return isStraight ? comparison : -comparison;
  });
}
