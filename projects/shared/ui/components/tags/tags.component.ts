import {CommonModule} from '@angular/common';
import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from '@angular/core';
import {TranslateModule} from '@ngx-translate/core';
import { StopEventsDirective } from '../../../directives/utils';
import { SkipHydrationDirective } from '../../../directives/utils/skip-hydration.directive';
import { FuncPipe } from '../../../pipes/func.pipe';
import { SvgIconComponent } from '../../modules/svg-icon/svg-icon.component';

import {convertStringToTagFormat} from './tags.helpers';
import { ITag } from './tags.interface';


@Component({
  selector: 'p-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [TranslateModule, SvgIconComponent, StopEventsDirective, CommonModule, FuncPipe, SkipHydrationDirective,],
})
export class TagsComponent {
  @Input() tags: ITag[] | string[] = [];
  @Input() isRemovable = false;
  @Input() hasWrap = true;
  @Input() color: 'common' | 'teal' = 'common';
  @Input() size: 'm' | 'l' | 'x' = 'm';
  @Input() prefix?: string;
  @Output() removeTag = new EventEmitter<string>();

  transformLabels(labels: ITag[] | string[]): ITag[] {
    return typeof labels?.[0] === 'string'
      ? convertStringToTagFormat(labels as string[])
      : labels as ITag[];
  }

  onRemoveTag(value: string | undefined): void {
    this.removeTag.emit(value);
  }
}
