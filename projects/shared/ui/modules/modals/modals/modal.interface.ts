import { TemplateRef } from '@angular/core';

export interface IModalParams {
  templateRef: TemplateRef<any>;
  templateCtx?: { [key: string]: unknown }; // DO NOT PASS STREAMS HERE
  id?: string;
  zIndex?: number;
  isClickOutsideDisabled?: boolean;
  isOverlayTransparent?: boolean;
  closeAction?: (outsideClick?: boolean) => any;
  isOverlayHidden?: boolean;
  offsetForSmartBanner?: boolean;
}
