import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
  ValidatorFn,
  ValidationErrors,
  AbstractControl,
} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { AuthFormLabel } from '@/types/auth-form.interface';

@Component({
  selector: 'auth-form',
  templateUrl: './auth-form.component.html',
  styleUrls: ['./auth-form.component.scss'],
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
  @Input() isAuthenticationPage: boolean = false;
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

  constructor(private fb: FormBuilder) {
    this.authForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      confirmPassword: ['', true ? Validators.required : null],
    });
  }

  ngOnInit() {
    this.setupCustomValidation();
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

  setupCustomValidation() {
    if (this.isSignupPage) {
      this.authForm
        .get('confirmPassword')
        ?.addValidators(this.validateConfirmPassword());

      this.authForm.get('password')?.valueChanges.subscribe(() => {
        this.authForm.get('confirmPassword')?.updateValueAndValidity();
      });
    } else {
      this.authForm.get('confirmPassword')?.clearValidators();
      this.authForm.get('confirmPassword')?.updateValueAndValidity();
    }
  }

  validateConfirmPassword(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      return this.authForm.get('password')?.value === control.value
        ? null
        : { passwordMismatch: true };
    };
  }
}
