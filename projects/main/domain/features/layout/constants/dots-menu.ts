import { IActionOption } from '@ui/components/features/actions-menu/interfaces';

export type THeaderAction = 'faq' | 'reviews';

export const headerActions: IActionOption<THeaderAction>[] = [
  { label: 'Поддержка', action: 'faq' },
  { label: 'Отзывы', action: 'reviews' },
];

export function getHeaderActions(): IActionOption<THeaderAction>[] {
  return [...headerActions];
}
