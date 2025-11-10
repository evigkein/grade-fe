import { ChangeDetectionStrategy, Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { StopEventsDirective } from '../../../../../directives/utils';
import { SiteLinkPipe, SiteLinkViewPipe } from '../../../../../pipes/site-link.pipe';
import { FadeTextComponent } from '../../../../components/fade-text';
import { SvgIconComponent } from '../../../svg-icon/svg-icon.component';

import { ITableCell } from '../../interfaces/table-cell.interface';
import { NgIf } from '@angular/common';

@Component({
    selector: 'p2p-table-cell-link',
    templateUrl: './table-cell-link.component.html',
    styleUrls: ['./table-cell-link.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
  imports: [
    SvgIconComponent,
    NgIf,
    SiteLinkPipe,
    SiteLinkViewPipe,
    StopEventsDirective,
    FadeTextComponent,
  ]
})
export class TableCellLinkComponent {
    @Input() item!: ITableCell;
    @Output() navigate = new EventEmitter<ITableCell>();

    onNavigate(): void {
        if (this.item.link?.isExternalHandling) {

        }
        this.navigate.emit(this.item!);
    }
}
