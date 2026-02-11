import { User } from "./User";

export interface Emetteur {
  user_id: string;
  role: string;
}

export interface ReadEmetteur{
  user_id: string;
  role: string;
  user: User;
}

export interface Image {
  url: string;
  alt: string;
  ordre: number;
  _id: string;
}

export interface Annonce {
  _id: string;
  titre: string;
  description: string;
  emetteur: ReadEmetteur;
  boutique_id: string | null;
  cibles: string[];
  images: Image[];
  statut: string;
  created_at: string;
  updated_at: string;
  __v: number;
}

export interface CreateAnnonce {
  titre: string;
  description: string;
  emetteur: Emetteur;
  boutique_id: string | null;
  cibles: string[];
  images: Image[];
  statut: string;
  created_at: string;
  updated_at: string;
  __v: number;
}

export interface AnnoncesResponse {
  items: Annonce[];
  page: number;
  limit: number;
  total: number;
  pages: number;
}
