import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function Vision({ visionImage }) {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const imgScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.05, 1, 1.05]);

  return (
    <section ref={containerRef} className="relative py-0 overflow-hidden border-y border-foreground/10">
      <div className="grid md:grid-cols-2 min-h-[560px]">
        {/* Left — image */}
        <div
          className="relative overflow-hidden bg-muted/20"
          style={{ minHeight: '420px' }}
        >
          <motion.img
            style={{ scale: imgScale }}
            src={visionImage}
            alt="Browsing the multiverse of AI"
            className="absolute inset-0 w-full h-full object-cover object-center opacity-90"
          />

          <div className="absolute inset-0 bg-gradient-to-r from-transparent to-background" />
          <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-background/20" />

          {/* Caption overlay */}
          <div className="absolute bottom-6 left-6 font-mono text-[10px] tracking-widest text-foreground/40 uppercase">
            Fig. 02b — The model gallery
          </div>
        </div>

        {/* Right — editorial pull-quote */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.5 }}
          transition={{ duration: 0.9, delay: 0.2 }}
          className="flex flex-col justify-center px-10 md:px-16 py-16 bg-card/30"
        >
          <div className="flex items-center gap-3 mb-8">
            <div className="h-px w-8 bg-coral" />
            <span className="text-[10px] font-mono tracking-[0.3em] text-muted-foreground uppercase">Vision</span>
          </div>

          <blockquote className="font-serif text-4xl md:text-5xl italic leading-[1.1] tracking-tight text-balance text-foreground/90 mb-8">
            "Open AI shouldn't mean choosing one model and staying loyal to it forever."
          </blockquote>

          <p className="text-muted-foreground leading-relaxed max-w-md mb-10">
            We believe every model has a use case where it shines. Parallax exists so that
            curious builders, researchers and writers can discover that use case — without the
            guesswork, without the vendor contracts.
          </p>

          <div className="flex flex-col gap-3">
            {[
              ['47', 'open-source models indexed'],
              ['2.4M', 'battles fought this month'],
              ['∞', 'prompts, zero subscriptions'],
            ].map(([val, label]) => (
              <div key={label} className="flex items-baseline gap-4">
                <span className="font-serif text-3xl text-coral/90">{val}</span>
                <span className="font-mono text-[11px] text-muted-foreground tracking-widest uppercase">{label}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
