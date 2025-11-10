import {
  Directive,
  ElementRef,
  EventEmitter,
  HostListener,
  Output,
} from '@angular/core';

@Directive({selector: '[blurOnEnter]', standalone: true})
export class BlurOnEnterDirective {
  @Output()
  public readonly enterKeyUp: EventEmitter<KeyboardEvent> = new EventEmitter<KeyboardEvent>();

  constructor(private elRef: ElementRef) {}

  @HostListener('keyup.enter', ['$event']) onEnterKeyUp(
    event: KeyboardEvent,
  ): void {
    this.elRef.nativeElement.blur();
    this.enterKeyUp.emit(event);
  }
}
