import { INetworkData } from './network-selector.component';

export const paymentsDataMOCK: INetworkData[] = [
  {
    name: 'TRC20',
    label: 'USDT (TRC-20)',
    min: '5 USDT',
    icon: 'usdt',
    description:
      'Приём платежей по всему миру без ограничений. USDT TRC-20 — это цифровой аналог доллара США. Позволяет переводить любые суммы денег из любой точки мира за считанные минуты и с минимальной комиссией.',
  },
  {
    name: 'ERC20',
    label: 'USDT (ERC-20)',
    min: '5 USDT',
    icon: 'eth',
    description:
      'Приём платежей по всему миру без ограничений. USDT ERC-20 — это цифровой аналог доллара США. Позволяет переводить любые суммы денег из любой точки мира за считанные минуты и с минимальной комиссией.',
  },
];
