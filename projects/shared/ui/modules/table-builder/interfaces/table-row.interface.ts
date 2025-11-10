import { ITableCell } from './table-cell.interface';

export interface TPlainObject<T> {
  [key: string]: T;
}

export interface ITableRow extends TPlainObject<ITableCell> {}
