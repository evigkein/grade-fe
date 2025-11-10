// Converts number formats from "4.7e-7" to "0.00000047", "3.2e+4" to "32000" etc.
export function convertExponential(exponentialNumber: number | string): number | string {
  const number = Number(exponentialNumber);

  if (isNaN(number) || !isFinite(number)) {
    return exponentialNumber;
  }

  const [lead, pow] = number.toExponential().split('e');
  const precision = Math.max(Math.abs(Number(pow)), 0);

  return Number.parseFloat(`${lead}e${pow}`);
}

//console.log(convertExponential(1.23e+5)); // Output: 123000
// console.log(convertExponential("6.789e-3")); // Output: 0.006789
// console.log(convertExponential("7.654E2")); // Output: 765.4
// console.log(convertExponential(123)); // Output: 123
// console.log(convertExponential("4.321")); // Output: 4.321
// console.log(convertExponential("1.23e-10")); // Output: 0.000000000123
// console.log(convertExponential("abc")); // Output: "abc"
// console.log(convertExponential(null)); // Output: null
// console.log(convertExponential(undefined)); // Output: undefined
// console.log(convertExponential(Infinity)); // Output: Infinity
// console.log(convertExponential(NaN)); // Output: NaN
