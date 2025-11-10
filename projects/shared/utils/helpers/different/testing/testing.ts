import { ComponentFixture } from '@angular/core/testing';
import { DebugElement, FactoryProvider, Type } from '@angular/core';
import { By } from '@angular/platform-browser';
// import { instance } from 'ts-mockito';

export const getElementByClassName = <T>(
  fixture: ComponentFixture<any>,
  className: string,
): T => {
  return fixture.debugElement.query(By.css(`.${className}`))?.nativeElement as T;
};

export const getElementByTitle = <T>(fixture: ComponentFixture<any>, title: string): T => {
  return fixture.debugElement.query(By.css(`[title="${title}"]`))
    ?.nativeElement as T;
};

export const getCollectionByClassName = (
  fixture: ComponentFixture<any>,
  className: string,
): DebugElement[] => {
  return fixture.debugElement.queryAll(By.css(`.${className}`));
};

export const getElementBySelector = <T>(
  fixture: ComponentFixture<any>,
  selector: string,
): T => {
  return fixture.debugElement.query(By.css(selector))?.nativeElement as T;
};

export const getCollectionBySelector = (
  fixture: ComponentFixture<any>,
  selector: string,
): DebugElement[] => {
  return fixture.debugElement.queryAll(By.css(selector));
};

export const getReturnAllArgs = (...args: any[]): any[] => {
  return [...args];
};

export const getReturnFirstArg = (...args: any[]): any => {
  if (args.length > 0) {
    return args[0];
  }
};

export const getComponentInstance = <T>(
  fixture: ComponentFixture<any>,
  component: Type<any>,
): T => {
  return fixture.debugElement.query(By.directive(component)).componentInstance;
};

// export function providerOf<T>(
//   token:
//     | Type<T>
//     // eslint-disable-next-line @typescript-eslint/ban-types
//     | (Function & {
//     prototype: T;
//   }),
//   mockClass: T
// ): FactoryProvider {
//   return {
//     provide: token,
//     // useFactory: (): T => instance(mockClass),
//   };
// }
