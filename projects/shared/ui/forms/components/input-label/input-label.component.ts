import { NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';
import { TooltipHelpComponent } from '../../../components/features/tooltip/tooltip-help/tooltip-help.component';

export type TLabelAlign = 'center' | '';
export type TLabelFont = 'l' | '';
export type TLabelType = 'bold' | '';
export type TLabelSize = 'l' | '';

@Component({
  selector: 'p-input-label',
  template: `
    <label *ngIf="label" class="label" [for]="id"
           [class]="[
           'label--' + labelType,
           'label--size-' + labelSize,
           'label--align-' + alignLabel,
           ]">
      <div class="input__label-text">{{ label }}</div>
      <p-tooltip-help *ngIf="tooltipText" [tooltip]="tooltipText"></p-tooltip-help>
    </label>
  `,
  styleUrls: ['./input-label.component.scss'],
  standalone: true,
  imports: [
    NgIf,
    TooltipHelpComponent,
  ]
})
export class LabelComponent {
  @Input() id: string = '';
  @Input() label: string = '';
  @Input() tooltipText: string | any = '';
  @Input() alignLabel: TLabelAlign = '';
  @Input() font: TLabelFont = '';
  @Input() labelType: TLabelType = '';
  @Input() labelSize: TLabelSize = '';
}
