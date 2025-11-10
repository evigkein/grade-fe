// import { inject } from '@angular/core';
// import { CanActivateFn, Router } from '@angular/router';
// import { map } from 'rxjs/operators';
// import {UserService} from '../../../domain/modules/users/services/user.service';
//
// export const authGuard: CanActivateFn = (route, state) => {
//   const authService = inject(UserService);
//   const router = inject(Router);
//
//   return authService.user$.pipe(
//     map(user => {
//       if (user) {
//         return true;
//       } else {
//         router.navigate(['/login']);
//         return false;
//       }
//     })
//   );
// };
