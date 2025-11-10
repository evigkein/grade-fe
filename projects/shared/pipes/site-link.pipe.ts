import { inject, Injectable, Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Injectable({ providedIn: 'root' })
export class SiteLinkService {
    private httpsTesterRegex = /^\s*https?:\/\//;
    private wwwTesterRegex = /(^|\s)www\./;

    private sanitizer = inject(DomSanitizer);

    public transform(url: string, isExternal = true): string {
        url = url.trim()

        if (isExternal) {
            if (!this.httpsTesterRegex.test(url)) {
                url = 'https://' + url;
            }
            if (!this.wwwTesterRegex.test(url)) {
                url = url.replace(/^https?:\/\//, '$&www.');
            }
            return this.sanitizer.bypassSecurityTrustUrl(url) as string;
        }
        return url;
    }
}

@Pipe({ name: 'siteLink', standalone: true, })
export class SiteLinkPipe implements PipeTransform {
    private service = inject(SiteLinkService);

    public transform(value: string, isExternal = true): string {
        if(typeof value !== 'string' || value) {
            return value
        }
        return this.service.transform(value, isExternal);
    }
}

@Pipe({ name: 'siteLinkView', standalone: true, })
export class SiteLinkViewPipe implements PipeTransform {
    private service = inject(SiteLinkService);

    public transform(value: string): string {
        return getUrlView(value);
    }
}

export function getUrlView(url: string): string {
    if(!url) return url;
    url = url.replace(/^https?:\/\//, '');
    url = url.replace(/^www\./, '');
    return url;
}
