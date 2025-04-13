import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router } from '@angular/router';
import {
  TranslatePipe,
  TranslateModule,
  TranslateService,
} from '@ngx-translate/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';
import { LoginApi } from '../../api/loginApi';
import { JWT_COOKIE_NAME, CookieHelper } from '../../helpers/cookieHelper';
import type { Login } from '../../types/login';

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
    ReactiveFormsModule,
  ],
})
export class AuthenticationComponent {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private loginApi: LoginApi,
    private cookieHelper: CookieHelper,
    private snackBar: MatSnackBar,
    private translate: TranslateService
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

  login() {
    if (this.loginForm.invalid) return;

    const { email, password } = this.loginForm.value;
    this.loginApi.login(email, password).subscribe({
      next: (response: Login) => {
        this.cookieHelper.setCookie(JWT_COOKIE_NAME, response.access_token, 1);
        this.router.navigate(['/user']);
        this.snackBar.open(
          this.translate.instant('login-success--label'),
          'Close',
          {
            duration: 2000,
          }
        );
      },
      error: () => {
        this.snackBar.open(
          this.translate.instant('login-error--label'),
          'Close',
          {
            duration: 2000,
          }
        );
        this.loginForm.reset();
      },
    });
  }
}
