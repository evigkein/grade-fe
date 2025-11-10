import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'func', standalone: true })
export class FuncPipe implements PipeTransform {
  transform<T, K>(value: T, func: (v: T, ...args: any[]) => K, ...args: any[]): K {
    return func(value, ...args);
  }
}

/** Use this pipe if you are going to use functions in a template
 It allows to use function in template without change detection violence
 */
