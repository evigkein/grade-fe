export type TStringify<T> = {
  [P in keyof T]: string;
};
