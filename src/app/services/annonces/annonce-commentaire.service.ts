import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { environment } from '../../environments/environment';

/**
 * Interfaces (tu peux les déplacer dans models/)
 */
export interface Commentaire {
  _id: string;
  contenu: string;
  auteur: {
    user_id: string;
    nom: string;
    prenom: string;
  };
  annonce_id: string;
  created_at: string;
  updated_at: string;
}

export interface CommentairesResponse {
  items: Commentaire[];
  total: number;
  page: number;
  totalPages: number;
}

export interface CreateCommentaire {
  contenu: string;
  auteur: {
    user_id: string;
    nom: string;
    prenom: string;
  };
  annonce_id: string;
}

@Injectable({
  providedIn: 'root',
})
export class AnnonceCommentaireService {
  private apiUrl = `${environment.apiUrl}/commentaires`;

  // 🔥 Event stream (quand un commentaire est ajouté)
  private commentaireCreatedSource = new Subject<void>();
  commentaireCreated$ = this.commentaireCreatedSource.asObservable();

  constructor(private http: HttpClient) {}

  /**
   * ➜ GET commentaires d'une annonce (avec pagination)
   */
  getCommentairesByAnnonce(
    annonceId: string,
    page: number = 1,
    limit: number = 10
  ): Observable<CommentairesResponse> {

    let params = new HttpParams()
      .set('page', page.toString())
      .set('limit', limit.toString());

    return this.http.get<CommentairesResponse>(
      `${this.apiUrl}/annonce/${annonceId}`,
      { params }
    );
  }

  /**
   * ➜ CREATE commentaire
   */
  create(data: CreateCommentaire): Observable<Commentaire> {
    return this.http.post<Commentaire>(this.apiUrl, data);
  }

  /**
   * ➜ UPDATE commentaire
   */
  update(commentaireId: string, contenu: string): Observable<Commentaire> {
    return this.http.put<Commentaire>(
      `${this.apiUrl}/${commentaireId}`,
      { contenu }
    );
  }

  /**
   * ➜ DELETE commentaire
   */
  delete(commentaireId: string): Observable<void> {
    return this.http.delete<void>(
      `${this.apiUrl}/${commentaireId}`
    );
  }

  /**
   * 🔥 Trigger event après création
   */
  notifyCommentaireCreated() {
    this.commentaireCreatedSource.next();
  }
}
