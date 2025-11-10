import { InjectionToken } from '@angular/core';
import { IEnvConfig } from './env-config.interface';

export const EnvConfig: InjectionToken<IEnvConfig> = new InjectionToken<IEnvConfig>('EnvConfig');
