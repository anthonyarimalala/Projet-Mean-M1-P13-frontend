import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ProduitService } from '../../../../services/produit/produit.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-boutique-gestion-stock.component',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './boutique-gestion-stock.component.html',
  styleUrls: ['./boutique-gestion-stock.component.css'],
})
export class BoutiqueGestionStockComponent implements OnInit {

  boutiqueId!: string;
  produits: any[] = [];
  loading = true;
  errorMessage = '';

  constructor(
    private route: ActivatedRoute,
    private produitService: ProduitService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.boutiqueId = this.route.snapshot.paramMap.get('id')!;
    console.log('ID boutique:', this.boutiqueId);

    this.loadProduits();
  }

  loadProduits() {
    this.produitService.getProduitsByBoutiqueId(this.boutiqueId).subscribe({
      next: (data) => {
        this.produits = data;
        this.loading = false;
        console.log('Produits de la boutique:', this.produits);

        // Force Angular à détecter les changements
        this.cdr.detectChanges();
      },
      error: (err) => {
        this.errorMessage = err.error?.message || 'Erreur serveur';
        this.loading = false;
        this.cdr.detectChanges();
        console.error('Erreur lors du chargement des produits:', this.errorMessage);
      }
    });
  }

  selectedProduit: any = null;
stockQuantity: number = 1;

openStockModal(produit: any) {
  this.selectedProduit = produit;
  this.stockQuantity = 1; // valeur par défaut
}

closeStockModal() {
  this.selectedProduit = null;
}

confirmAddStock() {
  if (!this.stockQuantity || this.stockQuantity < 1) {
    alert("Veuillez entrer une quantité valide");
    return;
  }

  console.log('ID produit:', this.selectedProduit._id);
  console.log('Quantité ajoutée:', this.stockQuantity);

  // Appel du service pour mettre à jour le stock
  this.produitService.addStock(this.selectedProduit._id, this.stockQuantity).subscribe({
    next: (response) => {
      console.log('Stock mis à jour avec succès :', response);
      // Optionnel : mettre à jour localement la quantité du produit si tu l’affiches
      if (this.selectedProduit.stock !== undefined) {
        this.selectedProduit.stock += this.stockQuantity;
      }
      // Fermer le modal après confirmation
      this.closeStockModal();
    },
    error: (err) => {
      console.error('Erreur lors de l’ajout du stock :', err);
      alert('Erreur lors de l’ajout du stock. Veuillez réessayer.');
    }
  });
}
}