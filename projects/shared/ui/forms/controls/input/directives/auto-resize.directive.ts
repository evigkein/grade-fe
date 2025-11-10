import {
  Directive,
  ElementRef,
  HostListener,
  Renderer2,
  AfterViewInit,
  Input,
  numberAttribute,
  booleanAttribute
} from '@angular/core';

@Directive({selector: '[autoResizeTextArea]', standalone: true})
export class AutoResizeDirective implements AfterViewInit {
  @Input({alias: 'autoResizeTextArea', transform: numberAttribute}) maxHeight = 200;
  // @Input({alias: 'isAutoResizeEnabled', transform: booleanAttribute}) isEnabled = false;

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngAfterViewInit(): void {
    // if(!this.isEnabled) return;
    this.resize();
  }

  @HostListener('input')
  onInput(): void {
    // if(!this.isEnabled) return;
    this.resize();
  }

  private resize(): void {
    const textarea = this.el.nativeElement as HTMLTextAreaElement;
    this.renderer.setStyle(textarea, 'height', 'auto');
    const scrollHeight = textarea.scrollHeight;
    const newHeight = Math.min(scrollHeight, this.maxHeight);
    this.renderer.setStyle(textarea, 'height', `${newHeight}px`);
  }
}
