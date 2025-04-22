import { Component } from '@angular/core';
import {
  TranslatePipe,
  TranslateModule,
  TranslateService,
} from '@ngx-translate/core';
import { AuthFormComponent } from '@/components/auth-form/auth-form.component';
import { AuthFormLabel } from '@/types/auth-form.interface';
import { FormGroup } from '@angular/forms';
import { AuthApi } from '@/api/auth.api';
import { ToasterService, ToastType } from '@/services/toaster.service';
import { Router } from '@angular/router';
import { authenticationPage } from '@/constants/pages.constants';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
  imports: [AuthFormComponent, TranslatePipe, TranslateModule],
  standalone: true,
})
export class SignupComponent {
  constructor(
    private translate: TranslateService,
    private authApi: AuthApi,
    private toaster: ToasterService,
    private router: Router
  ) {}

  get authFormLabels(): AuthFormLabel {
    return {
      signupButtonLabel: this.translate.instant('signup--button'),
      signupAccessButtonLabel: this.translate.instant('signup-access--button'),
      emailLabel: this.translate.instant('email--label'),
      emailPlaceholder: this.translate.instant('email--placeholder'),
      emailRequiredLabel: this.translate.instant('email-required--label'),
      emailErrorLabel: this.translate.instant('email-error--label'),
      passwordLabel: this.translate.instant('password--label'),
      passwordPlaceholder: this.translate.instant('password--placeholder'),
      passwordRequiredLabel: this.translate.instant('password-required--label'),
      passwordPatternErrorLabel: this.translate.instant(
        'password-pattern-error--label'
      ),
      confirmPasswordLabel: this.translate.instant('confirm-password--label'),
      confirmPasswordPlaceholder: this.translate.instant(
        'confirm-password--placeholder'
      ),
      confirmPasswordRequiredLabel: this.translate.instant(
        'confirm-password-required--label'
      ),
      confirmPasswordMismatchLabel: this.translate.instant(
        'confirm-password-mismatch--label'
      ),
    };
  }

  signup(signupForm: FormGroup) {
    if (signupForm.invalid) return;

    const { email, password } = signupForm.value;
    this.authApi.signup(email, password).subscribe({
      next: () => {
        this.router.navigate([authenticationPage]);
        this.toaster.showToast(
          this.translate.instant('signup-success--label'),
          ToastType.SUCCESS
        );
      },
      error: () => {
        this.toaster.showToast(
          this.translate.instant('signup-error--label'),
          ToastType.ERROR
        );
        signupForm.reset();
      },
    });
  }

  accessLoginPage() {
    this.router.navigate([authenticationPage]);
  }
}
