import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BoutiqueService {

  // private apiUrl = `${environment.apiUrl}/boutiques`;

  private apiUrl = `${environment.apiUrl}/boutiques`;
  private commandesUrl = `${environment.apiUrl}/panier/boutique`;

  constructor(private http: HttpClient) {}

  // =====================================
  // Récupérer une boutique par ID
  // =====================================
  getBoutiqueById(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  // =====================================
  // Mettre à jour une boutique par ID
  // =====================================
  updateBoutique(id: string, boutiqueData: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, boutiqueData);
  }

  getCommandes(id: string):Observable <any>{
    return this.http.get(`${this.commandesUrl}/${id}`);
  }
}
