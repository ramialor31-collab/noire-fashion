import { useState, useEffect, useCallback, Suspense, lazy } from 'react';
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

// Code-split heavy interactive overlays to keep the critical initial bundle lean
const ProductDetailModal = lazy(() =>
  import('./components/product/ProductDetailModal').then((m) => ({ default: m.ProductDetailModal }))
);
const CartDrawer = lazy(() =>
  import('./components/cart/CartDrawer').then((m) => ({ default: m.CartDrawer }))
);
const SearchModal = lazy(() =>
  import('./components/shop/SearchModal').then((m) => ({ default: m.SearchModal }))
);
const CheckoutModal = lazy(() =>
  import('./components/checkout/CheckoutModal').then((m) => ({ default: m.CheckoutModal }))
);

const MainExperience = () => {
  const {
    activeProductDetail,
    setActiveProductDetail,
  } = useCart();

  const [activeSection, setActiveSection] = useState('hero');

  // Smooth and layout-thrash-free IntersectionObserver scroll spy
  useEffect(() => {
    const sections = ['hero', 'collection', 'shop', 'story', 'contact'];
    const elements = sections
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];

    if (!('IntersectionObserver' in window)) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length > 0) {
          visible.sort((a, b) => b.intersectionRatio - a.intersectionRatio);
          setActiveSection(visible[0].target.id);
        }
      },
      {
        rootMargin: '-20% 0px -45% 0px',
        threshold: [0, 0.25, 0.5, 0.75],
      }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const handleNavigate = useCallback((sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  const handleExploreCollection = useCallback(() => {
    handleNavigate('collection');
  }, [handleNavigate]);

  const handleExploreShop = useCallback(() => {
    handleNavigate('shop');
  }, [handleNavigate]);

  const handleSelectProduct = useCallback((p: Product) => {
    setActiveProductDetail(p);
  }, [setActiveProductDetail]);

  const handleCloseProductDetail = useCallback(() => {
    setActiveProductDetail(null);
  }, [setActiveProductDetail]);

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
        onExploreCollection={handleExploreCollection}
        onExploreShop={handleExploreShop}
      />

      {/* 2. Editorial Collection Showcase */}
      <Collection
        products={PRODUCTS}
        onSelectProduct={handleSelectProduct}
        onExploreShop={handleExploreShop}
      />

      {/* 3. Functional Shop Catalog */}
      <Shop
        products={PRODUCTS}
        onSelectProduct={handleSelectProduct}
      />

      {/* 4. Immersive Brand Story */}
      <Story />

      {/* 5. Minimalist Concierge & Contact */}
      <Contact />

      {/* 6. Architectural Footer */}
      <Footer onNavigate={handleNavigate} />

      {/* Code-split Global Interactive Drawers and Overlays */}
      <Suspense fallback={null}>
        <ProductDetailModal
          product={activeProductDetail}
          onClose={handleCloseProductDetail}
        />

        <CartDrawer
          onBrowseShop={handleExploreShop}
        />

        <SearchModal
          products={PRODUCTS}
          onSelectProduct={handleSelectProduct}
        />

        <CheckoutModal />
      </Suspense>
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
