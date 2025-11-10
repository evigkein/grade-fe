import { inject } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Observable} from 'rxjs';
import { map } from 'rxjs/operators';

export function getQueryParams$() {
  const route = inject(ActivatedRoute);
  return route.queryParamMap.pipe(
    map(params => {
      const queryParams: { [key: string]: string } = {};
      params.keys.forEach(key => {
        queryParams[key] = params.get(key) || '';
      });
      return queryParams;
    })
  );
}

export function getQueryParam$(param: string): Observable<string | null> {
  const route = inject(ActivatedRoute);
  return route.queryParamMap.pipe(
    map(params => params.get(param))
  );
}

export function getParam$(param: string): Observable<string | null> {
  const route = inject(ActivatedRoute);
  return route.paramMap.pipe(
    map(params => params.get(param))
  );
}


export function getQueryParamsSnapshot(): { [key: string]: string } {
  const route = inject(ActivatedRoute);
  const params = route.snapshot.queryParamMap;
  const queryParams: { [key: string]: string } = {};

  params.keys.forEach(key => {
    queryParams[key] = params.get(key) || '';
  });

  return queryParams;
}

export function getQueryParamSnapshot(param: string): string | null {
  const route = inject(ActivatedRoute);
  return route.snapshot.queryParamMap.get(param);
}



export function useParams(): { [key: string]: string } {
  const route = inject(ActivatedRoute);
  const params = route.snapshot.paramMap;
  const routeParams: { [key: string]: string } = {};

  params.keys.forEach(key => {
    routeParams[key] = params.get(key) || '';
  });

  return routeParams;
}

export function useRouteParam(param: string): string | null {
  const route = inject(ActivatedRoute);
  return route.snapshot.paramMap.get(param);
}

