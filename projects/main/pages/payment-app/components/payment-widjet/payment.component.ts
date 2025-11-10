import { CommonModule } from '@angular/common';
import {Component, DestroyRef, inject, OnInit} from '@angular/core';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {FormControl, Validators} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import { SelectTextDirective } from '@shared/directives/ui/select-text.directive';
import { TimerComponent } from '@shared/ui/components/+features/timer/timer.component';
import { LoaderComponent } from '@shared/ui/components/loader/spinner/loader.component';
import { SvgIconComponent } from '@shared/ui/modules/svg-icon/svg-icon.component';
import { destroy } from '@shared/utils/libs/rxjs';
import {map, Observable, shareReplay, tap} from 'rxjs';
import { AlertComponent } from './components/alert/alert.component';
import {ApiPaymentParamsRes} from './interfaces/payment-api-params-responce.interface';
import {OtpService} from './services/otp.service';
import {PaymentService} from './services/payment.service';
import { PaymentParams } from './interfaces/payment-params.interface';

@Component({
  selector: 's-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss'],
  standalone: true,
  imports: [CommonModule, SelectTextDirective, LoaderComponent, AlertComponent, TimerComponent, SvgIconComponent],
})
export class PaymentComponent implements OnInit {
  private destroyRef = inject(DestroyRef);
  private uuid!: string;

  destroy$ = destroy();

  scene$ = this.paymentService.scene$.asObservable().pipe(shareReplay(1));
  isResultScene$ = this.scene$.pipe(map(v => v === 'success' || v === 'rejected'));

  paymentParams$ = this.paymentService.getInitialPaymentParams(this.uuid)
    .pipe(
      this.destroy$(),
      tap(paymentParams => {
        console.log(paymentParams, '???');
        this.initInfo(paymentParams)
      })
    )

  waitingTime$ = this.paymentParams$
    .pipe(map(paymentParams => paymentParams.waitingForPayment))

  paymentId!: number;
  amount!: number;
  cardNumber!: string;
  currency!: string;

  constructor(
    private route: ActivatedRoute,
    private paymentService: PaymentService,
  ) {
  }

  ngOnInit() {
    const {amount, currency, email, id} = this.route.snapshot.queryParams;
    this.amount = +amount;
    this.currency = currency;
    this.uuid = id;
  }

  submit(): void {
    this.paymentService.submitPayment(this.uuid)
      .pipe(this.destroy$())
      .subscribe();
  }

  initInfo(paymentParams: ApiPaymentParamsRes): void {
    this.paymentId = paymentParams.id;
    // this.cardNumber = paymentParams.card.number;
    this.cardNumber = '0x3a4afb8518979c602a1f19b431ae3882d6fe2a91';
    this.amount = +paymentParams.amount;
    this.uuid = paymentParams.uuid;
  }

  openChatHelp(): void {
    const token = '';
    this.paymentService.sendMessageToTelegram('11')
      .subscribe(res => {
        console.log(res);
        window.open(`https://api.telegram.org/bot${token}/sendMessage?chat_id=@${res.result.chat.id}&text=${res.result.text}.`, '_blank');
      })
  }
}
