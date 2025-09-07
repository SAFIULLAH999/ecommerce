export interface Product {
  id: number;
  title: string;
  price: number;
  originalPrice: number;
  image: string;
  rating: number;
  reviews: number;
  badge: string;
  category: string;
  description?: string;
  inStock: boolean;
  quantity?: number;
}

export interface Category {
  id: number;
  name: string;
  image: string;
  description: string;
  productCount: number;
}

export interface CartItem {
  id: number;
  product: Product;
  quantity: number;
}

export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
}

export interface Order {
  id: string;
  userId: string;
  items: CartItem[];
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  createdAt: Date;
  shippingAddress: Address;
}

export interface Address {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

export interface HeroSlide {
  id: number;
  title: string;
  subtitle: string;
  image: string;
  buttonText: string;
  buttonLink: string;
}

export interface NewsletterSubscription {
  email: string;
  subscribedAt: Date;
}
