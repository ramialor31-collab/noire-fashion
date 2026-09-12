import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, ChevronDown, ChevronUp, Check, Sparkles } from 'lucide-react';

export const Contact: React.FC = () => {
  const [vipEmail, setVipEmail] = useState('');
  const [vipSuccess, setVipSuccess] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const handleVipSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!vipEmail.trim()) return;
    setVipSuccess(true);
    setTimeout(() => {
      setVipEmail('');
    }, 4000);
  };

  const faqs = [
    {
      q: 'WHERE ARE NOIRÉ GARMENTS PRODUCED?',
      a: 'NOIRÉ garments are manufactured with partner production facilities in Portugal, Italy, and Japan using custom-milled textiles and bespoke hardware.',
    },
    {
      q: 'HOW DOES NOIRÉ SIZING FIT?',
      a: 'Garments feature an intentional relaxed, dropped-shoulder cut. Order your standard size for an oversized fit, or size down for a closer fit.',
    },
    {
      q: 'WHAT ARE THE SHIPPING OPTIONS?',
      a: 'We provide complimentary DHL Express shipping on orders over $300 USD. All orders are dispatched within 24 hours with full tracking.',
    },
    {
      q: 'WHAT IS YOUR RETURN POLICY?',
      a: 'We offer a 14-day return window on all unworn items with original tags intact. Pre-paid return labels are included with every shipment.',
    },
  ];

  return (
    <section id="contact" className="relative w-full bg-noir-950 py-20 md:py-32 border-t border-white/[0.06]">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Section Header Meta */}
        <div className="flex items-center space-x-3 mb-8">
          <span className="text-[10px] tracking-widest text-noir-400 font-mono uppercase">
            CLIENT SERVICES
          </span>
          <span className="w-8 h-[1px] bg-noir-800" />
        </div>

        {/* Minimal Large Closing Statement */}
        <div className="mb-16 md:mb-24">
          <motion.h2 
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="font-display text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-extrabold tracking-[-0.06em] text-white leading-[0.88]"
          >
            SEE YOU <br />
            <span className="font-editorial italic font-normal text-noir-200">AFTER DARK.</span>
          </motion.h2>
        </div>

        {/* Minimal Grid: VIP Pass & Clean Concierge Info */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 mb-20 items-start">
          
          {/* Left: VIP Private Release Access */}
          <div className="lg:col-span-6 space-y-6">
            <div className="p-6 sm:p-8 bg-noir-900 border border-white/10 rounded-xs">
              <div className="flex items-center space-x-2 text-luxe-gold text-xs font-mono mb-2">
                <Sparkles className="w-3.5 h-3.5" />
                <span>NEWSLETTER & RELEASES</span>
              </div>

              <h3 className="font-display text-2xl font-bold text-white">
                RELEASE NOTIFICATIONS
              </h3>

              <p className="text-xs text-noir-300 font-light mt-2 leading-relaxed">
                Subscribe for early access to seasonal collections, private restocks, and release announcements.
              </p>

              {vipSuccess ? (
                <div className="mt-6 p-4 bg-emerald-950/40 border border-emerald-500/30 text-emerald-300 text-xs font-mono flex items-center space-x-2">
                  <Check className="w-4 h-4" />
                  <span>ACCESS CONFIRMED. WELCOME TO NOIRÉ.</span>
                </div>
              ) : (
                <form onSubmit={handleVipSubmit} className="mt-6 flex flex-col sm:flex-row gap-2">
                  <input
                    type="email"
                    required
                    value={vipEmail}
                    onChange={(e) => setVipEmail(e.target.value)}
                    placeholder="Enter email address..."
                    className="flex-1 bg-noir-950 border border-white/15 px-4 py-3 text-xs text-white placeholder:text-noir-500 focus:outline-none focus:border-white/40 font-mono"
                  />
                  <button
                    type="submit"
                    className="px-6 py-3 bg-white text-noir-950 text-xs font-bold font-sans tracking-widest uppercase hover:bg-luxe-smoke transition-colors whitespace-nowrap"
                  >
                    SUBSCRIBE
                  </button>
                </form>
              )}
            </div>

            {/* Direct Channels */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono text-noir-300">
              <div className="p-4 bg-noir-900/60 border border-white/[0.06] rounded-xs">
                <div className="flex items-center space-x-2 text-noir-500 text-[10px] uppercase mb-1">
                  <Mail className="w-3.5 h-3.5" />
                  <span>CLIENT SERVICES</span>
                </div>
                <a href="mailto:client@noire-studio.com" className="text-white hover:underline block text-xs">
                  client@noire-studio.com
                </a>
              </div>

              <div className="p-4 bg-noir-900/60 border border-white/[0.06] rounded-xs">
                <div className="flex items-center space-x-2 text-noir-500 text-[10px] uppercase mb-1">
                  <svg className="w-3.5 h-3.5 fill-none stroke-current stroke-2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
                    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
                  </svg>
                  <span>EDITORIAL</span>
                </div>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-white hover:underline block text-xs">
                  @noire.studio
                </a>
              </div>
            </div>
          </div>

          {/* Right: Minimal FAQ Accordion */}
          <div className="lg:col-span-6 space-y-6">
            <span className="text-xs font-mono tracking-widest text-noir-400 uppercase block">
              FREQUENTLY ASKED QUESTIONS
            </span>

            <div className="divide-y divide-white/[0.08] border-y border-white/[0.08]">
              {faqs.map((faq, idx) => {
                const isOpen = openFaq === idx;
                return (
                  <div key={idx} className="py-4">
                    <button
                      onClick={() => setOpenFaq(isOpen ? null : idx)}
                      className="w-full flex items-center justify-between text-left group"
                    >
                      <span className="font-display font-semibold text-sm sm:text-base text-white group-hover:text-luxe-smoke transition-colors">
                        {faq.q}
                      </span>
                      {isOpen ? (
                        <ChevronUp className="w-4 h-4 text-white shrink-0 ml-4" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-noir-400 group-hover:text-white shrink-0 ml-4" />
                      )}
                    </button>

                    {isOpen && (
                      <motion.p
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        className="mt-3 text-xs sm:text-sm text-noir-300 font-light leading-relaxed pr-6"
                      >
                        {faq.a}
                      </motion.p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
