import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'ds-component',
  templateUrl: './empty.component.html',
  styleUrls: ['./empty.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [],
})
export class EmptyComponent {
  @Input() AAAA!: string;
  @Output() AAAA2 = new EventEmitter();

  runOutput(): void {
    this.AAAA2.emit();
  }
}
