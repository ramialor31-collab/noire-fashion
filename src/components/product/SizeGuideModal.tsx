import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

interface SizeGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SizeGuideModal: React.FC<SizeGuideModalProps> = ({ isOpen, onClose }) => {
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
            <span className="font-display text-xl font-bold text-white">SIZE GUIDE</span>
            <button onClick={onClose} className="text-noir-400 hover:text-white transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>

          <p className="text-xs text-noir-300 my-4 font-light leading-relaxed">
            All NOIRÉ garments are designed with a relaxed, dropped-shoulder silhouette. Take your standard size for an oversized fit, or one size down for a closer fit.
          </p>

          <div className="overflow-x-auto">
            <table className="w-full text-xs font-mono text-left border-collapse">
              <thead>
                <tr className="border-b border-white/10 text-noir-400 uppercase text-[10px]">
                  <th className="py-2.5">SIZE</th>
                  <th className="py-2.5">CHEST (CM)</th>
                  <th className="py-2.5">LENGTH (CM)</th>
                  <th className="py-2.5">SHOULDER (CM)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.04] text-noir-200">
                <tr>
                  <td className="py-2.5 font-bold text-white">XS</td>
                  <td className="py-2.5">112</td>
                  <td className="py-2.5">68</td>
                  <td className="py-2.5">54</td>
                </tr>
                <tr>
                  <td className="py-2.5 font-bold text-white">S</td>
                  <td className="py-2.5">118</td>
                  <td className="py-2.5">70</td>
                  <td className="py-2.5">56</td>
                </tr>
                <tr>
                  <td className="py-2.5 font-bold text-white">M</td>
                  <td className="py-2.5">124</td>
                  <td className="py-2.5">72</td>
                  <td className="py-2.5">58</td>
                </tr>
                <tr>
                  <td className="py-2.5 font-bold text-white">L</td>
                  <td className="py-2.5">130</td>
                  <td className="py-2.5">74</td>
                  <td className="py-2.5">60</td>
                </tr>
                <tr>
                  <td className="py-2.5 font-bold text-white">XL</td>
                  <td className="py-2.5">136</td>
                  <td className="py-2.5">76</td>
                  <td className="py-2.5">62</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="mt-6 pt-4 border-t border-white/[0.08] flex justify-end">
            <button
              onClick={onClose}
              className="px-6 py-2 bg-white text-noir-950 text-xs font-bold font-sans tracking-widest uppercase hover:bg-luxe-smoke"
            >
              CLOSE
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
