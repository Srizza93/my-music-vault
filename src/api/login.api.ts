import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '@/environments/environment';
import { Login } from '@/types/login.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoginApi {
  private headers: HttpHeaders;

  constructor(private http: HttpClient) {
    this.headers = new HttpHeaders({
      apikey: environment.supabaseApiKey,
      'Content-Type': 'application/json',
    });
  }
  login(email: string, password: string): Observable<Login> {
    const url = `${environment.supabaseUrl}/auth/v1/token?grant_type=password`;
    const body = {
      email: email,
      password: password,
    };

    return this.http.post<Login>(url, body, { headers: this.headers });
  }
}
