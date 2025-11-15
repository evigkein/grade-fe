import { HttpInterceptorFn } from '@angular/common/http';
import { isSSR } from '@utils/helpers/browser/is-browser.util';

export const githubInterceptor: HttpInterceptorFn = (req, next) => {
  if (isSSR()) return next(req);
  const newUrl = transformGithubAssetsUrl(req.url);
  if (newUrl === req.url) return next(req);
  const modified = req.clone({ url: newUrl });
  return next(modified);
};

export function transformGithubAssetsUrl(url: string): string {
  if (isSSR()) return url;
  const isGithub = window.location.hostname.includes('github.io');
  if (!isGithub) return url;

  if (url.startsWith('/assets/')) return `/grade-fe${url}`;
  return url;
}
