import React, { useState, useEffect } from 'react';
import { CartProvider, useCart } from './context/CartContext';
import { PRODUCTS } from './data/products';
import type { Product } from './types';
import { CustomCursor } from './components/layout/CustomCursor';
import { Navigation } from './components/layout/Navigation';
import { Hero } from './components/hero/Hero';
import { Collection } from './components/collection/Collection';
import { Shop } from './components/shop/Shop';
import { Story } from './components/story/Story';
import { Contact } from './components/contact/Contact';
import { Footer } from './components/layout/Footer';
import { ProductDetailModal } from './components/product/ProductDetailModal';
import { CartDrawer } from './components/cart/CartDrawer';
import { SearchModal } from './components/shop/SearchModal';
import { CheckoutModal } from './components/checkout/CheckoutModal';

const MainExperience: React.FC = () => {
  const {
    activeProductDetail,
    setActiveProductDetail,
  } = useCart();

  const [activeSection, setActiveSection] = useState('hero');

  // Scroll spy to update active section in Navigation
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'collection', 'shop', 'story', 'contact'];
      const scrollPosition = window.scrollY + 200;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavigate = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative min-h-screen bg-noir-950 text-white selection:bg-white selection:text-noir-950 font-sans cursor-custom-area">
      {/* Non-intrusive luxury custom cursor */}
      <CustomCursor />

      {/* Persistent Navigation Header */}
      <Navigation
        activeSection={activeSection}
        onNavigate={handleNavigate}
      />

      {/* 1. Fullscreen Hero Section */}
      <Hero
        onExploreCollection={() => handleNavigate('collection')}
        onExploreShop={() => handleNavigate('shop')}
      />

      {/* 2. Editorial Collection Showcase */}
      <Collection
        products={PRODUCTS}
        onSelectProduct={(p: Product) => setActiveProductDetail(p)}
        onExploreShop={() => handleNavigate('shop')}
      />

      {/* 3. Functional Shop Catalog */}
      <Shop
        products={PRODUCTS}
        onSelectProduct={(p: Product) => setActiveProductDetail(p)}
      />

      {/* 4. Immersive Brand Story */}
      <Story />

      {/* 5. Minimalist Concierge & Contact */}
      <Contact />

      {/* 6. Architectural Footer */}
      <Footer onNavigate={handleNavigate} />

      {/* Global Interactive Drawers and Overlays */}
      <ProductDetailModal
        product={activeProductDetail}
        onClose={() => setActiveProductDetail(null)}
      />

      <CartDrawer
        onBrowseShop={() => handleNavigate('shop')}
      />

      <SearchModal
        products={PRODUCTS}
        onSelectProduct={(p: Product) => setActiveProductDetail(p)}
      />

      <CheckoutModal />
    </div>
  );
};

export function App() {
  return (
    <CartProvider>
      <MainExperience />
    </CartProvider>
  );
}

export default App;
