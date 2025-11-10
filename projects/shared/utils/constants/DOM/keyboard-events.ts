export enum keyboardEventsEnum {
  arrowRight = 'ArrowRight',
  arrowLeft = 'ArrowLeft',
  arrowUp = 'ArrowUp',
  arrowDown = 'ArrowDown',
  backspace = 'Backspace',
  delete = 'Delete',
  tab = 'Tab',
  escape = 'Escape',
  enter = 'Enter',
  home = 'Home',
  end = 'End',
  clear = 'Clear',
  copy = 'Copy',
  paste = 'Paste',

  //
  space = 'Space'
}

export enum specialKeysEnum {
  minus = 'Minus'
}

export const navigationKeyboardKeys = [
  keyboardEventsEnum.backspace,
  keyboardEventsEnum.delete,
  keyboardEventsEnum.tab,
  keyboardEventsEnum.escape,
  keyboardEventsEnum.enter,
  keyboardEventsEnum.home,
  keyboardEventsEnum.end,
  keyboardEventsEnum.arrowLeft,
  keyboardEventsEnum.arrowRight,
  keyboardEventsEnum.clear,
  keyboardEventsEnum.copy,
  keyboardEventsEnum.paste,
  keyboardEventsEnum.arrowDown,
  keyboardEventsEnum.arrowUp,
];

export const keyEventCodeMap: { [type: string]: string } = {
  ArrowRight: 'right',
  ArrowLeft: 'left',
  ArrowUp: 'up',
  ArrowDown: 'down',
};

export function isSpecialKeyboardCombination(e: KeyboardEvent): boolean {
  return (e.key === 'a' && e.ctrlKey) || // Allow: Ctrl+A
    (e.key === 'c' && e.ctrlKey) || // Allow: Ctrl+C
    (e.key === 'v' && e.ctrlKey) || // Allow: Ctrl+V
    (e.key === 'x' && e.ctrlKey) || // Allow: Ctrl+X
    (e.key === 'a' && e.metaKey) || // Allow: Cmd+A (Mac)
    (e.key === 'c' && e.metaKey) || // Allow: Cmd+C (Mac)
    (e.key === 'v' && e.metaKey) || // Allow: Cmd+V (Mac)
    (e.key === 'x' && e.metaKey);    // Allow: Cmd+X (Mac)
}
