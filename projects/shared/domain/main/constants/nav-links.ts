import { ERoute } from './route.enum';

export interface INavLink {
  label: string;
  url?: string[];
  action?: string;
  icon?: string;
  iconSize?: string;
}

export const navLinks: INavLink[] = [
  {
    url: [`/${ERoute.Main}`],
    label: 'header.link.home',
    icon: 'home',
    // iconSize: '32'
  },
  // {
  //   url: [`/${ERoute.Main}`],
  //   title: 'header.link.services',
  // },
  {
    url: [`/${ERoute.Portfolio}`],
    label: 'header.link.work',
    icon: 'briefcase',
    // iconSize: '32'
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
