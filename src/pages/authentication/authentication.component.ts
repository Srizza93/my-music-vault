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
import { signupPage } from '@/constants/pages.constants';
import { Router } from '@angular/router';

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
