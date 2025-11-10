import { Directive, ElementRef, EventEmitter, Output } from '@angular/core';
import { fromEvent, merge } from 'rxjs';
import { filter, map, pairwise } from 'rxjs/operators';
import { _ELREF } from '../../../../utils/angular/ng-api';

@Directive({ selector: '[mouseClickUpDown]', standalone: true })
export class MouseClickDirective {
  @Output('mouseClickUpDown') mouseClickUpDown = new EventEmitter<void>();
  private el = _ELREF();

  ngOnInit() {
    const mouseDown$ = fromEvent<MouseEvent>(this.el.nativeElement, 'mousedown').pipe(
      filter(event => this.el.nativeElement === event.target),
      map(event => ({ event, type: 'mousedown' }))
    );

    const mouseUp$ = fromEvent<MouseEvent>(this.el.nativeElement, 'mouseup').pipe(
      filter(event => this.el.nativeElement === event.target),
      map(event => ({ event, type: 'mouseup' }))
    );

    merge(mouseDown$, mouseUp$)
      .pipe(
        pairwise(),
        filter(([prev, current]) => prev.type === 'mousedown' && current.type === 'mouseup'),
      )
      .subscribe(() => {
        this.mouseClickUpDown.emit();
      });
  }
}
