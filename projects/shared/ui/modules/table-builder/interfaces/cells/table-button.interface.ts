import { TButton, TButtonAlign, TButtonColor, TButtonSize } from '../../../../components/button/button.component';

export interface ITableButton {
  actionName: string;
  size?: TButtonSize;
  color?: TButtonColor;
  align?: TButtonAlign;
  icon?: string;
  iconPrefix?: string;
  iconPostFix?: string;
  item?: any;
}
