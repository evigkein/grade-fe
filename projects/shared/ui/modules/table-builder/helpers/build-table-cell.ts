import { ITableCellType, TableCellType } from '../constants/button-type';
import { ITableCell } from '../interfaces/table-cell.interface';

import { getColumnNameFromTitle } from './get-column-name-from-title';

export function buildTableCell([name, title]: string[], value: string, config?: ITableCell): ITableCell {
  return {
    ...config,
    title,
    value,
    hasAutoEllipsis: config?.hasAutoEllipsis ?? true,
    colName: name,
    type: getType(config),
  };
}

function getType(config?: ITableCell): ITableCellType {
  if (config?.type) {
    return config.type;
  }

  if (config?.icon) {
    return TableCellType.Icon;
  }

  if (config?.button) {
    return TableCellType.Button;
  }

  if (config?.link) {
    return TableCellType.Link;
  }

  if (config?.status) {
    return TableCellType.Status;
  }

  if (config?.menuActions) {
    return TableCellType.Menu;
  }

  return TableCellType.Default;
}
