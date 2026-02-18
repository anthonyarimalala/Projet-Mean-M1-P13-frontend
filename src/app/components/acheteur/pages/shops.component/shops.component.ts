import { Component } from '@angular/core';
import { Shop } from '../../models/buyer-models';
import { DataService } from '../../services/data.service';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-shops',
  imports: [RouterLink, FormsModule],
  templateUrl: './shops.component.html',
  styleUrls: ['./shops.component.css', '../../styles.css'],
})
export class ShopsComponent {
  shops: Shop[] = [];
  categoryFilter = '';

  constructor(private readonly dataService: DataService) {
    this.shops = this.dataService.getShops();
  }

  get filteredShops() {
    if (!this.categoryFilter.trim()) {
      return this.shops;
    }
    const term = this.categoryFilter.toLowerCase();
    return this.shops.filter((shop) => shop.category.toLowerCase().includes(term));
  }
}
