import { IPlainObject } from "../../types/object";

export function mergeObjects<T>(object1: T, object2: T): T {
  return {
    ...object1,
    ...object2,
  };
}

export function deepMerge<T extends IPlainObject>(obj1: T, obj2: T, mergeArrays = false): T {
  const isObject = (item: any): boolean =>
    item !== null && typeof item === 'object' && !Array.isArray(item);

  const isArray = (item: any): boolean =>
    Array.isArray(item);

  if (!isObject(obj1) || !isObject(obj2)) {
    return obj2;
  }

  const result: any = { ...obj1 };

  Object.keys(obj2).forEach(key => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const val1 = obj1[key];
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const val2 = obj2[key];

    if (mergeArrays && isArray(val1) && isArray(val2)) {
      result[key] = val1.concat(val2);
    } else if (isObject(val1) && isObject(val2)) {
      result[key] = deepMerge(val1, val2, mergeArrays);
    } else {
      result[key] = val2;
    }
  });

  return result;
}
