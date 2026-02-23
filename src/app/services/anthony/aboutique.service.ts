import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { ReadBoutique } from '../../models/anthony/ABoutique';

@Injectable({
  providedIn: 'root',
})
export class AboutiqueService {
  private apiUrl = `${environment.apiUrl}/boutiques`;

  constructor(private http: HttpClient) {}

  /** Récupère toutes les boutiques */
  getBoutiques(): Observable<ReadBoutique[]> {
    return this.http.get<ReadBoutique[]>(this.apiUrl);
  }

  /** Récupère une boutique par son ID */
  getBoutiqueById(id: string): Observable<ReadBoutique> {
    return this.http.get<ReadBoutique>(`${this.apiUrl}/${id}`);
  }
}
