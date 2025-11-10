export const walletTrc20RegExpPattern: RegExp = /^T[1-9A-HJ-NP-Za-km-z]{33}$/;
export const phoneValidatorPattern = /^\+?[0-9][0-9\s]{6,14}[0-9]$/;
export const nameRegexp: RegExp = /^[a-z]+[a-z\s]*$/i;
export const fullNameRegexp: RegExp = /^[a-zA-Z]+\s+[a-zA-Z]+(?:\s+[a-zA-Z]+)*$/;
export const numberRegexp: RegExp = /^\d+$/;
export const numberAndSpacesRegexp: RegExp = /^[0-9\s]+$/;
export const expirationDateRegexp: RegExp = /^(0[1-9]|1[0-2])\/(\d{2})$/;
export const passwordRegexp: RegExp = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;


export const onlyDigitsRegExp = new RegExp(/\D/g);
export const onlyDigitsDecimalRexExp = new RegExp(/\D./g);

export function getOnlyNumbersString(string: string, hasDecimal = false): string {
    const replacePattern = hasDecimal ? onlyDigitsRegExp : onlyDigitsDecimalRexExp;
    return string.replace(replacePattern, '');
}

