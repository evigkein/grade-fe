export interface ITableColumn {
  name: string;
  title: string;
  width?: string | null;
  minWidth?: string | null;
  isActive?: boolean;
  isBold?: boolean;
  isSortable?: boolean;
  isDoubleRow?: boolean;
  isSingleRow?: boolean;
  isShortPadding?: boolean;
  align?: 'left' | 'center' | 'right';
}

export interface ITableExtraOptions {
    widthMap?: Map<string, string>
}
