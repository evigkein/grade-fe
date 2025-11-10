import type { ActivatedRoute, ActivatedRouteSnapshot, Params } from '@angular/router';

// парсим руками потому что активный роут можно получить только из компонента,
// а слушать события в сервисе нам не интересно, на момент инициализации уже точно известно есть ли параметр,
// а позже его наличие или отсутствие нам нет необходимости, он нам нужен asap
export function urlParameter(name: string, search: string = location.search): string | null {
  if (search === '') {
    return null;
  }
  if (search.indexOf('?') > 1) {
    search = search.substr(search.indexOf('?'));
  }
  if (typeof URLSearchParams === 'function') {
    const params = new URLSearchParams(search);

    return params.has(name) ? params.get(name) : null;
  }

  if (search.indexOf('?') === 0) {
    search = search.slice(1);
  }

  const dict: Record<string, string> = {};

  const pairs = search.split('&');
  for (let j = 0; j < pairs.length; j++) {
    const value = pairs[j];
    const index = value.indexOf('=');

    if (-1 < index) {
      dict[decode(value.slice(0, index))] = decode(value.slice(index + 1));
    } else {
      if (value) {
        dict[decode(value)] = '';
      }
    }
  }
  return Object.prototype.hasOwnProperty.call(dict, name) ? dict[name] : null;
}

function decode(str: string): string {
  return str.replace(/[ +]/g, '%20').replace(/(%[a-f0-9]{2})+/gi, function (match: string) {
    return decodeURIComponent(match);
  });
}

/**
 * @link https://developer.mozilla.org/en-US/docs/Web/API/URL_API — API URL
 * @link https://developer.mozilla.org/ru/docs/Web/API/URLSearchParams — API URLSearchParams
 * @link https://github.com/whatwg/url/issues/531 — URL не работает без указания домена
 */
export function removeParameterFromPath(path: string, parameter: string): string {
  const fakeDomain = 'https://domain.com';

  const url = new URL(path, fakeDomain);
  const params = new URLSearchParams(url.search);

  params.delete(parameter);
  url.search = params.toString();

  return (
    url
      .toString()
      // Убираем trailing slash в конце пути
      .replace(/\/$/, '')
      // Убираем trailing slash перед get-параметрами
      .replace(/\/\?/, '?')
      // Убираем фейковый домен, который необходим для создания new URL()
      .replace(fakeDomain, '')
  );
}

export const extractRouteParams = (route: ActivatedRoute, paramsKey: string): string | null => {
  if (route.snapshot.params && paramsKey in route.snapshot.params) {
    return route.snapshot.params[paramsKey];
  }

  if (route.firstChild) {
    return extractRouteParams(route.firstChild, paramsKey);
  }

  return null;
};

export const replaceRouteParams = (
  routeSnapshot: ActivatedRouteSnapshot,
  replaceParams: Params,
): string[] => {
  const url: string[] = [];

  const firstSegment = replaceUrlSegment(routeSnapshot, replaceParams);

  if (firstSegment) {
    url.push(firstSegment);
  }

  while (routeSnapshot.firstChild) {
    routeSnapshot = routeSnapshot.firstChild;
    const segment = replaceUrlSegment(routeSnapshot, replaceParams);

    if (segment) {
      url.push(segment);
    }
  }

  return url;
};

const replaceUrlSegment = (snapshot: ActivatedRouteSnapshot, replaceParams: Params): string => {
  const { params, routeConfig } = snapshot;

  if (routeConfig?.path == null || routeConfig?.path === '') {
    return '';
  }

  if (routeConfig.path.startsWith(':')) {
    const [, key] = routeConfig.path.split(':');
    return replaceParams[key] ?? params[key];
  }

  return routeConfig.path;
};

export function urlQueryParams(search: string = location.search): Record<string, any> {
  const params = new URLSearchParams(search);
  const result: Record<string, any> = {};

  params.forEach((value, key) => {
    result[key] = value;
  });

  return result;
}
