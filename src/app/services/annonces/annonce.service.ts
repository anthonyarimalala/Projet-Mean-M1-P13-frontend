import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Annonce, AnnoncesResponse, CreateAnnonce } from '../../models/Annonce';
import { Observable, Subject } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AnnonceService {

  private apiUrl = `${environment.apiUrl}/annonces`;
  // private apiUrl = 'http://localhost:5000/api/annonces';

  // 🔥 Event stream
  private annonceCreatedSource = new Subject<void>();
  annonceCreated$ = this.annonceCreatedSource.asObservable();

  constructor(private http: HttpClient) {}

  getAnnonces(page: number = 1, limit: number = 10): Observable<AnnoncesResponse> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('limit', limit.toString());

    return this.http.get<AnnoncesResponse>(this.apiUrl, { params });
  }

  save(data: CreateAnnonce | FormData) {
    return this.http.post(`${this.apiUrl}`, data);
  }

  // 🔥 Trigger event
  notifyAnnonceCreated() {
    this.annonceCreatedSource.next();
  }

  deleteAnnonce(annonceId: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${annonceId}`);
  }
}
