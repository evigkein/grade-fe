import { CommonModule } from '@angular/common';
import { booleanAttribute, ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from '@angular/core';
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
  @Input() phone = '+7 977 557-60-80';
  @Input() label?: string;
  @Input() ariaLabel?: string;
  @Input({transform: booleanAttribute}) isSmallIcon = false;
  @Input({transform: booleanAttribute}) isPage = false;

  get telLink(): string {
    return `tel:${this.phone.replace(/[^\d+]/g, '')}`;
  }
}
