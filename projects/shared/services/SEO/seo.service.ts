import { Injectable, Inject, inject, PLATFORM_ID } from '@angular/core';
import {Title, Meta, MetaDefinition} from '@angular/platform-browser';
import { isBrowser, isSSR } from '@utils/helpers/browser/is-browser.util';
import {ISeo} from './seo.interface';

export function _SEO(): SeoService {
  return inject(SeoService)
}

@Injectable({providedIn: 'root'})
export class SeoService {

  titleService = inject(Title);
  metaService = inject(Meta);

  updateSeo(seoData: Partial<ISeo>): void {
    if (seoData.title) this.setTitle(seoData.title);
    if (seoData.description) this.setDescription(seoData.description);
    if (seoData.keywords) this.setKeywords(seoData.keywords);

    if (seoData.url) this.setCanonicalUrl(seoData.url);

    this.setOpenGraphTags(seoData);
    this.setTwitterCardTags(seoData);
  }

  private setTitle(title: string): void {
    this.titleService.setTitle(title);
  }

  private setDescription(description: string): void {
    this.metaService.updateTag({ name: 'description', content: description });
  }

  private setKeywords(keywords: string): void {
    this.metaService.updateTag({ name: 'keywords', content: keywords });
  }

  private setCanonicalUrl(url: string): void {
    const doc = (globalThis?.document ?? (globalThis as any)?.document);
    const head = doc?.head;
    if(!head) return;
    let link = head.querySelector('link[rel="canonical"]');
    if (!link) {
      link = document.createElement('link');
      link.setAttribute('rel', 'canonical');
      head.appendChild(link);
    }
    link.setAttribute('href', url);
  }

  private setOpenGraphTags(seoData: Partial<ISeo>): void {
    const ogTags = filterValidTags([
      { property: 'og:title', content: seoData.title },
      { property: 'og:description', content: seoData.description },
      { property: 'og:image', content: seoData.image },
      { property: 'og:url', content: seoData.url },
      { property: 'og:type', content: seoData.type },
    ]);

    ogTags.forEach(tag => this.metaService.updateTag(tag)); // CHANGED
  }

  private setTwitterCardTags(seoData: Partial<ISeo>): void {
    const twitterTags = filterValidTags([
      { name: 'twitter:title', content: seoData.title },
      { name: 'twitter:description', content: seoData.description },
      { name: 'twitter:image', content: seoData.image },
      { name: 'twitter:card', content: 'summary_large_image' },
    ]);

    twitterTags.forEach(tag => this.metaService.updateTag(tag)); // CHANGED
  }

  setSchemaTrip(from: string, to: string): void {
    const jsonLd = {
      "@context": "https://schema.org",
      "@type": "Trip",
      "name": `Такси ${from} — ${to}`,
      "provider": { "@type": "Organization", "name": "SouzTransfer" },
      "departureStation": { "@type": "Place", "name": from },
      "arrivalStation": { "@type": "Place", "name": to },
    };

    try {
      if(!isBrowser()) return;
      const head = document.head || document.getElementsByTagName('head')[0];
      const existing = head.querySelector('script[type="application/ld+json"][data-schema="trip"]');
      if (existing) existing.remove();

      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.setAttribute('data-schema', 'trip');
      script.textContent = JSON.stringify(jsonLd);
      head.appendChild(script);
    } catch (err) {
      console.error('Failed to inject schema.org JSON-LD (Trip):', err);
    }
  }



  setSchemaOrganization(): void {
    const schema = {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "SouzTransfer",
      "url": "https://souztransfer.ru",
      "logo": "https://souztransfer.ru/assets/logo.png",
      "description": "SouzTransfer — современный онлайн-сервис для заказа такси и трансферов по всей России. Быстрый расчёт стоимости, комфортные автомобили, надёжные перевозчики.",
      "contactPoint": {
        "@type": "ContactPoint",
        "telephone": "+7 999 999 9999",
        "contactType": "Customer Service",
        "availableLanguage": ["Russian"]
      },
      "sameAs": [
        "https://t.me/souztransfer",
        "https://vk.com/souztransfer",
        "https://www.instagram.com/souztransfer"
      ]
    };

    try {
      const json = JSON.stringify(schema);
      const scriptTag = `<script type="application/ld+json">${json}</script>`;

      // SSR
      if (isSSR()) {
        if (typeof document !== 'undefined') {
          const head = document.getElementsByTagName('head')[0];
          if (head) {
            // удаляем предыдущий тег (если перерендер)
            const existing = head.querySelector('script[type="application/ld+json"][data-schema="organization"]');
            if (existing) head.removeChild(existing);

            const scriptEl = document.createElement('script');
            scriptEl.type = 'application/ld+json';
            scriptEl.setAttribute('data-schema', 'organization');
            scriptEl.textContent = json;
            head.appendChild(scriptEl);
          }
        }
        else {
          // console.log('SSR Schema:', scriptTag);
        }
        return;
      }

      // BROWSER
      if (isBrowser()) {
        let el = document.querySelector('script[type="application/ld+json"][data-schema="organization"]');
        if (!el) {
          el = document.createElement('script');
          el.setAttribute('data-schema', 'organization');
          el['type'] = 'application/ld+json';
          document.head.appendChild(el);
        }
        el.textContent = json;
      }
    } catch (err) {
      console.error('Failed to inject schema.org JSON-LD:', err);
    }
  }



}

function filterValidTags(tags: Array<Partial<MetaDefinition>>): MetaDefinition[] {
  return tags.reduce((acc, tag) => {
    if (tag.content?.trim()) {
      acc.push(tag as MetaDefinition);
    }
    return acc;
  }, [] as MetaDefinition[]);
}
