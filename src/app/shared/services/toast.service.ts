import { Config } from './../../core/config/config';
import { Injectable, TemplateRef } from '@angular/core';
import { Toast } from '../interfaces/toast';

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  toasts: any[] = [];

  constructor() {}

  show(textOrTpl: string | Toast | TemplateRef<any>, options: any = {}) {
    this.toasts.push({ textOrTpl, ...options });
  }

  remove(toast) {
    this.toasts = this.toasts.filter(t => t !== toast);
  }

  showSuccess(data: string) {
    this.show({header: Config.headerToastSuccess, body: data}, { classname: 'bg-success text-light', delay: Config.delayToast });
  }

  showError(data: string) {
    this.show({header: Config.headerToastError, body: data}, { classname: 'bg-danger text-light', delay: Config.delayToast });
  }

  showWarning(data: string) {
    this.show({header: Config.headerToastWarning, body: data}, { classname: 'bg-warning text-light', delay: Config.delayToast });
  }

  showCustom(data: Toast, options: any) {
    this.show({header: data.header, body: data.body}, { classname: options.classname, delay: Config.delayToast });
  }

  /* showStandard() {
    this.show('I am a standard toast');
  }

  showDanger(dangerTpl) {
    this.show(dangerTpl, { classname: 'bg-danger text-light', delay: 1000 });
  } */
}
