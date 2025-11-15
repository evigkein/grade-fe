import { isBrowser, isSSR } from './browser/is-browser.util';

interface ScrollOptions {
  element: HTMLElement;
  container?: HTMLElement;
  duration?: number;
  offset?: number;
}

export function scrollTo(options: ScrollOptions): void {
  const {element, container, duration = 500, offset = 200} = options;

  if (!element) {
    console.warn('Element not found.');
    return;
  }

  const scrollElement = container || window;
  const containerScrollTop = scrollElement instanceof Window ? window.pageYOffset : (scrollElement as HTMLElement).scrollTop;
  const targetPosition = element.getBoundingClientRect().top + containerScrollTop - offset;

  const startPosition = containerScrollTop;
  const distance = targetPosition - startPosition;
  const startTime = performance.now();

  function animateScroll(currentTime: number) {
    const timeElapsed = currentTime - startTime;
    const progress = Math.min(timeElapsed / duration, 1);
    const easing = easeInOutCubic(progress);

    if (scrollElement instanceof Window) {
      window.scrollTo(0, startPosition + distance * easing);
    } else {
      (scrollElement as HTMLElement).scrollTop = startPosition + distance * easing;
    }

    if (timeElapsed < duration) {
      requestAnimationFrame(animateScroll);
    }
  }

  requestAnimationFrame(animateScroll);
}

export function scrollToTop(duration = 500, container?: HTMLElement): void {
  if (!isBrowser()) return;

  animateWindowScrollTo(0, duration);
  // window.scrollTo(0, 0)
  // scrollTo({
  //   element: document.body,
  //   container: container,
  //   duration: duration,
  //   offset: 0,
  // });
}

export function scrollToTitle(selector?: string, container?: HTMLElement): void {
  if (isSSR()) return;

  if (!selector) {
    scrollToTop(undefined, container);
    return;
  }

  const currentCategoryTitle = document.querySelector<HTMLElement>(`.${selector}`);
  if (!currentCategoryTitle) {
    scrollToTop(undefined, container);
    return;
  }

  scrollTo({
    element: currentCategoryTitle,
    container: container,
  });
}

function easeInOutCubic(t: number): number {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

function animateWindowScrollTo(target: number, duration: number) {
  const start = window.scrollY || document.documentElement.scrollTop;
  const distance = target - start;
  const startTime = performance.now();

  function animation(currentTime: number) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const easing = easeInOutCubic(progress);

    window.scrollTo(0, start + distance * easing);

    if (elapsed < duration) {
      requestAnimationFrame(animation);
    }
  }

  requestAnimationFrame(animation);
}
