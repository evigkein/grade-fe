import { ITag } from './tags.interface';

export function convertStringToTagFormat(labels: string[]): ITag[] {
  return labels.map<ITag>(i => ({
    value: undefined,
    label: i,
  }));
}
