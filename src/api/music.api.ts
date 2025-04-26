import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from '@/environments/environment';
import { CookieHelper, JWT_COOKIE_NAME } from '@/helpers/cookie.helper';
import { Observable } from 'rxjs';
import { Song } from '@/types/song.model';
import { API_URL, SONGS_ENDPOINT } from '@/constants/endpoints.constants';

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
    const url = `${API_URL}${SONGS_ENDPOINT}?order=created_at.desc`;
    return this.http.get<Song[]>(url, { headers: this.headers });
  }

  addSong(song: Song): Observable<Song> {
    const url = `${API_URL}${SONGS_ENDPOINT}`;
    return this.http.post<Song>(url, song, { headers: this.headers });
  }

  editSong(id: string, song: Partial<Song>): Observable<Song> {
    const url = `${API_URL}${SONGS_ENDPOINT}`;
    return this.http.patch<Song>(url, song, {
      headers: this.headers,
      params: new HttpParams().set('id', 'eq.' + id),
    });
  }

  deleteSong(id: string): Observable<void> {
    const url = `${API_URL}${SONGS_ENDPOINT}`;
    return this.http.delete<void>(url, {
      headers: this.headers,
      params: new HttpParams().set('id', 'eq.' + id),
    });
  }
}
