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

  return (
    <div
      onClick={() => onSelect(product)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`group flex flex-col justify-between bg-noir-950 border border-white/[0.08] hover:border-white/30 transition-all duration-500 cursor-pointer overflow-hidden p-3.5 sm:p-5 ${
        isSpotlight ? 'md:col-span-2 md:flex-row gap-6 items-center' : ''
      }`}
    >
      {/* Visual Area */}
      <div className={`relative w-full overflow-hidden bg-noir-900 shrink-0 ${
        isSpotlight ? 'md:w-1/2 aspect-[4/5] sm:aspect-[16/11] md:aspect-[4/5]' : 'aspect-[3/4]'
      }`}>
        {/* Primary Image with Shared Layout Animation */}
        <motion.img
          layoutId={`product-image-${product.id}`}
          src={product.images[0]}
          alt={product.name}
          className={`w-full h-full object-cover object-center filter contrast-105 brightness-95 transition-all duration-700 ${
            isHovered && product.images[1] ? 'opacity-0 scale-105' : 'opacity-100 scale-100'
          }`}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          loading="lazy"
        />

        {/* Secondary Hover Image */}
        {product.images[1] && (
          <img
            src={product.images[1]}
            alt={`${product.name} alternate angle`}
            className={`absolute inset-0 w-full h-full object-cover object-center filter contrast-105 brightness-100 transition-all duration-700 pointer-events-none ${
              isHovered ? 'opacity-100 scale-105' : 'opacity-0 scale-100'
            }`}
            loading="lazy"
          />
        )}

        {/* Badge */}
        {product.badge && (
          <div className="absolute top-3 left-3 px-2 py-0.5 bg-noir-950/85 backdrop-blur-md border border-white/10 text-[9px] font-mono tracking-widest text-noir-200 uppercase">
            {product.badge}
          </div>
        )}

        {/* Sale Tag if original price present */}
        {product.originalPrice && (
          <div className="absolute top-3 right-3 px-2 py-0.5 bg-luxe-crimson/90 text-white text-[9px] font-mono font-bold tracking-wider">
            ARCHIVE SALE
          </div>
        )}

        {/* Quick Action Button Overlay */}
        <div className="absolute inset-x-3 bottom-3 flex items-center gap-2 transform translate-y-3 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
          <button
            onClick={handleQuickAdd}
            className={`flex-1 py-3 px-3 text-[11px] font-mono font-bold tracking-widest uppercase transition-all duration-200 flex items-center justify-center space-x-2 shadow-2xl ${
              isAdded
                ? 'bg-emerald-600 text-white'
                : 'bg-white text-noir-950 hover:bg-luxe-smoke'
            }`}
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
            className="p-3 bg-noir-900/90 backdrop-blur-md border border-white/20 text-white hover:bg-white hover:text-noir-950 transition-colors"
            title="Inspect Details"
          >
            <Eye className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Product Information */}
      <div className={`pt-4 flex flex-col flex-1 justify-between ${isSpotlight ? 'md:pt-0 md:py-4' : ''}`}>
        <div>
          <div className="flex items-center justify-between text-[10px] font-mono tracking-widest text-noir-400 uppercase">
            <span>{product.category}</span>
            <span className="text-noir-500">{product.sizes.join(' · ')}</span>
          </div>

          <h3 className={`font-display font-semibold text-white mt-1.5 group-hover:text-luxe-smoke transition-colors leading-snug ${
            isSpotlight ? 'text-xl sm:text-2xl' : 'text-base sm:text-lg'
          }`}>
            {product.name}
          </h3>

          <p className="text-xs text-noir-400 font-light mt-1 line-clamp-2 leading-relaxed">
            {product.tagline}
          </p>

          {isSpotlight && product.details && (
            <div className="mt-4 pt-3 border-t border-white/[0.06] text-xs font-mono text-noir-400 hidden sm:block">
              <span className="text-noir-500 uppercase text-[10px] block">ORIGIN & CRAFT</span>
              <p className="text-white mt-0.5">{product.details.material}</p>
            </div>
          )}
        </div>

        <div className="pt-3 mt-4 border-t border-white/[0.06] flex items-center justify-between">
          {/* Price */}
          <div className="flex items-baseline space-x-2">
            <span className="font-mono text-sm font-semibold text-white">
              ${product.price}
            </span>
            {product.originalPrice && (
              <span className="font-mono text-xs text-noir-500 line-through">
                ${product.originalPrice}
              </span>
            )}
            <span className="text-[10px] text-noir-500 font-mono">USD</span>
          </div>

          {/* Color Swatches */}
          <div className="flex items-center space-x-1.5" onClick={(e) => e.stopPropagation()}>
            {product.colors.map((c) => (
              <button
                key={c.name}
                onClick={() => setSelectedColor(c.name)}
                style={{ backgroundColor: c.hex }}
                className={`w-3.5 h-3.5 rounded-full border transition-transform ${
                  selectedColor === c.name
                    ? 'border-white scale-110 ring-1 ring-white/50'
                    : 'border-white/20 hover:scale-105'
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
