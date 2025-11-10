import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, Input, OnChanges, signal } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { OpenCloseAnimation } from '@utils/angular/animation/slide-in-out.animation';
import { ISimpleChanges } from '../../../../utils/types';
import { SvgIconComponent } from '../../../modules/svg-icon/svg-icon.component';
import { ButtonComponent } from '../../button/button.component';

@Component({
  selector: 'p-expander',
  templateUrl: './expander.component.html',
  styleUrls: ['./expander.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  animations: [OpenCloseAnimation],
  imports: [CommonModule, TranslateModule, ButtonComponent, SvgIconComponent]
})
export class ExpanderComponent implements OnChanges {
  @Input({required: true}) text!: string;
  @Input() hasToggle = true;
  @Input() textHide!: string;

  title = signal('');
  isOpened = signal(false);

  displayText = computed(() => this.isOpened() ? this.textHide : this.title());

  ngOnChanges(changes: ISimpleChanges<ExpanderComponent>) {
    changes.text && this.title.set(changes.text.currentValue);
  }

  toggle() {
    this.isOpened.set(!this.isOpened());
  }
}
