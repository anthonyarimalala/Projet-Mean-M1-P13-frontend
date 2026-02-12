import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Annonce, AnnoncesResponse, CreateAnnonce } from '../../models/Annonce';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AnnonceService {
  private apiUrl = 'http://localhost:5000/api/annonces';

  constructor(private http: HttpClient) {}

  save(data: CreateAnnonce | FormData) {
    return this.http.post(`${this.apiUrl}`, data);
  }
  getAnnonces(page: number = 1, limit: number = 10): Observable<AnnoncesResponse> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('limit', limit.toString());

    return this.http.get<AnnoncesResponse>(this.apiUrl, { params });
  }
}
