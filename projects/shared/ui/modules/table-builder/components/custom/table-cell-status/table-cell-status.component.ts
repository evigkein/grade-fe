import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FadeTextComponent } from '../../../../../components/fade-text';
import { ITableCell } from '../../../interfaces/table-cell.interface';
import { TranslateModule } from '@ngx-translate/core';

@Component({
    selector: 'p2p-table-cell-status',
    templateUrl: './table-cell-status.component.html',
    styleUrls: ['./table-cell-status.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [
        TranslateModule,
        FadeTextComponent
    ]
})
export class TableCellStatusComponent {
    @Input() item!: ITableCell;
}
