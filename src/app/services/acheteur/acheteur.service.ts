import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AcheteurService {
  private apiUrl = 'http://localhost:5000/api/boutiques';

  constructor(private http: HttpClient) {}

  // Récupérer toutes les boutiques
  getShops(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/avec-locataire`);
  }
}