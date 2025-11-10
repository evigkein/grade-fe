export function maskYear(value: string): string {
  let numericValue = value.replace(/[^0-9]/g, '').slice(0, 4);

  if (numericValue[0] && numericValue[0] > '2') {
    numericValue = '2' + numericValue.slice(1);
  }

  if (numericValue[0] === '2' && numericValue[1] && numericValue[1] > '2') {
    numericValue = numericValue[0] + '2' + numericValue.slice(2);
  }

  if (numericValue[0] === '0') {
    numericValue = '1' + numericValue.slice(1);
  }

  const currentYear = new Date().getFullYear();
  const currentYearString = currentYear.toString();
  const minYear = 1920;

  if (numericValue.length >= 3) {
    if (numericValue[0] === '2' && numericValue[1] === '2' && numericValue[2] > currentYearString[2]) {
      numericValue = numericValue.slice(0, 2) + currentYearString[2] + numericValue.slice(3);
    }
  }

  if (numericValue.length === 4) {
    const year = parseInt(numericValue, 10);
    if (year < minYear) {
      numericValue = minYear.toString();
    } else if (year > currentYear) {
      numericValue = currentYear.toString();
    }
  }

  return numericValue;
}
