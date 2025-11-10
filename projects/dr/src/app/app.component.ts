import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TranslateFacade } from '@core/modules/translate';
import { ThemeService } from '@core/services/theme.service';
import { SeoService } from '@shared/services';
import { ImageGalleryModalComponent } from '@ui/components/+features/image-gallery/modal/image-gallery-modal.component';
import { ModalsModule } from '@ui/modules/modals/modals/modal/modals.module';
import { NotificationsContainerComponent } from '@ui/modules/notifications/container/container.component';
import { isSSR } from '@utils/helpers/browser/is-browser.util';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [RouterOutlet, ModalsModule, NotificationsContainerComponent, ImageGalleryModalComponent],
})
export class AppComponent {
  private theme = inject(ThemeService);
  private lang = inject(TranslateFacade);
  private seo = inject(SeoService);

  ngOnInit() {
    this.theme.setCurrentTheme('theme--dark')
    this.initUser();

    this.seo.updateSeo({
      // this.lang.translate('seo.main.title')
      title: 'Поездки на такси по России',
      description: 'Добирайтесь без стресса',
    });
  }

  private initUser(): void {
    this.lang.setLanguage('ru');
    // const user = this.userService.user();
    // if (user) {
    //   user.user.lang && this.lang.setLanguage(user.user.lang);
    // } else {
    //   const lang = getStorageItem<TLang>('lang');
    //   lang && this.lang.setLanguage(lang);
    // }
  }

  isServer = isSSR();
}
