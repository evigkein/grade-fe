import { HttpClient } from '@angular/common/http';
import { ElementRef, inject, NgZone, Renderer2, TransferState } from '@angular/core';
import { FormBuilder } from '@angular/forms';

export function HTTP(): HttpClient {
  return inject(HttpClient)
}

export function _TS(): TransferState {
  return inject(TransferState)
}

export function _ELREF(): ElementRef {
  return inject(ElementRef)
}

export function _R2(): Renderer2 {
  return inject(Renderer2)
}

export function _Zone(): NgZone {
  return inject(NgZone)
}

export function _FB(): FormBuilder {
  return inject(FormBuilder);
}
