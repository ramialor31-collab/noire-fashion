import { useState, useEffect, memo } from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { SoundToggle } from './SoundToggle';

interface HeroProps {
  onExploreCollection: () => void;
  onExploreShop: () => void;
}

const ClockDisplay = memo(() => {
  const [times, setTimes] = useState({ tokyo: '', paris: '' });

  useEffect(() => {
    const updateClocks = () => {
      const now = new Date();
      setTimes({
        tokyo: now.toLocaleTimeString('en-US', { timeZone: 'Asia/Tokyo', hour12: false, hour: '2-digit', minute: '2-digit' }),
        paris: now.toLocaleTimeString('en-US', { timeZone: 'Europe/Paris', hour12: false, hour: '2-digit', minute: '2-digit' }),
      });
    };
    updateClocks();
    const interval = setInterval(updateClocks, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="hidden sm:flex items-center space-x-6 font-mono text-[10px] sm:text-[11px] text-noir-400">
      <span>PARIS {times.paris}</span>
      <span className="text-noir-600">/</span>
      <span>TOKYO {times.tokyo}</span>
    </div>
  );
});
ClockDisplay.displayName = 'ClockDisplay';

export const Hero = memo<HeroProps>(({ onExploreCollection, onExploreShop }) => {
  return (
    <section id="hero" className="relative w-full min-h-[92vh] sm:min-h-screen flex flex-col justify-between overflow-hidden bg-noir-950 pt-24 md:pt-28 pb-8 md:pb-12">
      {/* Background Photography with Pure CSS Gradients (Zero Scroll Thread Overhead) */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <img
          src="https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&q=80&w=1920"
          srcSet="
            https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&q=80&w=900 900w,
            https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&q=80&w=1400 1400w,
            https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&q=80&w=1920 1920w
          "
          sizes="100vw"
          alt="NOIRÉ Autumn-Winter Campaign"
          className="w-full h-full object-cover object-center filter grayscale contrast-[1.15] brightness-[0.45]"
          fetchPriority="high"
          decoding="async"
        />
        {/* Soft Vignettes & Atmospheric Lighting */}
        <div className="absolute inset-0 bg-gradient-to-t from-noir-950 via-noir-950/30 to-noir-950/70" />
        <div className="absolute inset-0 bg-gradient-to-r from-noir-950/80 via-transparent to-noir-950/70" />
      </div>

      {/* Top Banner Meta */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 md:px-12 w-full flex items-center justify-between text-xs tracking-widest text-noir-400">
        <div className="flex items-center space-x-3">
          <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
          <span className="font-mono text-[10px] sm:text-[11px] uppercase tracking-widest text-noir-300">
            CAMPAIGN 01 // AUTUMN-WINTER 2026
          </span>
        </div>
        <ClockDisplay />
      </div>

      {/* Main Center Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 md:px-12 w-full py-8 sm:py-12 md:py-16 flex flex-col items-start justify-center my-auto">
        
        {/* Sub-label badge */}
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full border border-white/10 bg-white/[0.03] backdrop-blur-md mb-4 sm:mb-6 animate-fade-in">
          <Sparkles className="w-3.5 h-3.5 text-luxe-gold" />
          <span className="text-[10px] font-mono tracking-widest uppercase text-noir-200">
            AUTUMN-WINTER 2026 // COLLECTION 01
          </span>
        </div>

        {/* Oversized Brand Typography */}
        <div className="w-full animate-fade-in">
          <h1 className="font-display font-extrabold text-5xl sm:text-7xl md:text-8xl lg:text-[8.5rem] xl:text-[9.5rem] tracking-[-0.07em] leading-[0.85] text-white select-none">
            NOIRÉ
          </h1>
        </div>

        {/* Core Message Headline */}
        <div className="mt-4 sm:mt-6 max-w-2xl animate-fade-in">
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight text-noir-100 leading-tight">
            BUILT FOR THE <br />
            <span className="font-editorial italic font-normal text-white">AFTER HOURS.</span>
          </h2>
          
          <p className="mt-3 sm:mt-4 text-xs sm:text-sm md:text-base text-noir-300 font-light max-w-md leading-relaxed">
            Contemporary luxury streetwear cut from heavyweight custom textiles and architectural silhouettes.
          </p>
        </div>

        {/* Action CTAs */}
        <div className="mt-6 sm:mt-8 md:mt-10 w-full sm:w-auto flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-5 animate-fade-in">
          <button
            onClick={onExploreCollection}
            className="w-full sm:w-auto justify-center group relative inline-flex items-center space-x-3 px-6 sm:px-8 py-3.5 sm:py-4 min-h-[44px] bg-white text-noir-950 font-sans text-xs font-bold tracking-widest uppercase transition-all duration-300 hover:bg-luxe-smoke hover:shadow-[0_0_25px_rgba(255,255,255,0.25)] focus:outline-none"
          >
            <span>EXPLORE COLLECTION</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
          </button>

          <button
            onClick={onExploreShop}
            className="w-full sm:w-auto justify-center inline-flex items-center space-x-3 px-6 sm:px-8 py-3.5 sm:py-4 min-h-[44px] border border-white/20 bg-noir-950/40 backdrop-blur-md text-white font-sans text-xs font-bold tracking-widest uppercase transition-all duration-300 hover:border-white/60 hover:bg-white/[0.06] focus:outline-none"
          >
            <span>BROWSE CATALOG</span>
          </button>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 md:px-12 w-full flex items-center justify-between">
        {/* Left: Soundscape Toggle */}
        <SoundToggle />

        {/* Center: Scroll Indicator */}
        <button
          onClick={onExploreCollection}
          className="hidden sm:flex flex-col items-center text-noir-400 hover:text-white transition-colors cursor-pointer group"
          aria-label="Scroll to collection"
        >
          <span className="text-[9px] font-mono tracking-widest uppercase mb-2 group-hover:text-white">
            SCROLL TO EXPLORE
          </span>
          <div className="w-[1px] h-8 bg-noir-700 relative overflow-hidden">
            <div className="w-full h-3 bg-white animate-pulse" />
          </div>
        </button>

        {/* Right: Edition Meta */}
        <div className="text-right font-mono text-[10px] text-noir-400 tracking-wider">
          <span className="block text-noir-300">LIMITED RUN</span>
          <span className="text-noir-500">PARIS • TOKYO // 2026</span>
        </div>
      </div>
    </section>
  );
});

Hero.displayName = 'Hero';
