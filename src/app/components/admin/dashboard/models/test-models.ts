// Modèles pour les données du dashboard

export interface TestBoutique {
  id: number;
  nom: string;
  statut: 'disponible' | 'non-disponible' | 'en-attente' | 'validee';
  dateCreation: Date;
  proprietaireId: number;
}

export interface TestUtilisateur {
  id: number;
  nom: string;
  email: string;
  role: 'BOUTIQUE' | 'ACHETEUR' | 'ADMIN';
  dateInscription: Date;
  boutiqueId?: number;
}

export interface TestAnnonce {
  id: number;
  titre: string;
  description: string;
  boutiqueId: number;
  datePublication: Date;
  statut: 'active' | 'inactive' | 'archivee';
  prix: number;
}

export interface TestDashboardStats {
  boutiques: TestBoutique[];
  utilisateurs: TestUtilisateur[];
  annonces: TestAnnonce[];
}

export interface TestStatistiquesBoutiques {
  total: number;
  disponibles: number;
  nonDisponibles: number;
  enAttente: number;
  validees: number;
}

export interface TestStatistiquesUtilisateurs {
  total: number;
  boutiques: number;
  acheteurs: number;
  derniersInscrits: TestUtilisateur[];
}

export interface TestStatistiquesAnnonces {
  total: number;
  parDate: { date: string; count: number }[];
}
