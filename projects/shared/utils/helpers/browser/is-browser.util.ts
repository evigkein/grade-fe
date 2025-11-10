export function isBrowser(): boolean {
  return typeof window !== 'undefined' && typeof document !== 'undefined';
}

export function isSSR(): boolean {
  return typeof window === 'undefined' || typeof document === 'undefined';
}

