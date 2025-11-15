import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { SmIconsComponent } from '../../sm-icons/sm-icons.component';
import { SvgIconComponent } from '../../../modules/svg-icon/svg-icon.component';

@Component({
  selector: 'p-call-us',
  templateUrl: './call-us.component.html',
  styleUrls: ['./call-us.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule, SvgIconComponent, SmIconsComponent]
})
export class CallUsComponent {
  @Input() title = ''
  @Input() subTitle = 'Тогда свяжитесь с нами, мы Вам поможем!'
}
