import { ERoute } from '@shared/domain/main/constants/route.enum';

export interface IHeaderLink {
  title: string;
  url?: string[]
  action?: string;
  icon?: string;
}

export const headerLinks: IHeaderLink[] = [
  {
    url: [`/${ERoute.Main}`],
    title: 'header.link.home',
  },
  // {
  //   url: [`/${ERoute.Main}`],
  //   title: 'header.link.services',
  // },
  {
    url: [`/${ERoute.Portfolio}`],
    title: 'header.link.work',
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
]
