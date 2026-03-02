export interface Announcement {
  id: number;
  title: string;
  content: string;
  date: string;
  shopId?: number;
  imageUrls?: string[];
}

export interface Comment {
  id: number;
  announcementId: number;
  author: string;
  content: string;
  date: string;
}

export interface Shop {

  id: number;
  mongoId: string; 
  name: string;
  category: string;
  location: string;
  description: string;
  imageUrl?: string;
}

export interface Article {

  id: string;

  shopId: string;
  name: string;
  categories: string[];
  price: number;
  description: string;
  imageUrls?: string[];
}

export type ReviewTargetType = 'shop' | 'article';

export interface Review {
  id: number;
  targetType: ReviewTargetType;
  targetId: string;
  author: string;
  rating: number;
  comment: string;
  date: string;
}

export interface CartItem {
  articleId: string;
  name?: string;   // nom de l'article
  price?: number;  // prix unitaire
  quantity: number;
  shopId?: string;
}
