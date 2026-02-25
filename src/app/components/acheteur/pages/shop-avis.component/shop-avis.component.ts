import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Shop, Review } from '../../models/buyer-models';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-shop-avis',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './shop-avis.component.html',
  styleUrls: ['./shop-avis.component.css']
})
export class ShopAvisComponent {
  @Input() shop!: Shop;
  @Output() reviewAdded = new EventEmitter<void>();

  reviewRatingShop = 5;
  reviewCommentShop = '';

  constructor(private readonly dataService: DataService) {}

  getShopReviews(): Review[] {
    return this.shop ? this.dataService.getReviewsByTarget('shop', this.shop._id) : [];
  }

  addShopReview() {
    if (!this.shop) {
      return;
    }
    const comment = this.reviewCommentShop.trim();
    if (!comment) {
      return;
    }
    this.dataService.addReview('shop', this.shop._id, 'Acheteur', this.reviewRatingShop, comment);
    this.reviewRatingShop = 5;
    this.reviewCommentShop = '';
    this.reviewAdded.emit();
  }
}
