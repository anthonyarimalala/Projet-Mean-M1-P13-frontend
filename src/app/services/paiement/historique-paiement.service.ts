import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface CreatePaiement {
  boutique_id: string;
  locataire_id: string;
  montant: number;
  date_prevue: string;
  statut: 'EN_ATTENTE' | 'PAYE' | 'ANNULE';
  show_to_user: boolean;
  created_at: string;
}

// Importer ton modèle TypeScript pour le frontend
export interface HistoriquePaiement {
  _id: string;
  boutique_id: string;
  locataire_id: string;
  montant: number;
  date_prevue: string; // on peut transformer en Date si besoin
  date_paiement?: string;
  mode_paiement: 'CASH' | 'VIREMENT' | 'CARTE' | 'MOBILE_MONEY';
  statut: 'EN_ATTENTE' | 'PAYE' | 'ANNULE';
  note?: string;
  show_to_user: boolean;
  payeur?: string;
  created_at: string;
  updated_at: string;
}

export interface PaginationResult<T> {
  data: T[];
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

@Injectable({
  providedIn: 'root',
})
export class HistoriquePaiementService {
  private apiUrl = `${environment.apiUrl}/paiements`;

  constructor(private http: HttpClient) {}

  /** Créer un paiement */
  createPaiement(payload: Partial<CreatePaiement>): Observable<CreatePaiement> {
    return this.http.post<CreatePaiement>(this.apiUrl, payload);
  }

  /** Mettre à jour un paiement */
  updatePaiement(id: string, payload: Partial<HistoriquePaiement>): Observable<HistoriquePaiement> {
    return this.http.put<HistoriquePaiement>(`${this.apiUrl}/${id}`, payload);
  }

  /** Supprimer un paiement */
  deletePaiement(id: string): Observable<{ message: string }> {
    return this.http.delete<{ message: string }>(`${this.apiUrl}/${id}`);
  }

  /** Récupérer un paiement par ID */
  getPaiementById(id: string): Observable<HistoriquePaiement> {
    return this.http.get<HistoriquePaiement>(`${this.apiUrl}/${id}`);
  }

  /** Récupérer tous les paiements avec pagination et filtres optionnels */
  getPaiements(
    page: number = 1,
    limit: number = 10,
    filters: { locataire_id?: string; boutique_id?: string } = {}
  ): Observable<PaginationResult<HistoriquePaiement>> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('limit', limit.toString());

    if (filters.locataire_id) params = params.set('locataire_id', filters.locataire_id);
    if (filters.boutique_id) params = params.set('boutique_id', filters.boutique_id);

    return this.http.get<PaginationResult<HistoriquePaiement>>(this.apiUrl, { params });
  }

  /** Récupérer les paiements d'une boutique avec show_to_user=true et pagination */
  getPaiementsByBoutique(
    boutiqueId: string,
    page: number = 1,
    limit: number = 10
  ): Observable<PaginationResult<HistoriquePaiement>> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('limit', limit.toString());

    return this.http.get<PaginationResult<HistoriquePaiement>>(
      `${this.apiUrl}/boutique/${boutiqueId}`,
      { params }
    );
  }
}
