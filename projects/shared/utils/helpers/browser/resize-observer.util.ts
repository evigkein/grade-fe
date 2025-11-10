export function resizeObserver(
  element: HTMLElement,
  callback: () => void,
): ResizeObserver | null {
  if (typeof window === 'undefined' || typeof (globalThis as any).ResizeObserver === 'undefined') {
    return null; // SSR или нет API
  }

  const RO = (globalThis as any).ResizeObserver as typeof ResizeObserver;
  const observer = new RO(() => callback());
  observer.observe(element);
  return observer;
}
