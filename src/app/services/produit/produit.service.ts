import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Produit {
  _id: string;
  nom: string;
  prix_vente: number;
  prix_promo?: number;
}

@Injectable({
  providedIn: 'root',
})
export class ProduitService {
  private apiUrl = 'http://localhost:5000/api/produits';
  private stockUrl = 'http://localhost:5000/api/stock';
  private panierUrl = 'http://localhost:5000/api/panier';

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

    getStock(produitId: string) :Observable<any>{
      return this.http.get<any>(`${this.stockUrl}/${produitId}`);
    }

    getBoutique(produitId: string) :Observable<any>{
      return this.http.get<any>(`${this.apiUrl}/${produitId}/boutique`);
    }

      // Envoyer le panier déjà formaté au backend
  sendCart(payload: any): Observable<any> {
    console.log('Envoi du panier :', JSON.stringify(payload, null, 2));
    return this.http.post(`${this.panierUrl}/add-batch`, payload);
  }

  getProduitByid(id: string): Observable<Produit>{
    return this.http.get<Produit>(`${this.apiUrl}/${id}`);
  }
}
