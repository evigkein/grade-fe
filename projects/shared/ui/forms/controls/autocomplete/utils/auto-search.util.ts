import { ISelectOption } from '../../select';

export function filterAutocompleteOptions(searchTerm: string, options: ISelectOption[]): ISelectOption[] {
  if (!searchTerm) {
    return options;
  }
  const term = searchTerm.toLowerCase();
  const directMatches = options.filter(option => {
    const label = option.label ? option.label.toLowerCase() : option.value.toLowerCase();
    return label.startsWith(term);
  });
  const partialMatches = options.filter(option => {
    const label = option.label ? option.label.toLowerCase() : option.value.toLowerCase();
    return !label.startsWith(term) && label.includes(term);
  });
  return [...directMatches, ...partialMatches];
}
