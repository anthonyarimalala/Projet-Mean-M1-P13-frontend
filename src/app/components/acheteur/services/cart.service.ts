import { Injectable, signal } from '@angular/core';
import { Article, CartItem } from '../models/buyer-models';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private readonly items = signal<CartItem[]>([]);
  private readonly open = signal(false);

  readonly cartItems = () => this.items();
  readonly isOpen = () => this.open();

  constructor(private readonly dataService: DataService) {}

  openCart() {
    this.open.set(true);
  }

  closeCart() {
    this.open.set(false);
  }

  toggleCart() {
    this.open.update((value) => !value);
  }

  addToCart(article: Article) {
    this.items.update((current) => {
      const existing = current.find((item) => item.articleId === article.id);
      if (existing) {
        return current.map((item) =>
          item.articleId === article.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...current, { articleId: article.id, quantity: 1 }];
    });
    this.open.set(true);
  }

  updateQuantity(articleId: number, quantity: number) {
    if (quantity <= 0) {
      this.removeItem(articleId);
      return;
    }
    this.items.update((current) =>
      current.map((item) => (item.articleId === articleId ? { ...item, quantity } : item))
    );
  }

  removeItem(articleId: number) {
    this.items.update((current) => current.filter((item) => item.articleId !== articleId));
  }

  clearCart() {
    this.items.set([]);
  }

  getTotal() {
    const articles = this.dataService.getArticles();
    return this.items().reduce((total, item) => {
      const article = articles.find((a) => a.id === item.articleId);
      if (!article) {
        return total;
      }
      return total + article.price * item.quantity;
    }, 0);
  }
}
