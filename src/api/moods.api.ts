import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '@/environments/environment';
import { Observable } from 'rxjs';
import { Mood } from '@/types/mood.model';

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
    const url = `${environment.supabaseUrl}/rest/v1/moods`;

    return this.http.get<Mood[]>(url, { headers: this.headers });
  }
}
