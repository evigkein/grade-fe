import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { CustomImageDirective } from '@shared/directives/ui/img/img.directive';
import { SvgIconComponent } from '@ui/modules/svg-icon/svg-icon.component';


export type ServiceCardProps = {
  icon: string;
  iconAlt: string;
  title: string;
  description: string;
  index: number;
};

@Component({
  selector: 'p-home-services',
  standalone: true,
  imports: [CommonModule, TranslateModule, CustomImageDirective, SvgIconComponent],
  templateUrl: './home-services.component.html',
  styleUrls: ['./home-services.component.scss']
})
export class HomeServicesComponent {
  services = signal<ServiceCardProps[]>([
    {
      icon: 'mobile',
      iconAlt: 'home.services.card1.iconAlt',
      title: 'home.services.card1.title',
      description: 'home.services.card1.description',
      index: 0
    },
    {
      icon: 'desktop',
      iconAlt: 'home.services.card2.iconAlt',
      title: 'home.services.card2.title',
      description: 'home.services.card2.description',
      index: 1
    },
    {
      icon: 'team',
      iconAlt: 'home.services.card3.iconAlt',
      title: 'home.services.card3.title',
      description: 'home.services.card3.description',
      index: 2
    },
    {
      icon: 'ai',
      iconAlt: 'home.services.card4.iconAlt',
      title: 'home.services.card4.title',
      description: 'home.services.card4.description',
      index: 3
    }
  ]);

  trackByIndex(index: number, item: ServiceCardProps): number {
    return item.index;
  }
}
