import { Component } from '@angular/core';
import { Article, Review, Shop } from '../../models/buyer-models';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { DataService } from '../../services/data.service';
import { CartService } from '../../services/cart.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ShopAvisComponent } from '../shop-avis.component/shop-avis.component';

@Component({
  selector: 'app-shop-detail',
  imports: [RouterLink, FormsModule, CommonModule, ShopAvisComponent],
  templateUrl: './shop-detail.component.html',
  styleUrls: ['./shop-detail.component.css', '../../styles.css'],
})
export class ShopDetailComponent {
  shop?: Shop;
  articles: Article[] = [];

  nameFilter = '';
  categoryFilter = '';
  maxPrice?: number;

  reviewAuthorArticle: Record<string, string> = {};
  reviewRatingArticle: Record<string, number> = {};
  reviewCommentArticle: Record<string, string> = {};

  constructor(
    private readonly route: ActivatedRoute,
    private readonly dataService: DataService,
    private readonly cartService: CartService
  ) {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.shop = this.dataService.getShopById(id);
      this.articles = this.shop ? this.dataService.getArticlesByShop(this.shop._id) : [];
    }
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

  getArticleReviews(articleId: string): Review[] {
    return this.dataService.getReviewsByTarget('article', articleId);
  }

  addToCart(article: Article) {
    this.cartService.addToCart(article);
  }

  onReviewAdded() {
    // Optionally refresh data or show notification
    console.log('Review added successfully');
  }

  addArticleReview(articleId: string) {
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
