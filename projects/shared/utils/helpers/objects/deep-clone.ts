export function deepClone<T>(obj: T, cache = new WeakMap()): T {
  if (obj === null || typeof obj !== 'object') return obj;
  if (cache.has(obj)) return cache.get(obj);
  if (obj instanceof Date) return new Date(obj.getTime()) as any;

  if (obj instanceof Array) {
    const arr = obj as any[];
    const clonedArr = arr.map(item => deepClone(item, cache));
    cache.set(obj, clonedArr);
    return clonedArr as any as T;
  }

  if (obj instanceof Object) {
    const clonedObj: any = {};
    cache.set(obj, clonedObj);
    for (const key in obj) {
      // eslint-disable-next-line no-prototype-builtins
      if (obj.hasOwnProperty(key)) {
        clonedObj[key] = deepClone(obj[key], cache);
      }
    }
    return clonedObj;
  }

  throw new Error('Unable to deep clone object');
}
