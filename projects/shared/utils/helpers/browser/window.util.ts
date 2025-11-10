import { Router } from '@angular/router';
import {isBrowser} from './is-browser.util';

export function openExternalUrl(url: string, isNewPage = true): void {
  if (!isBrowser()) return;
  isNewPage ? window.open(url, '_blank') : (window.location.href = url);
}

export function getLocation(): Location {
  if(!isBrowser()) return;
  return location
}

export function getHistory(): History {
  if (!isBrowser()) return;
  return window.history;
}

export function getCurrentUrl(mode?: 'feat'): string {
  if(!isBrowser()) return;

  const href = location?.href?.split('/');
  if(!href) return '';

  let res = '';
  if(mode === 'feat') {
    const sliced = href.slice(3, -1);
    return sliced.join('')[0];
  }

  return location?.href
}

export function copyText(text: string): void {
  if(!isBrowser()) return;
  try {
    navigator!.clipboard.writeText(text);
  } catch {
    console.error('Copied Failed.');
  }
}

export function goBack(router: Router, fallbackUrl: string = '/'): void {
  if(!isBrowser()) return;

  const referrer = document.referrer;
  const hostname = window.location?.hostname;
  const historyLength = window.history?.length ?? 0;

  if (!referrer.includes(hostname) || !referrer) {
    window.location.href = fallbackUrl;
    return;
  }

  if (historyLength > 1) {
    window.history.back();
  } else {
    router.navigateByUrl(fallbackUrl);
  }
}
