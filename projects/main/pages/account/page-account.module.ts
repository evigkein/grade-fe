import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MenuComponent } from '@shared/ui/components/+features/menu/menu.component';
import { ButtonComponent } from '@shared/ui/components/button/button.component';
import { ModalsModule } from '@shared/ui/modules/modals/modals/modal/modals.module';

import { PageSettingsRoutingModule } from './page-settings-routing.module';
import {AccountEntryComponent} from './pages/entry/account.component';

@NgModule({
  imports: [
    CommonModule,
    PageSettingsRoutingModule,
    MenuComponent,
    ButtonComponent,
    ModalsModule,
  ],
  declarations: [AccountEntryComponent],
  exports: [AccountEntryComponent],
})
export class PageAccountModule {
}
