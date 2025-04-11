import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import {
  TranslateService,
  TranslatePipe,
  TranslateModule,
} from '@ngx-translate/core';
import { MatInputModule } from '@angular/material/input';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.scss'],
  imports: [
    TranslatePipe,
    TranslateModule,
    CommonModule,
    FormsModule,
    MatInputModule,
  ],
  standalone: true,
})
export class AuthenticationComponent {
  constructor(private translate: TranslateService, private http: HttpClient) {
    this.translate.setDefaultLang('en');
    this.translate.use('en');
  }

  authentication = {
    title: 'Authentication',
    description: 'Please enter your credentials to login.',
    email: '',
    password: '',
    rememberMe: false,
    login: () => {
      const headers = new HttpHeaders({
        apikey: environment.supabaseApiKey,
        'Content-Type': 'application/json',
      });
      const body = {
        email: this.authentication.email,
        password: this.authentication.password,
      };
      // Perform login action here
      console.log('Login clicked');

      this.http
        .post(
          environment.supabaseUrl + '/auth/v1/token?grant_type=password',
          body,
          { headers }
        )
        .subscribe(
          (response) => console.log('Success:', response),
          (error) => console.error('Error:', error)
        );
    },
  };

  successMessage = {
    title: 'Success',
    message: 'You have successfully logged in.',
    buttonText: 'OK',
  };
  errorMessage = {
    title: 'Error',
    message: 'Invalid username or password.',
    buttonText: 'Retry',
  };

  user = {
    username: '',
    password: '',
    rememberMe: false,
    email: '',
  };
}
