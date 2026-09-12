import React from 'react';
import { motion } from 'framer-motion';

export const Story: React.FC = () => {
  return (
    <section id="story" className="relative w-full bg-noir-950 py-24 md:py-36 border-t border-white/[0.06] overflow-hidden">
      
      {/* Background Soft Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-noir-850/30 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Header Meta */}
        <div className="flex items-center space-x-3 mb-10">
          <span className="text-[10px] tracking-widest text-noir-400 font-mono uppercase">
            BRAND MANIFESTO
          </span>
          <span className="w-8 h-[1px] bg-noir-800" />
        </div>

        {/* 1. Oversized Statement One: "WEAR THE NIGHT." */}
        <div className="mb-16 md:mb-24 max-w-5xl">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="font-display text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-extrabold tracking-[-0.06em] text-white leading-[0.88]"
          >
            WEAR THE <br />
            <span className="font-editorial italic font-normal text-noir-200">NIGHT.</span>
          </motion.h2>

          <p className="mt-8 text-base sm:text-xl md:text-2xl text-noir-200 font-light max-w-2xl leading-relaxed">
            “NOIRÉ was created around a single conviction: clothing should feel as deliberate as the person wearing it.”
          </p>
        </div>

      </div>

      {/* 2. Full-Width Panoramic Visual Break */}
      <div className="relative w-full aspect-[21/9] sm:aspect-[2.4/1] my-16 md:my-24 overflow-hidden border-y border-white/10 bg-noir-900 group">
        <img
          src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=85&w=2400"
          alt="NOIRÉ Studio Atmosphere"
          className="w-full h-full object-cover object-center filter grayscale contrast-125 brightness-75 transition-transform duration-1000 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-noir-950 via-transparent to-noir-950" />
        <div className="absolute inset-0 bg-grain" />

        {/* Panoramic Text Overlay */}
        <div className="absolute bottom-6 left-6 md:left-12 max-w-lg">
          <span className="text-[10px] font-mono tracking-widest text-noir-400 uppercase block">
            NOIRÉ STUDIO // DESIGN PROCESS
          </span>
          <p className="font-display text-lg sm:text-xl font-bold text-white mt-1">
            Where architectural cuts meet functional daily movement.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* 3. Oversized Statement Two: "MADE FOR MOVEMENT." */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start my-16 md:my-28">
          <div className="lg:col-span-7">
            <motion.h3
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="font-display text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-[-0.05em] text-white leading-tight"
            >
              MADE FOR <br />
              <span className="font-editorial italic font-normal text-noir-200">MOVEMENT.</span>
            </motion.h3>
          </div>

          <div className="lg:col-span-5 space-y-4 pt-2">
            <p className="text-xs sm:text-sm md:text-base text-noir-300 font-light leading-relaxed">
              We design garments for movement and daily transition. Dropped shoulders allow unrestricted reach; articulated knee pleats provide natural stride volume without tension.
            </p>
            <p className="text-xs sm:text-sm text-noir-400 font-light leading-relaxed font-mono">
              Constructed with reinforced seams, dense custom weaves, and balanced proportions.
            </p>
          </div>
        </div>

        {/* 4. Oversized Statement Three: "LESS NOISE. MORE PRESENCE." */}
        <div className="pt-16 border-t border-white/[0.08] grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          
          <div className="space-y-3">
            <span className="text-xs font-mono text-noir-500 block">01 // DISCIPLINE</span>
            <h4 className="font-display text-2xl sm:text-3xl font-bold text-white tracking-tight">
              ZERO NOISE.
            </h4>
            <p className="text-xs text-noir-400 font-light leading-relaxed">
              No gratuitous branding or decorative typography. Clean silhouettes speak through drape, stitch density, and textural weight.
            </p>
          </div>

          <div className="space-y-3">
            <span className="text-xs font-mono text-noir-500 block">02 // SUBSTANCE</span>
            <h4 className="font-display text-2xl sm:text-3xl font-bold text-white tracking-tight">
              HEAVYWEIGHT TEXTILES.
            </h4>
            <p className="text-xs text-noir-400 font-light leading-relaxed">
              Custom 480–520GSM Portuguese terry, Japanese micro-ripstop, and full-grain lambskin treated with natural beeswax.
            </p>
          </div>

          <div className="space-y-3">
            <span className="text-xs font-mono text-noir-500 block">03 // PERMANENCE</span>
            <h4 className="font-display text-2xl sm:text-3xl font-bold text-white tracking-tight">
              MORE PRESENCE.
            </h4>
            <p className="text-xs text-noir-400 font-light leading-relaxed">
              Constructed to soften and deepen with continuous wear, retaining shape season after season.
            </p>
          </div>

        </div>

      </div>
    </section>
  );
};
