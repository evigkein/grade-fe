import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { _SEO } from '@shared/services';
import { scrollToTop } from '@shared/utils/helpers/scroll-to.util';
import { destroy } from '@utils/libs/rxjs';

@Component({
  selector: 'p-page-forum',
  templateUrl: './forum.component.html',
  styleUrls: ['./forum.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class ForumComponent implements OnInit {
  private seo = _SEO();
  destroy$ = destroy();

  ngOnInit() {
    scrollToTop(0);
  }
}
