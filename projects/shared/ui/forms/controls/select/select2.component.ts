import {
  Component,
  ChangeDetectionStrategy,
  ElementRef,
  ViewChild,
  signal,
  computed,
  input as inputSignal,
  booleanAttribute,
  numberAttribute,
  output, effect, input,
} from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { _KEYBOARD } from '@services/keyboard.service';
import { isBrowser } from '@utils/helpers/browser/is-browser.util';
import { StopEventsDirective } from '../../../../directives/utils';
import { ClickOutsideDirective } from '../../../../directives/utils/click-outside.directive';
import { TabTrapDirective } from '../../../../directives/utils/tab-trap.directive';
import { LoaderComponent } from '../../../components/loader/spinner/loader.component';
import { SvgIconComponent } from '../../../modules/svg-icon/svg-icon.component';

import { CustomControlAccessor } from '../../custom-control-accessor';
import { PKeypressDirective } from './dirs/key-listener';
import { PListboxNavigationDirective } from './dirs/list-nav';
import { POptionSelectDirective } from './dirs/pick-option';
import { PScrollActiveIntoViewDirective } from './dirs/scroll-into-view';

export interface PSelect2Option<T = any> {
  id?: string;
  label?: string;
  value: T;
  disabled?: boolean;
}
export type TSelectWidth = 'max' | 'auto' | 's' | 'm' | 'l' | 'xl';
export type TSelectDropdownSize = 's' | 'm' | 'l' | 'xl';

@Component({
  selector: 'p-select2',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
    POptionSelectDirective,
    PListboxNavigationDirective,
    PScrollActiveIntoViewDirective,
    PKeypressDirective,
    TabTrapDirective,
    ClickOutsideDirective,
    SvgIconComponent,
    LoaderComponent,
    StopEventsDirective,
  ],
  templateUrl: './select2.component.html',
  styleUrls: ['./select2.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class]': 'classes()',
    '[attr.data-open]': 'isOpen() ? "true" : "false"',
  }
})
export class PSelect2Component<T = any> extends CustomControlAccessor {
  options = input.required<PSelect2Option<T>[]>();
  placeholder = input('select.placeholder');
  size = input<'s'|'m'|'l'|'xl' | 'max'>('m');
  myClass = inputSignal('');
  isLoading = input(false, { transform: booleanAttribute });
  tabindex = inputSignal(0, { transform: numberAttribute });
  width =  input<TSelectWidth>('m');
  dropdownWidth =  input<TSelectWidth>('m');
  dropdownSize = input<TSelectDropdownSize>('m');
  searchable = input(false, { transform: booleanAttribute });
  isSearchDetached = input(false, { transform: booleanAttribute });
  isExternalSearch = input(false, { transform: booleanAttribute });
  emptyText = input('No options available');
  loadingText = input('Loading...');
  isClearable = input(true, { transform: booleanAttribute });
  hasArrow = input(true, { transform: booleanAttribute });
  compareBy = input<string>(null);

  panelClasses = computed(() => {
    const width = this.dropdownWidth();
    const size = this.dropdownSize() ?? this.size();

    return [
      'select__panel',
      `select__panel--d-width-${width}`,
      `select__panel--size-${size}`,
    ].join(' ');
  });

  private typeaheadBuffer = '';
  private typeaheadTimeout: any;

  private keyboard = _KEYBOARD();
  // escListener =   effect(() => {
  //   if (this.keyboard.hotkeyEvent() === 'CTRL_L') {
  //     this.toggleLanguage();
  //   }
  // });

  // Outputs
  valueChange = output<T | null>();
  openChange = output<boolean>();
  searchChange = output<string>();

  // Refs
  @ViewChild('triggerBtn', { static: true }) triggerBtn!: ElementRef<HTMLButtonElement>;
  @ViewChild('listbox') listboxRef?: ElementRef<HTMLUListElement>;
  @ViewChild('searchInput') searchInputRef?: ElementRef<HTMLInputElement>;

  // State
  isOpen = signal(false);
  highlightedIndex = signal<number>(-1);
  valueSig = signal<T | null>(null);
  isRequired = signal(false);
  searchText = signal('');
  cachedSelectedOption = signal<PSelect2Option<T> | null>(null);
  panelDirection = signal<'up' | 'down'>('down')

  // Computed
  selectedOption = computed(() => {
    const v = this.valueSig();
    const compareBy = this.compareBy();
    if (!v) return null;

    const found = compareBy
      ? this.options().find(o => o.value[compareBy] === v[compareBy])
      : this.options().find(o => o.value === v);
    if (found) return found;
    return this.cachedSelectedOption();
  });

  filteredOptions = computed(() => {
    if (this.isExternalSearch()) {
      return this.options();
    }

    const search = this.searchText().toLowerCase();
    const selectedValue = this.valueSig();

    const filtered = this.options().filter(o =>
      o.label.toLowerCase().includes(search)
    );

    return filtered;
  });

  classes = computed(() =>
    [
      'select__root',
      `select--width-${this.width()}`,
      this.disabled() ? 'disabled' : '',
      this.isOpen() ? 'select__root--expanded' : '',
      `select--size-${this.size()}`,
      this.myClass(),
    ].filter(Boolean).join(' ')
  );

  listboxId = computed(() => `${this.id}-listbox`);

  eff1 = effect(() => {
    const v = this.valueSig();
    if (this.formControl && this.formControl.value !== v) {
      this.formControl.setValue(v, { emitEvent: false });
    }
    this.valueChange.emit(v);
  });

  eff2 = effect(() => {
    const required = !!this.formControl?.hasValidator?.(Validators.required);
    this.isRequired.set(required);
  });

  // ControlValueAccessor
  override writeValue(v: T | null) {
    this.valueSig.set(v ?? null);
    if (v) {
      const found = this.options().find(o => o.value === v);
      if (found) {
        this.cachedSelectedOption.set(found);
      }
    }
  }

  override setDisabledState(isDisabled: boolean) {
    this.disabled.set(isDisabled);
  }

  // ---------- API ----------
  toggle(withoutText?: boolean) {
    if(withoutText && this.searchText()) return;
    if (this.disabled()) return;
    this.isOpen() ? this.close() : this.open();
  }

  open(): void {
    if (this.disabled() || this.isOpen()) return;
    if(isBrowser()) {
      const rect = this.triggerRect();
      const viewportHeight = window.innerHeight;
      const spaceBelow = viewportHeight - rect.bottom;
      const spaceAbove = rect.top;
      this.panelDirection.set(spaceBelow < 280 && spaceAbove > spaceBelow ? 'up' : 'down');
    }

    this.isOpen.set(true);
    this.openChange.emit(true);
    this.ensureHighlight();
    queueMicrotask(() => {
      if (this.searchable() && !this.isSearchDetached()) {
        this.searchInputRef?.nativeElement.focus();
      } else if (this.searchable() && this.isSearchDetached()) {
        this.searchInputRef?.nativeElement.focus();
      } else {
        this.listboxRef?.nativeElement.focus();
      }
    });
  }

  close() {
    if (!this.isOpen()) return;
    if (this.searchText()) {
      this.searchText.set('');
      this.searchChange.emit('');
    }

    this.isOpen.set(false);
    this.openChange.emit(false);
  }

  closeAndFocusTrigger() {
    this.close();
    queueMicrotask(() => this.triggerBtn?.nativeElement.focus());
  }

  ensureHighlight() {
    const filtered = this.filteredOptions();
    if (!filtered.length) {
      this.highlightedIndex.set(-1);
      return;
    }

    const selectedValue = this.valueSig();
    const idx = filtered.findIndex(o => o.value === selectedValue);

    this.highlightedIndex.set(idx >= 0 ? idx : 0);
  }

  onSearchInput(text: string) {
    this.searchText.set(text);
    this.searchChange.emit(text);
    this.ensureHighlight();
  }

  onSearchBlur() {
    if (!this.isOpen()) {
      // this.searchText.set('');
    }
  }

  onSearchFocus() {
    if (!this.isOpen() && this.searchable() && !this.isSearchDetached()) {
      // this.open();
    }
  }

  onTriggerSearchClick(e: Event) {
    e.stopPropagation();
    if (!this.isOpen()) {
      this.open();
    }
  }

  clear() {
    if (this.disabled()) return;
    this.valueSig.set(null);
    this.cachedSelectedOption.set(null);
    this.onChange(null);
    if (this.triggerBtn?.nativeElement) {
      return this.triggerBtn.nativeElement.focus();
    }
    if (this.searchInputRef?.nativeElement) {
      return this.searchInputRef.nativeElement.focus();
    }
  }

  selectIndex(i: number) {
    const filtered = this.filteredOptions();
    const o = filtered[i];
    if (!o || o.disabled) return;

    this.valueSig.set(o.value);
    this.cachedSelectedOption.set(o);
    this.onChange(o.value);
    this.searchText.set('');
    this.closeAndFocusTrigger();
  }

  onKey(e: KeyboardEvent) {
    const key = e.key;

    if (e.key.length === 1 && /^[\p{L}\p{N}]$/u.test(e.key) && !this.searchable()) {
      this.onTypeahead(e.key);
      return;
    }

    if (key === 'Escape') {
      e.preventDefault();
      this.closeAndFocusTrigger();
      return;
    }

    if (key === 'ArrowDown' || key === 'ArrowUp') {
      e.preventDefault();

      const delta = key === 'ArrowDown' ? +1 : -1;

      if (this.isOpen()) {
        this.moveHighlight(delta);
        queueMicrotask(() => {
          if (this.searchable() && document.activeElement === this.searchInputRef?.nativeElement) {
            this.listboxRef?.nativeElement.focus();
          }
        });
        return;
      }

      this.open();
      queueMicrotask(() => {
        if (this.searchable() && !this.isSearchDetached()) {
          this.listboxRef?.nativeElement.focus();
        } else if (!this.searchable()) {
          this.listboxRef?.nativeElement.focus();
        }
      });
      return;
    }

    if (key === 'PageDown' || key === 'PageUp') {
      e.preventDefault();
      const step = key === 'PageDown' ? +10 : -10;
      this.moveHighlight(step);
      return;
    }

    if (key === 'Enter' || key === ' ') {
      if (this.searchable() && document.activeElement === this.searchInputRef?.nativeElement) {
        e.preventDefault();
        this.listboxRef?.nativeElement.focus();
        return;
      }
      e.preventDefault();
      this.toggle();
      return;
    }

    if (key === 'Home') {
      e.preventDefault();
      this.highlightedIndex.set(0);
      return;
    }
    if (key === 'End') {
      e.preventDefault();
      this.highlightedIndex.set(this.filteredOptions().length - 1);
      return;
    }
  }


  private onTypeahead(char: string) {
    if (this.searchable()) return;

    clearTimeout(this.typeaheadTimeout);
    const c = char.toLowerCase();
    const filtered = this.filteredOptions();

    const start = this.highlightedIndex();
    let idx = filtered.findIndex((o, i) =>
      i > start && o.label.toLowerCase().startsWith(c)
    );
    if (idx === -1)
      idx = filtered.findIndex(o => o.label.toLowerCase().startsWith(c));

    if (idx >= 0) this.highlightedIndex.set(idx);

    this.typeaheadTimeout = setTimeout(() => this.typeaheadBuffer = '', 700);
  }


  private nextEnabledIndex(start: number, step: 1 | -1): number {
    const opts = this.options();
    const len = opts.length;

    for (let i = 0; i < len; i++) {
      const idx = (start + i * step + len) % len;
      if (!opts[idx]?.disabled) return idx;
    }
    return -1;
  }

  private moveHighlight(delta: number) {
    const filtered = this.filteredOptions();
    const len = filtered.length;
    if (!len || this.disabled()) return;

    let i = this.highlightedIndex();
    let attempts = 0;

    do {
      i = (i + delta + len) % len;
      attempts++;
      if (attempts > len) break;
    } while (filtered[i]?.disabled);

    this.highlightedIndex.set(i);
  }

  onMouseEnterOption(i: number) {
    const o = this.filteredOptions()[i];
    if (!o || o.disabled) return;
    this.highlightedIndex.set(i);
    queueMicrotask(() => {
      const el = this.listboxRef?.nativeElement.querySelector(`[data-index="${i}"]`);
      if (el) {
        el.scrollIntoView({
          block: 'nearest',
          behavior: 'smooth',
        });
      }
    });
  }

  private triggerRect(): DOMRect {
    if (this.triggerBtn?.nativeElement) {
      return this.triggerBtn.nativeElement.getBoundingClientRect();
    }
    if (this.searchInputRef?.nativeElement) {
      return this.searchInputRef.nativeElement.getBoundingClientRect();
    }
    const root = (this as any).elementRef?.nativeElement as HTMLElement;
    return root.getBoundingClientRect();
  }
}
