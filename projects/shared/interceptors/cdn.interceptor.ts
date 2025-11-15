import { HttpInterceptorFn } from '@angular/common/http';

export const githubInterceptor: HttpInterceptorFn = (req, next) => {
  if (typeof window === 'undefined') {
    return next(req);
  }

  const isGithub = window.location.hostname.includes('github.io');

  // Ловим только /assets, которые идут через HttpClient (i18n и т.п.)
  if (isGithub && req.url.startsWith('/assets/')) {
    const modified = req.clone({
      url: `/grade-fe${req.url}`,
    });
    return next(modified);
  }

  return next(req);
};
