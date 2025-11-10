export function calculateTimeDifference(date: Date): { amount: number, unit: string } {
  const now = new Date();
  const diff = now.getTime() - date.getTime();

  const minutes = Math.floor(diff / 1000 / 60);
  if (minutes < 60) {
    return { amount: minutes, unit: minutes === 1 ? 'min' : 'mins' };
  }

  const hours = Math.floor(minutes / 60);
  if (hours < 24) {
    return { amount: hours, unit: hours === 1 ? 'hour' : 'hours' };
  }

  const days = Math.floor(hours / 24);
  if (days < 7) {
    return { amount: days, unit: days === 1 ? 'day' : 'days' };
  }

  const weeks = Math.floor(days / 7);
  if (weeks < 4) {
    return { amount: weeks, unit: weeks === 1 ? 'week' : 'weeks' };
  }

  const months = Math.floor(days / 30);
  if (months < 12) {
    return { amount: months, unit: months === 1 ? 'month' : 'months' };
  }

  const years = Math.floor(days / 365);
  return { amount: years, unit: years === 1 ? 'year' : 'years' };
}
