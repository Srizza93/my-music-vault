import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '@/environments/environment';
import { Observable } from 'rxjs';
import { Mood } from '@/types/mood.model';
import { API_URL, MOODS_ENDPOINT } from '@/constants/endpoints.constants';

@Injectable({
  providedIn: 'root',
})
export class MoodsApi {
  private headers: HttpHeaders;

  constructor(private http: HttpClient) {
    this.headers = new HttpHeaders({
      apikey: environment.supabaseApiKey,
      'Content-Type': 'application/json',
    });
  }
  getMoods(): Observable<Mood[]> {
    const url = `${API_URL}${MOODS_ENDPOINT}`;
    return this.http.get<Mood[]>(url, { headers: this.headers });
  }
}
