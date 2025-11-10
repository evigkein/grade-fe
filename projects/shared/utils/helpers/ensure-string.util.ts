export function ensureString(value: any): string {
  return value === 'string' ? value : JSON.parse(value);
}
