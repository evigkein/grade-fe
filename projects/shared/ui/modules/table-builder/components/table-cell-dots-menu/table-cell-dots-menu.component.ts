import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { NgForOf } from '@angular/common';
import { ButtonComponent } from '../../../../components/button/button.component';
import { ITableCell } from '../../interfaces/table-cell.interface';
import { ITableAction } from '../../interfaces/table-action';

@Component({
    selector: 'p2p-table-cell-dots-menu',
    templateUrl: './table-cell-dots-menu.component.html',
    styleUrls: ['./table-cell-dots-menu.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
  imports: [
    NgForOf,
    ButtonComponent
  ]
})
export class TableCellDotsMenuComponent {
    @Input() item!: ITableCell;
    @Output() action = new EventEmitter<ITableAction>();

    onAction(action: ITableAction): void {
        this.action.emit(action)
    }
}
