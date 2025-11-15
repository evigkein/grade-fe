import {CommonModule} from '@angular/common';
import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  Input,
  numberAttribute,
  OnInit
} from '@angular/core';

export type TLoaderColor = 'default';
export type TLoaderSize = 's' | 'm' | 'l' | 'xl';
export type TSpinnerColor = 'primary' | 'button';

const sizeMap: Record<TLoaderSize, number> = {
  s: 22,
  m: 52,
  l: 70,
  xl: 100
};

const borderSizeMap: Record<TLoaderSize, number> = {
  s: 3,
  m: 4,
  l: 6,
  xl: 8
};

@Component({
    selector: 'p-loader',
    template: `
    <div class="loader"
         [class.loader--centered]="isCentered"
         [style.min-height]="minHeight + 'px'">
      <div
        [style.width]="width + 'px'"
        [style.height]="height + 'px'"
        [style.border-width]="borderWidth + 'px'"
        class="spinner"
      ></div>
    </div>
  `,
  styleUrls: ['./loader.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule]
})
export class LoaderComponent implements OnInit {
  @Input() type: TLoaderColor = 'default';
  @Input() size: TLoaderSize = 'm';
  @Input() color: TSpinnerColor = 'primary';
  @Input({transform: numberAttribute}) minHeight = 0;
  @Input({transform: booleanAttribute}) isCentered = false;

  width = 52;
  height = 52;
  borderWidth = 4;

  ngOnInit() {
    this.width = sizeMap[this.size];
    this.height = sizeMap[this.size];
    this.borderWidth = borderSizeMap[this.size];
  }

  @HostBinding('style.--spinnerRGB') get spinnerColor(): string {
    switch (this.color) {
      case 'button': return '255, 255, 255';
      // case 'primary': return '217, 91, 174';
      case 'primary': return '255, 119, 0';
    }
    return '123,123,123';
  }

}
