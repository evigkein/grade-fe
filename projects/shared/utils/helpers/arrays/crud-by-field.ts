export function replaceItemByField<T extends { _id?: string }>([...items]: T[], item: T, customIdField: keyof T = '_id'): T[] {
  const index = items.findIndex(
    (existingItem) => existingItem[customIdField] === item[customIdField],
  );
  if (index !== -1) items.splice(index, 1, item);
  return items;
}

export function updateFieldById<T, K extends keyof T>(
  [...items]: T[],
  itemId: T[K],
  customIdField: K,
  fieldName: K,
  newValue: T[K]
): T[] {
  const index = items.findIndex(
    item => item[customIdField]?.toString() === itemId?.toString()
  );
  if (index !== -1) {
    items[index] = { ...items[index], [fieldName]: newValue };
  }

  return items;
}

