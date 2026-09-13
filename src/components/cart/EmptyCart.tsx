import React from 'react';
import { ShoppingBag, ArrowRight } from 'lucide-react';
import { useCart } from '../../context/CartContext';

interface EmptyCartProps {
  onBrowse: () => void;
}

export const EmptyCart: React.FC<EmptyCartProps> = ({ onBrowse }) => {
  const { setIsCartOpen } = useCart();

  return (
    <div className="flex flex-col items-center justify-center py-20 px-6 text-center">
      <div className="w-16 h-16 rounded-full border border-white/10 bg-white/[0.03] flex items-center justify-center mb-6">
        <ShoppingBag className="w-7 h-7 text-noir-400" />
      </div>

      <h3 className="font-display text-2xl font-bold text-white">
        YOUR BAG IS EMPTY
      </h3>

      <p className="text-xs text-noir-400 max-w-xs mt-2 font-light leading-relaxed">
        Explore Collection 01 to discover heavyweight tees, sculpted hoodies, and tailored outerwear.
      </p>

      <button
        onClick={() => {
          setIsCartOpen(false);
          onBrowse();
        }}
        className="mt-8 inline-flex items-center space-x-3 px-8 py-3.5 min-h-[44px] bg-white text-noir-950 text-xs font-bold font-sans tracking-widest uppercase hover:bg-luxe-smoke transition-colors"
      >
        <span>EXPLORE COLLECTION</span>
        <ArrowRight className="w-3.5 h-3.5" />
      </button>
    </div>
  );
};
