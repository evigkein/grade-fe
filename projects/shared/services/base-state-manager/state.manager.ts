import { signal } from '@angular/core';
import {
  BehaviorSubject,
  combineLatest,
  distinctUntilChanged,
  map,
  Observable,
  shareReplay,
  startWith,
  switchMap,
  tap
} from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { skipEqual$ } from '../../utils/libs/rxjs';
import { debounceSafe$ } from '../../utils/libs/rxjs/debounce-safe';
import {Keys} from './keys.interface';

export abstract class StateManager<State, Settings> {
  protected _settings$ = new BehaviorSubject<Settings>(this.defaultSettings());
  private _state$ = new BehaviorSubject<State>(this.defaultState());
  private _reloadTrigger$ = new BehaviorSubject<null>(null);
  private _externalTriggers$: Observable<any>[] = [];
  isLoggingEnabled = false;
  state = signal<Partial<State>>(null!);
  settings = signal<Settings>(null!);

  settings$ = this._settings$.asObservable().pipe(startWith(this._settings$.getValue()), shareReplay(1));
  state$ = this.initState().pipe();

  protected abstract defaultSettings(): Settings;

  protected abstract defaultState(): State;

  protected abstract loadData(settings: Settings): Observable<Partial<State>>;

  protected defaultReloadTriggers(): Observable<any>[] {
    return [];
  }

  get$<K1 extends keyof State>(key1: K1): Observable<State[K1]>;
  get$<K1 extends keyof State, K2 extends keyof State[K1]>(key1: K1, key2: K2): Observable<State[K1][K2]>;
  get$<K1 extends keyof State, K2 extends keyof State[K1], K3 extends keyof State[K1][K2]>(
    key1: K1,
    key2: K2,
    key3: K3
  ): Observable<State[K1][K2][K3]>;
  get$(...keys: string[]): Observable<unknown> {
    return this.state$.pipe(
      map(state => keys.reduce((acc: any, key) => acc && acc[key], state)),
      skipEqual$(),
      shareReplay(1)
    );
  }

  getSetting$<K1 extends keyof Settings>(key1: K1): Observable<Settings[K1]>;
  getSetting$<K1 extends keyof Settings, K2 extends keyof Settings[K1]>(key1: K1, key2: K2): Observable<Settings[K1][K2]>;
  getSetting$<K1 extends keyof Settings, K2 extends keyof Settings[K1], K3 extends keyof Settings[K1][K2]>(
    key1: K1,
    key2: K2,
    key3: K3
  ): Observable<Settings[K1][K2][K3]>;
  getSetting$(...keys: string[]): Observable<unknown> {
    return this.settings$.pipe(
      map(state => keys.reduce((acc: any, key) => acc && acc[key], state)),
      skipEqual$(),
      shareReplay(1)
    );
  }

  getMultiple$<K extends Keys<State>>(...keys: K[]): Observable<Partial<Pick<State, K>>> {
    return this.state$.pipe(
      map(state => keys.reduce((acc, key) => ({...acc, [key]: state[key]}), {}))
    );
  }

  protected constructor() {
    this._externalTriggers$ = this.defaultReloadTriggers();
  }

  get settings$$(): Settings {
    return this._settings$.getValue();
  }

  get state$$(): State {
    return this._state$.getValue();
  }

  patchStates(updates: Partial<State>): void {
    this.state.set(updates);
    this._state$.next({...this.state$$, ...updates});
  }

  setState(updates: State): void {
    this._state$.next(updates);
  }

  patchSettings(updates: Partial<Settings>, isUpdate = true): void {
    this._settings$.next({...this.settings$$, ...updates});
    isUpdate && this.load();
  }

  setSettings(updates: Settings, isUpdate = true): void {
    this._settings$.next(updates);
    isUpdate && this.load();
  }

  patchSetting<K extends keyof Settings>(field: K, updates: Partial<Settings[K]>, isUpdate = true, isPatch = true): void {
    isObject(updates) && isPatch
      ? this._settings$.next({...this.settings$$, [field]: {...this.settings$$[field], ...updates}})
      : this._settings$.next({...this.settings$$, [field]: updates});
    isUpdate && this.load();
  }

  patchState<K extends keyof State>(field: K, updates: Partial<State[K]>, isPatch = true): void {
    isObject(updates) && isPatch
      ? this._state$.next({...this.state$$, [field]: {...this.state$$[field], ...updates}})
      : this._state$.next({...this.state$$, [field]: updates});
  }

  load(): void {
    this._reloadTrigger$.next(null);
  }

  reset(isSettings = false): void {
    this.setState(this.defaultState());
    isSettings && this.setSettings(this.defaultSettings());
  }

  private initState(): Observable<State> {
    return combineLatest([this.settings$, this._reloadTrigger$, ...this._externalTriggers$])
      .pipe(
        debounceTime(100),
        tap(([s]) => this.settings.set(s)),
        switchMap(([settings]) => this.loadData(settings)),
        tap(data => this.isLoggingEnabled && console.log(data)),
        tap(data => this.handleData(data)),
        switchMap(() => this._state$),
        startWith(this._state$.getValue()),
        shareReplay(1),
      );
  }

  protected abstract handleData(data: Partial<State>): void;
}

function isObject(value: any): boolean {
  return value !== null && typeof value === 'object' && !Array.isArray(value);
}
