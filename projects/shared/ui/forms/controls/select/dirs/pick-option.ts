import { Directive, EventEmitter, HostListener, Input, Output } from '@angular/core';

@Directive({
  selector: '[pOptionSelect]',
  standalone: true,
})
export class POptionSelectDirective {
  @Input({ required: true }) index!: number;
  @Input() disabled = false;

  @Output() pick = new EventEmitter<number>();

  @HostListener('click')
  onClick() {
    if (!this.disabled) this.pick.emit(this.index);
  }
}
