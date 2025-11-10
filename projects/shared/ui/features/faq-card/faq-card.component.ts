import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { AccordionComponent } from '../../components/accordion';

@Component({
  selector: 'p-faq-card',
  templateUrl: './faq-card.component.html',
  styleUrls: ['./faq-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    AccordionComponent,
    TranslatePipe
  ],
})
export class FaqCardComponent {
  @Input({ required: true }) q: string;
  @Input({ required: true }) a: string;

  // runOutput(): void {
  //   this.AAAA2.emit();
  // }
}
