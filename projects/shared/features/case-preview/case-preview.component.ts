import { NgClass } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { ButtonComponent } from '@ui/components/button/button.component';
import { _NOTIFY } from '@ui/modules/notifications/notification.service';
import { CustomImageDirective } from '../../directives/ui/img/priority.directive';
import { StopEventsDirective } from '../../directives/utils';

export type TCaseAlign = 'left' | 'right';

export interface ICasePreview {
  id: string;
  title: string;
  subtitle?: string;
  description: string;
  image: string;
  url: string;
}

@Component({
  selector: 'p-case-preview',
  standalone: true,
  templateUrl: './case-preview.component.html',
  styleUrls: ['./case-preview.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    RouterLink,
    TranslatePipe,
    CustomImageDirective,
    ButtonComponent,
    NgClass,
    StopEventsDirective
  ]
})
export class CasePreviewComponent {
  item = input.required<ICasePreview>();
  align = input<TCaseAlign>('left');
  buttonLabel = input('');

  notify = _NOTIFY();

  seeMore(): void {
    this.notify.showSuccess('', "not.coming-soon")
  }
}
