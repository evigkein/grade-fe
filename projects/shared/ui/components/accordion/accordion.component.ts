import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  input,
  model,
  numberAttribute,
  output,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { SvgIconComponent } from '../../modules/svg-icon/svg-icon.component';
import { TranslateModule } from '@ngx-translate/core';
import {
  OpenCloseAnimation,
  slideInOutTopAnimationForHidden
} from '@utils/angular/animation/slide-in-out.animation';

export type TAccordionSize = '' | 'l';
export type TAccordionPadding = '' | 'm' | 'l';

@Component({
  selector: 'p-accordion',
  standalone: true,
  templateUrl: './accordion.component.html',
  styleUrls: ['./accordion.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, SvgIconComponent, TranslateModule],
  animations: [OpenCloseAnimation, slideInOutTopAnimationForHidden],
})
export class AccordionComponent {
  label = input('');
  isOpened = model(false);
  isVisible = input(false);

  isBlockView = input(false, { transform: booleanAttribute });
  isSeeMore = input(false, { transform: booleanAttribute });
  isTitleBold = input(false, { transform: booleanAttribute });
  useNgIf = input(true, { transform: booleanAttribute });

  seeMoreLabels = input(['See more...', 'See less...']);
  toggleIcon = input('corner-up-icon');

  size = input<TAccordionSize>('');
  hasToggle = input(true);
  paddingSize = input<TAccordionPadding>('m');
  type = input<'primary' | 'primary-filled'>('primary');
  icon = input<string | undefined>();

  isLoading = input(false, { transform: booleanAttribute });
  tabindex = input(0, { transform: numberAttribute });

  openChanges = output<boolean>();

  animationFinished = signal(false);

  classes = computed(() => {
    return [
      'accordion',
      this.isOpened() ? 'accordion--expanded' : '',
      this.isBlockView() ? 'accordion--block' : '',
      this.isSeeMore() ? 'accordion--see-more' : '',
      this.type() === 'primary-filled' ? 'accordion--primary-filled' : '',
      `accordion--${this.size()}`,
      `accordion--p-${this.paddingSize()}`,
    ]
      .filter(Boolean)
      .join(' ');
  });

  constructor() {
    effect(() => this.isSeeMore());
  }

  toggle() {
    this.isOpened.update(v => !v);
    this.openChanges.emit(this.isOpened());
  }

  animationDone(event: any) {
    this.animationFinished.set(event.toState === 'closed');
  }
}
