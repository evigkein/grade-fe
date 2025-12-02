import localforage from 'localforage';
import { isBrowser } from './browser/is-browser.util';

const storage = isBrowser()
  ? localforage.createInstance({ name: 'formStorage' })
  : null;


export async function storageSetWithTTL(key: string, value: any, ttlMs?: number): Promise<void> {
  if (!isBrowser() || !storage) return;
  const expiresAt = ttlMs ? Date.now() + ttlMs : undefined;
  await storage.setItem(key, { value, expiresAt });
}

export async function storageGetWithTTL<T = any>(key: string): Promise<T | null> {
  if (!isBrowser() || !storage) return null;

  const item = await storage.getItem<{ value: T; expiresAt?: number }>(key);
  if (!item) return null;

  if (item.expiresAt && Date.now() > item.expiresAt) {
    await storage.removeItem(key);
    return null;
  }

  return item.value;
}

export async function storageRemove(key: string): Promise<void> {
  if (!isBrowser() || !storage) return;
  await storage.removeItem(key);
}
