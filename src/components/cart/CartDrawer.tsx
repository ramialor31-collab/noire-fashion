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
        {/* Backdrop with restrained smooth fade */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={() => setIsCartOpen(false)}
          className="absolute inset-0 bg-noir-950/75 backdrop-blur-md"
        />

        {/* Slide-over Drawer Panel */}
        <div className="fixed inset-y-0 right-0 max-w-full flex pl-6 sm:pl-10">
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="w-screen max-w-md bg-noir-900 border-l border-white/10 shadow-2xl flex flex-col justify-between"
          >
            {/* Drawer Header */}
            <div className="p-5 sm:p-6 border-b border-white/[0.08] flex items-center justify-between bg-noir-950/60">
              <div className="flex items-center space-x-2.5">
                <span className="font-display text-xl font-bold text-white tracking-tight">SHOPPING BAG</span>
                <span className="font-mono text-xs text-noir-400">({itemCount} {itemCount === 1 ? 'ITEM' : 'ITEMS'})</span>
              </div>
              <button
                onClick={() => setIsCartOpen(false)}
                className="w-9 h-9 flex items-center justify-center text-noir-400 hover:text-white rounded-full bg-white/[0.04] border border-white/10 transition-all duration-200 active:scale-95"
                aria-label="Close cart drawer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Free Shipping Progress Indicator */}
            <div className="px-5 sm:px-6 py-3.5 bg-noir-950 border-b border-white/[0.06]">
              <div className="flex items-center justify-between text-[11px] font-mono tracking-wider text-noir-300 mb-2">
                {amountUntilFreeShipping === 0 ? (
                  <span className="text-white font-medium flex items-center space-x-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-luxe-gold" />
                    <span>COMPLIMENTARY EXPRESS UNLOCKED</span>
                  </span>
                ) : (
                  <span>
                    ADD <strong className="text-white font-semibold">${amountUntilFreeShipping}</strong> FOR FREE EXPRESS
                  </span>
                )}
                <span className="text-noir-400">{shippingProgress}%</span>
              </div>
              <div className="w-full h-1 bg-noir-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-white transition-all duration-500 ease-out"
                  style={{ width: `${shippingProgress}%` }}
                />
              </div>
            </div>

            {/* Main Cart Items List with AnimatePresence Item Removal */}
            <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-4">
              {cart.length === 0 ? (
                <EmptyCart onBrowse={onBrowseShop} />
              ) : (
                <AnimatePresence initial={false}>
                  {cart.map((item) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0, overflow: 'hidden' }}
                      transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                      className="pb-4 border-b border-white/[0.06] last:border-b-0"
                    >
                      <div className="flex space-x-4 pt-1">
                        {/* Item Thumbnail */}
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-20 h-26 object-cover bg-noir-950 border border-white/10 shrink-0 rounded-xs"
                        />

                        {/* Details */}
                        <div className="flex-1 flex flex-col justify-between py-0.5">
                          <div>
                            <div className="flex items-start justify-between gap-2">
                              <h4 className="font-display font-semibold text-sm text-white leading-snug">
                                {item.name}
                              </h4>
                              <button
                                onClick={() => removeFromCart(item.id)}
                                className="text-noir-500 hover:text-red-400 transition-colors duration-150 p-1.5 -mr-1.5 -mt-1 rounded-xs active:scale-90"
                                title="Remove item"
                                aria-label={`Remove ${item.name}`}
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                            <div className="flex items-center space-x-2 text-xs font-mono text-noir-400 mt-1">
                              <span>{item.color}</span>
                              <span className="text-noir-600">/</span>
                              <span>SIZE {item.size}</span>
                            </div>
                          </div>

                          {/* Stepper Controls & Line Price */}
                          <div className="flex items-center justify-between mt-3">
                            <div className="flex items-center border border-white/15 bg-noir-950 rounded-xs">
                              <button
                                onClick={() => updateQuantity(item.id, -1)}
                                className="w-8 h-8 flex items-center justify-center text-xs font-mono text-noir-400 hover:text-white transition-colors duration-150 active:scale-90"
                                aria-label="Decrease quantity"
                              >
                                -
                              </button>
                              <span className="w-7 text-center font-mono text-xs text-white font-medium">{item.quantity}</span>
                              <button
                                onClick={() => updateQuantity(item.id, 1)}
                                className="w-8 h-8 flex items-center justify-center text-xs font-mono text-noir-400 hover:text-white transition-colors duration-150 active:scale-90"
                                aria-label="Increase quantity"
                              >
                                +
                              </button>
                            </div>

                            <span className="font-mono text-sm font-semibold text-white tracking-tight">
                              ${item.price * item.quantity} USD
                            </span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              )}
            </div>

            {/* Bottom Section: Promo Code & Checkout Totals */}
            {cart.length > 0 && (
              <div className="p-5 sm:p-6 bg-noir-950 border-t border-white/[0.08] space-y-4">
                
                {/* Promo Code Input */}
                {promoCode ? (
                  <div className="flex items-center justify-between p-2.5 bg-noir-900 border border-white/15 rounded-xs text-xs font-mono">
                    <span className="flex items-center space-x-2 text-white">
                      <Tag className="w-3.5 h-3.5 text-luxe-gold" />
                      <span>CODE: <strong className="font-bold">{promoCode}</strong></span>
                    </span>
                    <button
                      onClick={removePromoCode}
                      className="text-noir-400 hover:text-white uppercase text-[10px] tracking-wider transition-colors duration-150"
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
                      className="flex-1 bg-noir-900 border border-white/10 px-3 py-2 text-xs text-white uppercase placeholder:normal-case placeholder:text-noir-500 focus:outline-none focus:border-white/40 font-mono rounded-xs"
                    />
                    <button
                      type="submit"
                      className="px-4 py-2 bg-noir-800 border border-white/20 text-white text-xs font-mono uppercase hover:bg-white hover:text-noir-950 transition-all duration-200 active:scale-95 rounded-xs"
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
                    <span className="font-mono text-base tracking-tight">
                      ${total + (amountUntilFreeShipping === 0 ? 0 : 25)} USD
                    </span>
                  </div>
                </div>

                {/* Proceed to Checkout Button with comfortable 48px target */}
                <button
                  onClick={handleStartCheckout}
                  className="w-full min-h-[48px] py-3.5 bg-white text-noir-950 font-sans text-xs font-bold tracking-widest uppercase hover:bg-luxe-smoke transition-all duration-200 active:scale-[0.99] flex items-center justify-center space-x-2 shadow-xl rounded-xs"
                >
                  <span>PROCEED TO CHECKOUT</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>

                <p className="text-[10px] text-center text-noir-500 font-mono tracking-wide">
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
