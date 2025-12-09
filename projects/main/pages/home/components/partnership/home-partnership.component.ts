import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'p-home-partnership',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './home-partnership.component.html',
  styleUrls: ['./home-partnership.component.scss']
})
export class HomePartnershipComponent {
  partnershipItems = signal<string[]>([
    'home.partnership.item1',
    'home.partnership.item2',
    'home.partnership.item3',
    'home.partnership.item4'
  ]);

  trackByIndex(index: number, item: string): number {
    return index;
  }
}