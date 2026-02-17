import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, OnDestroy, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InitialsPipe } from '../../../../../pipes/initials-pipe';
import { Subscription } from 'rxjs';
import { AnnonceCommentaireService, Commentaire } from '../../../../../services/annonces/annonce-commentaire.service';
import { AuthService } from '../../../../../services/auth.service';

@Component({
  selector: 'app-admin-boutique-commentaire',
  standalone: true,
  imports: [CommonModule, FormsModule, InitialsPipe],
  templateUrl: './admin-boutique-commentaire.component.html',
  styleUrls: [
    './admin-boutique-commentaire.component.css',
    '../admin-boutique-annonces-list.component/admin-boutique-annonces-list.component.css',
  ],
})
export class AdminBoutiqueCommentaireComponent implements OnInit, OnDestroy {
  @Input() annonceId!: string;
  @Input() user_id!: string;

  commentaires = signal<Commentaire[]>([]);
  nouveauCommentaire: string = '';

  loading: boolean = false;
  loadingPublication: boolean = false;
  error: string | null = null;

  // Pagination
  page = 1;
  limit = 10;
  hasMore = true;

  private subscription: Subscription = new Subscription();

  constructor(
    private commentaireService: AnnonceCommentaireService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.chargerPremiersCommentaires();

    // S'abonner aux notifications de création de commentaire
    this.subscription.add(
      this.commentaireService.commentaireCreated$.subscribe(() => {
        this.chargerPremiersCommentaires();
      })
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  /**
   * Charge les premiers commentaires (page 1)
   */
  chargerPremiersCommentaires(): void {
    this.page = 1;
    this.chargerCommentaires();
  }

  /**
   * Charge plus de commentaires (page suivante)
   */
  chargerPlusDeCommentaires(): void {
    this.page++;
    this.chargerCommentaires();
  }

  /**
   * Charge les commentaires selon la page courante
   */
  private chargerCommentaires(): void {
    this.loading = true;
    this.error = null;

    this.commentaireService
      .getCommentairesByAnnonce(this.annonceId, this.page, this.limit)
      .subscribe({
        next: (response) => {
          if (this.page === 1) {
            this.commentaires.set(response.items || []);
          } else {
            this.commentaires.set([...this.commentaires(), ...(response.items || [])]);
          }
          this.hasMore = response.items?.length === this.limit;
          this.loading = false;
        },
        error: (error) => {
          console.error('Erreur chargement commentaires:', error);
          this.error = 'Impossible de charger les commentaires';
          this.loading = false;

          // Revenir à la page précédente en cas d'erreur
          if (this.page > 1) {
            this.page--;
          }
        }
      });
  }

  /**
   * Ajoute un nouveau commentaire
   */
  ajouterCommentaire(): void {
    const contenu = this.nouveauCommentaire.trim();
    if (!contenu) return;

    this.loadingPublication = true;
    this.error = null;

    const auteur = {
      user_id: this.authService.getId() ?? '',
      nom: this.authService.getNom() ?? '',
      prenom: this.authService.getPrenom() ?? '',
    };

    this.commentaireService
      .create({
        contenu,
        auteur,
        annonce_id: this.annonceId,
      })
      .subscribe({
        next: () => {
          this.nouveauCommentaire = '';
          // Important : remettre loadingPublication à false ici
          this.loadingPublication = false;
          this.chargerPremiersCommentaires();
        },
        error: (error) => {
          console.error('Erreur ajout commentaire:', error);
          this.error = "Impossible d'ajouter le commentaire";
          this.loadingPublication = false;
        }
      });
  }

  /**
   * Supprime un commentaire
   */
  supprimerCommentaire(commentaireId: string): void {
    if (!confirm('Supprimer ce commentaire ?')) return;

    this.loading = true;
    this.error = null;

    this.commentaireService
      .delete(commentaireId)
      .subscribe({
        next: () => {
          // CORRECTION: Utiliser la méthode update() du signal pour filtrer
          this.commentaires.update(commentairesActuels =>
            commentairesActuels.filter(commentaire => commentaire._id !== commentaireId)
          );
          this.loading = false;

          // CORRECTION: Utiliser commentaires() pour accéder à la valeur du signal
          if (this.commentaires().length === 0) {
            this.page = 1;
            this.hasMore = true;
          }
        },
        error: (error) => {
          console.error('Erreur suppression commentaire:', error);
          this.error = 'Impossible de supprimer le commentaire';
          this.loading = false;
        }
      });
  }

}
