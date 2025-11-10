export function getUniqueItems<T extends { _id: string }>(currentItems: T[], newItems: T[]): T[] {
  const uniqueItems = new Map<string, T>();

  currentItems.forEach(item => uniqueItems.set(item._id, item));

  newItems.forEach(item => {
    if (!uniqueItems.has(item._id)) {
      uniqueItems.set(item._id, item);
    }
  });

  return Array.from(uniqueItems.values());
}
