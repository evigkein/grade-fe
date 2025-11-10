export function safeNumber(value: unknown): number | undefined {
  const num = Number(value);
  return isNaN(num) ? undefined : num;
}
