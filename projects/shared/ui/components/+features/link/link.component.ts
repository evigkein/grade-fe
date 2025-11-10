import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, inject, Input, OnInit, Output, } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { StopEventsDirective } from '../../../../directives/utils';
import { openExternalUrl } from '../../../../utils/helpers/browser/window.util';

@Component({
  selector: 'p-link',
  templateUrl: './link.component.html',
  styleUrls: ['./link.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule, StopEventsDirective, TranslateModule]
})
export class LinkComponent implements OnInit {
  @Input() url!: string;
  @Input() isExternal = false;
  @Input() text!: string;
  @Input() hasDefaultNavigation = true;
  @Output() action = new EventEmitter<string>();

  router = inject(Router);

  ngOnInit(): void {
    this.text = this.text ?? this.url;
  }

  onNavigate(): void {
    if (this.hasDefaultNavigation && this.url) {
      this.isExternal ? openExternalUrl(this.url) : this.router.navigate([this.url]);
    } else {
      this.action.emit(this.url);
    }
  }
}
