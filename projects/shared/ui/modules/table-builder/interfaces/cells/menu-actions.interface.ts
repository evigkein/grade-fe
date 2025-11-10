import { ITableAction } from '../table-action';
import { ITableButton } from './table-button.interface';

export interface IMenuActions extends ITableAction{
    button?: ITableButton;
}
