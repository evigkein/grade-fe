import {
  AfterViewInit,
  booleanAttribute,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component, computed,
  ElementRef,
  EventEmitter,
  HostListener,
  inject,
  Input,
  numberAttribute,
  OnChanges,
  OnInit,
  Output,
  signal,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { ValidationErrors } from '@angular/forms';
import { NzAutocompleteComponent } from 'ng-zorro-antd/auto-complete';
import { combineLatest, map, Observable } from 'rxjs';
import { ISimpleChanges } from '@utils/types';
import { CustomControlAccessor } from '../../custom-control-accessor';

export type TInput = 'password' | 'text' | 'number' | 'tel' | 'email' | 'color' | 'date' | 'datetime';
export type TInputSize = 's' | 'm' | 'l'
export type TInputBorder = 'm' | 'l' | 'none'
export type TInputBg = 'light'
export type TInputMode = '' | 'noOutline'
export type TLabelFontSile = 'l' | ''

@Component({
  selector: 'p-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
  // imports: [
  //   LettersOnlyDirective,
  //   DigitOnlyDirective,
  //   InputInvalidFocusDirective,
  //   ReactiveFormsModule,
  //   CommonModule,
  // ],
})
export class InputComponent extends CustomControlAccessor implements OnInit, AfterViewInit, OnChanges {
  @Input() maxLength: string = '10000';
  @Input() type: TInput = 'text';
  @Input() placeholder = '';
  @Input() mode: TInputMode = 'noOutline';
  @Input() autocomplete = 'off';
  @Input() border: TInputBorder = 'm';
  @Input() myClass: string = '';
  @Input() size: TInputSize = 'm';
  @Input() sizeArea: TInputSize = 's';
  @Input() nzAutocomplete: NzAutocompleteComponent = null!;
  @Input() bg!: TInputBg;
  @Input() mask: any = '';
  @Input() label: string = '';
  @Input() labelType: 'bold' | '' = '';
  @Input() labelSize: 'l' | '' = '';
  @Input() alignLabel: 'center' | '' = '';
  @Input() tooltipText: string | TemplateRef<void> = '';
  @Input() align: 'center' | '' = '';
  @Input() font: TLabelFontSile = '';
  @Input() cursor: 'pointer' | 'text' = 'text';
  @Input({transform: booleanAttribute}) noSymbols = false;
  @Input({transform: booleanAttribute}) isTextArea = false;
  @Input({transform: booleanAttribute}) isDigitsOnly = false;
  @Input({transform: booleanAttribute}) hasDecimal = false;
  @Input({transform: booleanAttribute}) isLettersOnly = false;
  @Input({transform: booleanAttribute}) isWaitBlur = true;
  @Input({transform: booleanAttribute}) hasPaddingBottom = false;
  @Input({transform: booleanAttribute}) readonly = false;
  @Input({transform: booleanAttribute}) hasAutoFocus = false;
  @Input({transform: booleanAttribute}) hasAreaScale = false;
  @Input({transform: booleanAttribute}) isNotResizable = false;
  @Input({transform: numberAttribute}) rows = 1;
  @Input({transform: numberAttribute}) autoResizeHeight = 200;
  @Input({transform: numberAttribute}) areaMinHeight!: number;
  @Input({transform: numberAttribute}) areaMaxHeight = 150;
  @Input({transform: numberAttribute}) prefixExtraWidth = 0;
  @Input({transform: numberAttribute}) suffixExtraWidth = 0;
  @Input() suffixText = '';
  @Input() suffixIcon = '';
  @Input() suffixIconSize = '18';
  @Input() prefixIcon = '';
  @Input() prefixText = '';
  @Input() suffixButton = '';
  @Input() requiredError = 'forms.required';
  @Input() errorMsg = '';
  @Output() focusEvent = new EventEmitter();
  @Output() blur = new EventEmitter();
  @Output() action = new EventEmitter<string>();
  @Output() enter = new EventEmitter<void>();
  @Output() cancel = new EventEmitter<void>();

  @ViewChild('input') input!: ElementRef<HTMLElement>;
  @ViewChild('inputPrefix', {static: false}) inputPrefix!: ElementRef;
  @ViewChild('inputAppend') inputAppend!: ElementRef<HTMLElement>;

  inputPrefixWidth = signal(0);
  inputAppendWidth = signal(0);

  isFocused = signal(false);
  inputMask = signal<any>(null);

  private cdr = inject(ChangeDetectorRef);

  @HostListener('keydown', ['$event'])
  handleKeyDown(event: KeyboardEvent): void {
    if ((event.metaKey || event.ctrlKey) && event.key === 'Enter') return this.enter.emit();
    if (event.key === 'Escape' || event.key === 'Esc') return this.cancel.emit();
  }

  // ngOnChanges(changes: ISimpleChanges<InputComponent>) {
  //
  // }

  ngOnChanges(changes: ISimpleChanges<InputComponent>) {
    // const mask = changes?.mask?.currentValue;
    // if (mask) {
    //   if (typeof mask === 'string') {
    //     // const maskOptions = { mask };
    //     // const maskInstance = IMask(this.input.nativeElement, maskOptions);
    //     //
    //     // maskInstance.value = this.formControl.value;
    //     //
    //     // this.inputMask.set(maskInstance);
    //   }
    // }
  }

  ngAfterViewInit() {
    this.inputPrefixWidth.set(this.inputPrefix?.nativeElement?.clientWidth || 8);
    this.inputAppendWidth.set(this.inputAppend?.nativeElement?.clientWidth || 8);
  }

  onInputChange(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    const value = inputElement.value;

    if (this.type === 'number') {
      const numericValue = value ? parseFloat(value) : null;

      if (this.formControl.value !== numericValue) {
        this.formControl.setValue(numericValue, { emitEvent: false });
      }
    }
    // else if(this.type === 'text') {
    //   const textValue = value ? value.toString() : null;
    //
    //   if (this.formControl.value !== textValue) {
    //     this.formControl.setValue(textValue, { emitEvent: false });
    //   }
    // }
  }

  errors(): ValidationErrors {
    return this.formControl?.errors!;
  }

  touched(): boolean {
    return !!this.formControl?.touched;
  }

  valid(): boolean {
    return !!this.formControl?.valid;
  }

  errorRequired(): boolean {
    return this.formControl?.errors?.['required'];
  }

  customError(): string {
    return this.formControl?.errors?.['customError'];
  }

  isBlurHappened$: Observable<boolean> = combineLatest([this.blur])
    .pipe(
      map(v => true),
    );

  onBlur(): void {
    !this.formControl.value && this.hasAreaScale && this.isFocused.set(false);
    this.blur.emit();
    // this.formControl.markAsTouched();
    // this.formControl.markAsDirty();
    // this.blurEvent.emit();
  }

  onFocus(): void {
    this.focusEvent.emit();
    this.isTextArea && this.hasAreaScale && this.isFocused.set(true);
  }
}
