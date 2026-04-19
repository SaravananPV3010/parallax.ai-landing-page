import React from 'react';
import { motion } from 'framer-motion';

export default function Signal({ vortexImage }) {
  return (
    <section className="relative h-[55vh] overflow-hidden border-y border-foreground/10">
      {/* Full-bleed vortex image */}
      <img
        src={vortexImage}
        alt="Infinite signal"
        className="absolute inset-0 w-full h-full object-cover object-center"
      />
      {/* Dark overlay with gradient fade top & bottom */}
      <div className="absolute inset-0 bg-background/50" />
      <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background" />
      <div className="absolute inset-0 bg-gradient-to-r from-background/60 via-transparent to-background/60" />

      {/* Centered editorial stamp */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.5 }}
          transition={{ duration: 1 }}
        >
          <div className="font-mono text-[10px] tracking-[0.4em] text-muted-foreground uppercase mb-5">
            The open model collective
          </div>
          <p className="font-serif italic text-5xl md:text-7xl text-foreground/85 leading-[0.95] tracking-tight">
            Every signal.<br />One source.
          </p>
          <div className="mt-6 h-px w-24 bg-coral/60 mx-auto" />
        </motion.div>
      </div>

      {/* Corner annotations */}
      <div className="absolute bottom-5 left-6 font-mono text-[10px] tracking-widest text-foreground/30 uppercase">
        §&nbsp;04&nbsp;/ Between worlds
      </div>
      <div className="absolute bottom-5 right-6 font-mono text-[10px] tracking-widest text-foreground/30 uppercase">
        Parallax.ai — 2026
      </div>
    </section>
  );
}