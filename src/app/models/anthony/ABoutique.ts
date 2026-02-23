export interface Promotion {
  active: boolean;
  taux: number;
}

export interface ReadBoutique {
  _id: string;
  numero: string;
  etage: number;
  is_disponible: boolean;
  prix: number;
  promotion: Promotion;
  nom_boutique: string;
  lien_site_web: string;
  locataire_id: string;
  date_prochain_paiement: Date;
  categories: string[];
  is_deleted: boolean;
  created_at: Date;
  updated_at: Date;
}
