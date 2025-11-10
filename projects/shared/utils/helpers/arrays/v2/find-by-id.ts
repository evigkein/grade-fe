export function findItemById<T, K extends keyof T>(
  items: T[],
  id: T[K],
  customIdField: K = '_id' as K,
): T | undefined {
  return items.find(
    (item) => item[customIdField]?.toString() === id?.toString(),
  );
}
