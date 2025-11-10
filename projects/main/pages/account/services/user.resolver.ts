// import { Injectable } from '@angular/core';
// import { Resolve } from '@angular/router';
// import { Observable } from 'rxjs';
// import { filter } from 'rxjs/operators';
// import {UserService} from '../../../domain/modules/users/services/user.service';
//
// @Injectable({providedIn: 'root'})
// export class UserResolver implements Resolve<any> {
//   constructor(private userService: UserService) {}
//
//   resolve(): Observable<any> {
//     return this.userService.user$.pipe(filter(user => !!user));
//   }
// }
