import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, inject, OnInit, Output } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormBuilder, Validators } from '@angular/forms';
import { ButtonComponent } from '@ui/components/button/button.component';
import { InputModule } from '@ui/forms/controls/input/input.module';
import { PhoneMaskDirective } from '@ui/forms/directives/masks/phone-mask.directive';
import { isControlInvalid } from '@ui/forms/utils/is-control-valid';
import { destroy } from '@utils/libs/rxjs';
import { BehaviorSubject, tap } from 'rxjs';
import { ICreateCallbackFormReqDto } from '../../../domain/api/swagger/models/i-create-callback-form-req-dto';
import { ApiFormsCallbackService } from '../../../domain/api/swagger/services/api-forms-callback.service';
import { RussianNumberMaskDirective } from '../../different/rus-phone-mask';

export interface ICallbackForm {
  name: string;
  phone: string;
}

@Component({
  selector: 'p-callback-form',
  templateUrl: './callback-form.component.html',
  styleUrls: ['./callback-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule, InputModule, PhoneMaskDirective, RussianNumberMaskDirective, ButtonComponent]
})
export class CallbackFormComponent implements OnInit {
  @Output() submitted = new EventEmitter();

  private api = inject(ApiFormsCallbackService);
  private fb = inject(FormBuilder);
  isSubmitting$ = new BehaviorSubject<boolean>(false);
  destroy$ = destroy();

  form = this.fb.group({
    name: [''],
    phone: ['', [Validators.required]]
  });

  ngOnInit(): void {
    this.initFormWatcher();
  }

  private initFormWatcher(): void {
    // this.form.valueChanges.pipe(takeUntilDestroyed()).subscribe();
  }

  onSubmit(): void {
    if (isControlInvalid(this.form)) return;

    this.isSubmitting$.next(true);

    this.api.formsCallbackApiControllerCreate({body: {
      ...this.form.value,
        phone: '+7' + this.form.value.phone
      } as ICreateCallbackFormReqDto})
      .pipe(
        tap(() => {
          this.isSubmitting$.next(false);
          this.form.reset();
          this.submitted.emit();
        }), this.destroy$())
      .subscribe();
  }
}
