import { Directive, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, Renderer2 } from '@angular/core';

@Directive({selector: '[blurAction]', standalone: true})
export class BlurListenerDirective implements OnInit, OnDestroy {
  @Output() blurAction = new EventEmitter<void>();
  private unlisten!: () => void;

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngOnInit() {
    this.unlisten = this.renderer.listen(this.el.nativeElement, 'blur', () => {
      this.blurAction.emit();
    });
  }

  ngOnDestroy() {
    if (this.unlisten) this.unlisten();
  }
}
