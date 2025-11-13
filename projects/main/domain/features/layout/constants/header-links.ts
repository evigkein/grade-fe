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
    title: 'header.link.services',
  },
  {
    url: [`/${ERoute.Main}`],
    title: 'header.link.work',
  },
  {
    url: [`/${ERoute.Main}`],
    title: 'header.link.values',
  },
  {
    url: [`/${ERoute.Main}`],
    title: 'header.link.about',
  },
  {
    url: [`/${ERoute.Main}`],
    title: 'header.link.contact',
  },
]
