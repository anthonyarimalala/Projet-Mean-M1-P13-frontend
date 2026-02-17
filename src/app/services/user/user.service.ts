import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User, UserList } from '../../models/User';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = `${environment.apiUrl}/auth`;

  constructor(private http: HttpClient) {}

  getUsers(page: number = 1, limit: number = 10): Observable<UserList[]> { // Retourne User[], pas User
    let params = new HttpParams()
      .set('page', page.toString())
      .set('limit', limit.toString());
    return this.http.get<UserList[]>(`${this.apiUrl}/users`, { params }); // User[] ici aussi
  }
}
