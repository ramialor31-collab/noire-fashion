export type ProductCategory = 
  | 'ALL' 
  | 'TEES' 
  | 'HOODIES' 
  | 'OVERSHIRTS' 
  | 'PANTS' 
  | 'JACKETS' 
  | 'ACCESSORIES';

export interface ProductColor {
  name: string;
  hex: string;
  inStock: boolean;
}

export interface ProductDetails {
  material: string;
  fit: string;
  origin: string;
  care: string;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  price: number;
  originalPrice?: number;
  category: Exclude<ProductCategory, 'ALL'>;
  badge?: string;
  tagline: string;
  description: string;
  details: ProductDetails;
  colors: ProductColor[];
  sizes: ('XS' | 'S' | 'M' | 'L' | 'XL')[];
  images: string[];
  featured?: boolean;
  editorialQuote?: string;
  coordinates?: string;
}

export interface CartItem {
  id: string; // unique hash of productId + color + size
  productId: string;
  name: string;
  price: number;
  color: string;
  size: string;
  image: string;
  quantity: number;
}

export interface ShippingInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  apartment?: string;
  city: string;
  postalCode: string;
  country: string;
}

export type ShippingSpeed = 'standard' | 'express';

export type PaymentMethod = 'card' | 'apple_pay' | 'google_pay';

export interface CardDetails {
  number: string;
  exp: string;
  cvc: string;
  name: string;
}

export interface OrderConfirmationData {
  orderId: string;
  timestamp: string;
  items: CartItem[];
  subtotal: number;
  discount: number;
  shipping: number;
  total: number;
  shippingInfo: ShippingInfo;
  shippingSpeed: ShippingSpeed;
  paymentMethod: PaymentMethod;
}

export type SortOption = 'featured' | 'price-asc' | 'price-desc' | 'newest';
