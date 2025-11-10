import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input, numberAttribute, OnChanges,
  OnInit,
  Output,
  ViewEncapsulation
} from '@angular/core';
import { NzSelectModeType } from 'ng-zorro-antd/select';
import { filter, Subject, takeUntil } from 'rxjs';
import { debounceTime, map, tap } from 'rxjs/operators';
import { debounceSafe$ } from '@utils/libs/rxjs/debounce-safe';
import {CustomControlAccessor} from '../../custom-control-accessor';
import {ISelectOption} from '../select';

type TSelectSize = 's' | 'm' | 'l'

@Component({
  selector: 'p-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class SelectComponent extends CustomControlAccessor implements OnInit, OnChanges {
  @Input() options!: ISelectOption[];
  @Input() default!: string
  @Input() placeholder!: string
  @Input() tooltip!: string
  @Input() myClass!: string
  @Input() label!: string
  @Input() size: TSelectSize = 'l'
  @Input() tooltipText!: string
  @Input() notFoundText = 'no-content'
  // @Input() labelField: string = null!;
  @Input({ transform: booleanAttribute }) isDisabled = false;
  @Input({transform: booleanAttribute}) isTransparent = false
  @Input({transform: booleanAttribute}) isSearchable = false
  @Input({transform: booleanAttribute}) isAttachBackdrop = true;
  @Input({transform: booleanAttribute}) isClearable = false;
  @Input({transform: booleanAttribute}) isStrictValue = false;
  @Input({transform: booleanAttribute}) isMaxHeight = true;

  @Input({transform: numberAttribute}) maxItems = Infinity;
  @Input() mode: NzSelectModeType = 'default';
  @Output() focusAction = new EventEmitter()
  @Output() blurAction = new EventEmitter()
  @Output() maxLengthError = new EventEmitter<number>()
  @Output() valueChange = new EventEmitter<any>();

  @Input({transform: booleanAttribute}) isServerSearch = false;
  @Output() search = new EventEmitter<string>();
  @Output() openChange = new EventEmitter<boolean>();

  dropdownClasses: string[] = ['p-select__dropdown'];

  private search$ = new Subject<string>();

  override ngOnInit() {
    super.ngOnInit();
    // if (this.isTransparent) {
      this.dropdownClasses.push('p-select__dropdown--transparent');
    // }

    this.search$
      .pipe(
        map(q => q?.trim() ?? ''),
        debounceSafe$(),
        this.destroy$()
      )
      .subscribe(q => this.search.emit(q));

    if (this.isStrictValue) this.updateValueIfNotInOptions(this.formControl.value);
    if (this.maxItems) this.initMaxItemsCheck();
  }

  ngOnChanges() {
    if (this.isStrictValue) this.updateValueIfNotInOptions(this.formControl.value);
    if (this.maxItems) this.checkMaxLength(this.formControl.value);
  }

  handleSelectionChange(values: any[]): void {
    if (values.length > this.maxItems) {
      alert(`No more than ${this.maxItems} options are available for selection`);
      values.pop();
    }

    this.valueChange.emit(values);
    // this.formControl.setValue(values, { emitEvent: false });
  }

  private updateValueIfNotInOptions(value: any) {
    if (this.options.length && value?.length) {
      const selectedValues = Array.isArray(value) ? value : [value];
      const validValues = selectedValues.filter(val => this.options.some(option => option.value === val || option.label === val));
      if (validValues.length !== selectedValues.length) {
        this.formControl.setValue(validValues, { emitEvent: false });
      }
    }
  }

  initMaxItemsCheck(): void {
    this.formControl.valueChanges.pipe(tap(v => this.checkMaxLength(v)), this.destroy$()).subscribe()
  }

  onSearch(q: string) {
    if (!this.isServerSearch) return;
    this.search$.next(q);
  }

  onOpenChange(open: boolean) {
    this.openChange.emit(open);
  }

  private checkMaxLength(value: any) {
    if (Array.isArray(value) && value.length > this.maxItems) {
      this.maxLengthError.emit(this.maxItems)
      const validValues = value.slice(0, this.maxItems);
      this.formControl.setValue(validValues, { emitEvent: false });
    }
  }
}
