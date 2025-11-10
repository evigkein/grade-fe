import { ControlConfig, FormControl, FormGroup } from '@angular/forms';

export type ControlsOf<T extends Record<string, any>> = {
  [K in keyof T]: T[K] extends Record<string, any>
    ? FormGroup<ControlsOf<T[K]>>
    : FormControl<T[K]>;
};

export type ControlsOfFields<T extends Record<string, any>> = {
  [K in keyof T]: FormControl<T[K]>;
};

export type ControlsConfig<T extends Record<string, any>> = {
  [K in keyof T]: ControlConfig<T[K]>;
};
