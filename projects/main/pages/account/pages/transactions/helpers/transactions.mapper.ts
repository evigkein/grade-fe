import { buildTableCell } from '@shared/ui/modules/table-builder/helpers/build-table-cell';
import { ITable, ITableCellStatus, ITableRow } from '@shared/ui/modules/table-builder/interfaces';
import { IMenuActions } from '@shared/ui/modules/table-builder/interfaces/cells/menu-actions.interface';
import { getTableEmptyState } from '@shared/ui/modules/table-builder/utils/get-table-empty-state.util';
import { formatDate } from '@shared/utils/helpers/date-time';
import { TransactionsTableConfig } from '../constants/transactions.table';
import { Transaction } from '../interfaces/transaction.interface';
import { TransactionStatus } from '../constants/transaction-status.enum';

export function mapTransactionsTable(items: Transaction[]): ITable {
  const cols = TransactionsTableConfig;
  if (!items?.length) {
    return getTableEmptyState(cols);
  }

  const rows: ITableRow[] = items.map(item => buildRow(item));

  return { cols, rows };
}

function buildRow(item: Transaction): ITableRow {
  return {
    id: buildTableCell(['id', ''], item.id), // 'id' не отображается, но нужен для ITableRow
    createdAt: buildTableCell(['createdAt', 'Дата / время'], formatDate(item.createdAt), { type: 'date' }),
    status: buildTableCell(['status', 'Статус'], item.status, { status: getItemStatus(item) }),
    amount: buildTableCell(['amount', 'Сумма'], `${item.amountCrypto} / ${item.amountUsd}$`, { hasMultipleLines: true }),
    currency: buildTableCell(['currency', 'Валюта'], item.currency),
    conversionRate: buildTableCell(['conversionRate', 'Курс конверсии'], item.conversionRate.toString()),
    paymentType: buildTableCell(['paymentType', 'Тип оплаты'], item.paymentType),
    clientId: buildTableCell(['clientId', 'Клиентский ID'], item.clientId ?? '—'),
    menu: buildTableCell(['menu', ''], '', { menuActions: getTableActions(item) })
  };
}

function getItemStatus({ status }: Transaction): ITableCellStatus {
  switch (status) {
    case TransactionStatus.Success:
      return 'success';
    case TransactionStatus.Processing:
      return 'warning';
    case TransactionStatus.Error:
      return 'danger';
    default:
      return 'default';
  }
}

function getTableActions(item: Transaction): IMenuActions[] {
  return [
    {
      action: 'details',
      title: 'Details',
      item
    },
    {
      action: 'refund',
      title: 'Refund',
      item
    },
  ];
}
