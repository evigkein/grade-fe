import {animate, group, style, transition, trigger} from '@angular/animations';
import {fadeInOutTransition} from './default.animation';

export const fadeInOut = trigger('fadeInOut', [
  transition(':enter', [
    style({opacity: 0, display: 'none'}),
    group([
      style({display: 'block'}),
      animate(fadeInOutTransition, style({opacity: 1}))
    ])
  ]),
  transition(':leave', [
    group([
      animate(fadeInOutTransition, style({opacity: 0})),
      style({display: 'none'})
    ])
  ])
]);

export const slideFade = trigger('slideFade', [
  transition(':enter', [
    style({transform: 'translateX(100%)', opacity: 0}),
    animate('300ms ease-in', style({transform: 'translateX(0)', opacity: 1}))
  ]),
  transition(':leave', [
    animate('300ms ease-out', style({transform: 'translateX(-100%)', opacity: 0}))
  ])
]);
