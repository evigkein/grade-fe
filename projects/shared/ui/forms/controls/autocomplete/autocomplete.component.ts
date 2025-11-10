import { booleanAttribute, Component, EventEmitter, Input, OnInit, Output, signal, } from '@angular/core';
import { NzAutocompleteOptionComponent } from 'ng-zorro-antd/auto-complete';
import { deepClone } from '../../../../utils/helpers/objects';
import { destroy } from '../../../../utils/libs/rxjs';
import { debounceSafe$ } from '../../../../utils/libs/rxjs/debounce-safe';
import {CustomControlAccessor} from '../../custom-control-accessor';
import {ISelectOption} from '../select';
import { filterAutocompleteOptions } from './utils/auto-search.util';

@Component({
    selector: 'p-autocomplete',
    templateUrl: './autocomplete.component.html',
    styleUrls: ['./autocomplete.component.scss'],
    standalone: false
})
export class AutocompleteComponent extends CustomControlAccessor implements OnInit {
  @Input() options: ISelectOption[] = [];
  @Input() default!: string;
  @Input() placeholder: string = '';
  @Input() myClass!: string;
  @Input() label!: string
  @Input() tooltipText!: string
  @Input() customLabelField = null;
  @Input({transform: booleanAttribute}) isSync = false;
  @Input({transform: booleanAttribute}) hasPaddingBottom = false;
  @Output() valueSelected = new EventEmitter<any>();
  @Output() focusAction = new EventEmitter();
  @Output() blurAction = new EventEmitter();

  _options = signal<ISelectOption[]>([]);

  destroy$ = destroy();

  onSelect(e: NzAutocompleteOptionComponent): void {
    // if(this.customLabelField && typeof e.nzValue) {
    //   const res = e.nzValue?.[this.customLabelField]
    //   console.log(res);
    //   this.valueSelected.emit(res)
    //   return;
    // }
    const _e = typeof e.nzValue === 'string' ? e.nzValue : undefined;
    _e && this.valueSelected.emit(_e)
  }

  override ngOnInit() {
    super.ngOnInit();

    if (this.isSync) {
      this._options.set(deepClone(this.options));
      this.formControl.valueChanges
        .pipe(
          debounceSafe$(),
          this.destroy$<string>(),
        )
        .subscribe(value => {
          this._options.set(filterAutocompleteOptions(value, this.options));
        });
    } else {
      this._options.set(this.options)
    }
  }
}
