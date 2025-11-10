export function getQueryParamsFromUrl(): { [key: string]: string } {
  const queryParams: { [key: string]: string } = {};
  const queryString = window.location.search.slice(1); // Убираем знак вопроса

  if (queryString) {
    const pairs = queryString.split('&');
    pairs.forEach(pair => {
      const [key, value] = pair.split('=');
      queryParams[key] = decodeURIComponent(value);
    });
  }

  return queryParams;
}
