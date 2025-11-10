const memoizedValues = new WeakMap<object, Map<Symbol, unknown>>();
let memoizationCounter = 0;

export function Memo(target: any, propertyName: string, descriptor: TypedPropertyDescriptor<any>): void {
  const originalFunction = descriptor.value || descriptor.get;

  if (!originalFunction) {
    throw new Error('Only put a Memo decorator on a method or get accessor.');
  }

  descriptor.value = createMemoizedFunction(originalFunction);
}

function createMemoizedFunction(originalFunction: (...args: any[]) => void) {
  const identifier = Symbol(memoizationCounter++);

  return function memoizedDecorator(this: any, ...args: any[]) {
    if (typeof this !== 'object' || this === null) {
      throw new Error('Memoized methods must be called with an object context.');
    }

    if (!memoizedValues.has(this)) {
      memoizedValues.set(this, new Map<symbol, unknown>());
    }

    const propertyMemoization = memoizedValues.get(this)!;

    const propName = args.length > 0 ? Symbol(`__memo_value_${String(identifier)}_${JSON.stringify(args)}`) : identifier;

    if (!propertyMemoization.has(propName)) {
      propertyMemoization.set(propName, originalFunction.apply(this, args));
    }

    return propertyMemoization.get(propName);
  };
}

// class MemoExample {
//   @Memo
//   calculateSum(a: number, b: number): number {
//     console.log('Calculating sum...');
//     return a + b;
//   }
// }
//
// const example = new MemoExample();
//
// console.log(example.calculateSum(2, 3)); // Output: Calculating sum... 5
// console.log(example.calculateSum(2, 3)); // Output: 5 (result is cached)
// console.log(example.calculateSum(4, 5)); // Output: Calculating sum... 9
// console.log(example.calculateSum(2, 3)); // Output: 5 (cached value)
