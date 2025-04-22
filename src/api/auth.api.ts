import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '@/environments/environment';
import { Login } from '@/types/login.interface';
import { Observable } from 'rxjs';
import {
  LOGIN_FULL_ENDPOINT,
  SIGNUP_FULL_ENDPOINT,
} from '@/constants/endpoints.constants';
import { Signup } from '@/types/signup.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthApi {
  private headers: HttpHeaders;

  constructor(private http: HttpClient) {
    this.headers = new HttpHeaders({
      apikey: environment.supabaseApiKey,
      'Content-Type': 'application/json',
    });
  }

  login(email: string, password: string): Observable<Login> {
    const url = LOGIN_FULL_ENDPOINT;
    const body = {
      email: email,
      password: password,
    };

    return this.http.post<Login>(url, body, { headers: this.headers });
  }

  signup(email: string, password: string): Observable<Signup> {
    const url = SIGNUP_FULL_ENDPOINT;
    const body = {
      email: email,
      password: password,
    };
    return this.http.post<Signup>(url, body, { headers: this.headers });
  }
}
