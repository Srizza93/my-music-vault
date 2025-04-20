import { Component } from '@angular/core';
import {
  TranslatePipe,
  TranslateModule,
  TranslateService,
} from '@ngx-translate/core';
import { AuthFormComponent } from '@/components/auth-form/auth-form.component';
import { AuthFormLabel } from '@/types/auth-form.interface';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
  imports: [AuthFormComponent, TranslatePipe, TranslateModule],
  standalone: true,
})
export class SignupComponent {
  constructor(private translate: TranslateService) {}

  get authFormLabels(): AuthFormLabel {
    return {
      signupButtonLabel: this.translate.instant('signup--button'),
      authenticationButtonLabel: this.translate.instant(
        'authentication--button'
      ),
      signupAccessButtonLabel: this.translate.instant('signup-access--button'),
      emailLabel: this.translate.instant('email--label'),
      emailPlaceholder: this.translate.instant('email--placeholder'),
      emailRequiredLabel: this.translate.instant('email-required--label'),
      emailErrorLabel: this.translate.instant('email-error--label'),
      passwordLabel: this.translate.instant('password--label'),
      passwordPlaceholder: this.translate.instant('password--placeholder'),
      passwordRequiredLabel: this.translate.instant('password-required--label'),
      confirmPasswordLabel: this.translate.instant('confirm-password--label'),
      confirmPasswordPlaceholder: this.translate.instant(
        'confirm-password--placeholder'
      ),
      confirmPasswordRequiredLabel: this.translate.instant(
        'confirm-password-required--label'
      ),
    };
  }

  signup(event: FormGroup) {
    console.log('Signup event:', event);
  }
}
