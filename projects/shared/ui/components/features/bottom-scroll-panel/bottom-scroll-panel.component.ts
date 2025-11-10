import { ChangeDetectionStrategy, Component, inject, Input, signal } from '@angular/core';
import { tap } from 'rxjs/operators';
import { NativeEventService } from '../../../../services/events/native-event.service';
import { OpenCloseAnimation } from '@utils/angular/animation/slide-in-out.animation';
import { destroy } from '../../../../utils/libs/rxjs';

@Component({
  selector: 'p-bottom-scroll-panel',
  templateUrl: './bottom-scroll-panel.component.html',
  styleUrls: ['./bottom-scroll-panel.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  animations: [OpenCloseAnimation],
  imports: []
})
export class BottomScrollPanel {
  @Input() offset = 200;
  isRevealed = signal(false);

  events = inject(NativeEventService);
  destroy$ = destroy();

  scroll$ = this.events.scrollOffset$.pipe(tap(pos => this.toggle(pos)), this.destroy$());

  ngOnInit(): void {
    this.scroll$.subscribe();
  }

  toggle(pos: number): void {
    if (pos >= this.offset && !this.isRevealed()) this.isRevealed.set(true);
    else if (pos < this.offset && this.isRevealed()) this.isRevealed.set(false);
  }
}
