import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Eye, Plus, ShoppingBag } from 'lucide-react';
import type { Product } from '../../types';
import { useCart } from '../../context/CartContext';

interface CollectionProps {
  products: Product[];
  onSelectProduct: (product: Product) => void;
  onExploreShop: () => void;
}

export const Collection: React.FC<CollectionProps> = ({
  products,
  onSelectProduct,
  onExploreShop,
}) => {
  const { addToCart } = useCart();
  const heroProduct = products.find((p) => p.id === 'prod_09') || products[0]; // Waxed Leather Bomber
  const editorialSpread = products.filter((p) => ['prod_03', 'prod_05', 'prod_07', 'prod_12'].includes(p.id));

  return (
    <section id="collection" className="relative w-full bg-noir-950 py-20 md:py-32 border-t border-white/[0.06] overflow-hidden">
      
      {/* Background Subtle Atmosphere */}
      <div className="absolute top-1/4 -left-40 w-96 h-96 bg-noir-800/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 -right-40 w-96 h-96 bg-noir-800/15 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 md:mb-20 gap-6">
          <div>
            <div className="flex items-center space-x-3 mb-3">
              <span className="text-[10px] tracking-widest text-noir-400 font-mono uppercase">
                SCENE 02 // ARCHIVE CURATION
              </span>
              <span className="w-8 h-[1px] bg-noir-800" />
            </div>
            <h2 className="font-display text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-[-0.05em] text-white">
              COLLECTION 01
            </h2>
          </div>
          <p className="max-w-md text-xs sm:text-sm md:text-base text-noir-300 font-light leading-relaxed">
            A radical study in nocturnal silhouettes. Cut from high-density natural fibers, custom hardware, and unyielding proportions.
          </p>
        </div>

        {/* 1. Large Featured Hero Presentation */}
        <div className="relative mb-24 md:mb-32">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Main Visual with Coordinates & Hotspot Pins */}
            <div 
              onClick={() => onSelectProduct(heroProduct)}
              className="lg:col-span-7 relative group overflow-hidden bg-noir-900 border border-white/10 rounded-xs cursor-pointer"
            >
              <div className="aspect-[4/5] sm:aspect-[16/11] lg:aspect-[4/5] w-full overflow-hidden">
                <motion.img
                  layoutId={`product-image-${heroProduct.id}`}
                  src={heroProduct.images[0]}
                  alt={heroProduct.name}
                  className="w-full h-full object-cover object-center filter contrast-110 brightness-95 transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                  transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                />
              </div>

              {/* Coordinates Badge */}
              {heroProduct.coordinates && (
                <div className="absolute top-5 left-5 px-3 py-1 bg-noir-950/85 backdrop-blur-md border border-white/10 text-[10px] font-mono tracking-widest text-noir-300 pointer-events-none">
                  COORDINATES: {heroProduct.coordinates}
                </div>
              )}

              {/* Status Badge */}
              <div className="absolute top-5 right-5 px-3 py-1 bg-white text-noir-950 text-[10px] font-mono font-bold tracking-widest uppercase pointer-events-none">
                {heroProduct.badge || 'FLAGSHIP PIECE'}
              </div>

              {/* Interactive Hotspot Pin */}
              <div className="absolute top-1/3 left-1/3 group/pin hidden sm:block">
                <div 
                  className="w-7 h-7 rounded-full bg-white/20 backdrop-blur-md border border-white/60 flex items-center justify-center text-white hover:bg-white hover:text-noir-950 transition-all duration-300 animate-pulse"
                  aria-label="Inspect material"
                >
                  <Plus className="w-3.5 h-3.5" />
                </div>
                <div className="absolute left-9 top-0 opacity-0 group-hover/pin:opacity-100 transition-opacity duration-300 pointer-events-none bg-noir-950/90 border border-white/15 px-3 py-1.5 whitespace-nowrap text-[11px] font-mono text-white">
                  Tuscan Lambskin // Hand-Waxed
                </div>
              </div>

              {/* Hover Quick Action Drawer */}
              <div className="absolute bottom-0 inset-x-0 p-6 bg-gradient-to-t from-noir-950 via-noir-950/80 to-transparent flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-noir-400 uppercase tracking-widest font-mono">FLAGSHIP LEATHER</span>
                  <p className="text-white font-mono text-base sm:text-lg font-bold">${heroProduct.price} USD</p>
                </div>
                <div className="inline-flex items-center space-x-2 px-4 py-2 bg-white text-noir-950 text-xs font-bold font-sans tracking-wider uppercase group-hover:bg-luxe-smoke transition-colors duration-200">
                  <Eye className="w-3.5 h-3.5" />
                  <span>INSPECT SPECIFICATIONS</span>
                </div>
              </div>
            </div>

            {/* Editorial Copy & Product Specs Side */}
            <div className="lg:col-span-5 flex flex-col justify-center space-y-6 lg:pl-4">
              <div>
                <span className="text-xs font-mono tracking-widest text-noir-400 uppercase">
                  {heroProduct.category} // ARCHIVE NO. 09
                </span>
                <h3 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white mt-1.5 leading-tight">
                  {heroProduct.name}
                </h3>
              </div>

              <blockquote className="font-editorial italic text-xl md:text-2xl text-noir-200 border-l border-white/30 pl-4 py-1">
                "{heroProduct.editorialQuote || 'The crown jewel of nocturnal armour.'}"
              </blockquote>

              <p className="text-xs sm:text-sm md:text-base text-noir-300 font-light leading-relaxed">
                {heroProduct.description}
              </p>

              <div className="pt-4 border-t border-white/10 grid grid-cols-2 gap-4 text-xs font-mono text-noir-400">
                <div>
                  <span className="block text-noir-500 uppercase text-[10px]">CRAFT ORIGIN</span>
                  <span className="text-white font-medium">{heroProduct.details.origin}</span>
                </div>
                <div>
                  <span className="block text-noir-500 uppercase text-[10px]">COMPOSITION</span>
                  <span className="text-white font-medium truncate block">{heroProduct.details.material.slice(0, 32)}...</span>
                </div>
              </div>

              <div className="pt-2 flex items-center gap-3 sm:gap-4">
                <button
                  onClick={() => onSelectProduct(heroProduct)}
                  className="flex-1 py-3.5 sm:py-4 min-h-[44px] bg-white text-noir-950 font-sans text-xs font-bold tracking-widest uppercase hover:bg-luxe-smoke transition-all duration-200 active:scale-[0.99] text-center"
                >
                  VIEW PRODUCT DETAIL
                </button>
                <button
                  onClick={() => addToCart(heroProduct, heroProduct.colors[0].name, heroProduct.sizes[1] || heroProduct.sizes[0], 1)}
                  className="p-3.5 sm:p-4 min-w-[44px] min-h-[44px] border border-white/20 hover:border-white text-white transition-all duration-200 active:scale-[0.97] flex items-center justify-center"
                  aria-label="Quick Add to Bag"
                  title="Quick Add to Bag"
                >
                  <ShoppingBag className="w-4 h-4" />
                </button>
              </div>
            </div>

          </div>
        </div>

        {/* 2. Asymmetric Lookbook Spread */}
        <div className="mb-20">
          <div className="flex items-center justify-between mb-8 border-b border-white/[0.08] pb-4">
            <span className="text-xs font-mono tracking-widest text-noir-400 uppercase">
              LOOKBOOK SELECTIONS // 04 PIECES
            </span>
            <span className="text-xs text-noir-500 font-mono hidden sm:inline">
              SELECT ANY SILHOUETTE TO EXPAND
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {editorialSpread.map((product, idx) => (
              <div
                key={product.id}
                className={`group flex flex-col justify-between ${
                  idx % 2 === 1 ? 'md:translate-y-6 lg:translate-y-8' : ''
                }`}
              >
                {/* Visual Area with Shared Layout Animation & 1.03 scale */}
                <div 
                  onClick={() => onSelectProduct(product)}
                  className="relative aspect-[3/4] overflow-hidden bg-noir-900 border border-white/[0.08] cursor-pointer"
                >
                  <motion.img
                    layoutId={`product-image-${product.id}`}
                    src={product.images[0]}
                    alt={product.name}
                    className="w-full h-full object-cover object-center filter contrast-105 brightness-95 transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                    transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                  />

                  {/* Secondary Image hover reveal with matching 1.03 scale */}
                  {product.images[1] && (
                    <img
                      src={product.images[1]}
                      alt={`${product.name} alternate view`}
                      className="absolute inset-0 w-full h-full object-cover object-center filter contrast-105 brightness-95 opacity-0 group-hover:opacity-100 transition-all duration-500 ease-out pointer-events-none group-hover:scale-[1.03]"
                    />
                  )}

                  {product.badge && (
                    <div className="absolute top-3 left-3 px-2 py-0.5 bg-noir-950/85 backdrop-blur-md border border-white/10 text-[9px] font-mono tracking-wider text-noir-200 uppercase pointer-events-none">
                      {product.badge}
                    </div>
                  )}

                  {/* Quick Action Overlay with smooth spring reveal */}
                  <div className="absolute inset-0 bg-noir-950/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-4">
                    <span className="px-4 py-2 bg-white text-noir-950 text-[10px] font-mono font-bold tracking-widest uppercase shadow-xl transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                      INSPECT PIECE
                    </span>
                  </div>
                </div>

                {/* Typography Metadata */}
                <div className="pt-3.5 flex flex-col">
                  <span className="text-[10px] font-mono tracking-widest text-noir-400 uppercase">
                    {product.category}
                  </span>
                  <h4 
                    onClick={() => onSelectProduct(product)}
                    className="font-display font-semibold text-base sm:text-lg text-white mt-1 group-hover:text-luxe-smoke transition-colors duration-200 cursor-pointer"
                  >
                    {product.name}
                  </h4>
                  <div className="flex items-center justify-between mt-2 pt-2 border-t border-white/[0.06]">
                    <span className="text-xs sm:text-sm font-mono text-noir-200 font-medium">
                      ${product.price} USD
                    </span>
                    <button
                      onClick={() => onSelectProduct(product)}
                      className="text-xs text-noir-400 hover:text-white transition-colors duration-200 flex items-center space-x-1 py-1"
                    >
                      <span className="font-mono text-[11px]">VIEW</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Transition Bridge to Shop */}
        <div className="mt-20 pt-10 border-t border-white/[0.08] flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div>
            <p className="text-[10px] font-mono text-noir-400 tracking-widest uppercase">
              NEXT SCENE // COMPLETE ARCHIVE
            </p>
            <p className="font-display text-xl sm:text-2xl font-bold text-white mt-1">
              READY TO DISCOVER ALL 12 PIECES?
            </p>
          </div>
          <button
            onClick={onExploreShop}
            className="inline-flex items-center space-x-3 px-8 py-3.5 min-h-[44px] bg-transparent border border-white text-white font-sans text-xs font-bold tracking-widest uppercase hover:bg-white hover:text-noir-950 transition-all duration-300 active:scale-[0.99]"
          >
            <span>VIEW ALL IN SHOP</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </section>
  );
};
