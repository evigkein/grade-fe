import { Injectable } from '@angular/core';
import {BehaviorSubject, catchError, Observable, of, tap} from 'rxjs';
import {TelegramBotMessage} from '../interfaces/api/api-telegram-bot.interface';
import {ApiPaymentParamsRes} from '../interfaces/payment-api-params-responce.interface';
import {PaymentParams} from '../interfaces/payment-params.interface';
import {PaymentSendParams} from '../interfaces/payment-send-params.interface';
import {ApiPaymentService} from './api/api-payment.service';

@Injectable({providedIn: 'root'})
export class PaymentService {
  scene$ = new BehaviorSubject<'init' | 'loading' | 'success' | 'rejected'>('init');

  constructor(private api: ApiPaymentService) { }

  getInitialPaymentParams(uuid: string): Observable<PaymentParams> {
    return this.api.getParams(uuid)
  }

  submitPayment(id: string): Observable<boolean> {
    this.scene$.next('loading')
    return this.api.submit(id)
      .pipe(
        tap(isPaid =>
          this.scene$.next(isPaid ? 'success' : 'success'))
          // this.scene$.next(isPaid ? 'rejected' : 'rejected'))
      );
  }

  sendMessageToTelegram (message: string): Observable<TelegramBotMessage> {
    return this.api.sendMessageToTelegram(message)
  }
}
