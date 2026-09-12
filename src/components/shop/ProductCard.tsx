import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ShoppingBag, Eye, Check } from 'lucide-react';
import type { Product } from '../../types';
import { useCart } from '../../context/CartContext';

interface ProductCardProps {
  product: Product;
  onSelect: (product: Product) => void;
  isSpotlight?: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onSelect, isSpotlight = false }) => {
  const { addToCart } = useCart();
  const [selectedColor, setSelectedColor] = useState(product.colors[0]?.name || '');
  const [isAdded, setIsAdded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    const defaultSize = product.sizes.includes('M') ? 'M' : product.sizes[0];
    addToCart(product, selectedColor, defaultSize, 1);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1600);
  };

  const hasMultipleImages = product.images.length > 1;

  return (
    <div
      onClick={() => onSelect(product)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`group flex flex-col justify-between bg-noir-950 border border-white/[0.08] hover:border-white/25 transition-colors duration-300 cursor-pointer overflow-hidden p-3.5 sm:p-5 ${
        isSpotlight ? 'md:col-span-2 md:flex-row gap-6 lg:gap-8 items-center' : ''
      }`}
    >
      {/* Visual Area */}
      <div className={`relative w-full overflow-hidden bg-noir-900 shrink-0 ${
        isSpotlight ? 'md:w-1/2 aspect-[4/5] sm:aspect-[16/11] md:aspect-[4/5]' : 'aspect-[3/4]'
      }`}>
        {/* Primary Image with Shared Layout Animation & 1.03 scale */}
        <motion.img
          layoutId={`product-image-${product.id}`}
          src={product.images[0]}
          alt={product.name}
          className={`w-full h-full object-cover object-center filter contrast-[1.04] brightness-95 transition-transform duration-500 ease-out ${
            isHovered ? 'scale-[1.03]' : 'scale-100'
          }`}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          loading="lazy"
        />

        {/* Tasteful Secondary Image Reveal on Hover (Crossfade with matching scale) */}
        {hasMultipleImages && (
          <img
            src={product.images[1]}
            alt={`${product.name} alternate angle`}
            className={`absolute inset-0 w-full h-full object-cover object-center filter contrast-[1.04] brightness-95 pointer-events-none transition-all duration-500 ease-out ${
              isHovered ? 'opacity-100 scale-[1.03]' : 'opacity-0 scale-100'
            }`}
            loading="lazy"
          />
        )}

        {/* Badge */}
        {product.badge && (
          <div className="absolute top-3 left-3 px-2 py-0.5 bg-noir-950/85 backdrop-blur-md border border-white/10 text-[9px] font-mono tracking-widest text-noir-200 uppercase pointer-events-none">
            {product.badge}
          </div>
        )}

        {/* Sale Tag if original price present */}
        {product.originalPrice && (
          <div className="absolute top-3 right-3 px-2 py-0.5 bg-luxe-crimson/90 text-white text-[9px] font-mono font-bold tracking-wider pointer-events-none">
            SALE
          </div>
        )}

        {/* Quick Action Button Overlay with smooth spring reveal */}
        <div className="absolute inset-x-3 bottom-3 flex items-center gap-2 transform translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 ease-out">
          <button
            onClick={handleQuickAdd}
            className={`flex-1 py-3 px-3 min-h-[42px] text-[11px] font-mono font-bold tracking-widest uppercase transition-all duration-200 active:scale-[0.98] flex items-center justify-center space-x-2 shadow-2xl ${
              isAdded
                ? 'bg-emerald-600 text-white'
                : 'bg-white text-noir-950 hover:bg-luxe-smoke'
            }`}
            aria-label={`Quick add ${product.name} to bag`}
          >
            {isAdded ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>ADDED</span>
              </>
            ) : (
              <>
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>QUICK ADD</span>
              </>
            )}
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              onSelect(product);
            }}
            className="p-3 min-w-[42px] min-h-[42px] bg-noir-900/90 backdrop-blur-md border border-white/20 text-white hover:bg-white hover:text-noir-950 transition-colors duration-200 active:scale-[0.96] flex items-center justify-center"
            title="View Details"
            aria-label={`View ${product.name}`}
          >
            <Eye className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Product Information with Refined Visual Hierarchy */}
      <div className={`pt-4 flex flex-col flex-1 justify-between ${isSpotlight ? 'md:pt-0 md:py-3' : ''}`}>
        <div>
          {/* Category & Available Sizes in clean muted mono */}
          <div className="flex items-center justify-between text-[10px] font-mono tracking-widest text-noir-400 uppercase">
            <span>{product.category}</span>
            <span className="text-noir-500 font-normal">{product.sizes.join(' · ')}</span>
          </div>

          {/* Product Name with clear prominence and smooth hover color */}
          <h3 className={`font-display font-semibold text-white mt-1.5 transition-colors duration-300 leading-snug group-hover:text-luxe-smoke ${
            isSpotlight ? 'text-xl sm:text-2xl' : 'text-base sm:text-lg'
          }`}>
            {product.name}
          </h3>

          {/* Tagline / Secondary Info with high legibility */}
          <p className="text-xs text-noir-400 font-light mt-1 line-clamp-2 leading-relaxed">
            {product.tagline}
          </p>

          {/* Spotlight Extra Details */}
          {isSpotlight && product.details && (
            <div className="mt-4 pt-3 border-t border-white/[0.06] text-xs font-mono text-noir-400 hidden sm:block">
              <span className="text-noir-500 uppercase text-[10px] block tracking-wider">MATERIAL & FABRIC</span>
              <p className="text-noir-200 mt-0.5">{product.details.material}</p>
            </div>
          )}
        </div>

        {/* Bottom Bar: Price & Color Swatches */}
        <div className="pt-3 mt-4 border-t border-white/[0.06] flex items-center justify-between">
          {/* Price */}
          <div className="flex items-baseline space-x-2">
            <span className="font-mono text-sm font-semibold text-white tracking-tight">
              ${product.price}
            </span>
            {product.originalPrice && (
              <span className="font-mono text-xs text-noir-500 line-through">
                ${product.originalPrice}
              </span>
            )}
            <span className="text-[10px] text-noir-500 font-mono">USD</span>
          </div>

          {/* Color Swatches with subtle hover transition */}
          <div className="flex items-center space-x-1.5" onClick={(e) => e.stopPropagation()}>
            {product.colors.map((c) => (
              <button
                key={c.name}
                onClick={() => setSelectedColor(c.name)}
                style={{ backgroundColor: c.hex }}
                className={`w-3.5 h-3.5 rounded-full border transition-all duration-200 ${
                  selectedColor === c.name
                    ? 'border-white scale-110 ring-1 ring-white/60'
                    : 'border-white/20 hover:scale-105 hover:border-white/40'
                }`}
                title={c.name}
                aria-label={`Select ${c.name}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
