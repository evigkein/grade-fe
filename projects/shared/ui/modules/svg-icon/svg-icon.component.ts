import {
  ChangeDetectionStrategy,
  Component,
  HostBinding, input,
  Input, numberAttribute,
} from '@angular/core';
import {NzIconDirective, NzIconModule} from 'ng-zorro-antd/icon';

@Component({
    selector: 'p-icon',
    styleUrls: ['./svg-icon.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
      @if (icon() !== 'none') {
        <i nz-icon [nzType]="icon()"></i>
      }
<!--    <i nz-icon [nzType]="icon()" [theme]="iconTheme()"></i>-->
  `,
  standalone: true,
  imports: [
    NzIconDirective,
    NzIconModule,
  ],
})
export class SvgIconComponent {
  icon = input.required<string>();
  iconTheme = input<'fill' | 'outline' | 'twotone'>('outline');
  size = input(20, {transform: numberAttribute});

  @HostBinding('style.--size') get iconSize(): string {
    return (this.size()?.toString() ?? '18') + 'px';
  }
}
