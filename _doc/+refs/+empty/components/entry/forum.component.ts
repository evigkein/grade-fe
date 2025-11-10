import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { scrollToTop } from '@shared/utils/helpers/scroll-to.util';

@Component({
  selector: 'p-page-forum',
  templateUrl: './forum.component.html',
  styleUrls: ['./forum.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class ForumComponent implements OnInit {
  ngOnInit() {
    scrollToTop(0);
  }
}
