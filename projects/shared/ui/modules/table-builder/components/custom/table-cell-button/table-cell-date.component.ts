import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { ITableCell } from '../../../interfaces/table-cell.interface';

@Component({
    selector: 'p2p-table-cell-date',
    templateUrl: './table-cell-date.component.html',
    styleUrls: ['./table-cell-date.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [
    ]
})
export class TableCellDateComponent implements OnInit {
    @Input() item!: ITableCell;

    date!: string;
    time!: string;

    ngOnInit(): void {
        const [date, time] = this.item.value?.split(' ')!;
        this.date = date;
        this.time = time;
    }
}
