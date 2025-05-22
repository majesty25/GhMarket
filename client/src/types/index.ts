export type UserRole = 'buyer' | 'seller' | 'delivery' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar?: string;
  role: UserRole;
}

export interface SubCategory {
  id: string;
  name: string;
  slug: string;
  categoryId: string;
  image?: string;
  featured?: boolean;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  slug: string;
  image?: string;
  description?: string;
  subCategories?: SubCategory[];
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  discountPrice?: number;
  images: string[];
  category: Category;
  seller: Seller;
  rating: number;
  reviews: number;
  stock: number;
  featured?: boolean;
}

export interface Seller {
  id: string;
  name: string;
  description: string;
  logo: string;
  initials: string;
  bgColor: string;
  rating: number;
  category: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Order {
  id: string;
  items: CartItem[];
  status: OrderStatus;
  date: string;
  deliveryAddress: string;
  paymentMethod: PaymentMethod;
  total: number;
  deliveryFee: number;
  tracking?: OrderTracking;
}

export type OrderStatus = 'pending' | 'confirmed' | 'processing' | 'picked' | 'en-route' | 'delivered' | 'cancelled';

export interface OrderTracking {
  orderId: string;
  currentLocation?: {
    lat: number;
    lng: number;
  };
  deliveryAgent?: DeliveryAgent;
  estimatedArrival: string;
  statusUpdates: {
    status: OrderStatus;
    timestamp: string;
    location?: string;
    note?: string;
  }[];
}

export interface DeliveryAgent {
  id: string;
  name: string;
  avatar: string;
  phone: string;
  rating: number;
  reviews: number;
  currentLocation?: {
    lat: number;
    lng: number;
  };
}

export type PaymentMethod = 'mtn' | 'vodafone' | 'airteltigo' | 'cash-on-delivery' | 'card';

export interface PaymentOption {
  id: PaymentMethod;
  name: string;
  icon: string;
  color: string;
  description: string;
}
