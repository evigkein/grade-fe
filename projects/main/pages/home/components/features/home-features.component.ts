import { CommonModule, UpperCasePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, signal } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { CustomImageDirective } from '@shared/directives/ui/img/priority.directive';
import { SvgIconComponent } from '@ui/modules/svg-icon/svg-icon.component';

@Component({
  selector: 'p-home-features',
  templateUrl: './home-features.component.html',
  styleUrls: ['./home-features.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    CommonModule,
    SvgIconComponent,
    CustomImageDirective,
    TranslatePipe,
    UpperCasePipe
  ],
})
export class HomeFeaturesComponent {
  @Input() AAAA!: string;
  @Output() AAAA2 = new EventEmitter();

  featuresList = signal(featList());

  runOutput(): void {
    this.AAAA2.emit();
  }

}

function featList() {
  return [
    {
      icon: 'shield',
      title: 'home.features.b1.title',
      desc: 'home.features.b1.desc',
    },
    {
      icon: 'layers',
      title: 'home.features.b2.title',
      desc: 'home.features.b2.desc',
    },
    {
      icon: 'target',
      title: 'home.features.b3.title',
      desc: 'home.features.b3.desc',
    },
    {
      icon: 'briefcase',
      title: 'home.features.b4.title',
      desc: 'home.features.b4.desc',
    },
  ];
}

