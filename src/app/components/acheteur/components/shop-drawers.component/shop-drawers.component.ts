import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Shop } from '../../models/buyer-models';
import { DataService } from '../../services/data.service';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-shop-drawers',
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './shop-drawers.component.html',
  styleUrls: ['./shop-drawers.component.css', '../../styles.css'],
})
export class ShopDrawersComponent {
  @Input() open = false;
  @Output() close = new EventEmitter<void>();

  shops: Shop[] = [];
  categoryFilter = '';
  nameFilter = '';

  constructor(private readonly dataService: DataService) {
    this.shops = this.dataService.getShops();
  }

  get filteredShops() {
    const name = this.nameFilter.trim().toLowerCase();
    const category = this.categoryFilter.trim().toLowerCase();
    return this.shops.filter((shop) => {
      const matchName = name ? shop.name.toLowerCase().includes(name) : true;
      const matchCategory = category ? shop.category.toLowerCase().includes(category) : true;
      return matchName && matchCategory;
    });
  }

  onBackdropClick() {
    this.close.emit();
  }
}
