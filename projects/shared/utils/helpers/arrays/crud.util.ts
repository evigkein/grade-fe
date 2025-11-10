import {IId} from '@core';

export function replaceItemById<T extends { _id?: string }>([...items]: T[], item: T): T[] {
  const index = items.findIndex(contract => contract._id === item._id);
  if(index != -1) items.splice(index, 1, item);
  return items;
}

export function replaceItemByField<T extends { _id?: string }>([...items]: T[], item: T, customIdField: keyof T = '_id'): T[] {
  const index = items.findIndex(
    (existingItem) => existingItem[customIdField] === item[customIdField],
  );
  if (index !== -1) items.splice(index, 1, item);
  return items;
}

export function addItemToArray<T extends { id?: string }>([...items]: T[], item: T): T[] {
  items.push(item)
  return items;
}

export function removeItemById<T extends { _id?: string }>([...items]: T[], id: string): T[] {
  const index = items.findIndex(contract => contract._id === id);
  if(index != -1) items.splice(index, 1);
  return items
}

export function updateFieldById<T extends IId, K extends keyof T>(
  [...items]: T[],
  itemId: string,
  fieldName: K,
  newValue: T[K]
): T[] {
  const index = items.findIndex(item => item.id === itemId);
  if (index !== -1) {
    items[index] = { ...items[index], [fieldName]: newValue };
  }

  return items;
}

export function replaceField<T extends object, K extends keyof T>(obj: T, field: K, value: T[K]): T {
  return {
    ...obj,
    [field]: value
  };
}
