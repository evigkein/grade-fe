import { ISelectOption } from '@shared/ui/forms/controls/select';
import { ModalService } from '@shared/ui/modules/modals/modals/modal.service';
import { ITable, ITableAction } from '@shared/ui/modules/table-builder/interfaces';
import { fadeInOut } from '@utils/angular/animation/fade-in-out';
import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { map, Observable, startWith, tap } from 'rxjs';
import { TransactionStatus } from '../../constants/transaction-status.enum';
import { mapTransactionsTable } from '../../helpers/transactions.mapper';
import { TransactionsStateService } from '../../services/transactions.state';

@Component({
    selector: 'p-account-transactions',
    templateUrl: './transactions.component.html',
    styleUrls: ['./transactions.component.scss', '../../../account.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    animations: [fadeInOut],
    standalone: false
})
export class AccountTransactionsComponent implements OnInit {
  private state = inject(TransactionsStateService);
  private modalService = inject(ModalService);

  tableData$: Observable<ITable> = this.state.get$('items').pipe(
    tap(v => {
      // console.log(v, '11');
    }),
    map(i => mapTransactionsTable(i)),
    tap(v => {
      // console.log(v, '2');
    }),
  );
  isLoading$ = this.state.get$('isLoading');
  isLoaded$ = this.state.get$('isLoaded');

  filterForm = new FormGroup({
    period: new FormControl(),
    currency: new FormControl(),
    status: new FormControl(),
    amountFrom: new FormControl(),
    amountTo: new FormControl()
  });

  // Filter Options
  currencyOptions: ISelectOption[] = [
    { label: 'BTC', value: 'BTC' },
    { label: 'ETH', value: 'ETH' },
  ];

  statusOptions: ISelectOption[] = Object.values(TransactionStatus).map(status => ({
    label: status,
    value: status,
  }));

  constructor() {
    // Here you would connect filter changes to the state service
    // For this mock-based example, we don't need to implement the filtering logic
    // in the state, but in a real scenario, it would look like this:
    /*
    combineLatest([
        this.periodControl.valueChanges.pipe(startWith(null)),
        this.currencyControl.valueChanges.pipe(startWith(null)),
        // ... other controls
    ]).pipe(
        debounceTime(300),
        tap(([period, currency]) => this.state.patchFilters({ period, currency }))
    ).subscribe();
    */
  }

  ngOnInit() {
  }

  handleTableAction(event: ITableAction): void {
    // const transaction = event.item as Transaction;
    // console.log('Action:', event.action, 'Item ID:', transaction.id);
    //
    // if (event.action === 'details') {
    //   this.modalService.alert(`Детали по транзакции: ${transaction.id}`);
    // } else if (event.action === 'refund') {
    //   this.modalService.alert(`Возврат по транзакции: ${transaction.id}`);
    // }
  }
}
