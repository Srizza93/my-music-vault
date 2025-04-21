import { Component } from '@angular/core';
import {
  TranslatePipe,
  TranslateModule,
  TranslateService,
} from '@ngx-translate/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { AuthApi } from '@/api/auth.api';
import type { Login } from '@/types/login.interface';
import { AuthenticationService } from '@/services/authentication.service';
import { ToasterService, ToastType } from '@/services/toaster.service';
import { AuthFormComponent } from '@/components/auth-form/auth-form.component';
import { FormGroup } from '@angular/forms';
import { signupPage } from '@/constants/pagesConstants';
import { Router } from '@angular/router';
import { AuthFormLabel } from '@/types/auth-form.interface';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.scss'],
  standalone: true,
  imports: [
    TranslatePipe,
    TranslateModule,
    CommonModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    AuthFormComponent,
  ],
})
export class AuthenticationComponent {
  constructor(
    private authApi: AuthApi,
    private authenticationService: AuthenticationService,
    private translate: TranslateService,
    private toaster: ToasterService,
    private router: Router
  ) {}

  get authFormLabels(): AuthFormLabel {
    return {
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
    };
  }

  login(loginForm: FormGroup) {
    if (loginForm.invalid) return;

    const { email, password } = loginForm.value;
    this.authApi.login(email, password).subscribe({
      next: (response: Login) => {
        this.authenticationService.login(
          response.access_token,
          response.expires_in,
          response.user.id
        );
        this.toaster.showToast(
          this.translate.instant('login-success--label'),
          ToastType.SUCCESS
        );
      },
      error: () => {
        this.toaster.showToast(
          this.translate.instant('login-error--label'),
          ToastType.ERROR
        );
        loginForm.reset();
      },
    });
  }

  accessSignupPage() {
    this.router.navigate([signupPage]);
  }
}
