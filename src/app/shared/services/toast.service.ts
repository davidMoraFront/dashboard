import { TranslateService } from '@ngx-translate/core';
import { Config } from './../../core/config/config';
import { Injectable, TemplateRef } from '@angular/core';
import { Toast } from '../interfaces/toast';

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  toasts: any[] = [];
  headerToast: string = '';
  bodyToast: string = '';

  constructor(private translate: TranslateService) {}

  show(textOrTpl: string | Toast | TemplateRef<any>, options: any = {}) {
    this.toasts.push({ textOrTpl, ...options });
  }

  remove(toast) {
    this.toasts = this.toasts.filter(t => t !== toast);
  }

  translateMessage(header: string, data: string): void {
    this.translate.get(header).subscribe((resHeader: string) => this.headerToast = resHeader);
    this.translate.get(data).subscribe((resBody: string) => this.bodyToast = resBody);
  }

  showSuccess(data: string) {
    this.translateMessage(Config.headerToastSuccess, data);
    this.show({header: this.headerToast, body: this.bodyToast}, { classname: 'bg-success text-light', delay: Config.delayToast });
  }

  showError(data: string) {
    this.translateMessage(Config.headerToastError, data);
    this.show({header: this.headerToast, body: this.bodyToast}, { classname: 'bg-danger text-light', delay: Config.delayToast });
  }

  showWarning(data: string) {
    this.translateMessage(Config.headerToastWarning, data);
    this.show({header: this.headerToast, body: this.bodyToast}, { classname: 'bg-warning text-light', delay: Config.delayToast });
  }

  showCustom(data: Toast, options: any) {
    this.translateMessage(data.header, data.body);
    this.show({header: this.headerToast, body: this.bodyToast}, { classname: options.classname, delay: Config.delayToast });
  }

  /* showStandard() {
    this.show('I am a standard toast');
  }

  showDanger(dangerTpl) {
    this.show(dangerTpl, { classname: 'bg-danger text-light', delay: 1000 });
  } */
}
