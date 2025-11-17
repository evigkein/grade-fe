
import { NgModule } from '@angular/core';
import { NZ_ICONS, NzIconModule } from 'ng-zorro-antd/icon';
import { angleDown } from './definitions/angleDown';
import { angleLeft } from './definitions/angleLeft';
import { angleRight } from './definitions/angleRight';
import { bell } from './definitions/bell';
import { calendar } from './definitions/calendar';
import { close } from './definitions/close';
import { cross } from './definitions/cross';
import { dashboard } from './definitions/dashboard';
import { doubleArrows } from './definitions/doubleArrows';
import { eye } from './definitions/eye';
import { eyeCrossed } from './definitions/eyeCrossed';
import { invite } from './definitions/invite';
import { metrics } from './definitions/metrics';
import { premium } from './definitions/premium';
import { promo } from './definitions/promo';
import { referralPromo } from './definitions/referralPromo';
import { refund } from './definitions/refund';
import { search } from './definitions/search';
import { tasks } from './definitions/tasks';
import { transaction } from './definitions/transaction';
import { user } from './definitions/user';
import { bgNet } from './definitions/bgNet';
import { en } from './definitions/en';
import { es } from './definitions/es';
import { ru } from './definitions/ru';
import { briefcase } from './definitions/briefcase';
import { enterprise } from './definitions/enterprise';
import { layers } from './definitions/layers';
import { shield } from './definitions/shield';
import { target } from './definitions/target';
import { home } from './definitions/home';
import { clocks } from './definitions/clocks';
import { roadSign } from './definitions/roadSign';
import { tagBag } from './definitions/tagBag';
import { tagHeart } from './definitions/tagHeart';
import { tagSnow } from './definitions/tagSnow';
import { logo } from './definitions/logo';
import { mainLogo } from './definitions/mainLogo';
import { max } from './definitions/max';
import { telegramm } from './definitions/telegramm';
import { tg } from './definitions/tg';
import { viber } from './definitions/viber';
import { whatsapp } from './definitions/whatsapp';
import { eth } from './definitions/eth';
import { phoneWhite } from './definitions/phoneWhite';
import { usdt } from './definitions/usdt';

@NgModule({
  imports: [NzIconModule],
  providers: [
    { provide: NZ_ICONS, useValue: [
      angleDown,
  angleLeft,
  angleRight,
  bell,
  calendar,
  close,
  cross,
  dashboard,
  doubleArrows,
  eye,
  eyeCrossed,
  invite,
  metrics,
  premium,
  promo,
  referralPromo,
  refund,
  search,
  tasks,
  transaction,
  user,
  bgNet,
  en,
  es,
  ru,
  briefcase,
  enterprise,
  layers,
  shield,
  target,
  home,
  clocks,
  roadSign,
  tagBag,
  tagHeart,
  tagSnow,
  logo,
  mainLogo,
  max,
  telegramm,
  tg,
  viber,
  whatsapp,
  eth,
  phoneWhite,
  usdt
    ]}
  ]
})
export class IconsModule {}
  