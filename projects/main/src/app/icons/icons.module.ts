
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
import { tasks } from './definitions/tasks';
import { transaction } from './definitions/transaction';
import { user } from './definitions/user';
import { heartBubble } from './definitions/heartBubble';
import { orangeCard } from './definitions/orangeCard';
import { orangeHeart } from './definitions/orangeHeart';
import { orangeShield } from './definitions/orangeShield';
import { orangeStars } from './definitions/orangeStars';
import { users } from './definitions/users';
import { orangeCheck } from './definitions/orangeCheck';
import { orangePhone } from './definitions/orangePhone';
import { orangeQuestion } from './definitions/orangeQuestion';
import { orangeReview } from './definitions/orangeReview';
import { clocks } from './definitions/clocks';
import { roadSign } from './definitions/roadSign';
import { tagBag } from './definitions/tagBag';
import { tagHeart } from './definitions/tagHeart';
import { tagSnow } from './definitions/tagSnow';
import { mainLogo } from './definitions/mainLogo';
import { max } from './definitions/max';
import { telegramm } from './definitions/telegramm';
import { tg } from './definitions/tg';
import { viber } from './definitions/viber';
import { whatsapp } from './definitions/whatsapp';
import { eth } from './definitions/eth';
import { phoneWhite } from './definitions/phoneWhite';
import { usdt } from './definitions/usdt';
import { wheel } from './definitions/wheel';

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
  tasks,
  transaction,
  user,
  heartBubble,
  orangeCard,
  orangeHeart,
  orangeShield,
  orangeStars,
  users,
  orangeCheck,
  orangePhone,
  orangeQuestion,
  orangeReview,
  clocks,
  roadSign,
  tagBag,
  tagHeart,
  tagSnow,
  mainLogo,
  max,
  telegramm,
  tg,
  viber,
  whatsapp,
  eth,
  phoneWhite,
  usdt,
  wheel
    ]}
  ]
})
export class IconsModule {}
  