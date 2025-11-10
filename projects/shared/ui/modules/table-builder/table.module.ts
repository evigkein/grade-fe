import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TextOverflowDirective } from '../../../directives/ui/text-overflow.directive';
import { ScrollDirective } from '../../../directives/ui/utils/scroll.directive';
import { StopEventsDirective } from '../../../directives/utils';
import { FadeTextComponent } from '../../components/fade-text';
import { PageEmptyComponent } from '../../components/features/page-empty/page-empty.component';
import { LoaderComponent } from '../../components/loader/spinner/loader.component';
import { TableCellComponent } from './components/table-cell-default/table-cell.component';
import { NgForTrackByKeyDirective } from './directives/track-by-key';
import { ColumnWidthPipe } from './pipes/column-width.pipe';
import { TableComponent } from './table.component';
import { ButtonComponent } from '../../components/button/button.component';
import { TranslateModule } from '@ngx-translate/core';
import { SvgIconComponent } from '../svg-icon/svg-icon.component';

@NgModule({
    imports: [
        CommonModule,
        // TranslateModule,
        ButtonComponent,
        SvgIconComponent,
        StopEventsDirective,
        FadeTextComponent,
        ScrollDirective,
        TranslateModule,
        PageEmptyComponent,
        TableCellComponent,
        LoaderComponent,
        // PaginationComponent,
        TextOverflowDirective,
        ScrollDirective,
        ScrollDirective,
        NgForTrackByKeyDirective,
        ColumnWidthPipe,
    ],
    declarations: [
        TableComponent,
    ],
    exports: [TableComponent]
})
export class TableModule {}
