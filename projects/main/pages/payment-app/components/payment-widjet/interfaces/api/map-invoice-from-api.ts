import {Card, PaymentParams} from '../payment-params.interface';
import {ApiCardDetails, InvoiceDetailsApi} from './api-telegram-bot.interface';

export function mapToApiPaymentParamsRes(source: InvoiceDetailsApi): PaymentParams {
  const {item} = source;
  return {
    id: item.invoice_id,
    uuid: item.uuid,
    card_id: item.card.card_id,
    client_id: item.card.user_id,
    amount: item.amount,
    created_at: item.created_at,
    updated_at: item.created_at,
    card: mapToCard(item.card),
    client: item.card.card_owner,
    waitingForPayment: item.waiting_for_payment,
    isPaid: item.is_paid,
    fields: [],
    comment: ''
  };
}

function mapToCard(sourceCard: ApiCardDetails): Card {
  return {
    id: sourceCard.card_id,
    user_id: sourceCard.user_id,
    number: sourceCard.number,
    card_holder: sourceCard.card_owner,
    expiration_date: sourceCard.expiration_date,
    bank: sourceCard.bank,
    balance: sourceCard.balance,
    is_blocked: false,
    created_at: sourceCard.created_at,
    updated_at: sourceCard.created_at
  };
}
