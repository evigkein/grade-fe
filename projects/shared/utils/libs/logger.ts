import { ReplaySubject } from 'rxjs';

const _stream$ = new ReplaySubject<any[]>(200);
const _sentry$ = new ReplaySubject<string[]>(100);

export const Logger = {
  stream$: _stream$.asObservable(),
  sentry$: _sentry$.asObservable(),

  sentry(id: string, link: any) {
    _sentry$.next([id, link]);
    console.log(...consoleChalk('sentry', intToRGB(hashCode('sentry'))), link);
  },

  create(name = ' ', isEnabled = true): (args: any[]) => void {
    return function log(...args: any[]) {
      if (isEnabled) {
        _stream$.next([isEnabled, intToRGB(hashCode(name)), name, args.join(' ')]);
        console.log(...consoleChalk(name, intToRGB(hashCode(name))), ...args);
      }
    };
  },

  logError(message: string) {
    console.log(...consoleChalk('ERROR', 'FF0000'), message);
  },
};

export const log = (name: string, args: any) => Logger.create(name)(args);

function consoleChalk(name: string, color = 'ff4081'): string[] {
  return [
    `%c${name}`,
    `background: #${color}; color: white; padding: 2px 5px; border-radius: 3px`,
  ];
}

function hashCode(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  return hash;
}

function intToRGB(i: number): string {
  const c: string = (i & 0x00ffffff).toString(16).toUpperCase();
  return '00000'.substring(0, 6 - c.length) + c;
}
