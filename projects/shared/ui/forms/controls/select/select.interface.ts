import { Pipe, PipeTransform } from '@angular/core';

export interface ISelectOption<T = any> {
  id?: string;
  label?: string;
  value: T;
}

export function mapSelectOptionFromLabels([...labels]: string[], labelPrefix?: string): ISelectOption<string>[] {
  return labels.map(i => ({label: (labelPrefix ? labelPrefix : '') + i, value: i}))
}

export function mapSelectOptionFromEnum<T extends Record<string, string | number>>(
  enumObj: T,
  labelPrefix?: string
): ISelectOption<string | number>[] {
  return Object.entries(enumObj).map(([key, value]) => ({
    label: `${labelPrefix || ''}${key}`,
    value,
  }));
}

export function getTrueFalseOptions(trueLabel = 'Active', falseLabel = 'Inactive'): ISelectOption<boolean>[] {
  return [
    { label: trueLabel, value: true },
    { label: falseLabel, value: false },
  ];
};

export function mapSelectOptionFromEntity(options: {label: string, id: string}[]): ISelectOption<string>[] {
  return options.map(i => ({label: i.label, value: i.id}))
}

export const yesNoSelectLabelOptions: ISelectOption<true | false>[] = [
  { label: 'Yes', value: true },
  { label: 'No', value: false },
]

@Pipe({name: 'valueToLabel', standalone: true })
export class ValueToLabelPipe implements PipeTransform {
  transform<T>(value: T, options: ISelectOption<T>[]): string | undefined {
    const option = options.find(opt => opt.value === value);
    return option?.label;
  }
}
