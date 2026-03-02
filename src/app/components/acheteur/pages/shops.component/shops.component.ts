import { Component, computed } from '@angular/core';
import { DataService } from '../../services/data.service';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Shop } from '../../models/buyer-models';
import { ProduitService } from '../../../../services/produit/produit.service';

@Component({
  selector: 'app-shops',
  standalone: true,
  imports: [RouterLink, FormsModule, CommonModule],
  templateUrl: './shops.component.html',
  styleUrls: ['./shops.component.css', '../../styles.css'],
})
export class ShopsComponent {
  categoryFilter = '';

  // computed pour filtrer automatiquement les boutiques selon categoryFilter
  filteredShops = computed(() => {
    const allShops: Shop[] = this.dataService.getShops();
    if (!this.categoryFilter.trim()) return allShops;
    const term = this.categoryFilter.toLowerCase();
    return allShops.filter(shop => shop.category.toLowerCase().includes(term));
  });

  constructor(
    public dataService: DataService,
    private produitService: ProduitService
  )  {
    console.log('ShopsComponent initialisé');
  }

  onShopClick(mongoId: string) {

    console.log("ID boutique cliqué :", mongoId);

    this.produitService.getProduitsByBoutiqueId(mongoId)
      .subscribe({
        next: (produits) => {
          console.log("tesssssssst");
        },
        error: (err) => {
          console.error("Erreur récupération produits :", err);
        }
      });
  }
}