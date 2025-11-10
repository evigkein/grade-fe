import { ITableColumn } from '../interfaces/table-column.interface';
import { ITable } from '../interfaces/table.interface';

export function getTableEmptyState(cols?: ITableColumn[]): ITable {
  return {
    cols: cols || [],
    rows: [],
  };
}
