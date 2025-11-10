import {IId} from '../../types';
import { getUId } from '../different';


function replaceAt(array: any[], index: number, value: any): any[] {
  return [...array.slice(0, index), value, ...array.slice(index + 1)];
}

export function average(arr: any[]): number | null {
  if (!arr.length || !Array.isArray(arr)) {
    return null;
  }

  return arr.reduce((acc, value) => acc + (Number(value) || 0), 0) / arr.length;
}

export function fillArrayWithItems(amountOfItems: number): number[] {
  return new Array(amountOfItems).fill(1).map((item, index) => index + 1);
}

export function ensureArray<T>(item: T | T[]): T[] {
  return Array.isArray(item) ? item : [item];
}

export function ensureId<T extends {id?: string}>(arr: T[]): T[] {
  return arr.map(i => {
    return {...i, id: i.id ?? getUId()};
  })
}

export function toggleStringInArray(str: string, arr: string[]): string[] {
  const index = arr.indexOf(str);
  index !== -1 ? arr.splice(index, 1) : arr.push(str);
  return arr;
}

export function getUniqueValues<T>(array: T[]): T[] {
  return Array.from(new Set(array));
}


////////////////////////////////////////
// export function getMinValueByField<T>(items: T[], field: keyof T): number | null {
//   if (!Array.isArray(items) || items.length === 0) {
//     return null;
//   }
//
//   return items.reduce((minValue, item) => {
//     const value = Number(item[field]);
//     if (isNaN(value)) {
//       return minValue;
//     }
//     return minValue === null || value < minValue ? value : minValue;
//   }, null as number | null);
// }
