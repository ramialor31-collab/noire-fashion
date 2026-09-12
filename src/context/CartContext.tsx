import React, { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import type { Product, CartItem, OrderConfirmationData } from '../types';

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product, color: string, size: string, quantity?: number) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, delta: number) => void;
  clearCart: () => void;
  itemCount: number;
  subtotal: number;
  discount: number;
  discountPercentage: number;
  promoCode: string;
  applyPromoCode: (code: string) => { success: boolean; message: string };
  removePromoCode: () => void;
  freeShippingThreshold: number;
  amountUntilFreeShipping: number;
  total: number;

  // Modals & Drawers controls
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;
  isCheckoutOpen: boolean;
  setIsCheckoutOpen: (open: boolean) => void;
  activeProductDetail: Product | null;
  setActiveProductDetail: (product: Product | null) => void;

  // Checkout confirmation
  latestConfirmation: OrderConfirmationData | null;
  setLatestConfirmation: (data: OrderConfirmationData | null) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const STORAGE_KEY = 'noire_cart_items_v1';
const PROMO_KEY = 'noire_promo_code_v1';
const FREE_SHIPPING_THRESHOLD = 300;

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [promoCode, setPromoCode] = useState<string>(() => {
    try {
      return localStorage.getItem(PROMO_KEY) || '';
    } catch {
      return '';
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [activeProductDetail, setActiveProductDetail] = useState<Product | null>(null);
  const [latestConfirmation, setLatestConfirmation] = useState<OrderConfirmationData | null>(null);

  // Sync with localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
    } catch (e) {
      console.error('Failed to save cart to localStorage', e);
    }
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem(PROMO_KEY, promoCode);
    } catch (e) {
      console.error('Failed to save promo code', e);
    }
  }, [promoCode]);

  const addToCart = (product: Product, color: string, size: string, quantity = 1) => {
    setCart((prev) => {
      const itemKey = `${product.id}_${color}_${size}`;
      const existing = prev.find((item) => item.id === itemKey);

      if (existing) {
        return prev.map((item) =>
          item.id === itemKey
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }

      const newItem: CartItem = {
        id: itemKey,
        productId: product.id,
        name: product.name,
        price: product.price,
        color,
        size,
        image: product.images[0],
        quantity,
      };

      return [newItem, ...prev];
    });

    // Automatically reveal cart drawer
    setIsCartOpen(true);
  };

  const removeFromCart = (id: string) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const updateQuantity = (id: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.id === id) {
            const nextQty = item.quantity + delta;
            return nextQty > 0 ? { ...item, quantity: nextQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const clearCart = () => {
    setCart([]);
    setPromoCode('');
  };

  const discountPercentage = promoCode.toUpperCase() === 'NOIRE10' ? 10 : 
                            promoCode.toUpperCase() === 'AFTERHOURS' ? 15 : 0;

  const applyPromoCode = (code: string): { success: boolean; message: string } => {
    const trimmed = code.trim().toUpperCase();
    if (trimmed === 'NOIRE10') {
      setPromoCode('NOIRE10');
      return { success: true, message: 'VIP Promo Applied: 10% Off' };
    }
    if (trimmed === 'AFTERHOURS') {
      setPromoCode('AFTERHOURS');
      return { success: true, message: 'After Hours Member Privilege: 15% Off' };
    }
    return { success: false, message: 'Invalid or expired campaign code. Try NOIRE10' };
  };

  const removePromoCode = () => {
    setPromoCode('');
  };

  const itemCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const discount = Math.round((subtotal * discountPercentage) / 100);
  const amountUntilFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);
  const total = Math.max(0, subtotal - discount);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        itemCount,
        subtotal,
        discount,
        discountPercentage,
        promoCode,
        applyPromoCode,
        removePromoCode,
        freeShippingThreshold: FREE_SHIPPING_THRESHOLD,
        amountUntilFreeShipping,
        total,
        isCartOpen,
        setIsCartOpen,
        isSearchOpen,
        setIsSearchOpen,
        isCheckoutOpen,
        setIsCheckoutOpen,
        activeProductDetail,
        setActiveProductDetail,
        latestConfirmation,
        setLatestConfirmation,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
