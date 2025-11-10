import { Location } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import {combineLatest, fromEvent} from 'rxjs';
import {debounceTime, distinctUntilChanged, map, tap} from 'rxjs/operators';
import { parentNgIfOverlayAnimationTrigger } from '@utils/angular/animation/show-hide.animation';
import { isBrowser } from '../../../../../../utils/helpers/browser/is-browser.util';
import { destroy, skipEqual$ } from '../../../../../../utils/libs/rxjs';
import {IModalParams} from '../../modal.interface';

import {ModalService} from '../../modal.service';

const ANIMATION_TIME = '0.15s ease-out';

@Component({
  selector: 'p-modals-container',
  templateUrl: './modals-container.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./modals-container.component.scss'],
  animations: [
    parentNgIfOverlayAnimationTrigger('overlayAnimation', ANIMATION_TIME),
  ],
  standalone: false,
})
export class ModalsContainerComponent implements OnInit {
  modalsQueue$ = this.modalService.modalsQueue$;
  isShow = false;
  bannerOffsetStyle = {
    top: '0px',
    height: 'calc(100% - 0px)',
  };
  pressure = 0; // Amount of pressure of mouse/touch
  pointerType!: string;

  private isModalsOpened$ = this.modalsQueue$.pipe(
    map((modals) => !!modals.length),
    distinctUntilChanged(),
  );

  private destroy$ = destroy();

  constructor(
    private modalService: ModalService,
    private cdr: ChangeDetectorRef,
    private location: Location,
  ) {
    this.isModalsOpened$.subscribe(() => {
      this.isShow = !this.isShow;
      this.cdr.markForCheck();
    });
  }

  ngOnInit(): void {
    this.locationSubscribe();
    this.initializePointerMove();
  }

  /**
   *  * When using a mouse, the pointerMove event always triggers and resets ev.pressure.
   *  * On touch devices, the pointerMove event triggers only at the moment of pressing.
   */
  onPointerMove(ev: PointerEvent): void {
    // (pointermove)="onPointerMove($event)"
    this.pressure = ev.pressure;
    this.pointerType = ev.pointerType;
  }

  onPointerUp(id: string): void {
    // use it if u need delay
    // if (this.pressure && this.pointerType === 'mouse') {
    //   console.log(this.pressure);
    //   this.pressure = 0;
    //   return;
    // }
    if (id && !this.modalService.getModal(id)!.isClickOutsideDisabled) {
      this.modalService.closeModal(id, undefined, true);
    }
  }

  private locationSubscribe(): void {
    this.location.subscribe(({ type }) => {
      if (type === 'popstate' && this.isShow) {
        this.modalService.closeAllModalsWithoutActions();
      }
    });
  }

  private initializePointerMove() {
    if(!isBrowser()) return;
    const pointerMove$ = fromEvent<PointerEvent>(document, 'pointermove').pipe(
      debounceTime(200), // Устанавливаем задержку в 200 мс
      map(event => ({
        pressure: event.pressure,
        pointerType: event.pointerType
      })),
      skipEqual$(),
      this.destroy$(),
    );

    pointerMove$.subscribe(data => {
      this.pressure = data.pressure;
      this.pointerType = data.pointerType;
    });
  }

  trackByFn(index: number, item: IModalParams): string {
    return item.id!;
  };
}
