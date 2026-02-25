import { Component } from '@angular/core';
import { Article, Review, Shop } from '../../models/buyer-models';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { DataService } from '../../services/data.service';
import { CartService } from '../../services/cart.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-shop-detail',
  imports: [RouterLink, FormsModule, CommonModule],
  templateUrl: './shop-detail.component.html',
  styleUrls: ['./shop-detail.component.css', '../../styles.css'],
})
export class ShopDetailComponent {
  shop?: Shop;
  articles: Article[] = [];

  nameFilter = '';
  categoryFilter = '';
  maxPrice?: number;

  reviewRatingShop = 5;
  reviewCommentShop = '';

  reviewAuthorArticle: Record<string, string> = {};  // Modifié : number → string
  reviewRatingArticle: Record<string, number> = {};  // Modifié : number → string
  reviewCommentArticle: Record<string, string> = {}; // Modifié : number → string

  constructor(
    private readonly route: ActivatedRoute,
    private readonly dataService: DataService,
    private readonly cartService: CartService
  ) {
    const id = this.route.snapshot.paramMap.get('id'); // Modifié : plus de Number()
    if (id) {
      this.shop = this.dataService.getShopById(id);
      this.articles = this.shop ? this.dataService.getArticlesByShop(this.shop._id) : []; // Modifié : shop.id → shop._id
    }
    console.log('accueil');
  }

  get filteredArticles() {
    return this.articles.filter((article) => {
      const matchesName = this.nameFilter
        ? article.name.toLowerCase().includes(this.nameFilter.toLowerCase())
        : true;
      const matchesCategory = this.categoryFilter
        ? article.categories.some((category) =>
            category.toLowerCase().includes(this.categoryFilter.toLowerCase())
          )
        : true;
      const matchesPrice = this.maxPrice ? article.price <= this.maxPrice : true;
      return matchesName && matchesCategory && matchesPrice;
    });
  }

  getShopReviews(): Review[] {
    return this.shop ? this.dataService.getReviewsByTarget('shop', this.shop._id) : []; // Modifié : shop.id → shop._id
  }

  getArticleReviews(articleId: string): Review[] { // Modifié : number → string
    return this.dataService.getReviewsByTarget('article', articleId);
  }

  addToCart(article: Article) {
    this.cartService.addToCart(article);
  }

  addShopReview() {
    if (!this.shop) {
      return;
    }
    const comment = this.reviewCommentShop.trim();
    if (!comment) {
      return;
    }
    this.dataService.addReview('shop', this.shop._id, 'Acheteur', this.reviewRatingShop, comment); // Modifié : shop.id → shop._id
    this.reviewRatingShop = 5;
    this.reviewCommentShop = '';
  }

  addArticleReview(articleId: string) { // Modifié : number → string
    const author = (this.reviewAuthorArticle[articleId] || '').trim();
    const comment = (this.reviewCommentArticle[articleId] || '').trim();
    const rating = this.reviewRatingArticle[articleId] || 5;
    if (!author || !comment) {
      return;
    }
    this.dataService.addReview('article', articleId, author, rating, comment);
    this.reviewAuthorArticle[articleId] = '';
    this.reviewRatingArticle[articleId] = 5;
    this.reviewCommentArticle[articleId] = '';
  }
}
