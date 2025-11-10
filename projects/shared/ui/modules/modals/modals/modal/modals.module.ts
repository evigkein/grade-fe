import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {TranslateModule} from '@ngx-translate/core';
import { StopEventsDirective } from '../../../../../directives/utils';
import { TabTrapDirective } from '../../../../../directives/utils/tab-trap.directive';
import { DisableBodyScrollDirective } from '../../../../../services/body/disable-body-scroll.directive';
import { ButtonComponent } from '../../../../components/button/button.component';

import { SvgIconComponent } from '../../../svg-icon/svg-icon.component';
import { MouseClickDirective } from '../../directives/click-up-dowm.directive';

import { ModalComponent } from './modal/modal.component';
import { ModalsContainerComponent } from './modals-container/modals-container.component';

@NgModule({
  imports: [
    CommonModule,
    SvgIconComponent,
    TabTrapDirective,
    ButtonComponent,
    DisableBodyScrollDirective,
    StopEventsDirective,
    TranslateModule,
    MouseClickDirective,
  ],
  declarations: [
    ModalComponent,
    ModalsContainerComponent,
  ],
  exports: [
    ModalComponent,
    ModalsContainerComponent,
  ],
})
export class ModalsModule {}
