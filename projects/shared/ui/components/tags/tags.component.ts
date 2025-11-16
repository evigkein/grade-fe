import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Output,
  input,
  computed,
  booleanAttribute,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { SvgIconComponent } from '../../modules/svg-icon/svg-icon.component';
import { StopEventsDirective } from '../../../directives/utils';
import { TranslateModule } from '@ngx-translate/core';
import { SkipHydrationDirective } from '../../../directives/utils/skip-hydration.directive';
import { convertStringToTagFormat } from './tags.helpers';
import { ITag } from './tags.interface';

@Component({
  selector: 'p-tags',
  standalone: true,
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    SvgIconComponent,
    StopEventsDirective,
    TranslateModule,
    SkipHydrationDirective,
  ],
})
export class TagsComponent {
  tags = input<ITag[] | string[]>([]);
  isRemovable = input(false, { transform: booleanAttribute });
  hasWrap = input(true, { transform: booleanAttribute });
  color = input<'common' | 'teal'>('common');
  size = input<'m' | 'l' | 'x'>('m');
  prefix = input<string>();

  @Output() removeTag = new EventEmitter<string>();

  items = computed(() => {
    const v = this.tags();
    return typeof v?.[0] === 'string'
      ? convertStringToTagFormat(v as string[])
      : (v as ITag[]);
  });

  tagClasses = computed(() => {
    return [
      `tag--${this.color()}`,
      `tag--${this.size()}`,
    ].join(' ');
  });

  onRemoveTag(value: string | undefined) {
    this.removeTag.emit(value);
  }
}
