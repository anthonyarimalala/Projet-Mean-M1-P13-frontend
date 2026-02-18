import { Component, Input } from '@angular/core';
import { Article, CartItem } from '../../models/buyer-models';
import { CartService } from '../../services/cart.service';
import { DataService } from '../../services/data.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cart',
  imports: [FormsModule, CommonModule],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css', '../../styles.css'],
})
export class CartComponent {
  @Input() compact = false;

  private readonly articles: Article[] = [];

  constructor(
    private readonly cartService: CartService,
    private readonly dataService: DataService
  ) {
    this.articles = this.dataService.getArticles();
  }

  get cartItems() {
    return this.cartService.cartItems;
  }

  getArticle(item: CartItem) {
    return this.articles.find((article) => article.id === item.articleId);
  }

  updateQuantity(item: CartItem, value: string) {
    const quantity = Number(value);
    if (Number.isNaN(quantity)) return;
    this.cartService.updateQuantity(item.articleId, quantity);
  }

  remove(item: CartItem) {
    this.cartService.removeItem(item.articleId);
  }

  get total() {
    return this.cartService.getTotal();
  }
}
