import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, ArrowRight, Calendar, MapPin, ShieldCheck } from 'lucide-react';
import confetti from 'canvas-confetti';
import type { OrderConfirmationData } from '../../types';

interface OrderConfirmationProps {
  data: OrderConfirmationData;
  onContinueShopping: () => void;
}

export const OrderConfirmation: React.FC<OrderConfirmationProps> = ({
  data,
  onContinueShopping,
}) => {
  useEffect(() => {
    // Trigger celebratory luxury confetti on enter
    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#F6F5F2', '#C5A880', '#E4E4E7', '#A1A1AA'],
      });
    } catch {
      // safe fallback
    }
  }, []);

  return (
    <div className="p-6 md:p-10 max-w-2xl mx-auto text-left">
      {/* Top Status */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="flex flex-col items-center text-center pb-8 border-b border-white/[0.08]"
      >
        <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mb-4 text-emerald-400">
          <CheckCircle2 className="w-8 h-8" />
        </div>

        <span className="text-[10px] font-mono tracking-ultra text-noir-400 uppercase">
          DEMO TRANSACTION VERIFIED
        </span>

        <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-white mt-2">
          ORDER CONFIRMED
        </h2>

        <p className="text-sm text-noir-300 mt-2 font-light">
          Thank you for choosing NOIRÉ. Your nocturnal wardrobe has been registered.
        </p>

        <div className="mt-4 inline-flex items-center space-x-2 px-4 py-1.5 bg-noir-850 border border-white/10 rounded-xs">
          <span className="text-xs font-mono text-noir-400">ORDER NO:</span>
          <span className="text-xs font-mono font-bold text-white tracking-widest">{data.orderId}</span>
        </div>
      </motion.div>

      {/* Simulated Shipment & Delivery Timeline */}
      <div className="py-6 border-b border-white/[0.08] grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
        <div className="flex items-start space-x-3">
          <Calendar className="w-4 h-4 text-luxe-gold shrink-0 mt-0.5" />
          <div>
            <span className="text-noir-400 uppercase text-[10px] block">ESTIMATED DISPATCH</span>
            <span className="text-white font-medium">Within 24 Hours (Express)</span>
            <p className="text-[11px] text-noir-500 mt-0.5">Estimated delivery in 2-4 business days.</p>
          </div>
        </div>

        <div className="flex items-start space-x-3">
          <MapPin className="w-4 h-4 text-noir-300 shrink-0 mt-0.5" />
          <div>
            <span className="text-noir-400 uppercase text-[10px] block">DESTINATION</span>
            <span className="text-white font-medium">
              {data.shippingInfo.address}, {data.shippingInfo.city}
            </span>
            <p className="text-[11px] text-noir-500 mt-0.5">
              {data.shippingInfo.country} ({data.shippingInfo.postalCode})
            </p>
          </div>
        </div>
      </div>

      {/* Purchased Items Itemized List */}
      <div className="py-6 border-b border-white/[0.08]">
        <h4 className="text-[10px] font-mono tracking-widest text-noir-400 uppercase mb-4">
          ACQUIRED ITEMS ({data.items.length})
        </h4>

        <div className="space-y-3">
          {data.items.map((item) => (
            <div key={item.id} className="flex items-center justify-between text-xs font-mono">
              <div className="flex items-center space-x-3">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-10 h-12 object-cover bg-noir-950 border border-white/10 shrink-0"
                />
                <div>
                  <span className="text-white font-sans font-medium block">{item.name}</span>
                  <span className="text-noir-400 text-[11px]">
                    {item.color} / SIZE {item.size} • QTY {item.quantity}
                  </span>
                </div>
              </div>
              <span className="text-white font-semibold">${item.price * item.quantity} USD</span>
            </div>
          ))}
        </div>

        {/* Pricing Totals */}
        <div className="mt-6 pt-4 border-t border-white/[0.06] space-y-1.5 text-xs font-mono">
          <div className="flex justify-between text-noir-400">
            <span>SUBTOTAL</span>
            <span className="text-white">${data.subtotal} USD</span>
          </div>
          {data.discount > 0 && (
            <div className="flex justify-between text-emerald-400">
              <span>DISCOUNT APPLIED</span>
              <span>-${data.discount} USD</span>
            </div>
          )}
          <div className="flex justify-between text-noir-400">
            <span>DELIVERY METHOD</span>
            <span className="text-white">
              {data.shipping === 0 ? 'COMPLIMENTARY' : `$${data.shipping} USD`}
            </span>
          </div>
          <div className="flex justify-between text-sm font-bold text-white pt-2 border-t border-white/10">
            <span className="font-display">TOTAL PAID (SIMULATED)</span>
            <span>${data.total} USD</span>
          </div>
        </div>
      </div>

      {/* Demo Notice Banner */}
      <div className="my-6 p-3.5 bg-noir-950 border border-white/10 rounded-xs flex items-center space-x-3 text-xs text-noir-400">
        <ShieldCheck className="w-5 h-5 text-luxe-gold shrink-0" />
        <p className="text-[11px] leading-relaxed">
          <strong className="text-white">Demonstration Completed:</strong> No actual financial charge occurred and no customer data was transmitted. Fictional tracking details sent to <strong>{data.shippingInfo.email}</strong>.
        </p>
      </div>

      {/* Continue Shopping Button */}
      <button
        onClick={onContinueShopping}
        className="w-full py-4 bg-white text-noir-950 font-sans text-xs font-bold tracking-widest uppercase hover:bg-luxe-smoke transition-all duration-300 flex items-center justify-center space-x-2 shadow-xl"
      >
        <span>RETURN TO COLLECTION</span>
        <ArrowRight className="w-4 h-4" />
      </button>
    </div>
  );
};
