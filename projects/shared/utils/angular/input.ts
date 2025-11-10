import {booleanAttribute, Input, numberAttribute} from '@angular/core';

export function BOOLEAN(required = false): Input {
  return {required: false, transform: booleanAttribute}
}

export function NUMBER(required = false): Input {
  return {required: false, transform: numberAttribute}
}

export function REQUIRED(): Input {
  return {required: true}
}
