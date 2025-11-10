import { isBrowser } from './is-browser.util';

export enum ExecCommandEventsEnum {
  insertText = 'insertText',
  paste = 'paste',
  copy = 'copy',
}

export function execCommand(command: ExecCommandEventsEnum, value?: string, showUi = false): boolean {
  if(!isBrowser()) return false;

  return document!.execCommand(
    command,
    showUi,
    value
  );
}

export function pasteTextFromClipboard(): void {
  if(!isBrowser()) return;
  try {
    navigator!.clipboard.readText();
  } catch {
    console.error('Pasted Failed.');
  }
}
