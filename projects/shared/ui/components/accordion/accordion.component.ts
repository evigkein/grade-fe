import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  input,
  model,
  output,
  signal,
} from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { SvgIconComponent } from '../../modules/svg-icon/svg-icon.component';
import { OpenCloseAnimation, slideInOutTopAnimationForHidden } from '@utils/angular/animation/slide-in-out.animation';

export type TAccordionSize = '' | 'l'
export type TAccordionPadding = '' | 'm' | 'l'

@Component({
  selector: 'p-accordion',
  templateUrl: './accordion.component.html',
  styleUrls: ['./accordion.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule, SvgIconComponent, TranslateModule],
  animations: [OpenCloseAnimation, slideInOutTopAnimationForHidden]
})
export class AccordionComponent {
  // === INPUT SIGNALS ===
  label = input('');
  isOpened = model(false);
  isBlockView = input(false);
  isSeeMore = input(false);
  isTitleBold = input(false);
  useNgIf = input(true);
  seeMoreLabels = input(['See more...', 'See less...']);
  toggleIcon = input('corner-up-icon');
  size = input('');
  hasToggle = input(true);
  paddingSize = input<TAccordionPadding>('m');
  type = input<'primary' | 'primary-filled'>('primary');
  icon = input<string | undefined>(undefined);

  openChanges = output<boolean>();

  animationFinished = signal(false);

  isExpandedClass = computed(() => this.isOpened());
  isBlockClass = computed(() => this.isBlockView());
  isSeeMoreClass = computed(() => this.isSeeMore());
  isPrimaryFilled = computed(() => this.type() === 'primary-filled');

  constructor() {
    effect(() => {
      if (this.isSeeMore()) {
      }
    });
  }

  toggle(): void {
    this.isOpened.update(v => !v);
    this.openChanges.emit(this.isOpened());
  }

  animationDone(event: any) {
    this.animationFinished.set(event.toState === 'closed');
  }
}
