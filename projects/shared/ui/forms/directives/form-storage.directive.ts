import {
  ChangeDetectorRef,
  Directive,
  HostListener,
  inject,
  Input,
  numberAttribute,
  OnInit,
  Self
} from '@angular/core';
import { ControlContainer } from '@angular/forms';
import { fromEvent, merge } from 'rxjs';
import { debounceTime, filter, take, takeUntil } from 'rxjs/operators';
import { destroy } from '@utils/libs/rxjs';
import { isBrowser } from '@utils/helpers/browser/is-browser.util';
import { storageSetWithTTL, storageGetWithTTL, storageRemove } from '@utils/helpers/local-forge';

export const enum FormStorageSaveStrategies {
  change = 'change',
  unload = 'unload',
}

@Directive({
  selector: '[formGroupStore]',
  standalone: true,
})
export class FormStorageDirective implements OnInit {
  @Input() formGroupStore!: string;
  @Input() saveStrategy = FormStorageSaveStrategies.change;
  @Input({ transform: numberAttribute }) ttlMins?: number; // ⏳ TTL в минутах (опционально)

  private destroy$ = destroy();

  constructor(@Self() private container: ControlContainer) {}

  private get key(): string {
    return `${this.formGroupStore}-form`;
  }

  private get group() {
    return this.container.control;
  }

  @HostListener('submit')
  async onSubmit() {
    await storageRemove(this.key);
  }

  async ngOnInit(): Promise<void> {
    if (!isBrowser()) return;

    const savedValue = await storageGetWithTTL(this.key);
    if (savedValue) {
      console.log(savedValue);
      // будет работать и с false, но не на дейтпикере
      this.group?.patchValue(savedValue, { emitEvent: true });
    }

    this.saveStrategy === FormStorageSaveStrategies.unload
      ? this.setupUnloadStrategy()
      : this.setupChangeStrategy();
  }

  private setupChangeStrategy(): void {
    this.group?.valueChanges
      .pipe(debounceTime(400), this.destroy$())
      .subscribe(value => this.saveValue(value));
  }

  private setupUnloadStrategy(): void {
    if (!isBrowser()) return;

    merge(fromEvent(window, 'beforeunload'))
      .pipe(this.destroy$(), filter(() => !!this.group?.dirty), take(1))
      .subscribe(() => this.saveValue(this.group!.value));
  }

  private async saveValue(value: any): Promise<void> {
    const ttlMs = this.ttlMins ? this.ttlMins * 60_000 : undefined;
    await storageSetWithTTL(this.key, value, ttlMs);
  }
}
