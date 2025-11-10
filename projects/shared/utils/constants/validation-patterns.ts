
export const onlyDigitsRegExp = new RegExp(/\D/g);
export const onlyDigitsDecimalRexExp = new RegExp(/\D./g);

export function getOnlyNumbersString(string: string, hasDecimal = false): string {
    const replacePattern = hasDecimal ? onlyDigitsRegExp : onlyDigitsDecimalRexExp;
    return string.replace(replacePattern, '');
}

