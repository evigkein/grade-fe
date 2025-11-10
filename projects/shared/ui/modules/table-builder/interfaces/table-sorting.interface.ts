// export interface ITableSortingItems {
//     direction: 'asc' | 'desc' | '',
//     priority?: number,
// }

export type ITableSortingType = 'asc' | 'desc' | 'none' | ''

export interface ITableSorting {
    [key: string]: ITableSortingType
}
// export interface ITableSorting {
//     [key: string]: ITableSortingItems
// }

