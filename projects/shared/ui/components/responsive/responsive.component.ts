import { ChangeDetectionStrategy, Component, HostBinding, Input, numberAttribute } from '@angular/core';

@Component({
  selector: 'p-responsive',
  template: `<ng-content select="[mobile]"></ng-content><ng-content select="[desktop]"></ng-content>`,
  styleUrls: ['./responsive.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [],
})
export class ResponsiveComponent {
  @Input({ transform: numberAttribute }) maxW: number = 850;

  @HostBinding('attr.maxW') get maxWAttr(): string {
    return String(this.maxW);
  }
}
