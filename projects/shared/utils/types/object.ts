export interface IPlainObject {
  [key: string]: any
}

export interface IPlainObjectOf<T> {
  [key: string]: T
}

export interface IId<T = string> {
  id: T
}
