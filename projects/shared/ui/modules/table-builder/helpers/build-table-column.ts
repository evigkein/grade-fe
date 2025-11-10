import { ITableColumn, ITableExtraOptions } from '../interfaces/table-column.interface';

export function buildTableColumns(
    cols: string[][],
    options?: Partial<ITableColumn>,
    extraOptions?: ITableExtraOptions
): ITableColumn[] {
  return cols.map(col => {
      const name = col[0];
      const title = col[1]

    return buildTableColumn(title, name, {
        ...options,
        width: extraOptions?.widthMap?.get(name) ?? null
    });
  });
}

export function buildTableColumn(title: string, name: string, options?: Partial<ITableColumn>): ITableColumn {
  return {
    name,
    title,
    ...options,
  };
}

/** To make width work correctly you must pass width to each column */
