import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output, } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

export type TBudgeType = 'mentor' | 'supervisor'
export type TBudgeColor = 'purple' | 'pink'

@Component({
  selector: 'p-budge',
  templateUrl: './budge.component.html',
  styleUrls: ['./budge.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule, TranslateModule]
})
export class BudgeComponent implements OnInit {
  @Input({required: true}) text: string = '';
  @Input() type: TBudgeType = 'mentor';
  @Input() color: TBudgeColor = 'purple';
  @Output() action = new EventEmitter();

  ngOnInit() {
    // this.text =
  }
}
