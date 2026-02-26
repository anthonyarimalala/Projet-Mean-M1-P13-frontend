import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BoutiqueAvis, CreateBoutiqueAvis, ReadBoutiqueAvis, UpdateBoutiqueAvis } from '../../models/boutique-avis';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class BoutiqueAvisService {
  private apiUrl = `${environment.apiUrl}/boutique-avis`; // À adapter selon votre configuration

  constructor(private http: HttpClient) {}

  // Create
  createAvis(avis: CreateBoutiqueAvis): Observable<BoutiqueAvis> {
    return this.http.post<BoutiqueAvis>(this.apiUrl, avis);
  }

  // Read all by boutique avec pagination
  getAvisByBoutique(
    id_boutique: string,
    page: number = 1,
    limit: number = 10
  ): Observable<{
    items: ReadBoutiqueAvis[];
    page: number;
    limit: number;
    total: number;
    pages: number;
  }> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('limit', limit.toString());

    return this.http.get<{
      items: ReadBoutiqueAvis[];
      page: number;
      limit: number;
      total: number;
      pages: number;
    }>(`${this.apiUrl}/boutique/${id_boutique}`, { params });
  }

  // Read all by user
  getAvisByUser(
    id_user: string,
    page: number = 1,
    limit: number = 10
  ): Observable<{
    items: ReadBoutiqueAvis[];
    page: number;
    limit: number;
    total: number;
    pages: number;
  }> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('limit', limit.toString());

    return this.http.get<{
      items: ReadBoutiqueAvis[];
      page: number;
      limit: number;
      total: number;
      pages: number;
    }>(`${this.apiUrl}/user/${id_user}`, { params });
  }

  // Read one by id
  getAvisById(id: string): Observable<ReadBoutiqueAvis> {
    return this.http.get<ReadBoutiqueAvis>(`${this.apiUrl}/${id}`);
  }

  // Update
  updateAvis(id: string, avis: UpdateBoutiqueAvis): Observable<BoutiqueAvis> {
    return this.http.put<BoutiqueAvis>(`${this.apiUrl}/${id}`, avis);
  }

  // Delete
  deleteAvis(id: string): Observable<{ message: string }> {
    return this.http.delete<{ message: string }>(`${this.apiUrl}/${id}`);
  }

  // Get moyenne by boutique
  getMoyenneByBoutique(id_boutique: string): Observable<{
    moyenne: number;
    total: number;
  }> {
    return this.http.get<{
      moyenne: number;
      total: number;
    }>(`${this.apiUrl}/moyenne/${id_boutique}`);
  }

  // Check if user already reviewed a boutique
  checkUserAvis(id_boutique: string, id_user: string): Observable<{
    exists: boolean;
    avis?: ReadBoutiqueAvis;
  }> {
    return this.http.get<{
      exists: boolean;
      avis?: ReadBoutiqueAvis;
    }>(`${this.apiUrl}/check/${id_boutique}/${id_user}`);
  }

  // Create or update (upsert)
  createOrUpdateAvis(avis: CreateBoutiqueAvis): Observable<{
    avis: BoutiqueAvis;
    created: boolean;
    message: string;
  }> {
    return this.http.post<{
      avis: BoutiqueAvis;
      created: boolean;
      message: string;
    }>(`${this.apiUrl}/`, avis);
  }
}
