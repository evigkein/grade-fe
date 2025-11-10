import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from '@angular/core';
import { CustomImageDirective } from '@shared/directives/ui/img/priority.directive';

@Component({
  selector: 'p-trip-card',
  templateUrl: './trip-card.component.html',
  styleUrls: ['./trip-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    CustomImageDirective
  ],
})
export class TripCardComponent {
  @Input() from = 'Сочи';
  @Input() to = 'Краснодар';
  @Input() priceFrom = '7890₽';
  @Input() imageUrl = '';
  @Input() alt = 'Маршрут';
  @Input() buttonText = 'Выбрать';

  @Output() select = new EventEmitter<void>();

  onSelect() {
    this.select.emit();
  }
}
