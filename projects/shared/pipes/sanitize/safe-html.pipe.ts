import {inject, Pipe, PipeTransform} from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser'

@Pipe({name: 'safeHtml', standalone: true })
export class SafeHtmlPipe implements PipeTransform {
    private sanitize = inject(DomSanitizer)

    transform(value: string) {
        return this.sanitize.bypassSecurityTrustHtml(value)
    }
}
