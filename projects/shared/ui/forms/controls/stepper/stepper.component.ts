import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, Output, signal } from '@angular/core';
import { ISimpleChanges } from '@core';
import { TranslateModule } from '@ngx-translate/core';

export interface IStepOption<T = any> {
  label: string;
  id: T;
}

@Component({
  selector: 'p-stepper',
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.scss'],
  standalone: true,
  imports: [CommonModule, TranslateModule]
})
export class StepperComponent implements OnChanges {
  @Input({required: true}) steps: IStepOption[] = [];
  @Input({required: true}) activeStep = 1; // Изменено на 1, чтобы соответствовать нумерации с 1
  @Output() action = new EventEmitter<number>();

  activeSteps = signal<boolean[]>([]);

  ngOnChanges(changes: ISimpleChanges<StepperComponent>): void {
    this.updateActiveSteps();
  }

  onAction(index: number): void {
    if(index < this.activeStep) this.action.emit(index);
  }

  private updateActiveSteps(): void {
    this.activeSteps.set(this.steps.map((_, index) => index + 1 <= this.activeStep));
  }
}
