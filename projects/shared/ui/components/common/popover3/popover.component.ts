import {
  Component,
  ChangeDetectionStrategy,
  TemplateRef,
  input,
  output,
  signal,
  effect,
  booleanAttribute,
  HostBinding
} from '@angular/core';

import { CommonModule } from '@angular/common';
import { OverlayModule, ConnectedPosition } from '@angular/cdk/overlay';

@Component({
  selector: 'p-popover3',
  standalone: true,
  imports: [CommonModule, OverlayModule],
  templateUrl: './popover.component.html',
  styleUrls: ['./popover.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomPopover3Component {

  // ----- INPUTS -----
  template = input.required<TemplateRef<any>>();
  position = input<'top'|'bottom'|'left'|'right'|'auto'>('bottom');
  trigger = input<'click'|'hover'|'focus'|'manual'>('click');

  hasBackdrop = input(false, { transform: booleanAttribute });
  arrow = input(true, { transform: booleanAttribute });
  isVisible = input(false, { transform: booleanAttribute });

  // ----- OUTPUT -----
  isVisibleChange = output<boolean>();

  // ----- INTERNAL STATE -----
  visible = signal(false);

  constructor() {

    // sync external -> internal
    effect(() => {
      this.visible.set(this.isVisible());
      console.log(this.isVisible());
    });

    // sync internal -> external
    effect(() => {
      this.isVisibleChange.emit(this.visible());
    });
  }

  // ----- POSITIONS -----
  get positions(): ConnectedPosition[] {
    const primary = this.position();

    const top: ConnectedPosition = {
      originX: 'center', originY: 'top',
      overlayX: 'center', overlayY: 'bottom',
      offsetY: -8
    };

    const bottom: ConnectedPosition = {
      originX: 'center', originY: 'bottom',
      overlayX: 'center', overlayY: 'top',
      offsetY: 8
    };

    const left: ConnectedPosition = {
      originX: 'start', originY: 'center',
      overlayX: 'end', overlayY: 'center',
      offsetX: -8
    };

    const right: ConnectedPosition = {
      originX: 'end', originY: 'center',
      overlayX: 'start', overlayY: 'center',
      offsetX: 8
    };

    if (primary === 'auto') {
      return [bottom, top, right, left]; // priority ↑
    }

    if (primary === 'top') return [top, bottom, right, left];
    if (primary === 'left') return [left, right, top, bottom];
    if (primary === 'right') return [right, left, top, bottom];

    return [bottom, top, right, left]; // default bottom
  }


  // ----- TRIGGERS -----

  onTriggerClick(ev: MouseEvent) {
    console.log(ev);
    if (this.trigger() !== 'click') return;
    if (this.visible()) return;
    this.visible.set(true);
  }

  onTriggerMouseEnter() {
    if (this.trigger() !== 'hover') return;
    this.visible.set(true);
  }

  onTriggerMouseLeave() {
    if (this.trigger() !== 'hover') return;
    this.visible.set(false);
  }

  onTriggerFocus() {
    if (this.trigger() !== 'focus') return;
    if (this.visible()) return;
    this.visible.set(true);
  }

  // ----- CDK OVERLAY EVENTS -----

  onBackdropClick() {
    this.hide();
  }

  onDetach() {
    this.visible.set(false);
  }

  // ----- PUBLIC API -----
  show() { this.visible.set(true); }
  hide() { this.visible.set(false); }
  toggle() {
    if (this.visible()) return;
    this.visible.set(true);
  }
}
