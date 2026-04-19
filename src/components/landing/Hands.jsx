import React from 'react';
import { motion } from 'framer-motion';

const FEATURES = [
  {
    code: 'OpenAI SDK',
    desc: 'Drop-in compatible. Zero migration cost.',
  },
  {
    code: 'REST / Streaming',
    desc: 'Server-sent events, function calling, vision.',
  },
  {
    code: 'Any Language',
    desc: 'Python, TypeScript, cURL — if OpenAI works, we work.',
  },
];

export default function Hands({ handsImage }) {
  return (
    <section className="relative py-32 px-6 md:px-10 overflow-hidden border-t border-foreground/10">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-12 gap-12 items-center">
          {/* Left — copy */}
          <div className="md:col-span-5 order-2 md:order-1">
            <div className="mb-6 reveal">
              <span className="flex items-center gap-3 text-[10px] font-mono tracking-[0.3em] text-muted-foreground uppercase before:content-[''] before:block before:w-8 before:h-px before:bg-coral">
                § 05 — Integration
              </span>
            </div>
            <h2 className="font-serif text-5xl md:text-6xl leading-[0.95] tracking-tight text-balance mb-8">
              Human intent.<br />
              <span className="italic text-coral">Model output.</span><br />
              One touchpoint.
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-10 max-w-sm">
              The API is the bridge. Built on the same spec your team already knows —
              so you can switch models without switching workflows.
            </p>

            <div className="space-y-0 divide-y divide-foreground/10 border-t border-foreground/10">
              {FEATURES.map((f, i) => (
                <div key={i} className="py-4 grid grid-cols-[140px_1fr] gap-4 items-start group">
                  <span className="font-mono text-[11px] tracking-widest text-coral/80 uppercase group-hover:text-coral transition-colors">
                    {f.code}
                  </span>
                  <span className="text-sm text-muted-foreground leading-relaxed">{f.desc}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right — hands image */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.5 }}
            transition={{ duration: 1.1 }}
            className="md:col-span-6 md:col-start-7 order-1 md:order-2 relative"
          >
            <div className="relative overflow-hidden rounded-sm border border-foreground/10 group" style={{ aspectRatio: '3/4' }}>
              <img
                src={handsImage}
                alt="Wireframe hand reaching from screen toward human hand"
                className="w-full h-full object-cover object-center group-hover:scale-[1.03] transition-transform duration-[2s]"
              />
              {/* Gradient fades */}
              <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-background/30" />
              <div className="absolute inset-0 bg-gradient-to-l from-transparent to-background/30" />
            </div>

            {/* Float annotation */}
            <div className="absolute -bottom-4 -right-0 md:-right-6 bg-card border border-foreground/15 rounded-sm px-4 py-3 backdrop-blur-sm">
              <div className="font-mono text-[10px] tracking-widest text-muted-foreground uppercase mb-1">
                FIG. 05
              </div>
              <div className="font-serif italic text-sm text-foreground/80">
                Human ↔ Model<br />interface
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}