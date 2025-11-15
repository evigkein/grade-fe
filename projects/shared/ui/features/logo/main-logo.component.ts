import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from '@angular/core';
import { SvgIconComponent } from '../../modules/svg-icon/svg-icon.component';

@Component({
  selector: 'p-main-logo',
  templateUrl: './main-logo.component.html',
  styleUrls: ['./main-logo.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    SvgIconComponent
  ],
})
export class MainLogoComponent {
  @Input() AAAA!: string;
  @Output() AAAA2 = new EventEmitter();

  runOutput(): void {
    this.AAAA2.emit();
  }
}
