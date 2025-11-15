import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, computed, inject } from '@angular/core';
import { SvgIconComponent } from '@shared/ui/modules/svg-icon/svg-icon.component';
import { DeviceService } from '@shared/services/device/device.service';
import { ButtonComponent } from '@ui/components/button/button.component';
import { TagsComponent } from '@ui/components/tags/tags.component';
import { ITag } from '@ui/components/tags/tags.interface';
import { TariffToTagsPipe } from '../../../main/pages/route/pipes/tariff-to-tags';
import { CustomImageDirective } from '../../directives/ui/img/img.directive';
import { ITariffPriceItemDto } from '../../domain/api/swagger/models/i-tariff-price-item-dto';
import { ITariffSchema } from '../../domain/api/swagger/models/i-tariff-schema';

@Component({
  selector: 'p-tariff-card',
  templateUrl: './tariff-price-card.component.html',
  styleUrls: ['./tariff-price-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule, SvgIconComponent, TagsComponent, ButtonComponent, CustomImageDirective, TariffToTagsPipe],
})
export class TariffCardComponent {
  @Input() tariff!: ITariffSchema;
  @Input() name!: string;
  @Input() description!: string;
  @Input() image!: string;
  @Input() price!: number;
  @Input() carModels!: string;
  @Input() tags!: ITag[];
  @Output() action = new EventEmitter<ITariffSchema>();

  deviceService = inject(DeviceService);
  isNotMobile = computed(() => this.deviceService.currentWidth() > 400);

  onSelect(): void {
    this.action.emit(this.tariff);
  }
}
