import { AsyncPipe, NgForOf, NgIf } from '@angular/common';
import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  inject,
  OnInit,
  signal,
  TemplateRef,
  ViewChild
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { CustomImageDirective } from '@shared/directives/ui/img/priority.directive';
import { ButtonComponent } from '@shared/ui/components/button/button.component';
import { InputModule } from '@shared/ui/forms/controls/input/input.module';
import { ISelectOption, SelectModule } from '@shared/ui/forms/controls/select';
import { _MODAL } from '@shared/ui/modules/modals/modals/modal.service';
import { ModalsModule } from '@shared/ui/modules/modals/modals/modal/modals.module';
import { SvgIconComponent } from '@shared/ui/modules/svg-icon/svg-icon.component';
import { Observable, startWith, map, of, tap, delay } from 'rxjs';
import { IconsModule } from '../../../../src/app/icons/icons.module';
import { PaymentComponent } from '../payment-widjet/payment.component';
import { paymentsDataMOCK } from './mocks';

export interface INetworkData {
  name: string;
  label: string;
  description: string;
  min: string;
  icon: string;
}

@Component({
  selector: 's-network-selector',
  templateUrl: './network-selector.component.html',
  styleUrls: ['./network-selector.component.scss'],
  standalone: true,
  imports: [SelectModule, AsyncPipe, CustomImageDirective, CustomImageDirective, NgForOf, NgIf, SvgIconComponent, IconsModule, InputModule, ButtonComponent, PaymentComponent, ModalsModule]
})
export class NetworkSelectorComponent implements OnInit {
  networkControl = new FormControl<INetworkData | null>(null);
  private cdr = inject(ChangeDetectorRef)

  options$: Observable<ISelectOption<INetworkData>[]> = of(mapToSelectOptions(paymentsDataMOCK))
    .pipe(
      delay(1000),
      tap(v => {
        this.networkControl.patchValue(v[0].value);
        this.cdr.detectChanges()
      })
    )

  modal = _MODAL();
  @ViewChild('paymentModal') public paymentModalRef!: TemplateRef<ElementRef>;
  paymentModalId = signal<string | null>(null);

  selectedNetwork$!: Observable<INetworkData | null>;

  amountControl = new FormControl();
  address$: Observable<string | null> = of('0x3a4afb8518979c602a1f19b431ae3882d6fe2a91');

  ngOnInit(): void {
    this.selectedNetwork$ = this.networkControl.valueChanges.pipe(
      startWith(this.networkControl.value),
      map((value) => value ?? null)
    );
  }

  pay(): void {
    this.openPaymentModal();
  }

  openPaymentModal(): void {
    if (this.paymentModalId()) {
      this.modal.closeModal(this.paymentModalId());
      this.paymentModalId.set(null);
    }
    const id = this.modal.openModal({ templateRef: this.paymentModalRef })!;
    this.paymentModalId.set(id);
  }

  onPaymentSubmit(): void {
    // TODO: логика оплаты
    this.modal.closeModal(this.paymentModalId());
    this.paymentModalId.set(null);
  }

  onPaymentCancel(): void {
    this.modal.closeModal(this.paymentModalId());
    this.paymentModalId.set(null);
  }

}

function mapToSelectOptions(data: INetworkData[]): ISelectOption<INetworkData>[] {
  return data.map((item) => ({
    label: item.name,
    value: item,
  }));
}
