import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AcheteurService {
  private apiUrl = `${environment.apiUrl}/boutiques`;

  constructor(private http: HttpClient) {}

  // Récupérer toutes les boutiques
  getShops(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/avec-locataire`);
  }
}
