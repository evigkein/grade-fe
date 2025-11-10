export type TSort = 'asc' | 'desc' | null;
export type TSorting = 'numeric' | 'lexic' | 'lexico-numeric';

export interface IArraySortOptions {
  direction?: TSort;
  type: TSorting
}

export function sortArrayByField<T>(array: T[], field: keyof T, options: IArraySortOptions): T[] {
  const direction = options.direction ?? 'asc';
  const type = options.type ?? 'numeric';

  return array.slice().sort((a, b) => {
    let comparison = 0;

    switch (type) {
      case 'numeric':
        comparison = Number(a[field]) - Number(b[field]);
        break;
      case 'lexic':
        comparison = String(a[field]).localeCompare(String(b[field]));
        break;
    }

    return direction === 'asc' ? comparison : -comparison;
  });
}

export function getNewSorting(currentSort: TSort): TSort {
  if (currentSort === null) return 'asc';
  if (currentSort === 'asc') return 'desc';
  if (currentSort === 'desc') return null;
  return null;
}
