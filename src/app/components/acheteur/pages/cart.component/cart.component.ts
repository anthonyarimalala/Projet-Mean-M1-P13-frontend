import { Component, Input } from '@angular/core';
import { CartItem } from '../../models/buyer-models';
import { CartService } from '../../services/cart.service';
import { AuthService } from '../../../../services/auth.service';
import { ProduitService } from '../../../../services/produit/produit.service';
import { forkJoin } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css', '../../styles.css'],
})
export class CartComponent {
  @Input() compact = false;
  @Input() boutiqueId: string | null = null;

  // Modal général
  modalVisible = false;
  modalMessage = '';

  // Modal stock
  stockModalVisible = false;
  stockModalMessage = '';
  private pendingItemToCorrect: CartItem | null = null;
  private pendingStock: number | null = null;

  private panierJson: any; // JSON prêt pour envoi

  constructor(
    private readonly cartService: CartService,
    private readonly authService: AuthService,
    private readonly produitService: ProduitService,
    private readonly cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    const userId = this.authService.getId();
    if (!userId) return;
    this.preparePanierJson(userId);
  }

  // Préparer le JSON du panier
  private preparePanierJson(userId: string) {
    const allItems = this.cartItems;

    const observables = allItems.map(item =>
      this.produitService.getBoutique(item.articleId)
    );

    forkJoin(observables).subscribe({
      next: results => {
        results.forEach((res, index) => allItems[index].shopId = res.boutique_id);

        const boutiquesMap: Record<string, { produit_id: string; quantite: number }[]> = {};
        allItems.forEach(item => {
          if (!item.shopId) return;
          if (!boutiquesMap[item.shopId]) boutiquesMap[item.shopId] = [];
          boutiquesMap[item.shopId].push({ produit_id: item.articleId, quantite: item.quantity });
        });

        this.panierJson = {
          user_id: userId,
          boutiques: Object.keys(boutiquesMap).map(bid => ({
            boutique_id: bid,
            produits: boutiquesMap[bid]
          }))
        };
      },
      error: err => console.error('Erreur récupération boutique_id :', err)
    });
  }

  // Fermer le modal général
  closeModal() {
    this.modalVisible = false;
  }

  // Fermer le modal stock et corriger la quantité
  closeStockModal() {
    this.stockModalVisible = false;

    if (this.pendingItemToCorrect && this.pendingStock !== null) {
      this.pendingItemToCorrect.quantity = this.pendingStock;
      this.cartService.updateQuantity(this.pendingItemToCorrect.articleId, this.pendingStock);
    }

    this.pendingItemToCorrect = null;
    this.pendingStock = null;
  }

  // Envoyer le panier
  commander() {
    const userId = this.authService.getId();
    if (!userId) return;
  
    const allItems = this.cartItems;
  
    const observables = allItems.map(item =>
      this.produitService.getBoutique(item.articleId)
    );
  
    forkJoin(observables).subscribe({
      next: results => {
        results.forEach((res, index) => {
          allItems[index].shopId = res.boutique_id;
        });
  
        const boutiquesMap: Record<string, { produit_id: string; quantite: number }[]> = {};
  
        allItems.forEach(item => {
          if (!item.shopId) return;
  
          if (!boutiquesMap[item.shopId]) {
            boutiquesMap[item.shopId] = [];
          }
  
          boutiquesMap[item.shopId].push({
            produit_id: item.articleId,
            quantite: item.quantity   // 🔥 toujours la valeur actuelle
          });
        });
  
        const panierJson = {
          user_id: userId,
          boutiques: Object.keys(boutiquesMap).map(bid => ({
            boutique_id: bid,
            produits: boutiquesMap[bid]
          }))
        };
  
        this.produitService.sendCart(panierJson).subscribe({
          next: () => {
            this.modalMessage = 'Panier envoyé avec succès !';
            this.modalVisible = true;
          },
          error: () => {
            this.modalMessage = 'Erreur lors de l’envoi du panier.';
            this.modalVisible = true;
          }
        });
      },
      error: err => console.error(err)
    });
  }
  // Vérifier le stock d’un article
  checkStock(item: CartItem) {
    const quantity = item.quantity;

    this.produitService.getStock(item.articleId).subscribe({
      next: stockData => {
        const stock = stockData.quantite;
        if (quantity > stock) {
          this.pendingItemToCorrect = item;
          this.pendingStock = stock;
          this.stockModalMessage = `La quantité saisie dépasse le stock disponible (${stock}).`;
          this.stockModalVisible = true;
          this.cdr.detectChanges();
        } else {
          this.cartService.updateQuantity(item.articleId, quantity);
        }
      },
      error: err => {
        this.pendingItemToCorrect = item;
        this.pendingStock = 0;
        this.stockModalMessage = 'Impossible de vérifier le stock du produit.';
        this.stockModalVisible = true;
        this.cdr.detectChanges();
      }
    });
  }

  // Accès au panier
  get cartItems(): CartItem[] {
    return this.cartService.cartItems();
  }

  // Total du panier
  get total(): number {
    return this.cartService.getTotal();
  }

  // Supprimer un article
  remove(item: CartItem) {
    this.cartService.removeItem(item.articleId);
  }

  // trackBy pour *ngFor
  trackByArticleId(index: number, item: CartItem) {
    return item.articleId;
  }
}