import {Observable, of} from 'rxjs';
import {StateManager} from './state.manager';

export abstract class StatePlainManager<State, Settings = unknown> extends StateManager<State, Settings> {
  // Override the constructor to initialize settings only if defaultSettings is defined
  protected constructor() {
    super();
    if (this.defaultSettings) {
      this._settings$.next(this.defaultSettings());
    }
  }

  // Override to provide a simpler default implementation
  protected defaultSettings(): Settings {
    return {} as Settings;
  }

  // Remove asynchronous behavior by overriding the method
  protected loadData(settings: unknown): Observable<Partial<State>> {
    return of(this.state$$)
  }

  // Remove any external triggers by overriding the method
  protected override defaultReloadTriggers(): Observable<any>[] {
    return [];
  }
}
