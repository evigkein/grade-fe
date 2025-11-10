import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { ButtonComponent } from '../../../../components/button/button.component';

import { ITableAction } from '../../interfaces/table-action';
import { ITableCell } from '../../interfaces/table-cell.interface';

@Component({
    selector: 'p2p-table-cell-button',
    templateUrl: './table-cell-button.component.html',
    styleUrls: ['./table-cell-button.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
  imports: [
    ButtonComponent
  ]
})
export class TableCellButtonComponent {
    @Input() item!: ITableCell;
    @Output() action = new EventEmitter<ITableAction>();

    onAction(): void {
        this.action.emit({
            action: this.item.button!.actionName,
            item: this.item.button?.item
        });
    }
}
