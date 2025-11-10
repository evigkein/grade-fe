// export type IFormModel<T> = {
//   [P in keyof T]: T[P] extends Array<infer U>
//     ? FormArray
//     : T[P] extends object
//       ? T[P] extends Date | RegExp
//         ? FormControl<T[P]>
//         : FormGroup<IFormModel<T[P]>>
//       : FormControl<T[P]>;
// };

import {FormControl, FormGroup} from '@angular/forms';

export type IForm<T> = {
  [P in keyof T]: T[P] extends Array<infer U>
    ? FormControl<U[]>
    : T[P] extends object
      ? T[P] extends Date | RegExp
        ? FormControl<T[P]>
        : FormGroup<IForm<T[P]>>
      : FormControl<T[P]>;
};

// : FormGroup<IForm<IBrandingForm>>
