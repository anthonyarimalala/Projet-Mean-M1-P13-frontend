import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BoutiqueService {

  private apiUrl = 'http://localhost:5000/api/boutiques';

  constructor(private http: HttpClient) {}

  getBoutiqueById(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  updateBoutique(id: string, boutiqueData: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, boutiqueData);
  }
}