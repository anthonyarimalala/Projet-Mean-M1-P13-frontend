import { Injectable, signal } from '@angular/core';
import { ANNOUNCEMENTS, ARTICLES, COMMENTS, REVIEWS, SHOPS } from '../data/mock-data';
import {
  Announcement,
  Article,
  Comment,
  Review,
  ReviewTargetType,
  Shop,
} from '../models/buyer-models';

@Injectable({ providedIn: 'root' })
export class DataService {
  private readonly announcements = signal<Announcement[]>(ANNOUNCEMENTS);
  private readonly shops = signal<Shop[]>(SHOPS);
  private readonly articles = signal<Article[]>(ARTICLES);
  private readonly comments = signal<Comment[]>(COMMENTS);
  private readonly reviews = signal<Review[]>(REVIEWS);

  getAnnouncements() {
    return this.announcements();
  }

  getShops() {
    return this.shops();
  }

  getArticles() {
    return this.articles();
  }

  getShopById(id: string) {
    return this.shops().find((shop) => shop._id === id);
  }

  getArticlesByShop(shopId: string) {
    return this.articles().filter((article) => article.shopId === shopId);
  }

  getCommentsByAnnouncement(announcementId: number) {
    return this.comments().filter((comment) => comment.announcementId === announcementId);
  }

  getReviewsByTarget(targetType: ReviewTargetType, targetId: string) {
    return this.reviews().filter(
      (review) => review.targetType === targetType && review.targetId === targetId
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
    this.reviews.update((list) => [newReview, ...list]);
  }

  private getNextId<T extends { id: number }>(items: T[]) {
    return items.length ? Math.max(...items.map((item) => item.id)) + 1 : 1;
  }
}
