import {DOCUMENT, isPlatformBrowser} from '@angular/common';
import { inject, Inject, Injectable, PLATFORM_ID, signal } from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';
import {ActivatedRoute, Params, Router, UrlSerializer} from '@angular/router';
import { average } from '../utils/helpers/arrays';
import { mergeObjects } from '../utils/helpers/objects';
import { WINDOW } from '../utils/libs/tokens';
import { IPlainObject } from '../utils/types';

export interface Connection {
  readonly downlink: number;
  readonly effectiveType: string;
  readonly rtt: number;
  readonly saveData: boolean;
}

export function _BROWSER(): BrowserService {
  return inject(BrowserService)
}


@Injectable({providedIn: 'root'})
export class BrowserService {
  readonly isBrowser: boolean = isPlatformBrowser(this.platformId);
  readonly isServer: boolean = true;
  readonly isSafari = this.isBrowserSafari();

  constructor(@Inject(WINDOW) private windowRef: Window,
              @Inject(DOCUMENT) private documentRef: Document,
              @Inject(PLATFORM_ID) public platformId: IPlainObject,
              private route: ActivatedRoute,
              private router: Router,
              private urlSerializer: UrlSerializer,
              private sanitizer: DomSanitizer) {
  }

  get window(): Window | null {
    return this.isBrowser && window ? window : null;
  }

  get document(): Document | null {
    return this.isBrowser && window ? this.documentRef : null;
  }

  get navigator(): Navigator | null {
    return this.isBrowser ? navigator : null;
  }

  copyText(text: string): void {
    try {
      this.navigator!.clipboard.writeText(text);
    } catch {
      console.error('Copied Failed.');
    }
  }

  getBrowserScreenMode(): string {
    if (this.isBrowser) {
      const rgbArr = window
        ?.getComputedStyle(document.body)
        .backgroundColor?.match(/\d+/g);

      const averageRgb = average(rgbArr!);

      // Среднее значение RGB цвета должно быть меньше 100 - темно-серый цвет
      if (averageRgb! < 100 && averageRgb !== null) {
        return 'dark';
      }
    }

    return 'light';
  }

  changeViewportMeta(): void {
    const meta = document.querySelector('meta[name="viewport"]')!;
    const newMeta = document.createElement('meta');
    const newContent =
      'width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1, viewport-fit=cover';

    newMeta.setAttribute('name', 'viewport');
    newMeta.setAttribute('content', newContent);

    meta.replaceWith(newMeta);
  }

  private isBrowserSafari(): boolean {
    if (!this.isBrowser) {
      return false;
    }
    const userAgent = navigator?.userAgent?.toLowerCase();

    return !userAgent?.includes('chrome') && userAgent?.includes('safari');
  }

  changeQueryParams(queryParams: Params, replaceState = false, mergeParams = true, isInObject = false): void {
    if (!this.window) return;

    console.log(queryParams);
    let params: Params;

    if (isInObject) {
      const routerParams = this.route.snapshot.queryParams['Q_PARAMS'];
      params = mergeParams ? mergeObjects(routerParams, queryParams) : queryParams;
      params = { params: JSON.stringify(params) };
    } else {
      params = mergeParams
        ? { ...this.route.snapshot.queryParams, ...queryParams }
        : queryParams;

      params = processParams(params, 'stringify');
    }

    const urlTree = this.router.createUrlTree([], {
      relativeTo: this.route,
      queryParams: params,
    });

    const url = this.urlSerializer.serialize(urlTree);

    replaceState ? this.window!.history.replaceState({}, '', url) : this.window!.history.pushState({}, '', url);
  }


  getQueryParams<T>(isInObject = false): T {
    if (isInObject) {
      const params = this.route.snapshot.queryParams['params'];
      return params ? JSON.parse(params) : {} as any;
    } else {
      const queryParams = this.route.snapshot.queryParams as Params;
      return processParams(queryParams, 'parse') as unknown as T;
    }
  }



  getConnectionSpeed(): number {
    const connection: Connection = (window.navigator as any).connection;
    const connectionSpeed = connection?.downlink || 0;

    return connectionSpeed;


    /* Адаптация разрешения изображений к скорости интернет-соединения */
    // if (connectionSpeed) {
    //   this.imageOptimalResolution =
    //     connectionSpeed >= 2 ? '1024x768' :
    //       connectionSpeed >= 1.35 ? 'x500' :
    //         connectionSpeed >= 0.4 ? '240x240' : 'x220';
    // }
  }

}

function processParams(params: Params, action: 'stringify' | 'parse'): Params {
  const result: Params = {};

  for (const key in params) {
    if (params.hasOwnProperty(key)) {
      if (action === 'stringify') {
        result[key] = JSON.stringify(params[key]);
      } else if (action === 'parse') {
        try {
          result[key] = JSON.parse(params[key]);
        } catch {
          result[key] = params[key];
        }
      }
    }
  }

  return result;
}
