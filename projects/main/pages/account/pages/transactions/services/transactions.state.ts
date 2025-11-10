import { Injectable } from '@angular/core';
import { StateManager } from '@shared/services/base-state-manager';
import { BehaviorSubject, combineLatest, delay, map, Observable, of } from 'rxjs';
import { Transaction } from '../interfaces/transaction.interface';
import { TransactionStatus, TransactionType } from '../constants/transaction-status.enum';

const MOCK_TRANSACTIONS: Transaction[] = [
  {
    id: 'txn_1',
    createdAt: new Date().toISOString(),
    status: TransactionStatus.Success,
    amountCrypto: 0.05,
    amountUsd: 2500,
    currency: 'BTC',
    conversionRate: 50000,
    paymentType: TransactionType.OneTime,
    clientId: 'client-abc-123',
  },
  {
    id: 'txn_2',
    createdAt: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
    status: TransactionStatus.Error,
    amountCrypto: 1.2,
    amountUsd: 3000,
    currency: 'ETH',
    conversionRate: 2500,
    paymentType: TransactionType.Subscription,
  }
];

export interface ITransactionsState {
  items: Transaction[];
  totalItems: number;
  isLoading: boolean;
  isLoaded: boolean;
}

export interface ITransactionsSettings {
  filter: {
    period?: { from: Date, to: Date };
    currency?: string;
    status?: TransactionStatus;
    amountFrom?: number;
    amountTo?: number;
  };
  // В будущем можно добавить
  // pagination: { page: number, pageSize: number };
  // sort: { field: string, direction: 'asc' | 'desc' };
}

// 2. Задаем начальные значения

const defaultState: ITransactionsState = {
  items: [],
  totalItems: 0,
  isLoading: false,
  isLoaded: false,
};

const defaultSettings: ITransactionsSettings = {
  filter: {
    period: undefined,
    currency: undefined,
    status: undefined,
    amountFrom: undefined,
    amountTo: undefined,
  }
};


@Injectable({ providedIn: 'root' })
export class TransactionsStateService extends StateManager<ITransactionsState, ITransactionsSettings> {

  // 3. Реализуем абстрактные методы StateManager

  protected defaultState(): ITransactionsState {
    return defaultState;
  }

  protected defaultSettings(): ITransactionsSettings {
    return defaultSettings;
  }

  protected loadData(settings: ITransactionsSettings): Observable<Partial<ITransactionsState>> {
    this.patchState('isLoading', true);

    return of(MOCK_TRANSACTIONS).pipe(
      delay(300), // Симулируем задержку сети
      map(transactions => {
        return {
          items: transactions,
          totalItems: transactions.length,
          isLoading: false,
          isLoaded: true,
        };
      })
    );
  }

  protected handleData(data: Partial<ITransactionsState>): void {
    this.patchStates(data);
  }
}
