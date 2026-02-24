// models/demande-location.model.ts

export type DemandeStatut = 'EN_ATTENTE' | 'APPROUVEE' | 'REJETEE' | 'ANNULEE';

export interface DemandeLocation {
  _id: string;
  boutique: {
    boutique_id: string;
    numero: string;
    nom_demande: string;
  };
  categories: string[];
  site_web: string | null;
  message: string | null;
  demandeur: {
    user_id: string;
    nom: string;
  };
  statut: DemandeStatut;
  date_demande: Date | string;
  traitee_par?: {
    admin_id: string;
    date: Date | string;
    notes?: string;
  };
  createdAt?: Date | string;
  updatedAt?: Date | string;
}

export interface DemandeLocationDTO {
  boutiqueId: string;
  nomBoutique: string;
  categories: string | string[];
  siteWeb?: string;
  message?: string;
  demandeur: {
    user_id: string;
    nom: string;
  };
}

export interface DemandeStats {
  total: number;
  enAttente: number;
  approuvees: number;
  rejetees: number;
  annulees: number;
}

export interface DemandeResponse {
  demandes: DemandeLocation[];
  total: number;
  page: number;
  pages: number;
}

export interface StatutUpdateDTO {
  statut: 'APPROUVEE' | 'REJETEE';
  notes?: string;
  adminId: string;
}

export interface AnnulationDTO {
  userId: string;
}

export interface DemandeUpdateDTO {
  userId: string;
  nomBoutique?: string;
  categories?: string | string[];
  siteWeb?: string;
  message?: string;
}