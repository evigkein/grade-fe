import { inject, Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { getUId } from '../../../../utils/helpers/different';
import {IModalParams} from './modal.interface';

export function _MODAL(): ModalService {
  return inject(ModalService)
}

@Injectable({providedIn: 'root',})
export class ModalService {
  public modalsQueue$ = new Subject<IModalParams[]>();
  private modalsQueue: IModalParams[] = [];

  // private maxModalsAmount: Record<DeviceName, number> = {
  //   mobile: 3,
  //   tablet: 3,
  //   bigTablet: 3,
  //   desktop: 3,
  // };
  private maxModalsAmount = 3;

  private baseZIndex = 203;

  constructor() {}

  public isLastModal(id: string): boolean {
    return this.modalsQueue[this.modalsQueue.length - 1].id === id;
  }

  getLastModal(): IModalParams {
    return this.modalsQueue[this.modalsQueue.length - 1];
  }

  public openModal(modalParams: IModalParams): string | null {
    const modalsAmount = this.modalsQueue.length;
    let currentDevice: string;

    if (modalsAmount < this.maxModalsAmount) {
      modalParams.id = modalParams.id || getUId('modal_');
      modalParams.isOverlayHidden = modalParams.isOverlayHidden ?? false;

      if (!modalParams.zIndex) {
        if (!this.modalsQueue.length) {
          modalParams.zIndex = this.baseZIndex;
        } else {
          modalParams.zIndex =
            (this.getLastModal()?.zIndex ?? 0) + 1 ||
            this.baseZIndex;
        }
      }

      this.modalsQueue.push(modalParams);
      this.modalsQueue$.next(this.modalsQueue);

      return modalParams.id;
    }
    return null
  }

  public closeModal(
    id: string,
    forceClose = false,
    outsideClick = false,
  ): void {
    const index = this.modalsQueue.findIndex((param) => param.id === id);
    const modal = this.modalsQueue[index];

    if (index >= 0) {
      if (modal.closeAction && !forceClose) {
        modal.closeAction(outsideClick);
      } else {
        this.modalsQueue.splice(index, 1);
        this.modalsQueue$.next(this.modalsQueue);
      }
    }
  }

  public closeAllModals(): void {
    // Меняем ссылку на массив потому что в методе closeModal меняется длина массива
    // и из-за этого не все итерации выполняются
    [...this.modalsQueue].forEach((modal) => this.closeModal(modal.id!));
  }

  public getModal(id: string): IModalParams | undefined {
    return this.modalsQueue.find((model) => model.id === id);
  }

  public closeAllModalsWithoutActions(): void {
    this.modalsQueue = [];
    this.modalsQueue$.next(this.modalsQueue);
  }
}
