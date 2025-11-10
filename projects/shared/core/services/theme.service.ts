import {DOCUMENT} from '@angular/common';
import {Inject, Injectable, Renderer2, RendererFactory2} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import { destroy } from '../../utils/libs/rxjs';

export enum ETheme {
  Dark = 'theme--dark',
  Light = 'theme--light'
}

export type TTheme = 'theme--dark' | 'theme--light' | keyof ETheme

@Injectable({providedIn: 'root'})
export class ThemeService {
  private _currentTheme$ = new BehaviorSubject<TTheme>(ETheme.Light);
  currentTheme$: Observable<TTheme> = this._currentTheme$.asObservable();
  rootElement = this.document.documentElement;

  private renderer: Renderer2;
  private destroy$ = destroy();

  constructor(
    private rendererFactory: RendererFactory2,
    @Inject(DOCUMENT) private document: Document
  ) {
    this.renderer = this.rendererFactory.createRenderer(null, null);
    this.rootElement = this.document.documentElement;
    this.renderer.addClass(this.rootElement, 'theme');

    this.currentTheme$.pipe(this.destroy$())
      .subscribe((theme) => {
        this.updateRootThemeClass(theme);
      });
    this.setSettings();
  }

  setCurrentTheme(theme: TTheme): void {
    this._currentTheme$.next(theme);
  }

  getCurrentTheme(): TTheme {
    return this._currentTheme$.getValue();
  }

  private updateRootThemeClass(theme: TTheme) {
    Object.values(ETheme).forEach(t => {
      this.renderer.removeClass(this.rootElement, t);
    });

    this.renderer.addClass(this.rootElement, theme.toString());
  }

  private setSettings(): void {
    const rootElement = this.document.documentElement;
    this.renderer.addClass(rootElement, 'theme--settings');
  }
}
