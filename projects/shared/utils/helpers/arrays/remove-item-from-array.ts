export function removeItemFromStringArray<T extends string>(array: T[], item: T): T[] {
  const innerArray = [...array];
  const index = array.findIndex(i => i === item);
  if (!index) {
    return array;
  }
  innerArray.splice(index, 1);

  return innerArray;
}
