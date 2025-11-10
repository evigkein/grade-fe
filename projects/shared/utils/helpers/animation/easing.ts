export const easingFunction = function (t: number): number {
  const tick = t - 1;
  return 1 - tick * tick * tick * tick;
};

export function ease(startValue: number, endValue: number, t: number): number {
  return startValue + (endValue - startValue) * easingFunction(t);
}
