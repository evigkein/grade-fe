export function mapDateToAgoText(date: Date): string  {
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.round(diffMs / 60000);
  const diffHrs = Math.round(diffMs / 3600000);
  const diffDays = Math.round(diffMs / 86400000);
  const diffWeeks = Math.round(diffMs / 604800000);
  const diffMonths = Math.round(diffMs / 2592000000);

  if (diffMins < 60) return `${diffMins} минут назад`;
  if (diffHrs < 24) return `${diffHrs} часов назад`;
  if (diffDays < 7) return `${diffDays} дней назад`;
  if (diffWeeks < 4) return `${diffWeeks} недель назад`;
  return `${diffMonths} месяцев назад`;
};
