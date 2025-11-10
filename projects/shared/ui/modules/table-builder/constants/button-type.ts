export enum TableCellType {
    Default = 'default',
    Button = 'button',
    Link = 'link',
    Icon = 'icon',
    Date = 'date',
    Status = 'status',
    Menu = 'dots',
}

export type ITableCellType = TableCellType
    | 'default'
    | 'button'
    | 'link'
    | 'icon'
    | 'date'
    | 'status'
    | 'dots'
