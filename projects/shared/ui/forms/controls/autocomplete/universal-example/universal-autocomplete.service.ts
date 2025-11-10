// import { Injectable } from '@angular/core';
// import { BehaviorSubject, Observable } from 'rxjs';
// import { debounceTime, distinctUntilChanged, filter, shareReplay, switchMap, tap } from 'rxjs/operators';
// import { HttpClient } from '@angular/common/http';
//
// @Injectable()
// export class UniversalAutocompleteService<T> {
//   private isLoading$$ = new BehaviorSubject(false);
//
//   searchValue$$ = new BehaviorSubject<string>('');
//   list$!: Observable<Array<T>>;
//   isLoading$ = this.isLoading$$.asObservable();
//
//   constructor(private http: HttpClient) {
//   }
//
//   search(v: string): void {
//     this.searchValue$$.next(v);
//   }
//
//   public initList(url: string): Observable<Array<T>> {
//     return this.list$ = this.searchValue$$
//       .pipe(
//         debounceTime(500),
//         distinctUntilChanged(),
//         // filter(v => v.length > 3),
//         tap(_ => this.isLoading$$.next(true)),
//         // switchMap(v => this.orgService.getSuppliers(v) // когда появится автокомплит использовать эту строку, вместо следующей
//         switchMap(v => this.http.get<Array<T>>(url)
//           .pipe(
//             // map(r => r.response),
//             filter(v => !!v),
//             tap((_: Array<T>) => this.isLoading$$.next(false)),
//           )),
//         shareReplay(1),
//       );
//   }
// }
