import { OperatorFunction, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { convertTimezone, getUserTimezoneOffset } from '../../helpers/timezone.util';

export function mapTimezones$<T>(keys: Array<string> | undefined, timezone: string = getUserTimezoneOffset()): OperatorFunction<T, T> {
  return (source: Observable<T>) => source.pipe(
    map(obj => mapTimezones(obj, keys, timezone))
  );
}

export function mapTimezones<T>(obj: T, keys: Array<string> | undefined, timezone: string = getUserTimezoneOffset()): T {
  if (!keys || keys.length === 0) {
    return obj;
  }

  let modifiedCount = 0;
  const result = { ...obj };

  keys.forEach(key => {
    const keysArray = key.split('.');
    modifyNestedKeyInPlace(result, keysArray, timezone, () => modifiedCount++);
  });

  console.log(`Modified ${modifiedCount} keys.`);

  return result;
}

function modifyNestedKeyInPlace(obj: any, keys: string[], timezone: string, incrementCount: () => void): void {
  if (!obj || keys.length === 0) {
    return;
  }

  const key = keys.shift();

  if (!key || !(key in obj)) {
    return;
  }

  if (Array.isArray(obj[key])) {
    obj[key] = obj[key].map((item: any) => {
      if (keys.length === 0) {
        incrementCount();
        return convertTimezone(item, 'UTC', timezone);
      }
      modifyNestedKeyInPlace(item, [...keys], timezone, incrementCount);
      return item;
    });
    return;
  }

  if (keys.length === 0) {
    if (typeof obj[key] === 'string' && Date.parse(obj[key])) {
      obj[key] = convertTimezone(obj[key], 'UTC', timezone);
      incrementCount();
    }
  } else {
    modifyNestedKeyInPlace(obj[key], keys, timezone, incrementCount);
  }
}

// EXAMPLE:
// const data$ = of({
//   createdAt: '2024-08-23T12:00:00Z',
//   nested: {
//     updatedAt: '2024-08-23T13:00:00Z'
//   }
// });
//
// data$.pipe(
//   mapTimezones$( ['createdAt', 'nested.updatedAt'] )
// ).subscribe(result => {
//   console.log(result);
// });
