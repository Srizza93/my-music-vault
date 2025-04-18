import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '@/environments/environment';
import { Observable } from 'rxjs';
import { Genre } from '@/types/genre.model';
import { API_URL, GENRES_ENDPOINT } from '@/constants/endpointsConstants';

@Injectable({
  providedIn: 'root',
})
export class GenresApi {
  private headers: HttpHeaders;

  constructor(private http: HttpClient) {
    this.headers = new HttpHeaders({
      apikey: environment.supabaseApiKey,
      'Content-Type': 'application/json',
    });
  }
  getGenres(): Observable<Genre[]> {
    const url = `${API_URL}${GENRES_ENDPOINT}`;

    return this.http.get<Genre[]>(url, { headers: this.headers });
  }
}
