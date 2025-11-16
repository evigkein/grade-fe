import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  computed,
  input,
  booleanAttribute,
  numberAttribute,
} from '@angular/core';
import { CommonModule } from '@angular/common';

export type TLoaderColor = 'default';
export type TLoaderSize = 's' | 'm' | 'l' | 'xl';
export type TSpinnerColor = 'primary' | 'button';

const sizeMap: Record<TLoaderSize, number> = {
  s: 22,
  m: 52,
  l: 70,
  xl: 100,
};

const borderSizeMap: Record<TLoaderSize, number> = {
  s: 3,
  m: 4,
  l: 6,
  xl: 8,
};

@Component({
  selector: 'p-loader',
  standalone: true,
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss'],
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoaderComponent {
  type = input<TLoaderColor>('default');
  size = input<TLoaderSize>('m');
  color = input<TSpinnerColor>('primary');

  minHeight = input(0, { transform: numberAttribute });
  isCentered = input(false, { transform: booleanAttribute });

  isLoading = input(false, { transform: booleanAttribute });
  tabindex = input(0, { transform: numberAttribute });

  width = computed(() => sizeMap[this.size()]);
  height = computed(() => sizeMap[this.size()]);
  borderWidth = computed(() => borderSizeMap[this.size()]);

  @HostBinding('style.--spinnerRGB')
  get spinnerColor(): string {
    switch (this.color()) {
      case 'button':
        return '255, 255, 255';
      case 'primary':
        return '255, 119, 0';
    }
    return '123,123,123';
  }
}
