// import { CommonModule } from '@angular/common';
// import {
//   AfterViewInit,
//   ChangeDetectionStrategy,
//   ChangeDetectorRef,
//   Component,
//   EventEmitter,
//   Input,
//   Output,
//   ViewChild,
//   ViewContainerRef,
// } from '@angular/core';
// import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
// import { filter, of, take } from 'rxjs';
//
// import {TooltipDirective} from '../../../../directives/ui/tooltip.directive';
// import {SvgIconComponent} from '../../../modules/svg-icon/svg-icon.component';
// import {LoadingSpinnerComponent} from '../../loader/loading-spinner/loading-spinner.component';
//
// @Component({
//   selector: 'p-floating-buttons',
//   templateUrl: './floating-buttons.component.html',
//   styleUrls: ['./floating-buttons.component.scss'],
//   changeDetection: ChangeDetectionStrategy.OnPush,
//   standalone: true,
//   imports: [
//     CommonModule,
//     MatMenuModule,
//     MatButtonModule,
//     TooltipDirectiveModule,
//     MatProgressSpinnerModule,
//     SvgIconComponent,
//     TooltipDirective,
//     LoadingSpinnerComponent,
//   ],
// })
// export class FloatingButtonsComponent extends ComponentAbstract implements AfterViewInit {
//   @Input() inProgress$ = of(false);
//   @Input() tooltip = 'Magic plus button. Click me!';
//   @Input() icon = '';
//   @Input() right: string;
//   @Input() bottom: string;
//   @Input() hasMenu = false;
//   @Output() clickEvent = new EventEmitter<void>();
//
//   bottomCorrection = '0';
//   topCorrection = '0';
//
//   @ViewChild(MatMenuTrigger) addMenu: MatMenuTrigger;
//
//   constructor(protected cdr: ChangeDetectorRef, private readonly viewRef: ViewContainerRef) {
//     super(cdr);
//   }
//
//   onClick() {
//     this.inProgress$
//       .pipe(
//         take(1),
//         filter(e => !e)
//       )
//       .subscribe(() => {
//         if (this.hasMenu) {
//           if (!this.addMenu.menuOpen) {
//             setTimeout(() => this.addMenu.openMenu(), 250);
//           }
//         } else {
//           this.clickEvent.emit();
//         }
//       });
//   }
//
//   ngAfterViewInit() {
//     //static position work wrong with any transform, as parent element with this style treat as window for static positioning
//     //Because of that we should to find transforming parent and make a correction
//     let element = this.viewRef.element.nativeElement as HTMLElement;
//     while (element && element.parentElement) {
//       if (element.style.transform) {
//         this.bottomCorrection = `-${window.innerHeight - element.getBoundingClientRect().bottom}px`;
//         this.topCorrection = `-${window.innerWidth - element.getBoundingClientRect().right}px`;
//         this.cdr.detectChanges();
//         break;
//       }
//       element = element.parentElement;
//     }
//   }
// }
//
// // <app-floating-buttons content-floating-button [hasMenu]="true" *ngIf="hasEditRight$ | async">
// // <button (click)="addPortfolioTrigger()" mat-menu-item>Add portfolio trigger</button>
// // <button (click)="addPropertyTrigger()" mat-menu-item>Add property trigger</button>
// // </app-floating-buttons>
