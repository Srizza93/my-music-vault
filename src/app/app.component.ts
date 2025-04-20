import { AppLocaleService } from '@/services/app-locale.service';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
})
export class AppComponent {
  constructor(private translate: TranslateService) {
    const defaultLang = AppLocaleService.getAppLocale();
    this.translate.setDefaultLang(defaultLang);
    this.translate.use(defaultLang);
  }
}
