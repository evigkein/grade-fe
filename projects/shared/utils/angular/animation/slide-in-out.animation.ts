import {animate, state, style, transition, trigger} from '@angular/animations';
import {defaultTransition} from './default.animation';


export const OpenCloseAnimation = trigger('openClose', [
  transition(':enter', [
    style({opacity: 0, height: 0, marginTop: 0, marginBottom: 0, paddingTop: 0, paddingBottom: 0}), // display: 'flex'
    animate(defaultTransition, style({opacity: 1, height: '*', marginTop: '*', marginBottom: '*', paddingTop: '*', paddingBottom: '*'}))
  ]),
  transition(':leave', [
    animate(defaultTransition, style({opacity: 0, height: 0, marginTop: 0, marginBottom: 0, paddingTop: 0, paddingBottom: 0})),
    // style({display: 'none'})
  ])
]);

export const slideInOutTopMenuAnimation = trigger('openClose', [
  state('closed', style({height: '0px', overflow: 'hidden', opacity: 0, marginTop: 0, marginBottom: 0, paddingTop: 0, paddingBottom: 0, display: 'none'})),
  state('open', style({height: '*', overflow: 'hidden', opacity: 1, marginTop: '*', marginBottom: '*', paddingTop: '*', paddingBottom: '*', display: 'block'})),
  transition('closed <=> open', [
    animate('300ms ease-in-out')
  ]),
  transition(':enter', [
    style({opacity: 0, height: 0, marginTop: 0, marginBottom: 0, paddingTop: 0, paddingBottom: 0, display: 'block'}),
    animate('300ms ease-in-out', style({opacity: 1, height: '*', marginTop: '*', marginBottom: '*', paddingTop: '*', paddingBottom: '*'}))
  ]),
  transition(':leave', [
    animate('300ms ease-in-out', style({opacity: 0, height: 0, marginTop: 0, marginBottom: 0, paddingTop: 0, paddingBottom: 0})),
    style({display: 'none'})
  ])
]);

export const slideInOutTopAnimationForHidden = trigger('openCloseHidden', [
  state(
    'open',
    style({
      opacity: 1,
      height: '*',
      display: 'block',
    })
  ),
  state(
    'closed',
    style({
      opacity: 0,
      height: 0,
      display: 'none',
    })
  ),
  transition('open => closed', [animate('200ms ease-out', style({opacity: 0, height: 0}))]),
  transition('closed => open', [
    style({display: 'block'}),
    animate('200ms ease-in', style({opacity: 1, height: '*'})),
  ]),
]);

export const shrinkOutAnimation = trigger('shrinkOut', [
  transition(':leave', [
    style({ transform: 'scale(1)', width: '*', opacity: 1, transformOrigin: 'top left' }),
    animate('0.27s ease-out', style({ transform: 'scale(0)', width: '0px', opacity: 0 })),
  ]),
]);
// shrinkOut

export const shrinkOutSlideInAnimation = trigger('shrinkOutSlideIn', [
  transition(':enter', [
    style({ opacity: 0, height: 0, marginTop: 0, marginBottom: 0, paddingTop: 0, paddingBottom: 0, display: 'block' }),
    animate('0.3s ease-out', style({ opacity: 1, height: '*', marginTop: '*', marginBottom: '*', paddingTop: '*', paddingBottom: '*' }))
  ]),
  transition(':leave', [
    style({ transform: 'scale(1)', width: '*', opacity: 1, transformOrigin: 'top left' }),
    animate('0.27s ease-out', style({ transform: 'scale(0)', width: '0px', opacity: 0 })),
    style({ display: 'none' }) // Убедитесь, что элемент скрыт после завершения анимации
  ]),
]);
