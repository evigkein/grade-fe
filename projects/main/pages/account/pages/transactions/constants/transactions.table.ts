import { buildTableColumns } from '@shared/ui/modules/table-builder/helpers/build-table-column';
import { ITableColumn } from '@shared/ui/modules/table-builder/interfaces';

const colNames: [string, string][] = [
  ['createdAt', 'Дата / время'],
  ['status', 'Статус'],
  ['amount', 'Сумма'],
  ['currency', 'Валюта'],
  ['conversionRate', 'Курс конверсии'],
  ['paymentType', 'Тип оплаты'],
  ['clientId', 'Клиентский ID'],
  ['menu', '']
];

const widthMap = new Map<string, string>()
  .set('createdAt', '140px')
  .set('status', '120px')
  .set('amount', '150px')
  .set('currency', '80px')
  .set('conversionRate', '140px')
  .set('paymentType', '130px')
  .set('clientId', '120px')
  .set('menu', '50px');

export const TransactionsTableConfig: ITableColumn[] = buildTableColumns(
  colNames,
  { isShortPadding: true },
  { widthMap }
);
