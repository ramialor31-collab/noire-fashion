import React, { useState, useMemo } from 'react';
import { AnimatePresence } from 'framer-motion';
import { SlidersHorizontal, Grid3X3, LayoutGrid } from 'lucide-react';
import type { Product, ProductCategory, SortOption } from '../../types';
import { ProductCard } from './ProductCard';

interface ShopProps {
  products: Product[];
  onSelectProduct: (product: Product) => void;
}

const CATEGORIES: ProductCategory[] = [
  'ALL',
  'TEES',
  'HOODIES',
  'OVERSHIRTS',
  'PANTS',
  'JACKETS',
  'ACCESSORIES',
];

export const Shop: React.FC<ShopProps> = ({ products, onSelectProduct }) => {
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory>('ALL');
  const [sortBy, setSortBy] = useState<SortOption>('featured');
  const [layoutMode, setLayoutMode] = useState<'editorial' | 'compact'>('editorial');

  // Count items per category
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { ALL: products.length };
    CATEGORIES.forEach((cat) => {
      if (cat !== 'ALL') {
        counts[cat] = products.filter((p) => p.category === cat).length;
      }
    });
    return counts;
  }, [products]);

  // Filter and sort items
  const filteredProducts = useMemo(() => {
    let list = [...products];

    if (selectedCategory !== 'ALL') {
      list = list.filter((p) => p.category === selectedCategory);
    }

    switch (sortBy) {
      case 'price-asc':
        list.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        list.sort((a, b) => b.price - a.price);
        break;
      case 'newest':
        list.reverse();
        break;
      case 'featured':
      default:
        list.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
        break;
    }

    return list;
  }, [products, selectedCategory, sortBy]);

  return (
    <section id="shop" className="relative w-full bg-noir-950 py-20 md:py-32 border-t border-white/[0.06]">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Section Heading & Scene Info */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 md:mb-16 gap-6">
          <div>
            <div className="flex items-center space-x-3 mb-3">
              <span className="text-[10px] tracking-widest text-noir-400 font-mono uppercase">
                SCENE 03 // FULL STORE ARCHIVE
              </span>
              <span className="w-8 h-[1px] bg-noir-800" />
            </div>
            <h2 className="font-display text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-[-0.05em] text-white">
              SHOP NOIRÉ
            </h2>
          </div>
          <div className="text-right font-mono text-xs text-noir-400">
            SHOWING <span className="text-white font-bold">{filteredProducts.length}</span> OF {products.length} ESSENTIALS
          </div>
        </div>

        {/* Category Filters Bar & Controls */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between border-b border-white/[0.08] pb-6 mb-10 gap-6">
          
          {/* Categories Pill Navigation with Real-Time Item Counts */}
          <div className="flex items-center overflow-x-auto no-scrollbar space-x-2 pb-2 lg:pb-0">
            {CATEGORIES.map((cat) => {
              const isSelected = selectedCategory === cat;
              const count = categoryCounts[cat] || 0;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3.5 py-2 text-xs font-mono tracking-widest uppercase transition-all duration-300 whitespace-nowrap rounded-xs flex items-center space-x-2 ${
                    isSelected
                      ? 'bg-white text-noir-950 font-bold shadow-lg'
                      : 'text-noir-400 hover:text-white hover:bg-white/[0.05]'
                  }`}
                >
                  <span>{cat}</span>
                  <span className={`text-[10px] ${isSelected ? 'text-noir-700' : 'text-noir-500'}`}>
                    ({count})
                  </span>
                </button>
              );
            })}
          </div>

          {/* Sort & Grid Controls */}
          <div className="flex items-center space-x-4 self-end lg:self-auto">
            
            {/* Sort Dropdown */}
            <div className="flex items-center space-x-2 text-xs font-mono text-noir-300">
              <SlidersHorizontal className="w-3.5 h-3.5 text-noir-400" />
              <span className="hidden sm:inline">SORT:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                className="bg-noir-900 border border-white/10 text-xs text-white px-3 py-1.5 rounded-xs focus:outline-none focus:border-white/40 font-sans cursor-pointer"
              >
                <option value="featured">Featured Curations</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="newest">New Arrivals</option>
              </select>
            </div>

            {/* Layout Toggle (Desktop) */}
            <div className="hidden sm:flex items-center border border-white/10 rounded-xs overflow-hidden">
              <button
                onClick={() => setLayoutMode('editorial')}
                className={`p-2 transition-colors flex items-center space-x-1.5 text-xs font-mono ${
                  layoutMode === 'editorial' ? 'bg-white text-noir-950 font-bold' : 'text-noir-400 hover:text-white'
                }`}
                title="Asymmetric Editorial Layout"
              >
                <LayoutGrid className="w-3.5 h-3.5" />
                <span className="text-[10px] tracking-wider">EDITORIAL</span>
              </button>
              <button
                onClick={() => setLayoutMode('compact')}
                className={`p-2 transition-colors flex items-center space-x-1.5 text-xs font-mono ${
                  layoutMode === 'compact' ? 'bg-white text-noir-950 font-bold' : 'text-noir-400 hover:text-white'
                }`}
                title="Compact Grid"
              >
                <Grid3X3 className="w-3.5 h-3.5" />
                <span className="text-[10px] tracking-wider">GRID</span>
              </button>
            </div>

          </div>
        </div>

        {/* Asymmetrical Editorial Product Presentation */}
        {layoutMode === 'editorial' && selectedCategory === 'ALL' ? (
          <div className="space-y-12">
            {/* Grid Part 1 */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.slice(0, 3).map((product, idx) => (
                <ProductCard 
                  key={product.id} 
                  product={product} 
                  onSelect={onSelectProduct}
                  isSpotlight={idx === 0} // First piece is spotlight
                />
              ))}
            </div>

            {/* Editorial Statement Break */}
            <div className="py-12 px-8 my-6 border-y border-white/[0.08] bg-noir-900/30 flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div>
                <span className="text-[10px] font-mono tracking-ultra text-noir-400 uppercase block">
                  NOIRÉ ATELIER PHILOSOPHY
                </span>
                <p className="font-editorial italic text-2xl sm:text-3xl text-white mt-1">
                  “Less noise. More presence.”
                </p>
              </div>
              <p className="text-xs text-noir-400 max-w-sm font-light leading-relaxed font-mono">
                Engineered with 480–520GSM French terry, double-pleated virgin wool, and vegetable-tanned hides. Built for years of midnight striding.
              </p>
            </div>

            {/* Grid Part 2 */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.slice(3, 7).map((product, idx) => (
                <ProductCard 
                  key={product.id} 
                  product={product} 
                  onSelect={onSelectProduct}
                  isSpotlight={idx === 2} // Another accent piece
                />
              ))}
            </div>

            {/* Grid Part 3 */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-6">
              {filteredProducts.slice(7).map((product) => (
                <ProductCard 
                  key={product.id} 
                  product={product} 
                  onSelect={onSelectProduct} 
                />
              ))}
            </div>
          </div>
        ) : (
          /* Standard / Filtered Grid */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            <AnimatePresence>
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onSelect={onSelectProduct}
                />
              ))}
            </AnimatePresence>
          </div>
        )}

        {/* Empty State Guard */}
        {filteredProducts.length === 0 && (
          <div className="py-20 text-center flex flex-col items-center justify-center">
            <p className="font-display text-2xl text-white">No items found in this category.</p>
            <p className="text-sm text-noir-400 mt-2 font-light">Try selecting "ALL" to browse the full archive.</p>
            <button
              onClick={() => setSelectedCategory('ALL')}
              className="mt-6 px-6 py-3 bg-white text-noir-950 text-xs font-bold tracking-widest uppercase hover:bg-luxe-smoke"
            >
              RESET FILTERS
            </button>
          </div>
        )}

      </div>
    </section>
  );
};
