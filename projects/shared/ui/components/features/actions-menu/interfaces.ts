export interface IActionOption<T = any> {
  action: T;
  label: string
  iconPrefix?: string
  iconPostfix?: string
}
