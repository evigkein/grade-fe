import { HttpClient, HttpHeaders } from '@angular/common/http';
import {TranslateLoader} from '@ngx-translate/core';
import {catchError, forkJoin, map, Observable, of} from 'rxjs';

import {TRANSLATE_RESOURCES} from '../constants/translate-resources.constant';
import {ITranslateResource} from '../interfaces/translate-resource.interface';
import { IPlainObject } from '../../../../utils/types/object';

export function HttpMultiLoaderFactory(httpClient: HttpClient) {
  return new MultiTranslateHttpLoader(httpClient, TRANSLATE_RESOURCES);
}

export class MultiTranslateHttpLoader implements TranslateLoader {

  constructor(private httpClient: HttpClient, private resourcesPrefix: ITranslateResource[]) {
  }

  public getTranslation(lang: string): Observable<IPlainObject> {
    const requests: Observable<IPlainObject>[] = this.resourcesPrefix.map(resource => {
      const path = resource.prefix
        ? `${resource.prefix}${lang}${resource.suffix || '.json'}`
        : `${resource}${lang}.json`;

      const headers = new HttpHeaders().set('no-intercept', 'true');
      return this.httpClient.get(path, {headers}).pipe(catchError(res => this.catchError(resource, path, res)));
    });

    return forkJoin(requests).pipe(
      map(langLists => langLists.reduce((acc, langList) => ({...acc, ...langList}), {})),
    );
  }

  private catchError(resource: ITranslateResource, path: string, res: Object): Observable<Object> {
    if (!resource.optional) {
      console.error(resource, path, 'Error while loading chosen language');
    }

    return of({});
  }
}
