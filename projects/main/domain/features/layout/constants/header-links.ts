import { ERoute } from '@shared/domain/main/constants/route.enum';

export interface INavLink {
  title: string;
  url?: string[];
  action?: string;
  icon?: string;
  iconSize?: string;
}

export const headerLinks: INavLink[] = [
  {
    url: [`/${ERoute.Main}`],
    title: 'header.link.home',
    icon: 'home',
    iconSize: '32'
  },
  // {
  //   url: [`/${ERoute.Main}`],
  //   title: 'header.link.services',
  // },
  {
    url: [`/${ERoute.Portfolio}`],
    title: 'header.link.work',
    icon: 'briefcase',
    iconSize: '32'
  },
  // {
  //   url: [`/${ERoute.Main}`],
  //   title: 'header.link.values',
  // },
  // {
  //   url: [`/${ERoute.About}`],
  //   title: 'header.link.about',
  // },
  // {
  //   url: [`/${ERoute.Main}`],
  //   title: 'header.link.contact',
  // },
];
