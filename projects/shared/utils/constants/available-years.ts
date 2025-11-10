export const defaultAvailableYears = getAvailableYears();

function getAvailableYears(): number[] {
  const minimalYear = 1950;
  const availableYears: number[] = [];
  const currentYear: number = new Date().getFullYear();

  for (let i = minimalYear; i <= currentYear; i++) {
    availableYears.push(i);
  }

  return availableYears;
}
