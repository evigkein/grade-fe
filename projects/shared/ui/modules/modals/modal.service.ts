import {ComponentType} from '@angular/cdk/overlay';
import {Injectable} from '@angular/core';
import {NzModalService} from 'ng-zorro-antd/modal';
import {Observable} from 'rxjs';

export interface IModalConfig {
  title?: string;
  width?: number;
  className?: string;
  zIndex?: number;
  isCentered: boolean;
}

@Injectable({providedIn: 'root'})
export class ModalService {
  constructor(private modal: NzModalService) {
  }

  open<C, T, R>(component: ComponentType<C>, data?: T, config?: IModalConfig): Observable<R> {
    // const modalRef = this.modal.create(component);
    const modalRef = this.modal.create({
      nzContent: component,

      nzClassName: config?.className,
      nzZIndex: config?.zIndex,
      nzCentered: config?.isCentered ?? true,
      nzTitle: config?.title ?? undefined,
      nzFooter: null,
      nzCloseIcon: undefined,
    });

    return modalRef.afterClose
  }

  // alert<R = any>(alertText: string): Observable<R> {
  //   return this.open<string | null, R>(AlertModal, alertText);
  // }
  //
  // openConfirm(data: IConfirmModal): Observable<boolean> {
  //   const {title, subTitle, actionConfirm} = data;
  //   return this.open<IConfirmModal | null, boolean>(ConfirmModal, {
  //     title,
  //     subTitle: data.subTitle ?? '',
  //     actionConfirm,
  //     actionCancel: data.actionCancel ?? 'Отмена',
  //     confirmButtonType: data.confirmButtonType ?? 'red',
  //     cancelButtonType: data.cancelButtonType ?? 'transparent',
  //   });
  // }
  //
  // openConfirmRemove(title: string, subTitle: string, actionConfirm = 'Удалить'): Observable<boolean> {
  //   return this.open<IConfirmModal | null, boolean>(ConfirmModal, {
  //     title,
  //     subTitle,
  //     actionConfirm,
  //     actionCancel: 'Отмена',
  //     confirmButtonType: 'red',
  //   });
  // }
}
