export type Keys<T> = keyof T;

export type MultipleValues<T, K extends Keys<T>[]> = {
    [P in K[number]]: T[P];
};
