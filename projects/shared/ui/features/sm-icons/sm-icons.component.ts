import { CommonModule } from '@angular/common';
import { booleanAttribute, ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { StopEventsDirective } from '../../../directives/utils';
import { SkipHydrationDirective } from '../../../directives/utils/skip-hydration.directive';
import { openExternalUrl } from '../../../utils/helpers/browser/window.util';
import { SvgIconComponent } from '../../modules/svg-icon/svg-icon.component';

export const smContacts = {
  whatsapp: 'https://wa.me/79775576080?text=Здравствуйте!%20Хочу%20уточнить%20по%20трансферу',
  telegramm: 'https://t.me/souztransfer',
  viber: 'viber://chat?number=+79775576080',
  max: 'https://max.example.com',
};

export const smContactsFooter = {
  whatsapp: 'https://wa.me/79685619898?text=Здравствуйте!%20Хочу%20уточнить%20по%20трансферу',
  telegramm: 'https://t.me/souztransfer',
  viber: 'viber://chat?number=+79685619898',
  max: 'https://max.example.com',
};

@Component({
  selector: 'p-sm-icons',
  templateUrl: './sm-icons.component.html',
  styleUrls: ['./sm-icons.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule, SvgIconComponent, SkipHydrationDirective, StopEventsDirective],
})
export class SmIconsComponent implements OnInit {
  @Input() size: 's' | 'm' = 'm';
  @Input({transform: booleanAttribute}) isFooter = false;
  smContacts = smContacts;

  ngOnInit() {
    this.smContacts = this.isFooter ? smContacts : smContactsFooter
  }

  navigateSm(sm: keyof typeof smContacts): void {
    const link = this.smContacts[sm];
    if (link) openExternalUrl(link);
  }
}
