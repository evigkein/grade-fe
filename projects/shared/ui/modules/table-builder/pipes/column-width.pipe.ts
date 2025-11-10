import { Pipe, PipeTransform } from '@angular/core';

import { ITableColumn } from '../interfaces/table-column.interface';

@Pipe({ name: 'columnParam', standalone: true })
export class ColumnWidthPipe implements PipeTransform {
  transform(colName: string, cols: ITableColumn[], param: keyof ITableColumn): string | boolean | null {
    return cols.find(col => col.name === colName)?.[param] ?? null;
  }
}
