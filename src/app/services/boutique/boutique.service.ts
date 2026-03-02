import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BoutiqueService {

  private apiUrl = 'http://localhost:5000/api/boutiques';
  private commandesUrl = 'http://localhost:5000/api/panier/boutique'

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