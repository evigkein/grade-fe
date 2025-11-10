export type DeviceType = 'mobile' | 'tablet' | 'desktop' | 'desktop-small' | 'desktop-medium' | 'desktop-large';

const SM = 576;
const MD = 768;
const LG = 992;
const XL = 1200;
const XXL = 1400;

export const WINDOW_WIDTH_OFFSET = 1;

export const TABLET_MIN = MD;
export const TABLET_MAX = LG - WINDOW_WIDTH_OFFSET;

export const DESKTOP_SMALL_MIN = LG;
export const DESKTOP_SMALL_MAX = XL;

export const DESKTOP_MEDIUM_MIN = XL;
export const DESKTOP_MEDIUM_MAX = XXL - WINDOW_WIDTH_OFFSET;

export const DESKTOP_LARGE_MIN = XXL;
