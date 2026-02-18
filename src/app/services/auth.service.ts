import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs';
import { User } from '../models/User';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:5000/api/auth';
  private boutiqueUrl = 'http://localhost:5000/api/boutiques'; // URL pour envoyer les boutiques

  constructor(private http: HttpClient) {}

  login(data: { email: string; password: string }) {
    return this.http.post<{ token: string }>(`${this.apiUrl}/login`, data).pipe(
      tap((res) => {
        localStorage.setItem('token', res.token);
      })
    );
  }

  register(user: User) {
    return this.http.post(`${this.apiUrl}/register`, user);
  }

  logout() {
    localStorage.removeItem('token');
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  isConnected(): boolean {
    const token = this.getToken();
    if (!token) return false;
    return !this.isTokenExpired(token);
  }

  private isTokenExpired(token: string): boolean {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const exp = payload.exp * 1000;
      const expired = Date.now() > exp;

      if (expired) this.logout();

      return expired;
    } catch (e) {
      this.logout();
      return true;
    }
  }

  getRole(): string | null {
    const token = this.getToken();
    if (!token) return null;

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.role;
    } catch {
      return null;
    }
  }

  getId(): string | null {
    const token = this.getToken();
    if (!token) return null;

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.userId || null;
    } catch {
      return null;
    }
  }

  getNom(): string | null {
    const token = this.getToken();
    if (!token) return null;

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.nom || null;
    } catch {
      return null;
    }
  }

  getPrenom(): string | null {
    const token = this.getToken();
    if (!token) return null;

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.prenom || null;
    } catch {
      return null;
    }
  }

  // ============================
  // Nouvelle méthode : envoyer les données d'une boutique
  // ============================
  sendBoutique(data: any) {
    const token = this.getToken();
    if (!token) {
      console.error('❌ Pas de token trouvé');
      return;
    }
  
    // On s'assure que categories est un tableau
    if (typeof data.categories === 'string') {
      data.categories = data.categories.split(',').map((c: string) => c.trim());
    }
  
    console.log('Token utilisé pour l’envoi :', token);
    console.log('Données envoyées :', data);
    const boutiqueId = data._id;
    console.log(boutiqueId)
    if (!boutiqueId) {
      console.error('❌ L\'ID de la boutique est requis pour la mise à jour');
      return;
    }

    return this.http.put(`${this.boutiqueUrl}/${boutiqueId}`, data, {
      headers: { 
        'Authorization': `Bearer ${token}`, 
        'Content-Type': 'application/json' // important pour Express
      }
    });
    
  }
  
  
}
