import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ShoppingBag, Menu, X } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { MobileMenu } from './MobileMenu';

interface NavigationProps {
  activeSection: string;
  onNavigate: (sectionId: string) => void;
}

export const Navigation: React.FC<NavigationProps> = ({ activeSection, onNavigate }) => {
  const { itemCount, setIsCartOpen, setIsSearchOpen } = useCart();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { id: 'collection', label: 'COLLECTION' },
    { id: 'shop', label: 'SHOP' },
    { id: 'story', label: 'STORY' },
    { id: 'contact', label: 'CONTACT' },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ease-out ${
          isScrolled
            ? 'bg-noir-950/85 backdrop-blur-xl border-b border-white/[0.08] py-4'
            : 'bg-gradient-to-b from-noir-950/90 via-noir-950/40 to-transparent py-5 md:py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 flex items-center justify-between">
          
          {/* Left: Desktop Navigation Links with subtle hover lift and underline */}
          <nav className="hidden lg:flex items-center space-x-9 text-xs tracking-widest font-mono text-noir-400">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => onNavigate(link.id)}
                  className={`group relative py-1 transition-all duration-300 hover:text-white ${
                    isActive ? 'text-white font-medium' : ''
                  }`}
                >
                  <span className="inline-block transition-transform duration-300 group-hover:-translate-y-0.5">
                    {link.label}
                  </span>
                  {isActive && (
                    <motion.div
                      layoutId="activeNavIndicator"
                      className="absolute -bottom-1 left-0 right-0 h-[1px] bg-white"
                      transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                    />
                  )}
                  {!isActive && (
                    <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-white/40 transition-all duration-300 group-hover:w-full" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Center: Brand Identity with refined tracking and subtitle */}
          <button
            onClick={() => onNavigate('hero')}
            className="group flex flex-col items-center cursor-pointer text-left md:text-center focus:outline-none py-1"
            aria-label="NOIRÉ Home"
          >
            <span className="font-display font-extrabold text-2xl md:text-3xl tracking-[-0.05em] text-white transition-all duration-300 group-hover:opacity-90">
              NOIRÉ
            </span>
            <span className="text-[9px] tracking-[0.4em] text-noir-400 font-mono uppercase -mt-0.5 transition-colors group-hover:text-noir-300">
              PARIS • TOKYO
            </span>
          </button>

          {/* Right: Actions with minimum 44px touch targets */}
          <div className="flex items-center space-x-1 sm:space-x-4 md:space-x-8">
            {/* Search Trigger */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="group min-w-[44px] min-h-[44px] flex items-center justify-center space-x-2 text-xs tracking-widest font-mono text-noir-400 hover:text-white transition-colors duration-300 p-2"
              aria-label="Search Collection"
            >
              <Search className="w-4 h-4 text-noir-400 transition-transform duration-300 group-hover:scale-110 group-hover:text-white" />
              <span className="hidden sm:inline font-medium">SEARCH</span>
              <kbd className="hidden md:inline-block px-1.5 py-0.5 text-[9px] text-noir-400 bg-noir-900 border border-white/10 rounded font-mono">
                ⌘K
              </kbd>
            </button>

            {/* Bag Trigger with Live Counter */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="group relative min-w-[44px] min-h-[44px] flex items-center justify-center space-x-2 text-xs tracking-widest font-mono text-noir-300 hover:text-white transition-all duration-300 p-2"
              aria-label={`Shopping Bag with ${itemCount} items`}
            >
              <div className="relative">
                <ShoppingBag className="w-4 h-4 text-noir-300 transition-transform duration-300 group-hover:scale-110 group-hover:text-white" />
                {itemCount > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-1.5 -right-1.5 w-3.5 h-3.5 bg-white text-noir-950 text-[9px] font-bold rounded-full flex items-center justify-center shadow-lg"
                  >
                    {itemCount}
                  </motion.span>
                )}
              </div>
              <span className="hidden sm:inline font-medium">
                BAG {itemCount > 0 ? `(${itemCount})` : '(0)'}
              </span>
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden min-w-[44px] min-h-[44px] flex items-center justify-center p-2 text-noir-300 hover:text-white transition-colors"
              aria-label="Toggle Navigation Menu"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <MobileMenu
            links={navLinks}
            activeSection={activeSection}
            onNavigate={(id) => {
              setIsMobileMenuOpen(false);
              onNavigate(id);
            }}
            onClose={() => setIsMobileMenuOpen(false)}
          />
        )}
      </AnimatePresence>
    </>
  );
};
