export function createAnimator() {
  let lastRunAnimationId: symbol;

  return async ({
    from,
    to,
    duration = 500,
    step,
    easingFunction = (q: number) => q,
  }: {
    from: number;
    to: number;
    duration: number;
    step: (step: number) => void;
    easingFunction: (q: number) => number;
  }): Promise<ICreateAnimatorPromiseResolveValue> => {
    const currentAnimationId = Symbol('animator');
    lastRunAnimationId = currentAnimationId;
    const start = performance.now();

    return new Promise((resolve) => {
      const tick = () => {
        if (lastRunAnimationId !== currentAnimationId) {
          resolve({ interrupted: true });
          return;
        }
        const current = performance.now();
        const passed = current - start;
        const q = passed / duration;
        const value = from + (to - from) * easingFunction(q);

        if (q >= 1) {
          step(to);
          resolve({ interrupted: false, lastValue: to });
          return;
        }

        step(value);
        requestAnimationFrame(tick);
      };

      tick();
    });
  };
}

export interface ICreateAnimatorPromiseResolveValue {
  interrupted: boolean;
  lastValue?: number;
}
