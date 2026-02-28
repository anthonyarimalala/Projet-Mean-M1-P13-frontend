import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';

export interface AnalyticDashboardResume {
  totalBoutiques: number;
  disponibles: number;
  nonDisponibles: number;
  tauxOccupation: number;
  prixMoyen: number;
  avecPromotion: number;
  paiementsAVenir: number;
}

export interface AnalyticDemandeStats {
  total: number;
  enAttente: number;
  EN_ATTENTE: number;
  APPROUVEE: number;
  REJETEE: number;
  ANNULEE: number;
}

export interface AnalyticUserStats {
  ADMIN: number;
  BOUTIQUE: number;
  ACHETEUR: number;
  total: number;
}

export interface AnalyticLatestUser {
  _id: string;
  role: string;
  nom: string;
  prenom: string;
  email: string;
  telephone: string;
  is_active: boolean;
  is_deleted: boolean;
  created_at: string;
  updated_at: string;
}

export interface AnalyticAnnoncePeriode {
  mois: number;
  annee: number;
  dateDebut: string;
  dateFin: string;
}

export interface AnalyticAnnonceRepartitionRole {
  ADMIN: number;
  BOUTIQUE: number;
  ACHETEUR: number;
}

export interface AnalyticAnnonceRepartitionTypeCible {
  ROLE: number;
  BOUTIQUE: number;
  ACHETEUR: number;
}

export interface AnalyticAnnonceStatsMensuelles {
  totalMois: number;
  brouillons: number;
  publiees: number;
  archivees: number;
  repartitionRoleEmetteur: AnalyticAnnonceRepartitionRole;
  repartitionTypeCible: AnalyticAnnonceRepartitionTypeCible;
}

export interface AnalyticAnnonceMoisActif {
  total: number;
  mois: number;
  annee: number;
}

export interface AnalyticAnnonceStats {
  periode: AnalyticAnnoncePeriode;
  totalGeneral: number;
  statsMensuelles: AnalyticAnnonceStatsMensuelles;
  moisLePlusActif: AnalyticAnnonceMoisActif;
  moyenneParMois: number;
}

@Injectable({
  providedIn: 'root',
})
export class AnalyticsService {
  constructor(private http: HttpClient) {}

  /**
   * Récupère uniquement le résumé du tableau de bord
   * @returns Observable<AnalyticDashboardResume>
   */
  getDashboardResume(): Observable<AnalyticDashboardResume> {
    return this.http
      .get<{ success: boolean; data: { resume: AnalyticDashboardResume } }>(
        `${environment.apiUrl}/boutiques/analytics/dashboard`
      )
      .pipe(map((response) => response.data.resume));
  }

  /**
   * Récupère les statistiques des demandes de location
   * @returns Observable<AnalyticDemandeStats>
   */
  getDemandesStats(): Observable<AnalyticDemandeStats> {
    return this.http.get<AnalyticDemandeStats>(`${environment.apiUrl}/demandes/stats`);
  }

  /**
   * Récupère les statistiques des utilisateurs par rôle
   * @returns Observable<AnalyticUserStats>
   */
  getUsersStats(): Observable<AnalyticUserStats> {
    return this.http
      .get<{ success: boolean; data: AnalyticUserStats }>(`${environment.apiUrl}/users/stats`)
      .pipe(map((response) => response.data));
  }

  /**
   * Récupère la liste des derniers utilisateurs inscrits
   * @returns Observable<AnalyticLatestUser[]>
   */
  getLatestUsers(): Observable<AnalyticLatestUser[]> {
    return this.http
      .get<{ success: boolean; count: number; data: AnalyticLatestUser[] }>(
        `${environment.apiUrl}/users/latest`
      )
      .pipe(map((response) => response.data));
  }

  /**
   * Récupère les statistiques des annonces pour le mois en cours
   * @returns Observable<AnalyticAnnonceStats>
   */
  getCurrentAnnoncesStats(): Observable<AnalyticAnnonceStats> {
    return this.http.get<AnalyticAnnonceStats>(
      `${environment.apiUrl}/annonces/analytics/stats/current`
    );
  }

  /**
   * Récupère les statistiques des annonces pour un mois et une année spécifiques
   * @param mois - Le mois (1-12)
   * @param annee - L'année (ex: 2026)
   * @returns Observable<AnalyticAnnonceStats>
   */
  getAnnoncesStatsByMonth(mois: number, annee: number): Observable<AnalyticAnnonceStats> {
    return this.http.get<AnalyticAnnonceStats>(
      `${environment.apiUrl}/annonces/analytics/stats/${mois}/${annee}`
    );
  }
}
