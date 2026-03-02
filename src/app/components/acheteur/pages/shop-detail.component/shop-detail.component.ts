import { Component, effect, signal } from '@angular/core';
import { Article, Shop } from '../../models/buyer-models';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { DataService } from '../../services/data.service';
import { CartService } from '../../services/cart.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ProduitService } from '../../../../services/produit/produit.service';
import { CartComponent } from '../cart.component/cart.component';

@Component({
  selector: 'app-shop-detail',
  imports: [RouterLink, FormsModule, CommonModule],
  templateUrl: './shop-detail.component.html',
  styleUrls: ['./shop-detail.component.css', '../../styles.css'],
})
export class ShopDetailComponent {

  articles = signal<Article[]>([]);

  // Signal pour stock par article
  stockMap = signal<Record<string, number>>({});

  constructor(
    private readonly route: ActivatedRoute,
    private readonly dataService: DataService,
    private readonly cartService: CartService,
    private readonly produitService: ProduitService,
  ) {

    this.route.paramMap.subscribe(params => {
      const mongoId = params.get('id');
      console.log('ID boutique :', mongoId);
      if (!mongoId) return;

      // Récupérer les articles
      this.dataService.getArticlesByShop(mongoId).subscribe(fetchedArticles => {
        this.articles.set(fetchedArticles);
      });

      // 🔥 Effect pour gérer la mise à jour des articles et récupérer le stock
      effect(() => {
        const currentArticles = this.articles();

        console.log('Articles mis à jour :', currentArticles.length);
        console.log('Articles :', currentArticles);

        currentArticles.forEach(article => {
          this.produitService.getStock(article.id.toString()).subscribe({
            next: (res) => {
              // Mettre à jour le stock de cet article
              this.stockMap.update(map => {
                map[article.id] = res?.quantite ?? 0;
                return map;
              });
            },
            error: (err) => {
              console.error(`Erreur récupération stock produit ${article.id}`, err);
              // En cas d'erreur, stock = 0
              this.stockMap.update(map => {
                map[article.id] = 0;
                return map;
              });
            }
          });
        });

      });
    });
  }

  ngOnInit(): void {
    // Récupérer l'ID de la boutique depuis l'URL
    this.route.paramMap.subscribe(params => {
      const boutiqueId = params.get('id');
      console.log('ID boutique depuis URL tyyyyyyyyyyy :', boutiqueId);
    });
  }

  // Ajouter un article au panier
  addToCart(article: Article) {
    const stock = this.stockMap()[article.id];
    
    if (stock > 0) {
      // Ajouter au panier
      this.cartService.addToCart(article);
  
      // Préparer l'objet à envoyer / log
      const cartItemInfo = {
        id: article.id,
        name: article.name,
        price: article.price
      };
  
      console.log('Article ajouté au panier :', cartItemInfo);
  
      // Si tu veux envoyer à un backend, tu peux utiliser ce même objet
      // this.dataService.sendCartItem(cartItemInfo).subscribe(...);
    } else {
      console.warn(`Impossible d'ajouter ${article.name} au panier : stock insuffisant`);
    }
  }
  // Méthode pour récupérer le stock manuellement si besoin
  getStockOfArticle(produitId: string) {
    this.produitService.getStock(produitId).subscribe({
      next: (res) => {
        this.stockMap.update(map => {
          map[produitId] = res?.quantite ?? 0;
          return map;
        });
      },
      error: (err) => {
        console.error('Erreur récupération stock :', err);
        this.stockMap.update(map => {
          map[produitId] = 0;
          return map;
        });
      }
    });
  }

}

/*import { Component, effect } from '@angular/core';

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

  reviewAuthorArticle: Record<string, string> = {};
  reviewRatingArticle: Record<string, number> = {};
  reviewCommentArticle: Record<string, string> = {};

  constructor(
    private readonly route: ActivatedRoute,
    private readonly dataService: DataService,
    private readonly cartService: CartService
  ) {
    // Récupération dynamique du mongoId depuis la route
    this.route.paramMap.subscribe(params => {
      const mongoId = params.get('id');
      console.log('MongoID reçu dynamiquement :', mongoId);

      if (mongoId) {
        // Récupérer la boutique depuis le backend via mongoId
        this.shop = this.dataService.getShopById(mongoId);
        console.log('Boutique récupérée :', this.shop);

        // Récupérer les articles de cette boutique
        this.dataService.getArticlesByShop(mongoId);

        // Utiliser effect pour récupérer les articles dès qu’ils sont mis à jour
        effect(() => {
          this.articles = this.dataService.getArticlesSignal();
          console.log('Articles récupérés pour la boutique :', this.articles);
        });
      }
    });
  }

  get filteredArticles(): Article[] {
    return this.articles.filter(article => {
      const matchesName = this.nameFilter
        ? article.name.toLowerCase().includes(this.nameFilter.toLowerCase())
        : true;
      const matchesCategory = this.categoryFilter
        ? article.categories.some(category =>
            category.toLowerCase().includes(this.categoryFilter.toLowerCase())
          )
        : true;
      const matchesPrice = this.maxPrice ? article.price <= this.maxPrice : true;
      return matchesName && matchesCategory && matchesPrice;
    });
  }

  getShopReviews(): Review[] {
    return this.shop
      ? this.dataService.getReviewsByTarget('shop', String(this.shop.id))
      : [];
  }
  getArticleReviews(articleId: string | number): Review[] {
    return this.dataService.getReviewsByTarget('article', String(articleId));
  }

  addToCart(article: Article) {
    this.cartService.addToCart(article);
  }

  addShopReview() {
    if (!this.shop) return;
    const comment = this.reviewCommentShop.trim();
    if (!comment) return;

    this.dataService.addReview(
      'shop',
      String(this.shop.id),
      'Acheteur',
      this.reviewRatingShop,
      comment
    );

    this.reviewRatingShop = 5;
    this.reviewCommentShop = '';
  }

  addArticleReview(articleId: string | number) {
    const author = (this.reviewAuthorArticle[articleId] || '').trim();
    const comment = (this.reviewCommentArticle[articleId] || '').trim();
    const rating = this.reviewRatingArticle[articleId] || 5;

    if (!author || !comment) return;

    this.dataService.addReview('article', String(articleId), author, rating, comment);

    this.reviewAuthorArticle[articleId] = '';
    this.reviewRatingArticle[articleId] = 5;
    this.reviewCommentArticle[articleId] = '';
  }

  // trackBy pour Angular (performance)
  trackByArticleId(index: number, article: Article) {
    return article.id;
  }

  trackByReviewId(index: number, review: Review) {
    return review.id;
  }
}*/