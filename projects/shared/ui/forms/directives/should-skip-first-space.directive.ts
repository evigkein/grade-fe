// import { Directive, HostListener } from '@angular/core';
// import { NgControl } from '@angular/forms';
// import { keyboardEventsEnum } from '@core/utils';
//
// @Directive({selector: '[shouldSkipFirstSpace]', standalone: true})
// export class ShouldSkipFirstSpaceDirective {
//   constructor(private control: NgControl) {
//   }
//
//   @HostListener('keydown', [ '$event' ])
//   keyDown(event: KeyboardEvent): void {
//     if (!this.control.value && event.code === keyboardEventsEnum.space) {
//       event.preventDefault();
//     }
//   }
// }
