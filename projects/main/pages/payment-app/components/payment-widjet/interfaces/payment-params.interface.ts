import {fieldType} from './field-type.type';

export interface PaymentParams {
  id: number;
  uuid: string;
  card_id: number;
  client_id: number;
  amount: number;
  created_at: string;
  updated_at: string;
  card: Card;
  client: string;
  waitingForPayment: string;
  isPaid: boolean;
  fields: Field[];
  comment: string;
}

export interface Field {
  name: fieldType;
  required: true;
  comment: string;
}

export interface Card {
  id: number;
  user_id: number;
  number: string;
  card_holder: string;
  expiration_date: string;
  bank: string;
  balance: number;
  is_blocked: boolean;
  created_at: string;
  updated_at: string;
}
