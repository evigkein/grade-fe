import { Directive, ElementRef, output, OnInit, OnDestroy, Renderer2 } from '@angular/core';
import { _ELREF, _R2 } from '@utils/angular/ng-api';

@Directive({selector: '[blurAction]', standalone: true})
export class BlurListenerDirective implements OnInit, OnDestroy {
  blurAction = output<void>();
  private unlisten!: () => void;
  private el = _ELREF();
  private r = _R2();

  ngOnInit() {
    this.unlisten = this.r.listen(this.el.nativeElement, 'blur', () => {
      this.blurAction.emit();
    });
  }

  ngOnDestroy() {
    if (this.unlisten) this.unlisten();
  }
}
