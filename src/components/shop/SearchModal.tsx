import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, ArrowRight } from 'lucide-react';
import type { Product } from '../../types';
import { useCart } from '../../context/CartContext';

interface SearchModalProps {
  products: Product[];
  onSelectProduct: (product: Product) => void;
}

const TRENDING_TAGS = ['Heavyweight Hoodie', 'Waxed Bomber', 'Trousers', 'Boxy Tee', 'Cargo', 'Overshirt'];

export const SearchModal: React.FC<SearchModalProps> = ({ products, onSelectProduct }) => {
  const { isSearchOpen, setIsSearchOpen } = useCart();
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  // Keyboard shortcut ⌘K / Ctrl+K & Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen(!isSearchOpen);
      }
      if (e.key === 'Escape' && isSearchOpen) {
        setIsSearchOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isSearchOpen, setIsSearchOpen]);

  // Auto focus input on open
  useEffect(() => {
    if (isSearchOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    } else {
      setQuery('');
    }
  }, [isSearchOpen]);

  const results = query.trim() === ''
    ? []
    : products.filter(
        (p) =>
          p.name.toLowerCase().includes(query.toLowerCase()) ||
          p.category.toLowerCase().includes(query.toLowerCase()) ||
          p.description.toLowerCase().includes(query.toLowerCase()) ||
          p.tagline.toLowerCase().includes(query.toLowerCase())
      );

  if (!isSearchOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 md:pt-24 px-4 bg-noir-950/80 backdrop-blur-xl">
        {/* Backdrop click to close */}
        <div 
          className="absolute inset-0"
          onClick={() => setIsSearchOpen(false)}
        />

        {/* Modal Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: -20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: -20 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-2xl bg-noir-900 border border-white/10 rounded-sm shadow-2xl overflow-hidden z-10"
        >
          {/* Search Header Input */}
          <div className="flex items-center px-6 py-5 border-b border-white/[0.08]">
            <Search className="w-5 h-5 text-noir-400 mr-3 shrink-0" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by silhouette, garment, fabric (e.g. Hoodie, Waxed, Wool)..."
              className="w-full bg-transparent text-base md:text-lg text-white placeholder:text-noir-500 focus:outline-none font-sans"
            />
            {query && (
              <button
                onClick={() => setQuery('')}
                className="text-noir-400 hover:text-white mr-2 text-xs font-mono"
              >
                CLEAR
              </button>
            )}
            <button
              onClick={() => setIsSearchOpen(false)}
              className="p-1 text-noir-400 hover:text-white transition-colors"
              aria-label="Close search modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Trending Suggestions if empty query */}
          {query.trim() === '' && (
            <div className="p-6">
              <span className="text-[10px] font-mono tracking-widest text-noir-400 uppercase block mb-3">
                POPULAR SEARCHES
              </span>
              <div className="flex flex-wrap gap-2">
                {TRENDING_TAGS.map((tag) => (
                  <button
                    key={tag}
                    onClick={() => setQuery(tag)}
                    className="px-3 py-1.5 text-xs font-mono text-noir-300 bg-noir-800 border border-white/[0.06] hover:border-white/30 hover:text-white rounded-sm transition-colors"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Results List */}
          {query.trim() !== '' && (
            <div className="max-h-[60vh] overflow-y-auto p-4 space-y-2 divide-y divide-white/[0.04]">
              {results.length > 0 ? (
                results.map((product) => (
                  <div
                    key={product.id}
                    onClick={() => {
                      setIsSearchOpen(false);
                      onSelectProduct(product);
                    }}
                    className="group flex items-center justify-between p-3 hover:bg-white/[0.04] transition-colors cursor-pointer rounded-sm"
                  >
                    <div className="flex items-center space-x-4">
                      <img
                        src={product.images[0]}
                        alt={product.name}
                        className="w-14 h-18 object-cover rounded-xs border border-white/10 shrink-0"
                      />
                      <div>
                        <span className="text-[10px] font-mono text-noir-400 uppercase tracking-wider block">
                          {product.category} {product.badge && `• ${product.badge}`}
                        </span>
                        <h4 className="font-display font-semibold text-sm sm:text-base text-white group-hover:text-luxe-smoke transition-colors">
                          {product.name}
                        </h4>
                        <p className="text-xs text-noir-400 line-clamp-1 font-light">
                          {product.tagline}
                        </p>
                      </div>
                    </div>

                    <div className="text-right flex items-center space-x-3 shrink-0 ml-4">
                      <span className="font-mono text-sm font-semibold text-white">
                        ${product.price}
                      </span>
                      <ArrowRight className="w-4 h-4 text-noir-500 group-hover:text-white group-hover:translate-x-1 transition-all" />
                    </div>
                  </div>
                ))
              ) : (
                <div className="py-12 text-center text-noir-400">
                  <p className="font-display text-lg text-white">No results matching "{query}"</p>
                  <p className="text-xs text-noir-500 mt-1">Try another keyword or category.</p>
                </div>
              )}
            </div>
          )}

          {/* Modal Footer */}
          <div className="px-6 py-3 bg-noir-950/60 border-t border-white/[0.06] flex items-center justify-between text-[10px] font-mono text-noir-400">
            <span>PRESS ESC TO CLOSE</span>
            <span>NOIRÉ CATALOG</span>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
