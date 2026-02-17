
export interface User {
  role: 'ADMIN' | 'BOUTIQUE' | 'ACHETEUR';
  nom: string;
  prenom: string;
  email: string;
  password: string;
  telephone: string;
  is_active: boolean;
  is_deleted: boolean;
}


export interface UserList {
  role: string;
  nom: string;
  prenom: string;
  email: string;
  telephone: string;
  is_active: boolean;
  is_deleted: boolean;
  created_at: Date;
  updated_at: Date;
}
