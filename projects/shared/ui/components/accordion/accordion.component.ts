import { CommonModule } from '@angular/common';
import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  signal,
} from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { SvgIconComponent } from '../../modules/svg-icon/svg-icon.component';
import { OpenCloseAnimation, slideInOutTopAnimationForHidden } from '@utils/angular/animation/slide-in-out.animation';

@Component({
  selector: 'p-accordion',
  templateUrl: './accordion.component.html',
  styleUrls: ['./accordion.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule, SvgIconComponent, TranslateModule],
  animations: [OpenCloseAnimation, slideInOutTopAnimationForHidden]
})
export class AccordionComponent implements OnInit {
  @Input() label = '';
  @Input({transform: booleanAttribute}) isOpened = false;
  @Input({transform: booleanAttribute}) isBlockView = false;
  @Input({transform: booleanAttribute}) isSeeMore = false;
  @Input({transform: booleanAttribute}) isTitleBold = false;
  @Input() useNgIf = true;
  @Input() seeMoreLabels = ['See more...', 'See less...'];
  @Input() toggleIcon = 'corner-up-icon';
  @Input() hasToggle = true;
  @Input() type: 'primary' | 'primary-filled' = 'primary';
  @Input() icon!: string;
  @Output() openChanges: EventEmitter<boolean> = new EventEmitter();

  animationFinished = signal(false);

  ngOnInit() {
    if (this.isSeeMore) {
      // this.hasToggle = false;
    }
  }

  toggle(): void {
    this.isOpened = !this.isOpened;
    this.openChanges.emit(this.isOpened);
  }

  animationDone(event: any) {
    this.animationFinished.set(event.toState === 'closed');
  }
}


