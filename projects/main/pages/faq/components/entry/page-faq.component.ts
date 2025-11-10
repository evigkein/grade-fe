import { ChangeDetectionStrategy, Component, inject, OnInit, Signal } from '@angular/core';
import { IFindFaqItemDto } from '@shared/domain/api/swagger/models/i-find-faq-item-dto';
import { ApiFaqService } from '@shared/domain/api/swagger/services/api-faq.service';
import { _RS } from '@shared/services/router.service';
import { scrollToTop } from '@shared/utils/helpers/scroll-to.util';
import { isBrowser } from '@utils/helpers/browser/is-browser.util';
import { goBack } from '@utils/helpers/browser/window.util';
import { map, share, shareReplay } from 'rxjs';
import { ERoute } from '../../../../domain/constants/route.enum';
import { FaqCacheService } from '../../services/faq.service';

@Component({
  selector: 'p-page-faq',
  templateUrl: './page-faq.component.html',
  styleUrls: ['./page-faq.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class PageFaqComponent implements OnInit {
  private router = _RS();
  private apiFaq = inject(ApiFaqService)
  faqService = inject(FaqCacheService)

  faqs$: Signal<IFindFaqItemDto[]> = this.faqService.faqs

  ngOnInit() {
    scrollToTop(0);
  }

  goBack() {
    if (!isBrowser()) return;
    goBack(this.router.router, `/${ERoute.Main}`)
  }
}
