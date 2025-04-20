import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthFormLabel } from '@/types/auth-form.interface';

@Component({
  selector: 'auth-form',
  templateUrl: './auth-form.component.html',
  styleUrls: ['./auth-form.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatIconModule,
  ],
})
export class AuthFormComponent {
  @Input() isAuthenticationPage: boolean = true;
  @Input() isSignupPage: boolean = false;
  @Input() labels: AuthFormLabel = {
    signupButtonLabel: '',
    authenticationButtonLabel: '',
    signupAccessButtonLabel: '',
    emailLabel: '',
    emailPlaceholder: '',
    emailRequiredLabel: '',
    emailErrorLabel: '',
    passwordLabel: '',
    passwordPlaceholder: '',
    passwordRequiredLabel: '',
    confirmPasswordLabel: '',
    confirmPasswordPlaceholder: '',
    confirmPasswordRequiredLabel: '',
  };

  @Output() loginEvent = new EventEmitter<FormGroup>();
  @Output() signupEvent = new EventEmitter<FormGroup>();
  @Output() accessSignupPageEvent = new EventEmitter<void>();

  authForm: FormGroup;
  isPasswordVisible: boolean = false;

  constructor(private fb: FormBuilder, private router: Router) {
    this.authForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
    });
  }

  get email() {
    return this.authForm.get('email');
  }

  get password() {
    return this.authForm.get('password');
  }

  get confirmPassword() {
    return this.authForm.get('confirmPassword');
  }

  login() {
    this.loginEvent.emit(this.authForm);
  }

  signup() {
    this.signupEvent.emit(this.authForm);
  }

  accessSignupPage() {
    this.accessSignupPageEvent.emit();
  }

  togglePasswordVisibility() {
    this.isPasswordVisible = !this.isPasswordVisible;
  }
}
