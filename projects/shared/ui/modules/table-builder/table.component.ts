import {
    booleanAttribute,
    ChangeDetectionStrategy, ChangeDetectorRef,
    Component,
    EventEmitter,
    inject,
    Input,
    OnChanges,
    OnInit,
    Output,
    SimpleChanges
} from '@angular/core';
import { BrowserService } from '../../../services/browser.service';
import { trackByFn } from '../../../utils/angular';
import { openExternalUrl } from '../../../utils/helpers/browser/window.util';
import { isDeepEqual } from '../../../utils/helpers/objects';

import { ITableAction } from './interfaces/table-action';
import { ITableCell } from './interfaces/table-cell.interface';
import { ITableColumn } from './interfaces/table-column.interface';
import { ITablePagination } from './interfaces/table-pagination.interface';
import { ITable } from './interfaces/table.interface';
import { getRowsWithSortedCells } from './utils/get-rows-with-sorted-cells';
import { Router } from '@angular/router';
import { ITableSorting, ITableSortingType } from './interfaces/table-sorting.interface';
import { updateSortingOrder } from './helpers/update-table-sorting-order';

export type TableAlignType = 'left' | 'center' | 'right';

@Component({
    selector: 'p-table',
    templateUrl: './table.component.html',
    styleUrls: ['./table.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false,
})
export class TableComponent implements OnInit, OnChanges {
    @Input() table!: ITable;
    @Input() headAlignType: TableAlignType = 'left';
    @Input() alignType: TableAlignType = 'center';
    @Input() emptyText = 'table-no-items-default-text';
    @Input({transform: booleanAttribute}) isFixedLayout = true;
    @Input({transform: booleanAttribute}) hasPaddings = true;
    @Input({transform: booleanAttribute}) isSticky = true;
    @Input({transform: booleanAttribute}) hasBorderRadius = true;
    @Input({transform: booleanAttribute}) hasCustomWidth = false;
    @Input({transform: booleanAttribute}) hasBreakWord = false;
    @Input({transform: booleanAttribute}) hasLoadingMore = false;
    @Input({transform: booleanAttribute}) hasLoadingMoreAsync = false;
    @Input({ transform: booleanAttribute }) isBorderSeparate = true;
    @Input() loadingMoreSyncSize = 20;
    @Input() loadingMoreInitialSyncSize = 20;
    @Output() action = new EventEmitter<ITableAction>();
    @Output() loadMore = new EventEmitter<ITableAction>();
    @Output() headerClick = new EventEmitter<ITableColumn>();
    @Output() navigate = new EventEmitter<ITableCell>() as unknown as any; // for local use to avoid types conflict;

    @Input() totalItems!: number;
    @Input() isLoading = false;
    @Input() isLoaded = true;
    @Input() sorting?: ITableSorting;
    @Input() sortingOrder: ITableSortingType[] = ['asc', 'desc', 'none'];
    @Output() actionSort = new EventEmitter<ITableSorting>();

    @Input({transform: booleanAttribute}) isOnePagePaginationHidden = false;
    // @Input() pagination!: ITablePagination

    @Input() emptyTitle!: string;
    @Input() emptySubtitle!: string;
    @Input() emptyButtonText!: string;
    @Output() actionEmpty = new EventEmitter<void>();

    private router = inject(Router);
    private browser = inject(BrowserService);
    private cdr = inject(ChangeDetectorRef)

    rows!: ITableCell[][];
    displayedRows: ITableCell[][] = [];
    loadedRowCount = 0;

    trackByFn = trackByFn;

    ngOnInit(): void {
        this.calculateRows(this.hasLoadingMore && !this.hasLoadingMoreAsync);
    }

    ngOnChanges({ table }: SimpleChanges) {
        if (!isDeepEqual(table?.previousValue?.rows, table?.currentValue?.rows)) {
            this.calculateRows(this.hasLoadingMore && !this.hasLoadingMoreAsync);
            this.cdr.detectChanges();
            this.cdr.markForCheck();
        }
    }

    onAction(event: ITableAction): void {
        this.action.emit(event);
    }

    headerCellClick(col: ITableColumn): void {
        this.headerClick.emit(col);
        const sortingColName = this.sorting?.[col.name]!;

        if(sortingColName) {
            const updatedSorting = updateSortingOrder(this.sorting!, col.name, this.sortingOrder)
            this.actionSort.emit(updatedSorting);
        }
    }

    onNavigate(event: ITableCell): void {
        const { isExternalHandling, isExternal, url } = event.link!;
        if (!isExternalHandling) {
            console.log(isExternal);
            isExternal ? openExternalUrl(url) : this.router.navigateByUrl(url);
        }
        this.navigate.emit(event);
    }

    loadMoreRows(): void {
        if (this.hasLoadingMoreAsync) {
            return this.loadMore.emit();
        } else {
            this.loadMoreSync();
        }
    }

    loadMoreSync(): void {
        const startIndex = this.loadedRowCount;
        const endIndex = startIndex + this.loadingMoreSyncSize;
        // this.displayedRows = this.displayedRows.concat(this.rows.slice(startIndex, endIndex));
        this.loadedRowCount = endIndex;
    }

    private calculateRows(hasLoadingMoreSync = false): void {
        this.rows = getRowsWithSortedCells(this.table);
        if (hasLoadingMoreSync) {
            this.loadMoreSync();
        } else {
            this.displayedRows = this.rows;
        }
        this.cdr.markForCheck();
    }
}
