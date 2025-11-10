import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FadeTextComponent } from '../../../../components/fade-text';
import { SvgIconComponent } from '../../../svg-icon/svg-icon.component';

import { ITableCell } from '../../interfaces/table-cell.interface';

@Component({
    selector: 'p2p-table-cell-icon',
    templateUrl: './table-cell-button.component.html',
    styleUrls: ['./table-cell-button.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
  imports: [
    FadeTextComponent,
    SvgIconComponent
  ]
})
export class TableCellIconComponent {
    @Input() item!: ITableCell;
}
