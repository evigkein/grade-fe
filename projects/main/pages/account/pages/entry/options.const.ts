import { IMenuOption } from '@shared/ui/components/+features/menu/menu.component';
import { deepClone } from '@shared/utils/helpers/objects';

export type TSettingsMenuOptions = ''

const settingsMenu: IMenuOption[] = [
  {
    title: 'Analytics',
    icon: '',
    // url: ``,
    // action: 'e-profile',
    isOpen: true,
    subMenu: [
      {
        url: '/account/transactions',
        title: 'Transactions',
        // icon: 'dashboard',
        // iconSize: '30',
      },
    ]
  },
  // {
  //   title: 'logout',
  //   icon: 'logout',
  //   action: UserProfileOptionAction.Logout
  // }
];

export function getSettingsMenu(has = false): IMenuOption[] {
  const menu = deepClone(settingsMenu);
  if(!has) menu.splice(0, 1);
  return menu;
}
