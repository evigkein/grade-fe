import { isBrowser } from './is-browser.util';

export interface ICookieOptions {
  expires: Date;
  path?: string;
  domain?: string;
  secure?: boolean;
  sameSite?: 'lax' | 'none' | 'strict';
}

export function getAllCookies(): Record<string, string> {
  if (!isBrowser()) return {};
  return document.cookie
    .split('; ')
    .reduce((cookies, cookieStr) => {
      const [key, value] = cookieStr.split('=');
      cookies[key] = decodeURIComponent(value || '');
      return cookies;
    }, {} as Record<string, string>);
}

export function getCookie(key: string): string | null {
  if (!isBrowser()) return null;
  const cookies = getAllCookies();
  return cookies[key] || null;
}

export function setCookie(
  key: string,
  data: string,
  options: Partial<ICookieOptions> = {path: '/'},
  stringify = false
): void {
  if (!isBrowser()) return;
  let cookieStr = `${key}=${stringify ? encodeURIComponent(JSON.stringify(data)) : encodeURIComponent(data)}`;

  if (options.expires) {
    cookieStr += `; expires=${options.expires.toUTCString()}`;
  }

  if (options.path) {
    cookieStr += `; path=${options.path}`;
  }

  if (options.domain) {
    cookieStr += `; domain=${options.domain}`;
  }

  if (options.secure) {
    cookieStr += `; secure`;
  }

  if (options.sameSite) {
    cookieStr += `; samesite=${options.sameSite}`;
  }

  document.cookie = cookieStr;
}

export function removeCookie(key: string, path: string = '/'): void {
  if (!isBrowser()) return;
  setCookie(key, '', {path, expires: new Date(0)});
}

export function clearCookies(): void {
  if (!isBrowser()) return;
  const cookies = getAllCookies();
  for (const key in cookies) {
    removeCookie(key);
  }
}

export function getCookieKey(index: number): string | null | undefined {
  if (!isBrowser()) return;
  const keys = Object.keys(getAllCookies());
  return index >= 0 && index < keys.length ? keys[index] : null;
}

export function getCookieCount(): number {
  if (!isBrowser()) return null!;
  return Object.keys(getAllCookies()).length;
}
