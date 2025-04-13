import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslateService } from '@ngx-translate/core';

export enum ToastType {
  ERROR = 'error',
  SUCCESS = 'success',
}

@Injectable({
  providedIn: 'root',
})
export class ToasterService {
  constructor(
    private snackBar: MatSnackBar,
    private translate: TranslateService
  ) {}

  showToast(message: string, type: ToastType) {
    this.snackBar.open(message, this.translate.instant('close--button'), {
      duration: 2000,
      panelClass: [this.getPanelClass(type)],
    });
  }

  getPanelClass(type: ToastType) {
    switch (type) {
      case ToastType.ERROR:
        return 'error-snackbar';
      case ToastType.SUCCESS:
        return 'success-snackbar';
      default:
        return '';
    }
  }
}
