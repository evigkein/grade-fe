import {HttpClient, HttpParams} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {catchError, delay, map, Observable, of, take} from 'rxjs';
import mockInvoiceDetailsApi from '../../interfaces/api/api-invoice-create-mock';
import {InvoiceDetailsApi, TelegramBotMessage} from '../../interfaces/api/api-telegram-bot.interface';
import {mapToApiPaymentParamsRes} from '../../interfaces/api/map-invoice-from-api';
import {PaymentParams} from '../../interfaces/payment-params.interface';
import {OtpService} from '../otp.service';

// http://p2p.5713.ru/swagger/client/v1 swagger url;

@Injectable({providedIn: 'root'})
export class ApiPaymentService {
  url = 'http://p2p.5713.ru/api/backend/v1/shop/invoice';
  telegramToken = '6632532204:AAF2ZZGiVvLs0niLAXKb7IwJEXE3EO7Qjec';
  telegramChannelId = '';

  constructor(private http: HttpClient, private otp: OtpService) {
  }

  getParams(uuid: string): Observable<PaymentParams> {
    return of(mockInvoiceDetailsApi).pipe(
      map(data => mapToApiPaymentParamsRes(data)),
    );
    const params: HttpParams = new HttpParams({
      fromObject: {
        'OTP': this.otp.generateOtp(),
      }
    });


    return this.http.post<InvoiceDetailsApi>(this.url, {uuid}, {params}).pipe(
      take(1),
      map(data => mapToApiPaymentParamsRes(data)),
      catchError(e => {
        alert('Возникла ошибка. Повторите проверку позднее');
        return [];
      })
    );
  }

  submit(id: string): Observable<boolean> {
    return of(false).pipe(delay(3000))
    const params: HttpParams = new HttpParams({
      fromObject: {
        'OTP': this.otp.generateOtp(),
      }
    });

    return this.http.post<InvoiceDetailsApi>(this.url + '/check', {uuid: id}, {params})
      .pipe(
        take(1),
        map(data => mapToApiPaymentParamsRes(data)),
        map(data => data.isPaid),
        catchError(e => {
          alert('Возникла ошибка. Повторите проверку позднее');
          return [];
        })
      );
  }

  /** https://gist.github.com/vertigra/0f9c37b6fe0bb187a478c47e46b388c9 */
  sendMessageToTelegram (message: string): Observable<TelegramBotMessage> {
    return this.http.get<TelegramBotMessage>(`https://api.telegram.org/bot${this.telegramToken}/sendMessage?chat_id=${this.telegramChannelId}&text=${message}`)
      .pipe(
        catchError(e => {
          console.log(e);
          return []
        })
      )
  }
}

