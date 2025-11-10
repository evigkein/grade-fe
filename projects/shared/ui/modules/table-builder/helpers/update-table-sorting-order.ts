import { ITableSorting, ITableSortingType } from '../interfaces/table-sorting.interface';

export function updateSortingOrder(
    currentState: ITableSorting,
    colName: string,
    order: ITableSortingType[]
): ITableSorting {
    const newSortingState: ITableSorting = { ...currentState };

    if (newSortingState.hasOwnProperty(colName)) {
        const currentValue = newSortingState[colName];
        const currentIndex = order.indexOf(currentValue);
        const nextIndex = (currentIndex + 1) % order.length;
        const newValue = order[nextIndex];

        newSortingState[colName] = newValue;

        for (const key in newSortingState) {
            if (key !== colName) {
                newSortingState[key] = 'none';
            }
        }
    }

    return newSortingState;
}
