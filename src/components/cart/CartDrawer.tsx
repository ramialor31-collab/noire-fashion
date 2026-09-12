import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Trash2, ArrowRight, Tag, Sparkles } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { EmptyCart } from './EmptyCart';

interface CartDrawerProps {
  onBrowseShop: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({ onBrowseShop }) => {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    removeFromCart,
    updateQuantity,
    itemCount,
    subtotal,
    discount,
    promoCode,
    applyPromoCode,
    removePromoCode,
    freeShippingThreshold,
    amountUntilFreeShipping,
    total,
    setIsCheckoutOpen,
  } = useCart();

  const [promoInput, setPromoInput] = useState('');
  const [promoFeedback, setPromoFeedback] = useState<{ success: boolean; message: string } | null>(null);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!promoInput.trim()) return;
    const res = applyPromoCode(promoInput);
    setPromoFeedback(res);
    if (res.success) setPromoInput('');
  };

  const handleStartCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  const shippingProgress = Math.min(100, Math.round((subtotal / freeShippingThreshold) * 100));

  if (!isCartOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-hidden">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsCartOpen(false)}
          className="absolute inset-0 bg-noir-950/70 backdrop-blur-md transition-opacity"
        />

        {/* Slide-over Drawer Panel */}
        <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="w-screen max-w-md bg-noir-900 border-l border-white/10 shadow-2xl flex flex-col justify-between"
          >
            {/* Drawer Header */}
            <div className="p-6 border-b border-white/[0.08] flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <span className="font-display text-xl font-bold text-white">SHOPPING BAG</span>
                <span className="font-mono text-xs text-noir-400">({itemCount} ITEMS)</span>
              </div>
              <button
                onClick={() => setIsCartOpen(false)}
                className="p-1.5 text-noir-400 hover:text-white transition-colors"
                aria-label="Close cart drawer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Free Shipping Progress Indicator */}
            <div className="px-6 py-3.5 bg-noir-950 border-b border-white/[0.06]">
              <div className="flex items-center justify-between text-[11px] font-mono tracking-wider text-noir-300 mb-2">
                {amountUntilFreeShipping === 0 ? (
                  <span className="text-white font-bold flex items-center space-x-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-luxe-gold" />
                    <span>COMPLIMENTARY GLOBAL EXPRESS UNLOCKED</span>
                  </span>
                ) : (
                  <span>
                    ADD <strong className="text-white">${amountUntilFreeShipping}</strong> FOR FREE GLOBAL EXPRESS
                  </span>
                )}
                <span>{shippingProgress}%</span>
              </div>
              <div className="w-full h-1 bg-noir-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-white transition-all duration-500 ease-out"
                  style={{ width: `${shippingProgress}%` }}
                />
              </div>
            </div>

            {/* Main Cart Items List */}
            <div className="flex-1 overflow-y-auto p-6 divide-y divide-white/[0.06]">
              {cart.length === 0 ? (
                <EmptyCart onBrowse={onBrowseShop} />
              ) : (
                cart.map((item) => (
                  <div key={item.id} className="py-4 first:pt-0 last:pb-0 flex space-x-4">
                    {/* Item Thumbnail */}
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-20 h-26 object-cover bg-noir-950 border border-white/10 shrink-0"
                    />

                    {/* Details */}
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex items-start justify-between">
                          <h4 className="font-display font-semibold text-sm text-white leading-snug">
                            {item.name}
                          </h4>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="text-noir-500 hover:text-red-400 transition-colors p-1"
                            title="Remove item"
                            aria-label={`Remove ${item.name}`}
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        <div className="flex items-center space-x-3 text-xs font-mono text-noir-400 mt-1">
                          <span>{item.color}</span>
                          <span>/</span>
                          <span>SIZE {item.size}</span>
                        </div>
                      </div>

                      {/* Controls & Line Price */}
                      <div className="flex items-center justify-between mt-3">
                        <div className="flex items-center border border-white/15 bg-noir-950 text-xs">
                          <button
                            onClick={() => updateQuantity(item.id, -1)}
                            className="px-2.5 py-1 text-noir-400 hover:text-white transition-colors"
                            aria-label="Decrease quantity"
                          >
                            -
                          </button>
                          <span className="px-2 font-mono text-white font-medium">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, 1)}
                            className="px-2.5 py-1 text-noir-400 hover:text-white transition-colors"
                            aria-label="Increase quantity"
                          >
                            +
                          </button>
                        </div>

                        <span className="font-mono text-sm font-semibold text-white">
                          ${item.price * item.quantity} USD
                        </span>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Bottom Section: Promo Code & Checkout Totals */}
            {cart.length > 0 && (
              <div className="p-6 bg-noir-950 border-t border-white/[0.08] space-y-4">
                
                {/* Promo Code Input */}
                {promoCode ? (
                  <div className="flex items-center justify-between p-2.5 bg-noir-900 border border-white/15 rounded-xs text-xs font-mono">
                    <span className="flex items-center space-x-2 text-white">
                      <Tag className="w-3.5 h-3.5 text-luxe-gold" />
                      <span>CODE: <strong>{promoCode}</strong></span>
                    </span>
                    <button
                      onClick={removePromoCode}
                      className="text-noir-400 hover:text-white uppercase text-[10px]"
                    >
                      REMOVE
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleApplyPromo} className="flex gap-2">
                    <input
                      type="text"
                      value={promoInput}
                      onChange={(e) => setPromoInput(e.target.value)}
                      placeholder="Promo code (e.g. NOIRE10)"
                      className="flex-1 bg-noir-900 border border-white/10 px-3 py-2 text-xs text-white uppercase placeholder:normal-case placeholder:text-noir-500 focus:outline-none focus:border-white/40 font-mono"
                    />
                    <button
                      type="submit"
                      className="px-4 py-2 bg-noir-800 border border-white/20 text-white text-xs font-mono uppercase hover:bg-white hover:text-noir-950 transition-colors"
                    >
                      APPLY
                    </button>
                  </form>
                )}

                {promoFeedback && (
                  <p className={`text-[11px] font-mono ${promoFeedback.success ? 'text-emerald-400' : 'text-rose-400'}`}>
                    {promoFeedback.message}
                  </p>
                )}

                {/* Calculations Breakdown */}
                <div className="space-y-2 text-xs font-mono pt-2 border-t border-white/[0.06]">
                  <div className="flex items-center justify-between text-noir-400">
                    <span>SUBTOTAL</span>
                    <span className="text-white">${subtotal} USD</span>
                  </div>
                  {discount > 0 && (
                    <div className="flex items-center justify-between text-emerald-400">
                      <span>PROMO DISCOUNT</span>
                      <span>-${discount} USD</span>
                    </div>
                  )}
                  <div className="flex items-center justify-between text-noir-400">
                    <span>WORLDWIDE EXPRESS</span>
                    <span className="text-white">
                      {amountUntilFreeShipping === 0 ? 'COMPLIMENTARY' : '$25 USD'}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm font-bold text-white pt-2 border-t border-white/10">
                    <span className="font-display text-base">ESTIMATED TOTAL</span>
                    <span className="font-mono text-base">
                      ${total + (amountUntilFreeShipping === 0 ? 0 : 25)} USD
                    </span>
                  </div>
                </div>

                {/* Proceed to Checkout Button */}
                <button
                  onClick={handleStartCheckout}
                  className="w-full py-4 bg-white text-noir-950 font-sans text-xs font-bold tracking-widest uppercase hover:bg-luxe-smoke transition-all duration-300 flex items-center justify-center space-x-2 shadow-xl"
                >
                  <span>PROCEED TO CHECKOUT</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>

                <p className="text-[10px] text-center text-noir-500 font-mono">
                  TAXES & DUTIES INCLUDED • COMPLIMENTARY 14-DAY RETURNS
                </p>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </AnimatePresence>
  );
};
