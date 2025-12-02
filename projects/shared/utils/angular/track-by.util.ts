export interface ITrackByFn {
  isDeep?: boolean;
  field?: string;
}

export function trackByFn<T extends NonNullable<unknown>>(index: number, item: T, options?: ITrackByFn): number | string {
  const field = options?.field ?? '_id';
  const mark = `${item?.[field] ?? index}`;

  return options?.isDeep ? JSON.stringify(item) : mark;
}
