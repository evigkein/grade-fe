import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
  model,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { TLang, TranslateFacade } from '@core/modules/translate';
import { TranslateModule } from '@ngx-translate/core';
import { ClickOutsideDirective } from '../../../directives/utils/click-outside.directive';
import { SkipHydrationDirective } from '../../../directives/utils/skip-hydration.directive';
import { PopoverComponent } from '../../components/common/popover/popover.component';
import { SvgIconComponent } from '../../modules/svg-icon/svg-icon.component';
import { langOptions } from './options.const';

@Component({
  selector: 'p-change-language',
  templateUrl: './change-language.component.html',
  styleUrls: ['./change-language.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    CommonModule,
    PopoverComponent,
    SkipHydrationDirective,
    ClickOutsideDirective,
    TranslateModule,
    SvgIconComponent,
  ],
})
export class ChangeLanguageComponent {
  header = input(false, {transform: booleanAttribute});
  isVisible = model(false);

  private lang = inject(TranslateFacade);

  currentLang = computed(() => this.lang.lang());

  options = langOptions;

  setLang = (lang: TLang) => {
    const api = this.lang;

    // SSR-safe — document может быть undefined
    if (typeof document !== 'undefined' && (document as any).startViewTransition) {
      (document as any).startViewTransition(() => {
        api.setLanguage(lang);
        this.isVisible.set(false);
      });
      return;
    }

    api.setLanguage(lang);
    this.isVisible.set(false);
  };

  handler = (v: boolean) => {
    this.isVisible.set(v);
  };
}
