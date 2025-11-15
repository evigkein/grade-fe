import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject, input, model, signal } from '@angular/core';
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
    SvgIconComponent
  ]
})
export class ChangeLanguageComponent {
  header = input(false);
  isVisible = model(false);

  private lang = inject(TranslateFacade);

  readonly currentLang = computed(() => this.lang.lang());

  readonly options = langOptions;

  setLang = (lang: TLang): void => {
    if (document.startViewTransition) {
      document.startViewTransition(() => {
        this.lang.setLanguage(lang);
        this.isVisible.set(false);
      });
    } else {
      // fallback для Safari < 17
      this.lang.setLanguage(lang);
      this.isVisible.set(false);
    }
  };

  handler = (v: boolean): void => {
    this.isVisible.set(v);
  };

  // setLang = (lang: TLang): void => {
  //   this.lang.setLanguage(lang);
  //   this.isVisible.set(false);
  // };
}
