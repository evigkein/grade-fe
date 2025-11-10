// import { ChangeDetectionStrategy, Component, Input, OnInit, Optional, Self } from '@angular/core';
// import { NgControl } from '@angular/forms';
// import { CustomControlAccessor } from '@core/ui-forms';
// import { Observable } from 'rxjs';
// import { UniversalAutocompleteService } from '../universal-autocomplete.service';
//
// @Component({
//   selector: 'ds-supplier-search',
//   templateUrl: './supplier-search.component.html',
//   styleUrls: [ './supplier-search.component.scss' ],
//   changeDetection: ChangeDetectionStrategy.OnPush,
//   providers: [ UniversalAutocompleteService ],
// })
// export class SupplierSearchComponent extends CustomControlAccessor implements OnInit {
//   @Input() placeHolder = 'Укажите код или наименование';
//   /**
//    * значение, по которому будет запрошен поиск при инициализации кмопонента, чтобы автокомплит подхватил его и подставил.
//    */
//   @Input() firstSearch!: string;
//   @Input() url!: string // а также автокомплит может принимать урл или метод, по которому искать.
//
//   list$: Observable<Array<any>> = this.orgService.list$;
//   isLoading$: Observable<boolean> = this.orgService.isLoading$;
//
//   constructor(@Optional() @Self() public controlDir: NgControl,
//               private orgService: UniversalAutocompleteService<any>) {
//     super(controlDir);
//   }
//
//   ngOnInit() {
//     if (this.firstSearch) {
//       this.search(this.firstSearch); //  для подхвата инишиал велью в селект.
//     }
//   }
//
//   search(v: string): void {
//     this.orgService.search(v);
//   }
//
// }
