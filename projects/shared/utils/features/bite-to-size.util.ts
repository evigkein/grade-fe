type SizeUnit = 'B' | 'KB' | 'MB' | 'GB' | 'TB' | 'PB' | 'EB';
type AllowedSizeUnit = SizeUnit | Lowercase<SizeUnit>;

export function bytesToSize(bytes: number): string {
  if (bytes < 0) {
    throw new Error('Bytes cannot be negative');
  }
  const sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB'];
  if (bytes === 0) return '0 B';
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  const size = i < 3 ? Math.floor(bytes / Math.pow(1024, i)) : (bytes / Math.pow(1024, i)).toFixed(2);
  return `${size} ${sizes[i]}`;
}

export function sizeToBytes(size: string | null): number;
export function sizeToBytes(value: number, unit: AllowedSizeUnit): number;
export function sizeToBytes(valueOrSize: number | string | null, unit?: AllowedSizeUnit): number {
  const sizeUnits: SizeUnit[] = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB'];
  if (typeof valueOrSize === 'number') {
    if (valueOrSize < 0) throw new Error('Size value cannot be negative');
    if (!unit) throw new Error('Unit must be specified');
    const upperUnit = unit.toUpperCase() as SizeUnit;
    const index = sizeUnits.indexOf(upperUnit);
    if (index === -1) throw new Error(`Invalid size unit: ${unit}`);
    return valueOrSize * Math.pow(1024, index);
  }
  if (typeof valueOrSize === 'string') {
    const trimmed = valueOrSize.trim();
    const regex = /^(\d+(?:\.\d+)?)\s*([a-zA-Z]+)$/;
    const match = trimmed.match(regex);
    if (!match) throw new Error(`Invalid size format: ${valueOrSize}`);
    const value = parseFloat(match[1]);
    if (value < 0) throw new Error('Size value cannot be negative');
    const upperUnit = match[2].toUpperCase() as SizeUnit;
    const index = sizeUnits.indexOf(upperUnit);
    if (index === -1) throw new Error(`Invalid size unit: ${match[2]}`);
    return value * Math.pow(1024, index);
  }
  throw new Error('Size must be specified');
}
