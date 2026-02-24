import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { 
  DemandeLocation, 
  DemandeLocationDTO, 
  DemandeResponse, 
  DemandeStats,
  StatutUpdateDTO,
  AnnulationDTO,
  DemandeUpdateDTO 
} from '../../models/demande-location';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DemandeLocationService {
  private apiUrl = `${environment.apiUrl}/demandes`;

  constructor(private http: HttpClient) {}

  /**
   * GET / - Récupérer toutes les demandes avec pagination et filtre
   */
  getAllDemandes(page: number = 1, limit: number = 10, statut?: string): Observable<DemandeResponse> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('limit', limit.toString());
    
    if (statut) {
      params = params.set('statut', statut);
    }

    return this.http.get<DemandeResponse>(this.apiUrl, { params });
  }

  /**
   * GET /en-attente - Récupérer les demandes en attente
   */
  getDemandesEnAttente(page: number = 1, limit: number = 10): Observable<DemandeResponse> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('limit', limit.toString());

    return this.http.get<DemandeResponse>(`${this.apiUrl}/en-attente`, { params });
  }

  /**
   * GET /stats - Récupérer les statistiques des demandes
   */
  getDemandesStats(): Observable<DemandeStats> {
    return this.http.get<DemandeStats>(`${this.apiUrl}/stats`);
  }

  /**
   * GET /utilisateur/:userId - Récupérer les demandes d'un utilisateur
   */
  getDemandesByUtilisateur(userId: string, page: number = 1, limit: number = 10): Observable<DemandeResponse> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('limit', limit.toString());

    return this.http.get<DemandeResponse>(`${this.apiUrl}/utilisateur/${userId}`, { params });
  }

  /**
   * GET /boutique/:boutiqueId - Récupérer les demandes d'une boutique
   */
  getDemandesByBoutique(boutiqueId: string, page: number = 1, limit: number = 10): Observable<DemandeResponse> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('limit', limit.toString());

    return this.http.get<DemandeResponse>(`${this.apiUrl}/boutique/${boutiqueId}`, { params });
  }

  /**
   * GET /:id - Récupérer une demande par son ID
   */
  getDemandeById(id: string): Observable<DemandeLocation> {
    return this.http.get<DemandeLocation>(`${this.apiUrl}/${id}`);
  }

  /**
   * POST / - Créer une nouvelle demande de location
   */
  createDemande(demande: DemandeLocationDTO): Observable<DemandeLocation> {
    return this.http.post<DemandeLocation>(this.apiUrl, demande);
  }

  /**
   * PUT /:id/statut - Mettre à jour le statut d'une demande (Admin)
   */
  updateDemandeStatut(id: string, statutUpdate: StatutUpdateDTO): Observable<DemandeLocation> {
    return this.http.put<DemandeLocation>(`${this.apiUrl}/${id}/statut`, statutUpdate);
  }

  /**
   * PUT /:id/annuler - Annuler une demande (par le demandeur)
   */
  annulerDemande(id: string, annulation: AnnulationDTO): Observable<{ message: string; demande: DemandeLocation }> {
    return this.http.put<{ message: string; demande: DemandeLocation }>(`${this.apiUrl}/${id}/annuler`, annulation);
  }

  /**
   * PUT /:id - Mettre à jour une demande (par le demandeur)
   */
  updateDemande(id: string, updateData: DemandeUpdateDTO): Observable<DemandeLocation> {
    return this.http.put<DemandeLocation>(`${this.apiUrl}/${id}`, updateData);
  }

  /**
   * DELETE /:id - Supprimer une demande (Admin)
   */
  deleteDemande(id: string): Observable<{ message: string }> {
    return this.http.delete<{ message: string }>(`${this.apiUrl}/${id}`);
  }
}