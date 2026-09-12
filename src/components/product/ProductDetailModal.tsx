import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Check, ShoppingBag, ChevronDown, ChevronUp, ShieldCheck, Truck } from 'lucide-react';
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
  const [openAccordion, setOpenAccordion] = useState<'craft' | 'fit' | 'shipping' | null>('craft');

  useEffect(() => {
    if (product) {
      setSelectedImageIndex(0);
      setSelectedColor(product.colors[0]?.name || '');
      setSelectedSize(product.sizes[1] || product.sizes[0] || 'M');
      setQuantity(1);
      setIsAdded(false);
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

  return (
    <>
      <AnimatePresence>
        <div className="fixed inset-0 z-50 flex items-center justify-center p-0 sm:p-4 md:p-6 bg-noir-950/90 backdrop-blur-2xl overflow-y-auto">
          {/* Dismiss Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0"
            onClick={onClose}
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-5xl bg-noir-900 border border-white/15 shadow-2xl rounded-none sm:rounded-xs overflow-hidden z-10 my-auto min-h-screen sm:min-h-0"
          >
            {/* Top Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-20 p-2 text-noir-300 hover:text-white bg-noir-950/75 backdrop-blur-md rounded-full border border-white/15 transition-all hover:scale-105"
              aria-label="Close product view"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="grid grid-cols-1 lg:grid-cols-12 max-h-[92vh] overflow-y-auto">
              
              {/* Left Column: Connected Multi-Image Gallery */}
              <div className="lg:col-span-7 bg-noir-950 p-4 sm:p-8 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-white/[0.08]">
                {/* Main Shared Image Expansion */}
                <div className="relative aspect-[3/4] w-full overflow-hidden bg-noir-900 border border-white/[0.08]">
                  <motion.img
                    layoutId={`product-image-${product.id}`}
                    src={product.images[selectedImageIndex] || product.images[0]}
                    alt={`${product.name} view ${selectedImageIndex + 1}`}
                    className="w-full h-full object-cover object-center filter contrast-105 brightness-100"
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  />

                  {product.badge && (
                    <div className="absolute top-4 left-4 px-3 py-1 bg-noir-950/90 backdrop-blur-md border border-white/15 text-[10px] font-mono tracking-widest text-white uppercase">
                      {product.badge}
                    </div>
                  )}

                  {product.coordinates && (
                    <div className="absolute bottom-4 left-4 px-3 py-1 bg-noir-950/90 backdrop-blur-md border border-white/15 text-[9px] font-mono tracking-wider text-noir-300">
                      ATELIER: {product.coordinates}
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
                        className={`relative w-20 h-24 shrink-0 overflow-hidden border transition-all ${
                          selectedImageIndex === idx
                            ? 'border-white ring-1 ring-white/60'
                            : 'border-white/15 opacity-60 hover:opacity-100'
                        }`}
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

              {/* Right Column: Staggered Content Details */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
                className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between bg-noir-900"
              >
                <div>
                  {/* Category & Tag */}
                  <div className="flex items-center justify-between text-xs font-mono text-noir-400 uppercase tracking-widest">
                    <span>{product.category}</span>
                    <span>SERIES 01 // 2026</span>
                  </div>

                  {/* Title & Price */}
                  <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-white mt-2 leading-tight">
                    {product.name}
                  </h2>

                  <div className="flex items-baseline space-x-3 mt-3">
                    <span className="font-mono text-xl sm:text-2xl font-bold text-white">
                      ${product.price}
                    </span>
                    {product.originalPrice && (
                      <span className="font-mono text-sm text-noir-500 line-through">
                        ${product.originalPrice}
                      </span>
                    )}
                    <span className="text-xs font-mono text-noir-400">USD • VAT INCLUDED</span>
                  </div>

                  {/* Poetic description */}
                  <p className="text-xs sm:text-sm text-noir-300 font-light leading-relaxed mt-4">
                    {product.description}
                  </p>

                  {/* Color Selector */}
                  <div className="mt-6 pt-5 border-t border-white/[0.08]">
                    <div className="flex items-center justify-between text-xs font-mono mb-2.5">
                      <span className="text-noir-400 uppercase tracking-wider">
                        TONE: <span className="text-white font-medium">{selectedColor}</span>
                      </span>
                    </div>
                    <div className="flex items-center space-x-2.5">
                      {product.colors.map((c) => (
                        <button
                          key={c.name}
                          onClick={() => setSelectedColor(c.name)}
                          className={`flex items-center space-x-2 px-3 py-1.5 border transition-all rounded-xs ${
                            selectedColor === c.name
                              ? 'border-white bg-white/10 text-white'
                              : 'border-white/15 text-noir-400 hover:border-white/40'
                          }`}
                        >
                          <span
                            className="w-3.5 h-3.5 rounded-full border border-white/30"
                            style={{ backgroundColor: c.hex }}
                          />
                          <span className="text-xs font-mono">{c.name}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Size Selector */}
                  <div className="mt-6">
                    <div className="flex items-center justify-between text-xs font-mono mb-2.5">
                      <span className="text-noir-400 uppercase tracking-wider">
                        SIZE ARCHITECTURE: <span className="text-white font-medium">{selectedSize}</span>
                      </span>
                      <button
                        onClick={() => setIsSizeGuideOpen(true)}
                        className="text-noir-300 hover:text-white underline text-[11px] font-mono tracking-wider"
                      >
                        MEASUREMENTS
                      </button>
                    </div>
                    <div className="grid grid-cols-5 gap-2">
                      {product.sizes.map((s) => (
                        <button
                          key={s}
                          onClick={() => setSelectedSize(s)}
                          className={`py-2.5 text-xs font-mono font-bold tracking-wider transition-all border ${
                            selectedSize === s
                              ? 'bg-white text-noir-950 border-white'
                              : 'bg-transparent text-white border-white/20 hover:border-white/60'
                          }`}
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Quantity & Add To Bag */}
                  <div className="mt-6 flex items-center gap-3">
                    {/* Quantity controls */}
                    <div className="flex items-center border border-white/20 bg-noir-950 text-white">
                      <button
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="px-3 py-3 text-xs font-mono text-noir-400 hover:text-white transition-colors"
                        aria-label="Decrease quantity"
                      >
                        -
                      </button>
                      <span className="px-3 font-mono text-xs font-bold">{quantity}</span>
                      <button
                        onClick={() => setQuantity(quantity + 1)}
                        className="px-3 py-3 text-xs font-mono text-noir-400 hover:text-white transition-colors"
                        aria-label="Increase quantity"
                      >
                        +
                      </button>
                    </div>

                    {/* Add to Bag Button */}
                    <button
                      onClick={handleAdd}
                      className={`flex-1 py-3.5 px-6 text-xs font-sans font-bold tracking-widest uppercase transition-all duration-300 flex items-center justify-center space-x-2 shadow-2xl ${
                        isAdded
                          ? 'bg-emerald-600 text-white'
                          : 'bg-white text-noir-950 hover:bg-luxe-smoke hover:shadow-[0_0_25px_rgba(255,255,255,0.25)]'
                      }`}
                    >
                      {isAdded ? (
                        <>
                          <Check className="w-4 h-4" />
                          <span>ADDED TO BAG</span>
                        </>
                      ) : (
                        <>
                          <ShoppingBag className="w-4 h-4" />
                          <span>ADD TO BAG • ${product.price * quantity}</span>
                        </>
                      )}
                    </button>
                  </div>

                  {/* Trust Points */}
                  <div className="mt-4 flex items-center justify-between text-[10px] sm:text-[11px] font-mono text-noir-400 border-t border-white/[0.06] pt-3">
                    <span className="flex items-center space-x-1.5">
                      <Truck className="w-3.5 h-3.5 text-noir-300" />
                      <span>Complimentary DHL Express over $300</span>
                    </span>
                    <span className="flex items-center space-x-1.5">
                      <ShieldCheck className="w-3.5 h-3.5 text-noir-300" />
                      <span>Authentic Atelier Guarantee</span>
                    </span>
                  </div>
                </div>

                {/* Luxury Craftsmanship Accordions */}
                <div className="mt-6 border-t border-white/[0.08] divide-y divide-white/[0.06] text-xs">
                  {/* Craftsmanship Accordion */}
                  <div className="py-3">
                    <button
                      onClick={() => setOpenAccordion(openAccordion === 'craft' ? null : 'craft')}
                      className="w-full flex items-center justify-between text-noir-300 hover:text-white font-mono uppercase tracking-widest text-[11px]"
                    >
                      <span>COMPOSITION & TEXTILE WEIGHT</span>
                      {openAccordion === 'craft' ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                    </button>
                    {openAccordion === 'craft' && (
                      <div className="pt-2 text-noir-400 font-light space-y-1 leading-relaxed text-xs">
                        <p><strong className="text-noir-200 font-mono">Textile:</strong> {product.details.material}</p>
                        <p><strong className="text-noir-200 font-mono">Origin:</strong> {product.details.origin}</p>
                        <p><strong className="text-noir-200 font-mono">Care:</strong> {product.details.care}</p>
                      </div>
                    )}
                  </div>

                  {/* Fit Accordion */}
                  <div className="py-3">
                    <button
                      onClick={() => setOpenAccordion(openAccordion === 'fit' ? null : 'fit')}
                      className="w-full flex items-center justify-between text-noir-300 hover:text-white font-mono uppercase tracking-widest text-[11px]"
                    >
                      <span>FIT & SILHOUETTE DRAPE</span>
                      {openAccordion === 'fit' ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                    </button>
                    {openAccordion === 'fit' && (
                      <div className="pt-2 text-noir-400 font-light leading-relaxed text-xs">
                        <p>{product.details.fit}</p>
                        <p className="mt-1 text-[11px] font-mono text-noir-500">Model is 187cm wearing size Large.</p>
                      </div>
                    )}
                  </div>

                  {/* Shipping Accordion */}
                  <div className="py-3">
                    <button
                      onClick={() => setOpenAccordion(openAccordion === 'shipping' ? null : 'shipping')}
                      className="w-full flex items-center justify-between text-noir-300 hover:text-white font-mono uppercase tracking-widest text-[11px]"
                    >
                      <span>COMPLIMENTARY SHIPPING & RETURNS</span>
                      {openAccordion === 'shipping' ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                    </button>
                    {openAccordion === 'shipping' && (
                      <div className="pt-2 text-noir-400 font-light leading-relaxed space-y-1 text-xs">
                        <p>Orders ship carbon-neutral via DHL Express from Paris or Tokyo.</p>
                        <p>14-day complimentary returns on all unworn items with original garment seals intact.</p>
                      </div>
                    )}
                  </div>
                </div>

              </motion.div>

            </div>
          </motion.div>
        </div>
      </AnimatePresence>

      <SizeGuideModal isOpen={isSizeGuideOpen} onClose={() => setIsSizeGuideOpen(false)} />
    </>
  );
};
