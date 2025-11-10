import {AbstractControl, FormArray, FormGroup} from '@angular/forms';

export interface IInvalidControl {
  name: string;
  value: any;
}

export function isControlInvalid(control: AbstractControl): IInvalidControl[] | false {
  if (control.invalid) {
    const invalidControls:IInvalidControl[] = collectInvalidControls(control);
    processAllControls(control);
    console.log(control, invalidControls, 'Control invalid');
    return invalidControls;
  }
  return false;
}

function processAllControls(control: AbstractControl) {
  if (control instanceof FormGroup || control instanceof FormArray) {
    Object.values(control.controls).forEach(processAllControls);
  } else if (!control.valid) {
    markControl(control);
  }
}

function markControl(control: AbstractControl) {
  control.markAsDirty();
  control.markAsTouched();
  control.updateValueAndValidity();
}





function collectInvalidControls(control: AbstractControl): IInvalidControl[] {
  const invalidControls: { name: string; value: any }[] = [];
  traverseAndCollect(control, invalidControls);
  return invalidControls;
}

function traverseAndCollect(
  control: AbstractControl,
  invalidControls: { name: string; value: any }[],
  parentPath: string = ''
) {
  if (control instanceof FormGroup) {
    Object.entries(control.controls).forEach(([name, childControl]) =>
      traverseAndCollect(childControl, invalidControls, parentPath ? `${parentPath}.${name}` : name)
    );
  } else if (control instanceof FormArray) {
    control.controls.forEach((childControl, index) =>
      traverseAndCollect(childControl, invalidControls, `${parentPath}[${index}]`)
    );
  } else if (control.invalid) {
    invalidControls.push({ name: parentPath, value: control.value });
  }
}
