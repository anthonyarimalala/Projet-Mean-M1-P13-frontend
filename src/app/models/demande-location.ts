// models/demande-location.ts

export type DemandeStatut = 'EN_ATTENTE' | 'APPROUVEE' | 'REJETEE' | 'ANNULEE';

export interface BoutiqueInfo {
  _id: string;
  numero: string;
  etage: number;
  is_disponible: boolean;
  prix: number;
}

export interface DemandeurInfo {
  _id: string;
  nom: string;
  telephone?: string;
  email?: string;
}

export interface DemandeLocation {
  _id: string;
  boutique: {
    boutique_id: BoutiqueInfo;  // C'est un objet complet
    numero: string;
    nom_demande: string;
  };
  categories: string[];
  site_web: string | null;
  message: string | null;
  demandeur: {
    user_id: DemandeurInfo;  // C'est un objet complet
    nom: string;
  };
  traitement?: {
    date_traitement: Date | string | null;
    traite_par: string | null;
    notes_admin: string | null;
  };
  statut: DemandeStatut;
  date_demande: Date | string;
  created_at?: Date | string;
  updated_at?: Date | string;
  __v?: number;
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
  items: DemandeLocation[];  // Note: c'est "items" pas "demandes"
  total: number;
  page: number;
  totalPages: number;
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