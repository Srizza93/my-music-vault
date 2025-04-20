import { Injectable } from '@angular/core';

interface ImportMetaEnv {
  PROD: boolean;
}

declare global {
  interface ImportMeta {
    env: ImportMetaEnv;
  }

  interface Window {
    test?: any;
  }
}

@Injectable({
  providedIn: 'root',
})
export class AppLocaleService {
  static fallbackLocale = 'fr';

  static getAppLocale(): string {
    if ((window as Window).test) {
      return this.fallbackLocale;
    }
    return (
      window.navigator?.language ||
      document.querySelector('html')!.getAttribute('lang') ||
      this.fallbackLocale
    );
  }
}
