import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import { TranslatePipe } from '@ngx-translate/core';
import { NzAutocompleteTriggerDirective } from 'ng-zorro-antd/auto-complete';
import { AutoFocusDirective } from '../../../../directives/ui/auto-focus.directive';
import { StopEventsDirective } from '../../../../directives/utils';
import { BlurListenerDirective } from '../../../../directives/utils/on-blur.directive';
import { ButtonComponent } from '../../../components/button/button.component';
import { ReviewCardComponent } from '../../../features/review-card/review-card.component';
import { SvgIconComponent } from '../../../modules/svg-icon/svg-icon.component';
import { LabelComponent } from '../../components/input-label/input-label.component';
import { InputInvalidFocusDirective } from '../../directives/input-invalid-focus.directive';
import { MaskDirective } from '../../directives/masks/mask.directive';
import { DigitOnlyDirective } from '../../directives/validation/digit-only.directive';
import { LettersOnlyDirective } from '../../directives/validation/letters-only.directive';
import { NoSymbolsDirective } from '../../directives/validation/no-symbols.directive';
import { AutoResizeDirective } from './directives/auto-resize.directive';
import {InputComponent} from './input.component';

@NgModule({
  imports: [
    ReactiveFormsModule,
    CommonModule,
    AutoResizeDirective,
    LabelComponent,
    SvgIconComponent,
    ButtonComponent,
    StopEventsDirective,
    DigitOnlyDirective,
    NzAutocompleteTriggerDirective,
    TranslatePipe,
    BlurListenerDirective,
    AutoFocusDirective,
    InputInvalidFocusDirective,
    DigitOnlyDirective,
    LettersOnlyDirective,
    NoSymbolsDirective,
    MaskDirective,
    ReviewCardComponent,
  ],
  declarations: [InputComponent],
  exports: [ReactiveFormsModule, InputComponent],
})
export class InputModule {
}
