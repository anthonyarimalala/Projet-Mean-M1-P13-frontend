import {
  Component,
  computed,
  inject,
  signal,
  OnInit,
  OnDestroy,
  ViewChild,
  ElementRef,
  AfterViewInit,
} from '@angular/core';
import { Annonce, AnnoncesResponse } from '../../../../../models/Annonce';
import { AnnonceService } from '../../../../../services/annonces/annonce.service';
import { CommonModule } from '@angular/common';
import { InitialsPipe } from '../../../../../pipes/initials-pipe';
import { Subscription } from 'rxjs';
import { Nl2brPipe } from '../../../../../pipes/nl2br-pipe';
import { AuthService } from '../../../../../services/auth.service';

@Component({
  selector: 'app-admin-annonces-list',
  standalone: true,
  imports: [CommonModule, InitialsPipe, Nl2brPipe],
  templateUrl: './admin-annonces-list.component.html',
  styleUrl: './admin-annonces-list.component.css',
})
export class AdminAnnoncesListComponent implements OnInit, AfterViewInit, OnDestroy {
  private annonceService = inject(AnnonceService);
  private authService = inject(AuthService);

  user_id = signal('');

  // Filtres
  categories = ['Toutes', 'Moi'];
  searchTerm = signal('');
  selectedCategory = signal('Toutes');
  selectedStatus = signal('Tous');

  // Données
  annonces = signal<Annonce[]>([]);
  loading = signal(false);
  error = signal<string | null>(null);

  // Pagination infinie
  currentPage = signal(1);
  itemsPerPage = signal(5);
  totalPages = signal(0);
  hasMore = signal(true); // Y a-t-il encore des pages à charger ?

  private sub!: Subscription;

  // Observer pour le scroll
  @ViewChild('scrollAnchor') scrollAnchor!: ElementRef;
  private observer!: IntersectionObserver;

  ngOnInit(): void {
    this.loadInitialAnnonces();
    this.user_id.set(this.authService.getId() ?? '');
    // 🔥 Ecoute des créations
    this.sub = this.annonceService.annonceCreated$.subscribe(() => {
      this.loadInitialAnnonces();
      this.user_id.set(this.authService.getId() ?? '');
    });
  }

  ngAfterViewInit(): void {
    this.setupIntersectionObserver();
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
    this.sub?.unsubscribe();
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

  // Déclenche le chargement de la page suivante
  loadNextPage(): void {
    if (!this.hasMore() || this.loading()) return;
    this.currentPage.update((page) => page + 1);
    this.loadAnnonces();
  }

  // -------------------------
  // Intersection Observer (scroll infini)
  // -------------------------
  private setupIntersectionObserver(): void {
    this.observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && this.hasMore() && !this.loading()) {
          this.loadNextPage();
        }
      },
      { threshold: 0.1 } // Déclenche quand 10% de l'élément est visible
    );

    this.observer.observe(this.scrollAnchor.nativeElement);
  }

  // -------------------------
  // Gestion des filtres (réinitialisation)
  // -------------------------
  onSearchChange(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.searchTerm.set(value);
    // Pas de rechargement, filtrage local uniquement
  }

  onCategoryChange(event: Event): void {
    const value = (event.target as HTMLSelectElement).value;
    this.selectedCategory.set(value);
    // Pas de rechargement
  }

  onStatusChange(event: Event): void {
    const value = (event.target as HTMLSelectElement).value;
    this.selectedStatus.set(value);
    // Pas de rechargement
  }

  resetFilters(): void {
    this.searchTerm.set('');
    this.selectedCategory.set('Toutes');
    this.selectedStatus.set('Tous');
    // Les annonces déjà chargées sont filtrées localement
  }

  deleteAnnonce(id: string) {
    const confirmed = window.confirm('Êtes-vous sûr de vouloir supprimer cette annonce ?');
    if (!confirmed) {
      return; // l'utilisateur a annulé
    }

    this.annonceService.deleteAnnonce(id).subscribe(() => {
      console.log('Annonce supprimée');
      this.annonceService.notifyAnnonceCreated();
    });
  }

}
