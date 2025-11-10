import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { scrollToTop } from '@shared/utils/helpers/scroll-to.util';

@Component({
  selector: 'p-payment-selector',
  templateUrl: './payment-selector.component.html',
  styleUrls: ['./payment-selector.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class PaymentSelectorComponent implements OnInit {
  ngOnInit() {
    scrollToTop(0);
  }
}
