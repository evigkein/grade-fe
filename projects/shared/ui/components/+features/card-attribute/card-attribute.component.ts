import { CommonModule } from '@angular/common';
import { Component, Input, numberAttribute } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { SvgIconComponent } from '../../../modules/svg-icon/svg-icon.component';

@Component({
  selector: 'p-card-attribute',
  templateUrl: './card-attribute.component.html',
  styleUrls: ['./card-attribute.component.scss'],
  standalone: true,
  imports: [CommonModule, SvgIconComponent, TranslateModule]
})
export class CardAttributeComponent {
  @Input() text: string = '';
  @Input() icon: string = '';
  @Input({transform: numberAttribute}) iconSize: string = '';
  @Input() altText: string = 'icon';
}
