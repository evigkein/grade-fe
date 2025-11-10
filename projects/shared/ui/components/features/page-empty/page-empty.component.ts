import {CommonModule} from '@angular/common';
import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from '@angular/core';
import {TranslateModule} from '@ngx-translate/core';
import {ButtonComponent} from '../../button/button.component';

@Component({
  selector: 'p-page-empty',
  templateUrl: './page-empty.component.html',
  styleUrls: ['./page-empty.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule, TranslateModule, ButtonComponent]
})
export class PageEmptyComponent {
  @Input() title!: string;
  @Input() subTitle!: string;
  @Input() buttonText!: string;
  @Input() icon = 'info';
  @Output() action = new EventEmitter();

  public onActionClick(): void {
    this.action.emit();
  }
}
