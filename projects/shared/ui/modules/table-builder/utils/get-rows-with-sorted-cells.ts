import { ITableCell } from '../interfaces/table-cell.interface';
import { ITable } from '../interfaces/table.interface';
let ii = 0;

export function getRowsWithSortedCells(table: ITable): ITableCell[][] {
  const cols = table.cols.map(i => i.name);

  const rowCells: ITableCell[][] = table.rows.map(row => Object.values(row));

  const cells = rowCells.map<ITableCell[]>(row =>
    row.reduce<ITableCell[]>((acc, cell) => {
      const index = cols.indexOf(cell.colName ?? '');
      if (index === -1) return acc; // 💥 пропускаем "мусорные" ячейки

      acc[index] = cell;
      return acc;
    }, new Array(cols.length)),
  );

  return cells;
}
