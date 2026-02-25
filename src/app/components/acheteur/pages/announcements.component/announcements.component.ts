import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { DataService } from '../../services/data.service';
import { Announcement, Comment, Shop } from '../../models/buyer-models';
import { AuthService } from '../../../../services/auth.service';
import { AnnonceService } from '../../../../services/annonces/annonce.service';
import { Annonce, AnnoncesResponse } from '../../../../models/Annonce';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { AnnonceCommentaireService } from '../../../../services/annonces/annonce-commentaire.service';

@Component({
  selector: 'app-announcements',
  standalone: true,
  imports: [FormsModule, RouterLink, CommonModule],
  templateUrl: './announcements.component.html',
  styleUrls: ['./announcements.component.css', '../../styles.css']
})
export class AnnouncementsComponent {

  private annonceService = inject(AnnonceService);
  private authService = inject(AuthService);

  user_id = signal('');

  // Données
  annonces = signal<Annonce[]>([]);
  loading = signal(false);
  error = signal<string | null>(null);

  // Pagination infinie
  currentPage = signal(1);
  itemsPerPage = signal(5);
  totalPages = signal(0);
  hasMore = signal(true);

  private sub!: Subscription;


  shops: Shop[] = [];
  commentAuthor: Record<number, string> = {};
  commentContent: Record<number, string> = {};

  constructor(private readonly dataService: DataService) {
    this.shops = this.dataService.getShops();
  }

  ngOnInit(): void {
    this.loadInitialAnnonces();
    this.user_id.set(this.authService.getId() ?? '');
    // 🔥 Ecoute des créations
    this.sub = this.annonceService.annonceCreated$.subscribe(() => {
      this.loadInitialAnnonces();
      this.user_id.set(this.authService.getId() ?? '');
    });
    console.log('annonces chargées :', this.annonces());
  }


  // -------------------------
  // Chargement des annonces
  // -------------------------
  loadInitialAnnonces(): void {
    this.currentPage.set(1);
    this.annonces.set([]);
    this.hasMore.set(true);
    this.loadAnnonces();
  }

  loadAnnonces(): void {
      if (this.loading() || !this.hasMore()) return;

      this.loading.set(true);
      this.error.set(null);

      this.annonceService.getAnnonces(this.currentPage(), this.itemsPerPage()).subscribe({
        next: (response: AnnoncesResponse) => {
          // Concaténer les nouvelles annonces avec les existantes
          this.annonces.update((existing) => [...existing, ...response.items]);
          this.totalPages.set(response.pages || Math.ceil(response.total / this.itemsPerPage()));
          this.hasMore.set(this.currentPage() < this.totalPages());
          this.loading.set(false);
        },
        error: (err) => {
          this.error.set('Erreur de chargement des annonces');
          this.loading.set(false);
          console.error(err);
        },
      });
    }

  getComments(announcementId: number): Comment[] {
    return this.dataService.getCommentsByAnnouncement(announcementId);
  }

  addComment(announcementId: number) {
    const content = (this.commentContent[announcementId] || '').trim();
    if (!content) {
      return;
    }
    this.dataService.addComment(announcementId, 'Acheteur', content);
    this.commentContent[announcementId] = '';
  }
}
