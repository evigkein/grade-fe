import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  numberAttribute, ViewEncapsulation,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { SvgIconComponent } from '../../modules/svg-icon/svg-icon.component';

@Component({
  selector: 'p-phone-link',
  templateUrl: './phone.component.html',
  styleUrls: ['./phone.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  encapsulation: ViewEncapsulation.ShadowDom,
  imports: [CommonModule, SvgIconComponent],
})
export class PhoneLinkComponent {
  phone = input('+7 977 557-60-80');
  label = input<string | undefined>();
  ariaLabel = input<string | undefined>();

  isSmallIcon = input(false, { transform: booleanAttribute });
  isPage = input(false, { transform: booleanAttribute });

  isLoading = input(false, { transform: booleanAttribute });
  tabindex = input(0, { transform: numberAttribute });

  telLink = computed(() => `tel:${this.phone().replace(/[^\d+]/g, '')}`);

  classes = computed(() => {
    return [
      'p-phone-link',
      'p-a-reset',
      this.isSmallIcon() ? 'p-phone-link--small' : '',
      this.isPage() ? 'p-phone-link--page' : '',
    ]
      .filter(Boolean)
      .join(' ');
  });
}
