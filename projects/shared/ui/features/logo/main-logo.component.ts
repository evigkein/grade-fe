import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from '@angular/core';
import { RouterLink } from '@angular/router';
import { StopEventsDirective } from '../../../directives/utils';
import { SvgIconComponent } from '../../modules/svg-icon/svg-icon.component';

@Component({
  selector: 'p-main-logo',
  templateUrl: './main-logo.component.html',
  styleUrls: ['./main-logo.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    SvgIconComponent,
    RouterLink,
    StopEventsDirective
  ],
})
export class MainLogoComponent {
  @Input() AAAA!: string;
  @Output() AAAA2 = new EventEmitter();

  runOutput(): void {
    this.AAAA2.emit();
  }
}
