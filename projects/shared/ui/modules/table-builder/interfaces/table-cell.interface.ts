import { ITableCellType, TableCellType } from '../constants/button-type';

import { ITableButton } from './cells/table-button.interface';
import { ITableIcon } from './cells/table-icon.interface';
import { ITableLink } from './cells/table-link.interface';
import { ITableAction } from './table-action';
import { IMenuActions } from './cells/menu-actions.interface';

export type ITableCellStatus = 'warning' | 'danger' | 'success' | 'default'
export type ITableCellColorType = 'red' | 'green' | 'teal-blue' | 'gray';
export interface ITableCell {
  colName?: string;
  title?: string;
  value?: string;
  color?: ITableCellColorType;
  hasAutoEllipsis?: boolean;
  hasMultipleLines?: boolean;
  type?: ITableCellType;
  button?: ITableButton;
  icon?: ITableIcon;
  link?: ITableLink;
  menuActions?: IMenuActions[];
  item?: any;
  status?: ITableCellStatus;
}
