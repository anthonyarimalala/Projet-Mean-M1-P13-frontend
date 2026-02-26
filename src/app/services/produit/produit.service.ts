import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProduitService {
  private apiUrl = 'http://localhost:5000/api/produits';
  private stockUrl = 'http://localhost:5000/api/stock';

  constructor(private http: HttpClient) {}

  // Créer un produit
  createProduit(produit: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, produit);
  }

    // Récupérer tous les produits d'une boutique par son ID
    getProduitsByBoutiqueId(boutiqueId: string): Observable<any[]> {
      return this.http.get<any[]>(`${this.apiUrl}/boutique/${boutiqueId}`);
    }

    
  // Ajouter ou mettre à jour le stock d’un produit
    addStock(produitId: string, quantite: number): Observable<any> {
      return this.http.post<any>(`${this.stockUrl}/add`, {
        produit_id: produitId,
        quantite: quantite,
      });
    }
}
