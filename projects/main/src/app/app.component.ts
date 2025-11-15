import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LocalCacheService } from '@core/modules/local-cache.service';
import { _TRANSLATE, TLang, TranslateFacade } from '@core/modules/translate';
import { ThemeService } from '@core/services/theme.service';
import { HotKeysGlobalComponent } from '@shared/features/hot-keys-global/hot-keys-global.component';
import { SeoService } from '@shared/services';
import {
  ImageGalleryModalComponent
} from '@shared/ui/components/+features/image-gallery/modal/image-gallery-modal.component';
import { ModalsModule } from '@shared/ui/modules/modals/modals/modal/modals.module';
import { NotificationsContainerComponent } from '@shared/ui/modules/notifications/container/container.component';
import { getStorageItem } from '@utils/helpers/storage';
import { destroy } from '@utils/libs/rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [RouterOutlet, ModalsModule, NotificationsContainerComponent, ImageGalleryModalComponent, HotKeysGlobalComponent],
})
export class AppComponent implements OnInit {
  title = 'main';

  private theme = inject(ThemeService);
  lang = _TRANSLATE();
  private seo = inject(SeoService);

  async ngOnInit() {
    this.theme.setCurrentTheme('theme--dark');
    // this.lang.setLanguage('en');
    // this.initUser();
    this.lang.initTranslate();
    //
    this.seo.updateSeo({
      // this.lang.translate('seo.main.title')
      title: 'Поездки на такси по России',
      description: 'Добирайтесь без стресса',
    });
  }

  private initUser(): void {
    // this.lang.setLanguage('en');
    // const user = this.userService.user();
    // if (user) {
    //   user.user.lang && this.lang.setLanguage(user.user.lang);
    // } else {
    //   const lang = getStorageItem<TLang>('lang');
    //   lang && this.lang.setLanguage(lang);
    // }
  }

}
