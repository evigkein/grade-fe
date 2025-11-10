export interface IMutationObserverConfig {
  childList: boolean;
  attributes: boolean;
  characterData: boolean;
  subtree: boolean;
}

const defaultConfig: IMutationObserverConfig = {
  childList: true,
  attributes: true,
  characterData: true,
  subtree: true,
};

export function mutationObserver(
  element: HTMLElement,
  callback: MutationCallback,
  config: Partial<IMutationObserverConfig> = defaultConfig
): MutationObserver | null {
  if (typeof MutationObserver === 'undefined') {
    // console.warn('MutationObserver is not supported in this browser.');
    return null;
  }
  const innerConfig = { ...defaultConfig, ...config };

  const observer = new MutationObserver(callback);
  observer.observe(element, innerConfig);

  return observer;
}
