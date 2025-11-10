export interface ITrackByFn {
  isDeep?: boolean;
  field?: string;
}

export function trackByFn<T extends NonNullable<unknown>>(index: number, item: T, options?: ITrackByFn): number | string {
  const field = options?.field ?? '_id';
  const mark = `${item?.[field] ?? index}`;

  return options?.isDeep ? JSON.stringify(item) : mark;
}

/**
 simple: trackById = trackByFn;
 with arguments: trackByDeep = (index: number, item: RestTurnoverTaskModel) => trackByFn(index, item, { isDeep: true });
 */
