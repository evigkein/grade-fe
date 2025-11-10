import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  Input,
} from '@angular/core';
import {NzIconDirective, NzIconModule} from 'ng-zorro-antd/icon';

@Component({
    selector: 'p-icon',
    styleUrls: ['./svg-icon.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
    <i nz-icon [nzType]="icon"></i>
<!--    <i nz-icon [nzType]="icon" [nzTheme]="iconTheme"></i>-->
  `,
  standalone: true,
  imports: [
    NzIconDirective,
    NzIconModule,
  ],
})
export class SvgIconComponent {
  @Input({required: true}) icon!: string;
  @Input() iconTheme: 'fill' | 'outline' | 'twotone' = 'outline';
  @Input() size = '20';

  @HostBinding('style.--size') get iconSize(): string {
    return (this.size?.toString() ?? '18') + 'px';
  }
}
