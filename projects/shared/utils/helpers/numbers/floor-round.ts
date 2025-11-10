import { convertExponential } from './convers-exponential';

/** Better than .toFixed */
export function floorRound(value: number | string, precisionParameter = 8): number {
  const precision = isNaN(precisionParameter) || precisionParameter === null ? 8 : Number(precisionParameter);

  if (isNaN(Number(value)) || value === null || value === undefined) return 0;

  const convertedValue = convertExponential(value);
  const [integer, fractional] = `${convertedValue}`.split('.');

  let truncatedValue = integer;
  if (fractional) truncatedValue += `.${fractional.slice(0, precision)}`;

  return parseFloat(truncatedValue);
}

// Точность округления: Функция floorRound позволяет указать точность округления в виде параметра. В случае с toFixed, вы указываете количество знаков после запятой, но округление всегда будет производиться в большую сторону (как Math.ceil).
//
// Обработка строк: floorRound также работает с числами, представленными в виде строк, и выполняет необходимые преобразования перед округлением.
//
// Обработка экспоненциальной нотации: В функции floorRound есть вызов convertExponential, который, предположительно, обрабатывает числа в экспоненциальной нотации и преобразует их в обычную строку.
//
// Поведение с неправильными значениями: floorRound возвращает 0, если передано значение, которое не может быть преобразовано в число. Это может быть полезно для обработки некорректных входных данных.
