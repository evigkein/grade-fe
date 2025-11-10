export enum ESortingType {
  DEFAULT = 'default',
  BOOLEAN = 'boolean',
  LEX = 'lex',
  NUMBER = 'num',
  DATE = 'date',
}

export type TSortingWay =
  | 'default'
  | 'boolean'
  | 'lex'
  | 'num'
  | 'date'
  | keyof typeof ESortingType;

export type PriorityMap<K extends string | number = string> = {
  [key in K]: number;
};

export type TSortDirection = 'asc' | 'desc';

export interface SortOption<T> {
  field: keyof T;
  order?: TSortDirection;
  sortType?: TSortingWay;
  cmp?: (a: any, b: any) => number;
  priority?: number;
  useMap?: PriorityMap<any>;
}

export function getSortedArray<T>(array: T[], options: SortOption<T>[]): T[] {
  const sortedOptions = options
    .map((opt, index) => ({ ...opt, effectivePriority: opt.priority ?? index }))
    .sort((a, b) => a.effectivePriority - b.effectivePriority);

  return array.slice().sort((a, b) => {
    for (const {
      field,
      order = 'asc',
      cmp,
      sortType = ESortingType.DEFAULT,
      useMap,
    } of sortedOptions) {
      const aVal = a[field];
      const bVal = b[field];
      let res = 0;
      if (cmp) {
        res = cmp(aVal, bVal);
      } else if (useMap) {
        res = numSort(useMap[aVal], useMap[bVal]);
      } else {
        const effectiveSortType =
          sortType !== ESortingType.DEFAULT
            ? sortType
            : detectSortType(aVal, bVal);
        switch (effectiveSortType) {
          case ESortingType.BOOLEAN:
            res = boolSort(aVal as boolean, bVal as boolean);
            break;
          case ESortingType.NUMBER:
            res = numSort(aVal as number, bVal as number);
            break;
          case ESortingType.LEX:
            res = lexSort(aVal, bVal);
            break;
          case ESortingType.DATE:
            res = dateSort(aVal, bVal);
            break;
          default:
            res = standardSort(aVal, bVal);
        }
      }
      if (res !== 0) return order === 'asc' ? res : -res;
    }
    return 0;
  });
}

function standardSort(a: any, b: any): number {
  return a > b ? 1 : a < b ? -1 : 0;
}

function lexSort(a: any, b: any): number {
  return ('' + a).localeCompare('' + b);
}

function numSort(a: any, b: any): number {
  return Number(a) - Number(b);
}

function boolSort(a: boolean, b: boolean): number {
  return a === b ? 0 : a ? 1 : -1;
}

function dateSort(a: any, b: any): number {
  return new Date(a).getTime() - new Date(b).getTime();
}

function detectSortType(a: any, b: any): ESortingType {
  if (typeof a === 'boolean' && typeof b === 'boolean') {
    return ESortingType.BOOLEAN;
  }
  if (typeof a === 'number' && typeof b === 'number') {
    return ESortingType.NUMBER;
  }
  if (a instanceof Date && b instanceof Date) {
    return ESortingType.DATE;
  }
  if (typeof a === 'string' && typeof b === 'string') {
    const aTime = Date.parse(a);
    const bTime = Date.parse(b);
    if (!isNaN(aTime) && !isNaN(bTime)) {
      return ESortingType.DATE;
    }
    return ESortingType.LEX;
  }
  return ESortingType.DEFAULT;
}




// export const categoryPriority: PriorityMap<EMaskCategory> = {
//   [EMaskCategory.COMMON]: 1,
//   [EMaskCategory.UNCOMMON]: 2,
// };
//
// export function getSortedMasks(
//   userMasks: string[],
//   masks: UserMask[],
// ): UserMask[] {
//   const options: SortOption<UserMask>[] = [
//     {
//       field: 'isOwned',
//     },
//     {
//       field: 'category',
//       useMap: categoryPriority,
//     },
//     {
//       field: 'showPriority',
//     },
//   ];
//
//   return getSortedArray(masks, options);
// }
