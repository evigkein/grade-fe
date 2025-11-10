import {Directive, inject, Input, OnDestroy, OnInit} from '@angular/core';
import {BodyService} from './body.service';

@Directive({selector: '[disableBodyScroll]', standalone: true})
export class DisableBodyScrollDirective implements OnInit, OnDestroy {
  @Input() hasBackdrop = false;

  private isScrollDisabledByElement = false;
  private bodyService = inject(BodyService);

  public ngOnInit(): void {
    this.setDisableBodyScroll(true);
  }

  public ngOnDestroy(): void {
    this.setDisableBodyScroll(false);
  }

  private setDisableBodyScroll(isScrollDisabled: boolean): void {
    if (isScrollDisabled !== this.isScrollDisabledByElement) {
      this.isScrollDisabledByElement =
        isScrollDisabled && !this.bodyService.isScrollDisabled;
      this.hasBackdrop ? this.bodyService.handleScrollWithBlur(isScrollDisabled) : this.bodyService.handleScroll(isScrollDisabled);
    }
  }
}
