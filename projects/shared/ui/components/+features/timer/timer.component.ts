import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { Observable, map } from 'rxjs';
import { startCountdown$ } from '../../../../utils/helpers/count-down';

@Component({
  selector: 'p-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.scss'],
  standalone: true,
  imports: [CommonModule]
})
export class TimerComponent implements OnInit {
  @Input({ required: true }) waitingTime!: string; // 3d2h15m45s

  displayTime$!: Observable<string>;

  ngOnInit(): void {
    const seconds = parseDurationToSeconds(this.waitingTime);
    const finishedAt = new Date(Date.now() + seconds * 1000).toISOString();

    this.displayTime$ = startCountdown$(finishedAt, 'full').pipe(
      map(([dd, hh, mm, ss]) => {
        const dayPart = dd !== '00' ? `${dd}d ` : '';
        return `${dayPart}${hh}:${mm}:${ss}`;
      })
    );
  }
}

export function parseDurationToSeconds(input: string): number {
  const regex = /(\d+)([dhms])/g;
  let totalSeconds = 0;

  const multipliers: Record<string, number> = {
    d: 86400, // 24 * 60 * 60
    h: 3600,  // 60 * 60
    m: 60,
    s: 1,
  };

  let match: RegExpExecArray | null;
  while ((match = regex.exec(input)) !== null) {
    const value = parseInt(match[1], 10);
    const unit = match[2];

    if (!multipliers[unit]) {
      throw new Error(`Invalid time unit: ${unit}`);
    }

    totalSeconds += value * multipliers[unit];
  }

  return totalSeconds;
}
