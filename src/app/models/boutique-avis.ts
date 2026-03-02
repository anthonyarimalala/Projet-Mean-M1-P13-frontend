export interface BoutiqueAvis {
  _id?: string;
  id_boutique: string;
  id_user: string;
  avis: string;
  note: number;
  created_at?: Date;
  updated_at?: Date;
}

export interface CreateBoutiqueAvis {
  id_boutique: string;
  id_user: string;
  avis: string;
  note: number;
  created_at?: Date;
  updated_at?: Date;
}

export interface UpdateBoutiqueAvis {
  id_boutique?: string;
  id_user?: string;
  avis?: string;
  note?: number;
  updated_at?: Date;
}

export interface ReadBoutiqueAvis {
  _id: string;
  id_boutique: string;
  id_user: string;
  avis: string;
  note: number;
  created_at: Date;
  updated_at: Date;
  user?: {
    _id: string;
    nom: string;
    prenom: string;
    email: string;
  };
  boutique?: {
    _id: string;
    nom: string;
  };
}
