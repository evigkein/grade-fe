import { Injectable } from '@angular/core';
// @ts-ignore
import { TOTP } from 'jsotp';

@Injectable({providedIn: 'root' })
export class OtpService {
  key = 'JBSWY3DPEHPK3PXP'

  constructor() { }

  generateOtp(): string {
    const totp = new TOTP(this.key);
    return totp.now();
  }

}

