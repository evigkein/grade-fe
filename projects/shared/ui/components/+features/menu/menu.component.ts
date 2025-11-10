import { NgForOf, NgIf, NgTemplateOutlet } from '@angular/common';
import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  inject,
  Input, OnInit,
  Output
} from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { StopEventsDirective } from '../../../../directives/utils';
import { FuncPipe } from '../../../../pipes/func.pipe';
import { slideInOutTopMenuAnimation } from '@utils/angular/animation/slide-in-out.animation';
import { getLocation } from '../../../../utils/helpers/browser/window.util';
import { SvgIconComponent } from '../../../modules/svg-icon/svg-icon.component';

export interface IMenuOption {
  title: string;
  icon?: string;
  iconSize?: string;
  url?: string;
  action?: string;
  isOpen?: boolean | undefined;
  isSubmenu?: boolean | undefined;
  subMenu?: IMenuOption[];
}

@Component({
  selector: 'p-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    NgForOf,
    SvgIconComponent,
    TranslateModule,
    StopEventsDirective,
    FuncPipe,
    RouterLinkActive,
    RouterLink,
    NgIf,
    NgTemplateOutlet
  ],
  animations: [slideInOutTopMenuAnimation]
})
export class MenuComponent implements OnInit {
  @Input({required: true}) options: IMenuOption[] = [];
  @Input({transform: booleanAttribute}) isHorizontal = false;
  @Output() action = new EventEmitter<string>();

  private router = inject(Router);

  ngOnInit() {
    this.openParentMenus();
  }

  onAction(e: IMenuOption): void {
    // if(e.url) this.router.navigate([e.url])
    this.action.emit(e.url);
  }

  toggleSubMenu(event: Event, option: IMenuOption): void {
    option.isOpen = !option.isOpen;
  }

  isActive(name?: string): boolean {
    console.log(name, getLocation()?.href?.includes(name!));
    return (getLocation()?.href || '').includes(name!);
  }

  private openParentMenus(): void {
    const location = getLocation();
    if (!location) return;

    const recursivelyOpen = (menuItems: IMenuOption[]) => {
      for (const item of menuItems) {
        if (item.subMenu && item.subMenu.length > 0) {
          if (item.subMenu.some(sub => this.isActive(sub.url))) {
            item.isOpen = true;
          }
          recursivelyOpen(item.subMenu);
        }
      }
    };

    recursivelyOpen(this.options);
  }
}
