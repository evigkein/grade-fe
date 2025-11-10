import {CommonModule} from '@angular/common';
import { booleanAttribute, ChangeDetectionStrategy, Component, Input, OnChanges, OnInit } from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {RouterLink, RouterLinkActive} from '@angular/router';
import {ISimpleChanges} from '@core';
import {TranslateModule} from '@ngx-translate/core';
import { SvgIconComponent } from '../../../ui/modules/svg-icon/svg-icon.component';
import {CustomControlAccessor} from '../../custom-control-accessor';
import {ITabOption} from './tabs.interface';

export type TTabType = '' | 'link' | 'tag' | 'button';

@Component({
  selector: 'p-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLinkActive, RouterLink, TranslateModule, SvgIconComponent]
})
export class TabsComponent extends CustomControlAccessor implements OnChanges {
  @Input({required: true}) options!: ITabOption[];
  @Input() activeTab!: string | string[];
  @Input() type: TTabType = 'link';
  @Input({transform: booleanAttribute}) isMultiple = false;
  @Input({transform: booleanAttribute}) isCol = false;

  ngOnChanges({activeTab}: ISimpleChanges<TabsComponent>) {
    if (this.isAlertEnabled) this.isAlertEnabled = false;
    if (activeTab?.currentValue) {
      if (this.isMultiple) {
        this.formControl.setValue(activeTab?.currentValue, {emitEvent: false});
      } else {
        this.formControl.setValue(Array.isArray(activeTab?.currentValue) ? activeTab?.currentValue[0] : activeTab?.currentValue, {emitEvent: false});
      }
    }
  }

  tabAction(value: any) {
    if (this.isMultiple) {
      const currentValue = this.formControl.value || [];
      const newValue = currentValue.includes(value)
        ? currentValue.filter((v: any) => v !== value)
        : [...currentValue, value];
      this.formControl.setValue(newValue);
    } else {
      this.formControl.setValue(value);
    }
  }

  isTabActive(value: any): boolean {
    if (this.isMultiple) {
      return (this.formControl.value || []).includes(value);
    }
    return this.formControl.value === value;
  }
}
