import { isBrowser } from './browser/is-browser.util';

export function isLocal(): boolean {
  if(!isBrowser()) return;
  return window.location.href.includes('localhost');
}
