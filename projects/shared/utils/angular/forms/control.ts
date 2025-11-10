import { FormControl, FormControlOptions, AbstractControlOptions } from '@angular/forms';

type FCOptions<T> = AbstractControlOptions | { nonNullable: boolean };

export function FC<T>(formState: T, options?: FCOptions<T>): FormControl<T> {
  const defaultOptions: FCOptions<T> = {
    nonNullable: true,
    ...options
  };

  return new FormControl<T>(formState, defaultOptions);
}
