import { BoutiqueAvisService } from './../../../../services/boutique-avis/boutique-avis.service';
import { Component, Input, Output, EventEmitter, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Shop } from '../../models/buyer-models';
import { DataService } from '../../services/data.service';
import { ActivatedRoute } from '@angular/router';
import { CreateBoutiqueAvis, ReadBoutiqueAvis } from '../../../../models/boutique-avis';
import { AuthService } from '../../../../services/auth.service';

@Component({
  selector: 'app-shop-avis',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './shop-avis.component.html',
  styleUrls: ['./shop-avis.component.css'],
})
export class ShopAvisComponent implements OnInit {
  @Input() shop!: Shop;
  @Output() reviewAdded = new EventEmitter<void>();

  avis = signal<ReadBoutiqueAvis[]>([]);

  idBoutique = '';
  reviewRatingShop = 5;
  reviewCommentShop = '';

  isLoading = false;
  errorMessage = '';

  constructor(
    private readonly dataService: DataService,
    private readonly route: ActivatedRoute,
    private readonly boutiqueAvisService: BoutiqueAvisService,
    private readonly authService: AuthService
  ) {
    this.idBoutique = this.route.snapshot.paramMap.get('id') ?? '';
    console.log('idBoutique:', this.idBoutique);
  }

  ngOnInit(): void {
    this.loadAvis();
  }

  // Nouvelle méthode unifiée pour le submit
  onSubmit(): void {
    if (!this.reviewCommentShop.trim()) {
      this.errorMessage = 'Veuillez saisir un avis';
      return;
    }

    const data: CreateBoutiqueAvis = {
      id_boutique: this.idBoutique,
      id_user: this.authService.getId() || '',
      avis: this.reviewCommentShop.trim(),
      note: this.reviewRatingShop,
    };

    this.createOrUpdate(data);
  }

  createOrUpdate(data: CreateBoutiqueAvis): void {
    this.isLoading = true;
    this.errorMessage = '';

    this.boutiqueAvisService.createOrUpdateAvis(data).subscribe({
      next: (response) => {
        console.log('Avis enregistré avec succès:', response);
        this.reviewRatingShop = 5;
        this.reviewCommentShop = '';
        this.loadAvis(); // Recharger la liste
        this.reviewAdded.emit();
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Erreur lors de l\'enregistrement:', error);
        this.errorMessage = error.error?.message || 'Erreur lors de l\'enregistrement';
        this.isLoading = false;
      }
    });
  }

  loadAvis(): void {
    if (!this.idBoutique) return;

    this.boutiqueAvisService.getAvisByBoutique(this.idBoutique, 1, 10)
      .subscribe({
        next: (response) => {
          // La réponse est un objet avec items, pas un tableau direct
          if (response && Array.isArray(response.items)) {
            this.avis.set(response.items);
          } else {
            console.error('Format de réponse inattendu:', response);
            this.avis.set([]);
          }
        },
        error: (err) => {
          console.error('Erreur chargement avis:', err);
          this.errorMessage = 'Erreur lors du chargement des avis';
          this.avis.set([]);
        }
      });
  }

  // Supprimez les méthodes inutilisées :
  // getShopReviews(), addShopReview()
}
