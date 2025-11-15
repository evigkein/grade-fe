import {isBrowser} from './browser/is-browser.util';

export type TLS = 'lang' | 'auth_login'

export function getStorageItem<T = string>(key: TLS, doParse = false): T | null | undefined {
  if(!isBrowser() || !localStorage) return;
  const value = localStorage?.getItem(key);
  if (value) {
    try {
      if (value === '') return value as unknown as T;
      if (doParse) return JSON.parse(value) as T;
      return value as unknown as T;
    } catch (err) {
      // console.error(err);
    }
  }

  return undefined;
}

export function setStorageItem<T>(key: TLS, item: T) {
  if(!isBrowser()) return;

  try {
    const value = stringify(item);
    localStorage?.setItem(key, value);
  } catch (err) {
    // console.error(err);
  }
}

export function stringify(value: any): string {
  return typeof value === 'string' ? value : JSON.stringify(value)
}

export function parseJSON<T>(json: string) {
  return json != null ? (JSON.parse(json) as T) : undefined;
}
