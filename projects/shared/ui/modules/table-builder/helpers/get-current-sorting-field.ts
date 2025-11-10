import { ITableSorting, ITableSortingType } from '../interfaces/table-sorting.interface';

export function findNonNoneSorting(sorting: ITableSorting): [string, ITableSortingType] | [null, null] {
    for (const key in sorting) {
        if (sorting.hasOwnProperty(key) && sorting[key] !== 'none') {
            return [key, sorting[key]];
        }
    }
    return [null, null];
}
