import {inject, Injectable} from '@angular/core';
import { Router, ActivatedRoute, QueryParamsHandling, Params, NavigationEnd } from '@angular/router';
import { Observable, startWith } from 'rxjs';
import { filter, map, share, shareReplay, tap } from 'rxjs/operators';
import { ERoute } from '../domain/main/constants/route.enum';

export function _ROUTE(): ActivatedRoute {
  return inject(ActivatedRoute)
}

export function _RS(): RouterService {
  return inject(RouterService)
}

export function _ROUTER(): Router {
  return inject(Router)
}


@Injectable({providedIn: 'root'})
export class RouterService {
  router = inject(Router);
  route = inject(ActivatedRoute);

  url$ = this.router.events.pipe(
    filter(event => event instanceof NavigationEnd),
    shareReplay(),
  );

  currentPageUrl$: Observable<ERoute> = this.router.events.pipe(
    filter((event): event is NavigationEnd => event instanceof NavigationEnd),
    map((event: NavigationEnd) => {
      const url = event.urlAfterRedirects;
      return url.split('/')[1] as ERoute;
    }),
    startWith(this.router.routerState.snapshot.url.split('/')[1] as ERoute),
    shareReplay(1),
  );

  setQueryParams(queryParams: Params, queryParamsHandling: QueryParamsHandling = 'merge', replaceUrl = true): void {
      this.router.navigate([], {
        relativeTo: this.route,
        queryParams,
        queryParamsHandling,
        replaceUrl,
      });
    }

  updatePathParams(param: string): void {
    const baseSegment = this.router.url.split('/')[1] || '';
    const newUrl = `/${baseSegment}/${param}`;
    this.router.navigateByUrl(newUrl, { replaceUrl: true });
  }
}
