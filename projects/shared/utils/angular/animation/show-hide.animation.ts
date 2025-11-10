import {
  animate,
  animateChild,
  AnimationTriggerMetadata,
  group,
  query,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';

export function parentNgIfOverlayAnimationTrigger(
  triggerName: string,
  animationTime: string | number = '0.2s',
): AnimationTriggerMetadata {
  return trigger(triggerName, [
    transition(':enter', [
      group([
        query('@*', [animateChild()], { optional: true }),
        style({ opacity: 0 }),
        animate(animationTime, style({ opacity: '*' })),
      ]),
    ]),

    transition(':leave', [
      group([
        query('@*', [animateChild()], { optional: true }),
        animate(animationTime, style({ opacity: 0 })),
      ]),
    ]),

    transition('false => true', [
      group([
        query('@*', [animateChild()], { optional: true }),
        style({ opacity: 0 }),
        animate(animationTime, style({ opacity: '*' })),
      ]),
    ]),

    transition('true => false', [
      group([
        query('@*', [animateChild()], { optional: true }),
        animate(animationTime, style({ opacity: 0 })),
      ]),
    ]),

    state('true', style({ opacity: '*' })),
    state('false', style({ opacity: 0 })),
  ]);
}

export function slideAnimationTrigger(
    triggerName: string,
    animationTime: string | number = '0.2s',
): AnimationTriggerMetadata {
  return trigger(triggerName, [
    transition(':enter', [
      style({ opacity: 0, transform: 'translate3d(0, 0, 0)' }),
      animate(animationTime, style({ transform: '*', opacity: '*' })),
    ]),
    // При отработке перехода ':leave' у дочерней (вложенной) анимации
    // не происходит анимация свойств по переходу в дефолтное состояние ("*"),
    // отрабатывает анимация только по переходу в конкретное состояние (0, либо другое валидное значение)
    transition(':leave', [
      animate(
          animationTime,
          style({ transform: 'translate3d(0, 0, 0)', opacity: 0 }),
      ),
    ]),

    transition('true <=> false', [animate(animationTime)]),
    state('true', style({ transform: '*', opacity: '*' })),
    state('false', style({ transform: 'translate3d(0, 0, 0)', opacity: 0 })),
  ]);
}
