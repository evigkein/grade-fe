import {Injectable, Inject, inject} from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { DOCUMENT } from '@angular/common';
import { typeGuard$ } from '../../utils/libs/rxjs';
import {EnvConfig} from '../tokens/env/env-config';
import {IEnvConfig} from '../tokens/env/env-config.interface';
import { Meta } from '@angular/platform-browser';

@Injectable({providedIn: 'root'})
export class CanonicalUrlService {
  private env = inject(EnvConfig);
  // private meta = inject(Meta);
  private link!: HTMLLinkElement;
  private isCreated = false;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private router: Router,
  ) {
    this.createCanonicalLink();
    this.listenToRouterEvents();
  }

  private createCanonicalLink(): void {
    if (!this.isCreated) {
      this.isCreated = true;
      this.link = this.document.createElement('link');
      this.link.setAttribute('rel', 'canonical');
      this.document.head.appendChild(this.link);
    }
  }

  private listenToRouterEvents(): void {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      typeGuard$<NavigationEnd>(),
    )
      .subscribe((event: NavigationEnd) => {
      const processedUrl = this.processUrlForSEO(event.urlAfterRedirects);
      this.setCanonicalUrl(processedUrl);
    });
  }

  private setCanonicalUrl(url: string): void {
    this.link.setAttribute('href', getRelevantUrl(url, this.env.mainUrl));
  }

  private processUrlForSEO(url: string): string {
    let processedUrl = url.split('?')[0].split('#')[0];
    processedUrl = this.normalizeUrl(processedUrl);
    return processedUrl;
  }

  private normalizeUrl(url: string): string {
    if (!url.endsWith('/')) {
      url += '/';
    }
    return url;
  }
}

function getRelevantUrl(url: string, configUrl: string): string {
  return url === '/' ? configUrl : url
}
