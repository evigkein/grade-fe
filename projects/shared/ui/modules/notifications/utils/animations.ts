import { animate, animateChild, query, style, transition } from '@angular/animations';

export const nestedTransition = transition('* => *', [
  query('@*', animateChild(), {optional: true}),
]);

export const shrinkInTransition = transition('void => *', [
  // tslint:disable-next-line:no-duplicate-string
  style({height: 0, opacity: 0, 'margin-bottom': 0}),
  animate(300, style({height: '*', opacity: 1, 'margin-bottom': '20px'})),
]);

export const shrinkOutTransition = transition('* => void', [
  style({height: '!', opacity: 1, 'margin-bottom': '20px'}),
  animate(250, style({height: 0, opacity: 0, 'margin-bottom': 0})),
]);
