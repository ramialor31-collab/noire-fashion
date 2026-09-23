import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Check, ShoppingBag, ChevronDown } from 'lucide-react';
import type { Product } from '../../types';
import { useCart } from '../../context/CartContext';
import { SizeGuideModal } from './SizeGuideModal';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({ product, onClose }) => {
  const { addToCart } = useCart();
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);
  const [openAccordion, setOpenAccordion] = useState<string | null>('fit');

  useEffect(() => {
    if (product) {
      setSelectedImageIndex(0);
      setSelectedColor(product.colors[0]?.name || '');
      setSelectedSize(product.sizes.includes('M') ? 'M' : product.sizes[0] || 'M');
      setQuantity(1);
      setIsAdded(false);
      setOpenAccordion('fit');
    }
  }, [product]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!product) return null;

  const handleAdd = () => {
    addToCart(product, selectedColor, selectedSize, quantity);
    setIsAdded(true);
    setTimeout(() => {
      setIsAdded(false);
    }, 1800);
  };

  const toggleAccordion = (key: string) => {
    setOpenAccordion((prev) => (prev === key ? null : key));
  };

  return (
    <>
      <AnimatePresence>
        <div className="fixed inset-0 z-50 flex items-center justify-center p-0 sm:p-4 md:p-6 bg-noir-950/90 backdrop-blur-2xl overflow-y-auto">
          {/* Dismiss Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0"
            onClick={onClose}
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-5xl bg-noir-900 border border-white/15 shadow-2xl rounded-none sm:rounded-xs overflow-hidden z-10 my-auto max-h-[100dvh] sm:max-h-[92vh] flex flex-col"
          >
            {/* Top Close Button - fixed on mobile so it never scrolls off, absolute on desktop */}
            <button
              onClick={onClose}
              className="fixed sm:absolute top-3 right-3 sm:top-4 sm:right-4 z-30 min-w-[44px] min-h-[44px] p-2.5 text-noir-300 hover:text-white bg-noir-950/80 backdrop-blur-md rounded-full border border-white/15 transition-all duration-200 active:scale-95 flex items-center justify-center shadow-lg"
              aria-label="Close product view"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="grid grid-cols-1 lg:grid-cols-12 max-h-[100dvh] sm:max-h-[92vh] overflow-y-auto">
              
              {/* Left Column: Connected Multi-Image Gallery */}
              <div className="lg:col-span-7 bg-noir-950 p-4 sm:p-8 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-white/[0.08]">
                {/* Main Shared Image Expansion */}
                <div className="relative aspect-[3/4] w-full overflow-hidden bg-noir-900 border border-white/[0.08]">
                  <motion.img
                    layoutId={`product-image-${product.id}`}
                    src={product.images[selectedImageIndex] || product.images[0]}
                    alt={`${product.name} view ${selectedImageIndex + 1}`}
                    className="w-full h-full object-cover object-center filter contrast-105 brightness-100"
                    transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                  />

                  {product.badge && (
                    <div className="absolute top-4 left-4 px-3 py-1 bg-noir-950/90 backdrop-blur-md border border-white/15 text-[10px] font-mono tracking-widest text-white uppercase pointer-events-none">
                      {product.badge}
                    </div>
                  )}
                </div>

                {/* Thumbnail Selection Rail */}
                {product.images.length > 1 && (
                  <div className="flex items-center space-x-3 mt-4 overflow-x-auto pb-1">
                    {product.images.map((img, idx) => (
                      <button
                        key={idx}
                        onClick={() => setSelectedImageIndex(idx)}
                        className={`relative w-20 h-24 shrink-0 overflow-hidden border transition-all duration-200 active:scale-95 ${
                          selectedImageIndex === idx
                            ? 'border-white ring-1 ring-white/60 opacity-100'
                            : 'border-white/15 opacity-60 hover:opacity-100 hover:border-white/40'
                        }`}
                        aria-label={`View image ${idx + 1}`}
                      >
                        <img
                          src={img}
                          alt={`${product.name} angle ${idx + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Right Column: Clear Hierarchy & Focused Purchase Console */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="lg:col-span-5 p-4 sm:p-6 lg:p-8 flex flex-col justify-between bg-noir-900"
              >
                <div>
                  {/* 1. Category & Edition Meta */}
                  <div className="flex items-center justify-between text-xs font-mono text-noir-400 uppercase tracking-widest">
                    <span>{product.category}</span>
                    <span className="text-noir-500">COLLECTION 01</span>
                  </div>

                  {/* 2. Product Name */}
                  <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-white mt-2 leading-tight">
                    {product.name}
                  </h2>

                  {/* 3. Price Block */}
                  <div className="flex items-baseline space-x-3 mt-3">
                    <span className="font-mono text-2xl sm:text-3xl font-bold text-white tracking-tight">
                      ${product.price}
                    </span>
                    {product.originalPrice && (
                      <span className="font-mono text-sm text-noir-500 line-through">
                        ${product.originalPrice}
                      </span>
                    )}
                    <span className="text-xs font-mono text-noir-400">USD • VAT INCLUDED</span>
                  </div>

                  {/* 4. Poetic Tagline & Description */}
                  <p className="text-xs sm:text-sm text-noir-300 font-light leading-relaxed mt-4">
                    {product.description}
                  </p>

                  {/* 5. Purchase Area Console */}
                  <div className="mt-6 pt-5 border-t border-white/[0.08] space-y-5">
                    
                    {/* Color Selector */}
                    <div>
                      <div className="flex items-center justify-between text-xs font-mono mb-2">
                        <span className="text-noir-400 uppercase tracking-wider">
                          COLOR: <strong className="text-white font-medium">{selectedColor}</strong>
                        </span>
                      </div>
                      <div className="flex items-center space-x-2.5">
                        {product.colors.map((c) => {
                          const isSelected = selectedColor === c.name;
                          return (
                            <button
                              key={c.name}
                              onClick={() => setSelectedColor(c.name)}
                              className={`flex items-center space-x-2 px-3 py-2 border rounded-xs transition-all duration-200 active:scale-95 ${
                                isSelected
                                  ? 'border-white bg-white/10 text-white ring-1 ring-white/40'
                                  : 'border-white/15 text-noir-400 hover:border-white/40 hover:text-noir-200'
                              }`}
                              aria-label={`Select color ${c.name}`}
                            >
                              <span
                                className="w-3.5 h-3.5 rounded-full border border-white/30 shrink-0"
                                style={{ backgroundColor: c.hex }}
                              />
                              <span className="text-xs font-mono">{c.name}</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Size Selector with clear feedback & measurements popup */}
                    <div>
                      <div className="flex items-center justify-between text-xs font-mono mb-2">
                        <span className="text-noir-400 uppercase tracking-wider">
                          SIZE: <strong className="text-white font-medium">{selectedSize}</strong>
                        </span>
                        {product.sizes.length > 1 && product.category !== 'ACCESSORIES' && (
                          <button
                            onClick={() => setIsSizeGuideOpen(true)}
                            className="text-noir-300 hover:text-white underline text-[11px] font-mono tracking-wider transition-colors"
                          >
                            SIZE & FIT GUIDE
                          </button>
                        )}
                      </div>
                      <div className="grid grid-cols-5 gap-1.5 sm:gap-2">
                        {product.sizes.map((s) => {
                          const isSelected = selectedSize === s;
                          return (
                            <button
                              key={s}
                              onClick={() => setSelectedSize(s)}
                              className={`min-h-[44px] py-2.5 text-xs font-mono font-bold tracking-wider rounded-xs border transition-all duration-200 active:scale-95 ${
                                isSelected
                                  ? 'bg-white text-noir-950 border-white shadow-md'
                                  : 'bg-noir-950 text-white border-white/20 hover:border-white/50'
                              }`}
                              aria-label={`Select size ${s}`}
                            >
                              {s}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Quantity & Prominent ADD TO BAG Button */}
                    <div className="pt-2 flex items-center gap-2 sm:gap-3">
                      {/* Quantity Stepper with 44px touch targets */}
                      <div className="flex items-center border border-white/20 bg-noir-950 text-white rounded-xs shrink-0">
                        <button
                          onClick={() => setQuantity(Math.max(1, quantity - 1))}
                          className="w-9 sm:w-11 h-11 sm:h-12 flex items-center justify-center text-xs font-mono text-noir-400 hover:text-white transition-colors duration-150 active:scale-90"
                          aria-label="Decrease quantity"
                        >
                          -
                        </button>
                        <span className="w-7 sm:w-9 text-center font-mono text-xs font-bold">{quantity}</span>
                        <button
                          onClick={() => setQuantity(quantity + 1)}
                          className="w-9 sm:w-11 h-11 sm:h-12 flex items-center justify-center text-xs font-mono text-noir-400 hover:text-white transition-colors duration-150 active:scale-90"
                          aria-label="Increase quantity"
                        >
                          +
                        </button>
                      </div>

                      {/* Primary ADD TO BAG CTA Button */}
                      <button
                        onClick={handleAdd}
                        className={`flex-1 min-h-[44px] sm:min-h-[48px] py-3 px-3 sm:px-6 text-[11px] sm:text-xs font-sans font-bold tracking-wider sm:tracking-widest uppercase transition-all duration-200 active:scale-[0.99] flex items-center justify-center space-x-1.5 sm:space-x-2 shadow-2xl rounded-xs truncate ${
                          isAdded
                            ? 'bg-emerald-600 text-white shadow-[0_0_25px_rgba(16,185,129,0.3)]'
                            : 'bg-white text-noir-950 hover:bg-luxe-smoke hover:shadow-[0_0_25px_rgba(255,255,255,0.25)]'
                        }`}
                      >
                        {isAdded ? (
                          <>
                            <Check className="w-4 h-4 shrink-0" />
                            <span className="truncate">ADDED TO BAG</span>
                          </>
                        ) : (
                          <>
                            <ShoppingBag className="w-4 h-4 shrink-0" />
                            <span className="truncate">ADD TO BAG • ${product.price * quantity}</span>
                          </>
                        )}
                      </button>
                    </div>

                  </div>
                </div>

                {/* 6. Clean Structured Product Specifications (Real Product Data Only) */}
                <div className="mt-8 border-t border-white/[0.08] divide-y divide-white/[0.06] text-xs">
                  
                  {/* Size & Fit */}
                  {product.details.fit && (
                    <div className="py-3">
                      <button
                        onClick={() => toggleAccordion('fit')}
                        className="w-full flex items-center justify-between text-noir-300 hover:text-white font-mono uppercase tracking-widest text-[11px] transition-colors"
                      >
                        <span>SIZE & FIT</span>
                        <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${openAccordion === 'fit' ? 'rotate-180 text-white' : ''}`} />
                      </button>
                      {openAccordion === 'fit' && (
                        <div className="pt-2 text-noir-300 font-light space-y-2 text-xs leading-relaxed">
                          <p>{product.details.fit}</p>
                          {product.sizes.length > 1 && product.category !== 'ACCESSORIES' && (
                            <div className="pt-1">
                              <button
                                onClick={() => setIsSizeGuideOpen(true)}
                                className="text-white hover:underline text-[11px] font-mono tracking-wider transition-colors inline-flex items-center space-x-1"
                              >
                                <span>VIEW SIZE GUIDE →</span>
                              </button>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  )}

                  {/* Materials & Details */}
                  {product.details.material && (
                    <div className="py-3">
                      <button
                        onClick={() => toggleAccordion('material')}
                        className="w-full flex items-center justify-between text-noir-300 hover:text-white font-mono uppercase tracking-widest text-[11px] transition-colors"
                      >
                        <span>MATERIALS & DETAILS</span>
                        <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${openAccordion === 'material' ? 'rotate-180 text-white' : ''}`} />
                      </button>
                      {openAccordion === 'material' && (
                        <div className="pt-2 text-noir-300 font-light space-y-1.5 text-xs leading-relaxed">
                          <p>{product.details.material}</p>
                          {product.details.origin && (
                            <p className="text-[11px] font-mono text-noir-400">Craft Origin: {product.details.origin}</p>
                          )}
                        </div>
                      )}
                    </div>
                  )}

                  {/* Garment Care */}
                  {product.details.care && (
                    <div className="py-3">
                      <button
                        onClick={() => toggleAccordion('care')}
                        className="w-full flex items-center justify-between text-noir-300 hover:text-white font-mono uppercase tracking-widest text-[11px] transition-colors"
                      >
                        <span>CARE INSTRUCTIONS</span>
                        <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${openAccordion === 'care' ? 'rotate-180 text-white' : ''}`} />
                      </button>
                      {openAccordion === 'care' && (
                        <div className="pt-2 text-noir-300 font-light space-y-1 text-xs leading-relaxed">
                          <p>{product.details.care}</p>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Shipping & Returns Placeholder */}
                  <div className="py-3">
                    <button
                      onClick={() => toggleAccordion('shipping')}
                      className="w-full flex items-center justify-between text-noir-300 hover:text-white font-mono uppercase tracking-widest text-[11px] transition-colors"
                    >
                      <span>SHIPPING & RETURNS</span>
                      <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${openAccordion === 'shipping' ? 'rotate-180 text-white' : ''}`} />
                    </button>
                    {openAccordion === 'shipping' && (
                      <div className="pt-2.5 text-noir-300 font-light leading-relaxed space-y-3 text-xs">
                        <div>
                          <span className="block text-[10px] font-mono text-noir-400 uppercase tracking-wider mb-0.5">SHIPPING</span>
                          <p className="text-noir-300">Delivery information will be provided at checkout.</p>
                        </div>
                        <div>
                          <span className="block text-[10px] font-mono text-noir-400 uppercase tracking-wider mb-0.5">RETURNS</span>
                          <p className="text-noir-300">Return information will be provided before completing your order.</p>
                        </div>
                      </div>
                    )}
                  </div>

                </div>

              </motion.div>

            </div>
          </motion.div>
        </div>
      </AnimatePresence>

      <SizeGuideModal isOpen={isSizeGuideOpen} onClose={() => setIsSizeGuideOpen(false)} product={product} />
    </>
  );
};
