
// Моковые данные для InvoiceDetails
import {InvoiceDetailsApi} from './api-telegram-bot.interface';

const mockInvoiceDetailsApi: InvoiceDetailsApi = {
  item: {
    invoice_id: 1,
    uuid: "a1b2c3d4e5f6",
    amount: 150.50,
    card: {
      card_id: 10,
      card_owner: "John Doe",
      user_id: 5,
      number: "1234 5678 9012 3456",
      bank: "ExampleBank",
      balance: 1000,
      created_at: "2023-01-01T12:00:00Z",
      expiration_date: "2025-01-01T12:00:00Z",
    },
    created_at: "2023-03-01T12:00:00Z",
    now: "2023-04-01T12:00:00Z",
    pay_till: 7,
    waiting_for_payment: '1h',
    is_paid: false,
    shop: {
      shop_id: 20,
      name: "MockShop",
      user_id: 6,
      created_at: "2023-01-01T12:00:00Z",
      updated_at: "2023-01-15T12:00:00Z"
    },
    state: "pending"
  }
};

export default mockInvoiceDetailsApi;
