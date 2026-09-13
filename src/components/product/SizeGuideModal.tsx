import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import type { Product } from '../../types';

interface SizeGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  product?: Product | null;
}

export const SizeGuideModal: React.FC<SizeGuideModalProps> = ({ isOpen, onClose, product }) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-noir-950/80 backdrop-blur-md">
        <div className="absolute inset-0" onClick={onClose} />
        
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="relative w-full max-w-lg bg-noir-900 border border-white/10 p-6 md:p-8 rounded-sm shadow-2xl z-10"
        >
          <div className="flex items-center justify-between pb-4 border-b border-white/[0.08]">
            <div>
              <span className="font-display text-xl font-bold text-white block">SIZE & FIT GUIDE</span>
              {product && (
                <span className="text-xs font-mono text-noir-400 mt-0.5 block">{product.name}</span>
              )}
            </div>
            <button 
              onClick={onClose} 
              className="text-noir-400 hover:text-white transition-colors p-1"
              aria-label="Close size guide"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Garment-Specific Fit Note if available */}
          {product?.details?.fit && (
            <div className="mt-4 p-3.5 bg-noir-950 border border-white/10 rounded-xs">
              <span className="text-[10px] font-mono text-noir-400 uppercase tracking-widest block mb-1">
                GARMENT FIT PROFILE
              </span>
              <p className="text-xs text-white font-light leading-relaxed">{product.details.fit}</p>
            </div>
          )}

          {/* Sizing Recommendations */}
          <div className="my-4 space-y-2 text-xs text-noir-300 font-light leading-relaxed">
            <p>
              <strong className="text-white font-medium">Signature Silhouette:</strong> NOIRÉ tops and outerwear feature intentional dropped shoulders and a relaxed body drape. Order your standard size for the intended aesthetic.
            </p>
            <p>
              <strong className="text-white font-medium">Closer Fit:</strong> If you prefer a traditional, closer-to-body fit through the shoulders and chest, select one size down.
            </p>
          </div>

          {/* Standard International Size Reference */}
          <div className="border border-white/10 rounded-xs overflow-hidden">
            <table className="w-full text-xs font-mono text-left border-collapse">
              <thead>
                <tr className="bg-noir-950 border-b border-white/10 text-noir-400 uppercase text-[10px]">
                  <th className="py-2.5 px-3">SIZE</th>
                  <th className="py-2.5 px-3">US / UK</th>
                  <th className="py-2.5 px-3">EU</th>
                  <th className="py-2.5 px-3">RECOMMENDED FIT</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.04] text-noir-200">
                <tr>
                  <td className="py-2.5 px-3 font-bold text-white">XS</td>
                  <td className="py-2.5 px-3">34</td>
                  <td className="py-2.5 px-3">44</td>
                  <td className="py-2.5 px-3 text-noir-400">Relaxed Fit</td>
                </tr>
                <tr>
                  <td className="py-2.5 px-3 font-bold text-white">S</td>
                  <td className="py-2.5 px-3">36</td>
                  <td className="py-2.5 px-3">46</td>
                  <td className="py-2.5 px-3 text-noir-400">Relaxed Fit</td>
                </tr>
                <tr>
                  <td className="py-2.5 px-3 font-bold text-white">M</td>
                  <td className="py-2.5 px-3">38</td>
                  <td className="py-2.5 px-3">48</td>
                  <td className="py-2.5 px-3 text-noir-400">Relaxed Fit</td>
                </tr>
                <tr>
                  <td className="py-2.5 px-3 font-bold text-white">L</td>
                  <td className="py-2.5 px-3">40</td>
                  <td className="py-2.5 px-3">50</td>
                  <td className="py-2.5 px-3 text-noir-400">Relaxed Fit</td>
                </tr>
                <tr>
                  <td className="py-2.5 px-3 font-bold text-white">XL</td>
                  <td className="py-2.5 px-3">42</td>
                  <td className="py-2.5 px-3">52</td>
                  <td className="py-2.5 px-3 text-noir-400">Relaxed Fit</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="mt-6 pt-4 border-t border-white/[0.08] flex justify-end">
            <button
              onClick={onClose}
              className="px-6 py-2.5 min-h-[44px] bg-white text-noir-950 text-xs font-bold font-sans tracking-widest uppercase hover:bg-luxe-smoke transition-colors active:scale-95"
            >
              CLOSE
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
