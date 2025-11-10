import {Component, OnInit} from '@angular/core';
import {TooltipPosition, TooltipTheme} from "./tooltip.enums";
import { NgClass } from '@angular/common';

@Component({
    selector: 'p-tooltip',
    templateUrl: './tooltip.component.html',
    styleUrls: ['./tooltip.component.scss'],
    standalone: true,
    imports: [
        NgClass
    ]
})
export class TooltipComponent implements OnInit {

  position: TooltipPosition = TooltipPosition.DEFAULT;
  theme: TooltipTheme = TooltipTheme.DEFAULT;
  tooltip = '';
  left = 0;
  top = 0;
  visible = false;

  constructor() {
  }

  ngOnInit(): void {
  }

}
