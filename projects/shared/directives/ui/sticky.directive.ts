import {
  Directive,
  ElementRef,
  Input,
  Renderer2,
  OnInit,
  OnDestroy,
  AfterViewInit,
  NgZone,
  numberAttribute
} from '@angular/core';
import { Subscription } from 'rxjs';
import { Router, NavigationEnd } from '@angular/router';
import { NativeEventService } from '../../services/events/native-event.service';

@Directive({ selector: '[sticky]', standalone: true })
export class StickyDirective implements AfterViewInit, OnDestroy {
  @Input({ alias: 'sticky', transform: numberAttribute }) offset: number = 0;
  private initialTop!: number;
  private initialLeft!: number;
  private initialWidth!: number;
  private initialPosition!: string;
  private scrollSubscription!: Subscription;

  constructor(
    private el: ElementRef,
    private renderer: Renderer2,
    private nativeEventService: NativeEventService,
    private ngZone: NgZone,
  ) {}

  ngAfterViewInit() {
    this.ngZone.runOutsideAngular(() => {
      this.scrollSubscription = this.nativeEventService.scroll$.subscribe(() => this.onWindowScroll());
    });
    setTimeout(() => {
      this.setupSticky();
    }, 0);
  }

  ngOnDestroy() {
    if (this.scrollSubscription) this.scrollSubscription.unsubscribe();
  }

  private setupSticky() {
    const rect = this.el.nativeElement.getBoundingClientRect();
    this.initialTop = rect.top + window.scrollY;
    this.initialLeft = rect.left + window.scrollX;
    this.initialWidth = rect.width;
    this.initialPosition = getComputedStyle(this.el.nativeElement).position;

    this.renderer.setStyle(this.el.nativeElement, 'width', `${this.initialWidth}px`);
    this.renderer.setStyle(this.el.nativeElement, 'left', `${this.initialLeft}px`);
    this.onWindowScroll();
  }

  private onWindowScroll() {
    const windowScroll = window.scrollY;
    const elementTop = this.initialTop - this.offset;

    if (windowScroll >= elementTop) {
      this.renderer.setStyle(this.el.nativeElement, 'position', 'fixed');
      this.renderer.setStyle(this.el.nativeElement, 'top', `${this.offset}px`);
    } else {
      this.renderer.setStyle(this.el.nativeElement, 'position', this.initialPosition);
      this.renderer.removeStyle(this.el.nativeElement, 'top');
    }
  }
}
