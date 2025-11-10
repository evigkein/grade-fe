import {
  DESKTOP_LARGE_MIN,
  DESKTOP_MEDIUM_MAX,
  DESKTOP_MEDIUM_MIN,
  DESKTOP_SMALL_MAX,
  DESKTOP_SMALL_MIN,
  DeviceType,
  TABLET_MAX,
  TABLET_MIN,
} from './device-size.constants';

export function mapWidthToDevice(width: number): DeviceType {
  if (isWidthDesktopLarge(width)) {
    return 'desktop-large';
  }

  if (isWidthDesktopMedium(width)) {
    return 'desktop-medium';
  }

  if (isWidthDesktopSmall(width)) {
    return 'desktop-small';
  }

  if (isWidthTablet(width)) {
    return 'tablet';
  }

  return 'mobile';
}

export function isMobile(type: string): type is 'mobile' {
  return type === 'mobile';
}

export function isTablet(type: string): type is 'tablet' {
  return type === 'tablet';
}

export function isDesktop(type: string): type is 'desktop' {
  return type === 'desktop';
}

export function isSmallDesktop(type: string): type is 'desktop-small' {
  return type === 'desktop-small';
}

export function isMediumDesktop(type: string): type is 'desktop-medium' {
  return type === 'desktop-medium';
}

export function isDesktopSmallOrSmaller(type: string): boolean {
  return type === 'mobile' || type === 'tablet' || type === 'desktop-small';
}

export function isWidthTablet(width: number): boolean {
  return width > TABLET_MIN && width < TABLET_MAX;
}

export function isWidthDesktopSmall(width: number): boolean {
  return width >= DESKTOP_SMALL_MIN && width < DESKTOP_SMALL_MAX;
}

export function isWidthDesktopMedium(width: number): boolean {
  return width >= DESKTOP_MEDIUM_MIN && width < DESKTOP_MEDIUM_MAX;
}

export function isWidthDesktopLarge(width: number): boolean {
  return width >= DESKTOP_LARGE_MIN;
}
