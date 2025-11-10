export function clearNumber(value: string | number): string {
  const v = typeof value === 'number' ? value.toString() : value.trim();
  return v.replace(/\D/g, '');
}
