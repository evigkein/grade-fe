export function toBooleanDecorator(target: any, propertyKey: string) {
  let value: any;

  const toBoolean = (val: any): boolean => {
    return val != null && `${val}` !== 'false';
  };

  const getter = function () {
    return toBoolean(value);
  };

  const setter = function (newValue: any) {
    value = newValue;
  };

  Object.defineProperty(target, propertyKey, {
    get: getter,
    set: setter,
    enumerable: true,
    configurable: true,
  });
}
