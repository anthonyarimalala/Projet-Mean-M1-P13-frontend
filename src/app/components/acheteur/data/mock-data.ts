import { Announcement, Article, Comment, Review, Shop } from '../models/buyer-models';

export const ANNOUNCEMENTS: Announcement[] = [
  {
    id: 1,
    title: 'Ouverture de la semaine promo',
    content: 'Des remises jusqu a 40% dans plusieurs boutiques participantes.',
    date: '2026-02-10',
    shopId: 1,
    imageUrls: [
      'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=600&q=80'
    ]
  },
  {
    id: 2,
    title: 'Nouveaux arrivages mode',
    content: 'La boutique Style & Co a recu sa nouvelle collection.',
    date: '2026-02-12',
    shopId: 2,
    imageUrls: ['https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=900&q=80']
  },
  {
    id: 3,
    title: 'Gourmandises locales',
    content: 'Degustation gratuite de produits artisanaux ce week-end.',
    date: '2026-02-14',
    imageUrls: [
      'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=900&q=80'
    ]
  }
];

export const COMMENTS: Comment[] = [
  {
    id: 1,
    announcementId: 1,
    author: 'Aina',
    content: 'Hate de profiter des promos !',
    date: '2026-02-10'
  },
  {
    id: 2,
    announcementId: 2,
    author: 'Lova',
    content: 'Super nouvelle, je passe demain.',
    date: '2026-02-12'
  }
];

export const SHOPS: Shop[] = [
  {
    _id: '699d91de119be9f11b250ce2',
    name: 'Tech Avenue',
    category: 'Electronique',
    location: 'Niveau 1 - Aile Nord',
    description: 'Smartphones, accessoires et services de reparation.',
    imageUrl: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=600&q=80'
  },
  {
    _id: '2',
    name: 'Style & Co',
    category: 'Mode',
    location: 'Niveau 2 - Aile Est',
    description: 'Vetements tendance et accessoires pour tous.',
    imageUrl: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=600&q=80'
  },
  {
    _id: '3',
    name: 'Saveurs Locales',
    category: 'Epicerie fine',
    location: 'Niveau 1 - Aile Sud',
    description: 'Produits artisanaux et delicatesses de Madagascar.',
    imageUrl: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=600&q=80'
  }
];

export const ARTICLES: Article[] = [
  {
    id: 1,
    shopId: '699d91de119be9f11b250ce2',
    name: 'Smartphone Voa X',
    categories: ['Smartphones', 'Electronique'],
    price: 1250000,
    description: 'Ecran 6.5, double SIM, batterie longue duree.',
    imageUrls: [
      'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=700&q=80',
      'https://images.unsplash.com/photo-1510557880182-3de5b7b1114f?auto=format&fit=crop&w=700&q=80'
    ]
  },
  {
    id: 2,
    shopId: '699d91de119be9f11b250ce2',
    name: 'Casque Audio Zina',
    categories: ['Accessoires', 'Audio'],
    price: 180000,
    description: 'Reduction de bruit et confort longue duree.',
    imageUrls: ['https://images.unsplash.com/photo-1511376777868-611b54f68947?auto=format&fit=crop&w=700&q=80']
  },
  {
    id: 3,
    shopId: '2',
    name: 'Robe Soleil',
    categories: ['Vetements', 'Mode'],
    price: 95000,
    description: 'Tissu leger, coupe moderne.',
    imageUrls: [
      'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=700&q=80',
      'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=700&q=80'
    ]
  },
  {
    id: 4,
    shopId: '2',
    name: 'Sac Cuir Kanto',
    categories: ['Accessoires', 'Mode'],
    price: 210000,
    description: 'Sac a main en cuir vegetal.',
    imageUrls: ['https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=700&q=80']
  },
  {
    id: 5,
    shopId: '3',
    name: 'Coffret Vanille',
    categories: ['Gourmandises', 'Epicerie fine'],
    price: 65000,
    description: 'Vanille bourbon en gousses selectionnees.',
    imageUrls: ['https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=700&q=80']
  },
  {
    id: 6,
    shopId: '3',
    name: 'Miel de Litchi',
    categories: ['Gourmandises', 'Produits locaux'],
    price: 42000,
    description: 'Miel artisanal recolte localement.',
    imageUrls: ['https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?auto=format&fit=crop&w=700&q=80']
  }
];

export const REVIEWS: Review[] = [
  {
    id: 1,
    targetType: 'shop',
    targetId: '699d91de119be9f11b250ce2',
    author: 'Tiana',
    rating: 5,
    comment: 'Excellent accueil et bons conseils.',
    date: '2026-02-08'
  },
  {
    id: 2,
    targetType: 'article',
    targetId: '699d91de119be9f11b250ce2',
    author: 'Hery',
    rating: 4,
    comment: 'Bon rapport qualite prix.',
    date: '2026-02-09'
  },
  {
    id: 3,
    targetType: 'shop',
    targetId: '2',
    author: 'Miora',
    rating: 5,
    comment: 'Large choix et equipe sympa.',
    date: '2026-02-11'
  },
  {
    id: 4,
    targetType: 'article',
    targetId: '3',
    author: 'Soa',
    rating: 4,
    comment: 'Taille parfaite et tissu confortable.',
    date: '2026-02-13'
  }
];
