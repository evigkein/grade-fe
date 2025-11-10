export interface TelegramBotMessage {
  ok: boolean;
  result: {
    message_id: number;
    from: {
      id: number;
      first_name: string;
      username: string;
    };
    chat: {
      id: number;
      title: string;
      type: string;
    };
    date: number;
    text: string;
  };
}


export interface InvoiceDetailsApi {
  item: InvoiceItem;
}

interface InvoiceItem {
  invoice_id: number;
  uuid: string;
  amount: number;
  card: ApiCardDetails;
  created_at: string;
  now: string;
  pay_till: number;
  waiting_for_payment: string;
  is_paid: boolean;
  shop: ShopDetails;
  state: string;
}

export interface ApiCardDetails {
  card_id: number;
  card_owner: string;
  user_id: number;
  number: string;
  bank: string;
  balance: number;
  created_at: string;
  expiration_date: string;
}

interface ShopDetails {
  shop_id: number;
  name: string;
  user_id: number;
  created_at: string;
  updated_at: string;
}

