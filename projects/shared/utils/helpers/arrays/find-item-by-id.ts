import {IId, IPlainObject} from '../../types/object';

export function findItemById<T extends IId>(items: T[], id: string): T | undefined {
  return items.find(i => i.id === id);
}

export function findIndexByField<T extends IPlainObject>(items: T[], key: keyof T, value: string): number | undefined {
  return items.findIndex(i => i[key] === value);
}

export function findItemByField<T extends IPlainObject>(key: keyof T, value: string, items: T[]): T | undefined {
  return items.find(item => item[key] === value);
}

export function removeItemByField<T extends { [key: string]: any }>(items: T[], key: keyof T, value: string): T[] {
  const index = items.findIndex(item => item[key] === value);
  if (index !== -1) {
    items.splice(index, 1);
  }
  return items;
}

// findItemByField<{lol: string, kek: string}>('lol', '11', [{lol: '', kek: ''}])

export function findItemsByIds<T extends IId>(items: T[], ids: string[]): T[] {
  return items.filter(item => ids.includes(item.id));
}

export function removeItemsByIds<T extends Record<string, any>, K extends keyof T>(
  [...items]: T[],
  ids: string[],
  customIdField: K = '_id' as K,
): T[] {
  const idsSet = new Set(ids);
  return items.filter((item) => !idsSet.has(item[customIdField]));
}


