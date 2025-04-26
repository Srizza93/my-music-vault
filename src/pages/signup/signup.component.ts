import { Component } from '@angular/core';
import {
  TranslatePipe,
  TranslateModule,
  TranslateService,
} from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { AuthFormComponent } from '@/components/auth-form/auth-form.component';
import { FormGroup } from '@angular/forms';
import { AuthApi } from '@/api/auth.api';
import { ToasterService, ToastType } from '@/services/toaster.service';
import { Router } from '@angular/router';
import { authenticationPage } from '@/constants/pages.constants';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
  imports: [AuthFormComponent, TranslatePipe, TranslateModule, CommonModule],
  standalone: true,
})
export class SignupComponent {
  constructor(
    private translate: TranslateService,
    private authApi: AuthApi,
    private toaster: ToasterService,
    private router: Router
  ) {}

  emailSignedup: string | null = null;

  signup(signupForm: FormGroup) {
    if (signupForm.invalid) return;

    const { email, password } = signupForm.value;
    this.authApi.signup(email, password).subscribe({
      next: () => {
        this.emailSignedup = email;
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
