export function getColumnNameFromTitle(title: string): string {
  return title.toLowerCase().split(' ').join('');
}
