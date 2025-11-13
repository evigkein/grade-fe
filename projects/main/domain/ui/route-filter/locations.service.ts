import { Injectable, Inject, PLATFORM_ID, TransferState, makeStateKey } from '@angular/core';
import { isBrowser } from '@utils/helpers/browser/is-browser.util';
import { Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { ApiLocationsService } from '@shared/domain/api/swagger/services/api-locations.service';
import { ILocationSchema } from '@shared/domain/api/swagger/models/i-location-schema';
import { ETransferState } from '@shared/domain/main/constants/transfer-state';

@Injectable({ providedIn: 'root' })
export class LocationsApiService {
  constructor(
    private api: ApiLocationsService,
    private ts: TransferState,
  ) {}

  get(query: string = ''): Observable<ILocationSchema[]> {
    const KEY = this.key(query);
    const cached = this.ts.get(KEY, null as unknown as ILocationSchema[]);

    if (cached) {
      if (!isBrowser()) this.ts.remove(KEY);
      return of(cached);
    }

    return this.api.locationsApiControllerFind({ name: query }).pipe(
      map(res => res?.data ?? []),
      tap(data => {
        if (isBrowser()) this.ts.set(KEY, data);
      })
    );
  }

  private key(query: string) {
    const q = (query ?? '').trim().toLowerCase();
    return makeStateKey<ILocationSchema[]>(`${ETransferState.Locations}:${q}`);
  }
}
