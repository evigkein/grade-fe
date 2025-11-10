import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { FadeTextComponent } from '../../../../components/fade-text';

import { TableCellType } from '../../constants/button-type';
import { ITableAction } from '../../interfaces/table-action';
import { ITableCell } from '../../interfaces/table-cell.interface';
import { TableAlignType } from '../../table.component';
import { NgSwitch, NgSwitchCase, NgSwitchDefault } from '@angular/common';
import { TableCellButtonComponent } from '../table-cell-button/table-cell-button.component';
import { TableCellLinkComponent } from '../table-cell-link/table-cell-link.component';
import { TableCellIconComponent } from '../table-cell-icon/table-cell-button.component';
import { TableCellStatusComponent } from '../custom/table-cell-status/table-cell-status.component';
import { TableCellDateComponent } from '../custom/table-cell-button/table-cell-date.component';
import { TableCellDotsMenuComponent } from '../table-cell-dots-menu/table-cell-dots-menu.component';

@Component({
  selector: 'p2p-table-cell',
  templateUrl: './table-cell.component.html',
  styleUrls: ['./table-cell.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
  imports: [
    NgSwitch,
    TableCellButtonComponent,
    TableCellLinkComponent,
    TableCellIconComponent,
    TableCellStatusComponent,
    NgSwitchCase,
    NgSwitchDefault,
    TableCellDateComponent,
    TableCellDotsMenuComponent,
    FadeTextComponent
  ]
})
export class TableCellComponent {
  @Input() item!: ITableCell;
  @Input() alignType: TableAlignType = 'center';
  @Output() action = new EventEmitter<ITableAction>();
  @Output() navigate = new EventEmitter<ITableCell>();

  cellType = TableCellType;

  onAction(event: ITableAction): void {
    this.action.emit(event);
  }

  onNavigate(event: ITableCell): void {
    this.navigate.emit(event);
  }
}
