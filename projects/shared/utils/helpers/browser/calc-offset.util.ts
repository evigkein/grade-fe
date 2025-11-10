export function calcOffset(element: HTMLElement, targetParent: HTMLElement): ICalcOffsetResult {
  const elementRect = element.getBoundingClientRect();
  const targetRect = targetParent.getBoundingClientRect();

  return {
    x: elementRect.left - targetRect.left,
    y: elementRect.top - targetRect.top,
  };
}
export interface ICalcOffsetResult {
  x: number
  y: number
}
