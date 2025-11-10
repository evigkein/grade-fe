import { ITableColumn } from './table-column.interface';
import { ITableRow } from './table-row.interface';

export interface ITable {
  cols: ITableColumn[];
  rows: ITableRow[];
}
