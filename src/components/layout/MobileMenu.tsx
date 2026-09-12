import React from 'react';
import { motion } from 'framer-motion';
import { X, ArrowUpRight, Globe, ShoppingBag } from 'lucide-react';
import { useCart } from '../../context/CartContext';

interface MobileMenuProps {
  links: { id: string; label: string }[];
  activeSection: string;
  onNavigate: (sectionId: string) => void;
  onClose: () => void;
}

export const MobileMenu: React.FC<MobileMenuProps> = ({
  links,
  activeSection,
  onNavigate,
  onClose,
}) => {
  const { setIsCartOpen, itemCount } = useCart();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-50 bg-noir-950/98 backdrop-blur-3xl flex flex-col justify-between px-6 sm:px-10 py-8 lg:hidden"
    >
      {/* Top Header */}
      <div className="flex items-center justify-between border-b border-white/[0.08] pb-6">
        <div>
          <span className="font-display font-extrabold text-2xl tracking-tight text-white block">
            NOIRÉ
          </span>
          <span className="text-[9px] font-mono text-noir-400 uppercase tracking-widest">
            PARIS • TOKYO
          </span>
        </div>
        <button
          onClick={onClose}
          className="p-2.5 text-noir-400 hover:text-white bg-white/[0.04] border border-white/10 rounded-full transition-colors"
          aria-label="Close Navigation Menu"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Main Staggered Links */}
      <nav className="flex flex-col space-y-7 my-auto py-8">
        {links.map((link, idx) => {
          const isActive = activeSection === link.id;
          return (
            <motion.button
              key={link.id}
              initial={{ opacity: 0, x: -25 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.05 * idx, duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              onClick={() => onNavigate(link.id)}
              className="text-left group flex items-baseline justify-between py-1"
            >
              <div className="flex items-baseline space-x-3">
                <span className="text-xs font-mono text-noir-500">0{idx + 1}</span>
                <span
                  className={`font-display text-4xl sm:text-5xl font-extrabold tracking-tight transition-colors ${
                    isActive ? 'text-white' : 'text-noir-400 group-hover:text-white'
                  }`}
                >
                  {link.label}
                </span>
              </div>
              <span className="text-xs font-mono text-noir-500 uppercase tracking-widest group-hover:text-white transition-colors">
                EXPLORE →
              </span>
            </motion.button>
          );
        })}

        {/* Direct Bag Drawer Trigger */}
        <motion.button
          initial={{ opacity: 0, x: -25 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.25, duration: 0.35 }}
          onClick={() => {
            onClose();
            setIsCartOpen(true);
          }}
          className="text-left group pt-6 flex items-center justify-between border-t border-white/[0.08]"
        >
          <div className="flex items-center space-x-3">
            <ShoppingBag className="w-5 h-5 text-white" />
            <span className="font-display text-2xl font-bold text-white">
              SHOPPING BAG
            </span>
          </div>
          <span className="px-3 py-1 text-xs font-mono bg-white text-noir-950 font-bold rounded-full">
            {itemCount} {itemCount === 1 ? 'ITEM' : 'ITEMS'}
          </span>
        </motion.button>
      </nav>

      {/* Footer Details */}
      <div className="border-t border-white/[0.08] pt-6 flex flex-col sm:flex-row sm:items-center justify-between text-xs text-noir-400 gap-4">
        <div>
          <p className="tracking-widest uppercase text-noir-300 font-mono text-[11px]">DROP 24 // AUTUMN-WINTER</p>
          <p className="text-[10px] font-mono text-noir-500">ALL PIECES LIMITED RUN</p>
        </div>
        <div className="flex items-center space-x-6">
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-1 hover:text-white transition-colors text-[11px] font-mono"
          >
            <svg className="w-3.5 h-3.5 fill-none stroke-current stroke-2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
              <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
              <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
            </svg>
            <span>INSTAGRAM</span>
            <ArrowUpRight className="w-3 h-3 text-noir-500" />
          </a>
          <span className="flex items-center space-x-1 text-noir-400 text-[11px] font-mono">
            <Globe className="w-3.5 h-3.5" />
            <span>USD / EUR</span>
          </span>
        </div>
      </div>
    </motion.div>
  );
};
