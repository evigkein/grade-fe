import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import {
  NzAutocompleteComponent,
  NzAutocompleteOptionComponent,
  NzAutocompleteTriggerDirective
} from 'ng-zorro-antd/auto-complete';
import { TooltipHelpComponent } from '../../../components/features/tooltip/tooltip-help/tooltip-help.component';
import { InputModule } from '../input/input.module';
import { AutocompleteComponent } from './autocomplete.component';

@NgModule({
  imports: [CommonModule, NzAutocompleteComponent, NzAutocompleteOptionComponent, NzAutocompleteTriggerDirective, ReactiveFormsModule, TooltipHelpComponent, InputModule],
  declarations: [AutocompleteComponent],
  exports: [AutocompleteComponent, ReactiveFormsModule],
})
export class AutocompleteModule {
}
