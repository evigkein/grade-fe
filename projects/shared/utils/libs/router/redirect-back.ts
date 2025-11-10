import {Router} from '@angular/router';

export function redirectBack(router: Router, fallbackUrl: string): void {
  const referrer = document.referrer;
  const ourAppUrl = 'localh';
  const redirectUrl = referrer && referrer.includes(ourAppUrl) ? referrer : '';
  redirectUrl ? window.history.back() : router.navigateByUrl(`/${fallbackUrl}`)
}
