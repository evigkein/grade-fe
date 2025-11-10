export function splitArrayToSubArrays<T>(array: T[], size: number): T[][] {
  const slicedArray: T[][] = [];

  for (let i = 0; i < array.length; i += size) {
    slicedArray.push(array.slice(i, i + size));
  }

  return slicedArray;
};
