import {Pipe, PipeTransform} from '@angular/core';
import {Observable} from 'rxjs';
import {TranslateFacade} from './services';

@Pipe({name: 't', standalone: true})
export class TranslatePipe implements PipeTransform {
  constructor(private t: TranslateFacade) {}

  transform(key: string, interpolateParams?: Object): Observable<string> {
    return this.t.translate$(key);
  }
}

