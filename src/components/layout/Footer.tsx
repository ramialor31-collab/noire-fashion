import React from 'react';
import { ArrowUp } from 'lucide-react';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative w-full bg-noir-950 border-t border-white/10 pt-16 pb-12 overflow-hidden text-noir-400">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-16">
          
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <span className="font-display font-extrabold text-3xl tracking-tight text-white block">
              NOIRÉ
            </span>
            <p className="text-xs text-noir-400 max-w-sm font-light leading-relaxed">
              BUILT FOR THE AFTER HOURS. Contemporary luxury streetwear designed for those who move differently. Architectural drape, heavyweight textiles, and nocturnal presence.
            </p>
            <div className="flex items-center space-x-2 text-[10px] font-mono text-noir-500 uppercase">
              <span>PARIS</span>
              <span>•</span>
              <span>TOKYO</span>
              <span>•</span>
              <span>NEW YORK</span>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="space-y-3 text-xs font-mono">
            <span className="text-white uppercase tracking-widest font-semibold block mb-2">
              EXPERIENCE
            </span>
            <div>
              <button onClick={() => onNavigate('hero')} className="hover:text-white transition-colors">
                CAMPAIGN
              </button>
            </div>
            <div>
              <button onClick={() => onNavigate('collection')} className="hover:text-white transition-colors">
                COLLECTION 01
              </button>
            </div>
            <div>
              <button onClick={() => onNavigate('shop')} className="hover:text-white transition-colors">
                SHOP ALL
              </button>
            </div>
            <div>
              <button onClick={() => onNavigate('story')} className="hover:text-white transition-colors">
                BRAND MANIFESTO
              </button>
            </div>
          </div>

          {/* Client Concierge */}
          <div className="space-y-3 text-xs font-mono">
            <span className="text-white uppercase tracking-widest font-semibold block mb-2">
              CLIENT SERVICES
            </span>
            <div>
              <button onClick={() => onNavigate('contact')} className="hover:text-white transition-colors">
                CONCIERGE
              </button>
            </div>
            <div>
              <button onClick={() => onNavigate('contact')} className="hover:text-white transition-colors">
                PRIVATE VIP DROP
              </button>
            </div>
            <div>
              <button onClick={() => onNavigate('contact')} className="hover:text-white transition-colors">
                SHIPPING & RETURNS
              </button>
            </div>
            <div>
              <button onClick={() => onNavigate('contact')} className="hover:text-white transition-colors">
                AUTHENTICITY
              </button>
            </div>
          </div>

          {/* Legal & Disclaimer */}
          <div className="space-y-3 text-xs font-mono">
            <span className="text-white uppercase tracking-widest font-semibold block mb-2">
              PORTFOLIO NOTICE
            </span>
            <p className="text-[11px] text-noir-500 leading-relaxed font-light">
              NOIRÉ is a creative portfolio demonstration showcasing high-end digital fashion commerce and experience design.
            </p>
            <div className="pt-2">
              <button
                onClick={scrollToTop}
                className="inline-flex items-center space-x-2 text-xs text-noir-300 hover:text-white transition-colors border border-white/10 px-3 py-1.5"
              >
                <span>BACK TO TOP</span>
                <ArrowUp className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

        </div>

        {/* Massive Watermark Signature */}
        <div className="border-t border-white/[0.06] pt-12 pb-6 overflow-hidden">
          <span className="font-display font-extrabold text-7xl sm:text-9xl lg:text-[14rem] tracking-[-0.07em] leading-none text-white/[0.03] select-none block text-center whitespace-nowrap">
            NOIRÉ ATELIER
          </span>
        </div>

        {/* Bottom Line */}
        <div className="border-t border-white/[0.06] pt-6 flex flex-col sm:flex-row items-center justify-between text-[11px] font-mono text-noir-500 gap-4">
          <p>© {new Date().getFullYear()} NOIRÉ. ALL RIGHTS RESERVED. FICTIONAL PORTFOLIO SHOWCASE.</p>
          <div className="flex items-center space-x-6">
            <span className="hover:text-noir-300 cursor-pointer">PRIVACY POLICY</span>
            <span className="hover:text-noir-300 cursor-pointer">TERMS OF ATELIER</span>
            <span className="hover:text-noir-300 cursor-pointer">COOKIE PREFERENCES</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
