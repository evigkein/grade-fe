import { TransactionStatus, TransactionType } from '../constants/transaction-status.enum';

export interface Transaction {
  id: string;
  createdAt: string;
  status: TransactionStatus;
  amountCrypto: number;
  amountUsd: number;
  currency: string;
  conversionRate: number;
  paymentType: TransactionType;
  clientId?: string;
}
