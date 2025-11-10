import {fieldType} from './field-type.type';
import {Card} from './payment-params.interface';

export interface ApiPaymentParamsRes {
  id: number;
  uuid: string;
  card_id: number;
  client_id: number;
  amount: number;
  created_at: string;
  updated_at: string;
  card: Card;
  client: string;
  fields: Field[],
  comment: string;
}

export interface Field {
  name: fieldType, required: true, comment: string,
}
