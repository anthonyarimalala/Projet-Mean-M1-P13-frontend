import { Injectable, signal } from '@angular/core';
import { ANNOUNCEMENTS, ARTICLES, COMMENTS, REVIEWS } from '../data/mock-data';
import { Announcement, Article, Comment, Review, ReviewTargetType, Shop } from '../models/buyer-models';
import { AcheteurService } from '../../../services/acheteur/acheteur.service';
import { ProduitService } from '../../../services/produit/produit.service';
import { map, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class DataService {
  private readonly announcements = signal<Announcement[]>(ANNOUNCEMENTS);
  private readonly shops = signal<Shop[]>([]); // vide au départ
  private readonly articles = signal<Article[]>(ARTICLES);
  private readonly comments = signal<Comment[]>(COMMENTS);
  private readonly reviews = signal<Review[]>(REVIEWS);

  constructor(private acheteurService: AcheteurService,
    private produitService: ProduitService) {
    this.loadShops(); // charger les boutiques dès le démarrage
  }

  // ----------------------------
  // Boutiques via HTTP
  // ----------------------------
  loadShops(): void {
    this.acheteurService.getShops()
      .pipe(
        tap((backendShops) => {
          
          const mappedShops: Shop[] = backendShops.map((b, index) => ({
            id: index + 1,         // id numérique pour le frontend
            mongoId: b._id,        // vrai id MongoDB
            name: b.nom_boutique,
            category: b.categories?.[0] || 'Autre',
            location: b.location || 'Non renseignée',
            description: `Numéro : ${b.numero}, Étage : ${b.etage}`,
            imageUrl: b.imageUrl || undefined
          }));
          console.log('Boutiques mappées pour le front :', mappedShops);
          this.shops.set(mappedShops);
        })
      )
      .subscribe({
        error: (err) => console.error('Erreur lors du chargement des boutiques', err)
      });
  }


  getShops(): Shop[] {
    return this.shops();
  }



  // ----------------------------
  // Annonces, Articles, Commentaires, Avis
  // ----------------------------
  getAnnouncements() {
    return this.announcements();
  }

  getArticles() {
    return this.articles();
  }

  getShopById(id: number | string) {
    return this.shops().find((shop) => shop.id === id);
  }

  getArticlesByShop(mongoShopId: string): Observable<Article[]> {
    return this.produitService.getProduitsByBoutiqueId(mongoShopId).pipe(
      map((backendArticles) => {
        const mappedArticles: Article[] = backendArticles.map((p) => ({
          id: p._id,               // id réel du produit
          shopId: p.boutique_id,   // id réel de la boutique
          name: p.nom,
          categories: [p.categorie_id], // adapter si tu récupères le vrai nom catégorie
          price: p.prix_promo || p.prix_vente,
          description: p.description,
          imageUrls: p.images || []
        }));
  
        console.log("Articles récupérés depuis le backend :", mappedArticles);
  
        return mappedArticles; // retourne le tableau, pas besoin de set ici
      })
    );
  }

  // Ajoute ce getter dans DataService
public getArticlesSignal(): Article[] {
  return this.articles(); // renvoie le contenu du signal articles
}

  getCommentsByAnnouncement(announcementId: number) {
    return this.comments().filter((comment) => comment.announcementId === announcementId);
  }

  getReviewsByTarget(targetType: ReviewTargetType, targetId: string) {
    return this.reviews().filter(
      review => review.targetType === targetType && review.targetId === targetId
    );
  }

  addComment(announcementId: number, author: string, content: string) {
    const nextId = this.getNextId(this.comments());
    const newComment: Comment = {
      id: nextId,
      announcementId,
      author,
      content,
      date: new Date().toISOString().slice(0, 10),
    };
    this.comments.update((list) => [newComment, ...list]);
  }

  addReview(
    targetType: ReviewTargetType,
    targetId: string,
    author: string,
    rating: number,
    comment: string
  ) {
    const nextId = this.getNextId(this.reviews());
    const newReview: Review = {
      id: nextId,
      targetType,
      targetId,
      author,
      rating,
      comment,
      date: new Date().toISOString().slice(0, 10),
    };
    this.reviews.update(list => [newReview, ...list]);
  }

  // ----------------------------
  // Helpers
  // ----------------------------
  private getNextId<T extends { id: number }>(items: T[]) {
    return items.length ? Math.max(...items.map((item) => item.id)) + 1 : 1;
  }
}