import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '@/environments/environment';
import { CookieHelper, JWT_COOKIE_NAME } from '@/helpers/cookie.helper';
import { Observable } from 'rxjs';
import { Song } from '@/types/song.interface';

@Injectable({
  providedIn: 'root',
})
export class MusicApi {
  private headers: HttpHeaders;

  constructor(private http: HttpClient, private cookieHelper: CookieHelper) {
    this.headers = new HttpHeaders({
      apikey: environment.supabaseApiKey,
      Authorization: `Bearer ${this.cookieHelper.getCookie(JWT_COOKIE_NAME)}`,
      'Content-Type': 'application/json',
    });
  }

  getMusicListByUser(): Observable<Song[]> {
    const url = `${environment.supabaseUrl}/rest/v1/songs`;
    return this.http.get<Song[]>(url, { headers: this.headers });
  }
}
