import { isBrowser } from './browser/is-browser.util';

export type TLS = 'lang' | 'auth_login';

export function getStorageItem<T = string>(key: TLS, doParse = true): T | null | undefined {
  if (!isBrowser() || !localStorage) return;

  const raw = localStorage.getItem(key);
  if (raw == null) return undefined;

  if (!doParse) return raw as unknown as T;

  const parsed = safeParse<T>(raw);

  return parsed as T;
}

export function setStorageItem<T>(key: TLS, item: T) {
  if (!isBrowser()) return;
  try {
    const value = stringify(item);
    localStorage.setItem(key, value);
  } catch {}
}

export function stringify(value: any): string {
  return typeof value === 'string' ? value : JSON.stringify(value);
}

export function parseJSON<T>(json: string): T | string | undefined {
  if (!json) return undefined;
  return safeParse<T>(json);
}

function looksLikeJson(str: string): boolean {
  if (!str) return false;
  const first = str.trim()[0];
  return first === '{' || first === '[' || first === '"' || first === 't' || first === 'f' || first === 'n' || /^[0-9-]/.test(first);
}

function safeParse<T>(value: string): T | string {
  if (!looksLikeJson(value)) return value;
  try {
    return JSON.parse(value) as T;
  } catch {
    return value;
  }
}
