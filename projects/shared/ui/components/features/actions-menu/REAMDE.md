Example:

```$xslt
export enum ContractsTableActions {
  view = 'view',
  edit = 'edit',
  copy = 'copy',
  delete = 'delete',
}

export const messageActionLabels: { [key: string]: string } = {
  [ContractsTableActions.view]: 'View',
  [ContractsTableActions.edit]: 'Edit',
  [ContractsTableActions.copy]: 'Copy',
  [ContractsTableActions.delete]: 'Delete',
};

// for simple and constant cases
export const contractActions = Object.keys(contractActionLabels).map(key => ({label: contractActionLabels[key], value: key}));

// for not-constant cases (when we need change our actions based on smth
export function getContractsActionOptions(): IDotMenuOptions {
  return Object.keys(contractActionLabels).map(key => ({label: contractActionLabels[key], value: key}));
}

<p-actions-menu
  [actions]="accountHelpers.getMessageActionsOptions(account)"
(doAction)="accountHelpers.doAction($event, account.number)"
  ></p-actions-menu>

<ims-actions-menu
  [actions]="accountHelpers.getMessageActionsOptions(account)"
(doAction)="accountHelpers.doAction($event, account.number)"
  ></ims-actions-menu>

(doAction)="doAction($event, data)"




doAction(action: CounterpartyActions, data: Counterparty) {
  switch (action) {
    case CounterpartyActions.Edit:
      this.showUpdateCounterpartyForm(data);
      break;
     case ContractsTableActionsEnum.view:
        this.router.navigate([`/contracts/view/${contract.id}`]);
        break;
    case CounterpartyActions.Copy:
      this.copyToClipboard(data.requisite);
      break;
    case CounterpartyActions.Delete:
      this.deleteCounterparty(data.id);
      break;
  }
}

```
