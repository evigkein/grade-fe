import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { ButtonComponent } from '../../../button/button.component';

@Component({
  selector: 'p-banner-action-call',
  templateUrl: './action-call-banner.component.html',
  styleUrls: ['./action-call-banner.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule, TranslateModule, ButtonComponent]
})
export class ActionCallBannerComponent {
  @Input() title!: string;
  @Input() desc!: string;
  @Input() actionTitle!: string;
  @Output() action = new EventEmitter();
}
