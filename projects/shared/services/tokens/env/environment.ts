import { isLocal } from '../../../utils/helpers/is-prod';
import { IEnvConfig } from './env-config.interface';

export const environment: IEnvConfig = {
  baseUrl: 'https://care-of-you.com',
  mainUrl: 'https://care-of-you.com',
  production: false,
  apiPrefix: '/api/',
  apiUrl: '/api/',
  wsUrl: isLocal() ? 'http://localhost:3333' : 'wss://care-of-you.com',
  adminId: '679072e6c66cd094f64edb2c',
  // adminId: '67931ef88b9415c31cd584f4', // TEST ID 13109257888
};

/*
 * For easier debugging in developnt mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */

// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
