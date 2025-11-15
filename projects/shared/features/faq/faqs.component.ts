import { ChangeDetectionStrategy, Component, EventEmitter, input, Input, Output } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { AccordionComponent } from '@ui/components/accordion';

export interface IFaq {
  question: string;
  answer: string;
}

@Component({
  selector: 'p-faqs',
  templateUrl: './faqs.component.html',
  styleUrls: ['./faqs.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    AccordionComponent,
    TranslatePipe
  ],
})
export class FaqsComponent {
  items = input<IFaq[]>();
  @Output() AAAA2 = new EventEmitter();

  runOutput(): void {
    this.AAAA2.emit();
  }
}
