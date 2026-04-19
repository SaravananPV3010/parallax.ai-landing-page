import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function Battle({ battleImage }) {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const imgY = useTransform(scrollYProgress, [0, 1], ["-5%", "5%"]);

  return (
    <section ref={containerRef} className="relative py-32 px-6 md:px-10 overflow-hidden">
      {/* Subtle ambient glow behind */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-teal/5 blur-[100px]" />
      </div>

      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
        {/* Left — image with overlaid annotation */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.5 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="relative overflow-hidden rounded-sm border border-foreground/10 group bg-muted/20"
        >
          <div className="aspect-[3/4] overflow-hidden">
            <motion.img
              style={{ y: imgY }}
              src={battleImage}
              alt="Battle Mode — anonymous glow"
              className="w-full h-[110%] object-cover object-top scale-105"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-transparent to-transparent" />
          </div>


          {/* Annotation pin */}
          <div className="absolute top-6 left-6 font-mono text-[10px] tracking-widest uppercase text-foreground/60 bg-background/40 backdrop-blur-sm px-3 py-1.5 rounded-full border border-foreground/10">
            PLATE — 03 / Battle
          </div>

          {/* Bottom annotation */}
          <div className="absolute bottom-6 left-6 right-6">
            <div className="h-px w-full bg-foreground/10 mb-4" />
            <p className="font-mono text-[10px] tracking-widest text-muted-foreground/70 uppercase">
              Identity concealed until vote is cast
            </p>
          </div>
        </motion.div>

        {/* Right — content */}
        <div>
          <div className="mb-6 reveal">
            <span className="flex items-center gap-3 text-[10px] font-mono tracking-[0.3em] text-muted-foreground uppercase before:content-[''] before:block before:w-8 before:h-px before:bg-coral">
              § 03 — Battle Mode
            </span>
          </div>

          <h2 className="font-serif text-5xl md:text-6xl leading-[0.95] tracking-tight mb-8 text-balance">
            The only benchmark
            <br />
            that <span className="italic text-coral">matters</span> —
            <br />
            <span className="italic">yours.</span>
          </h2>

          <p className="text-muted-foreground leading-relaxed mb-10 max-w-md">
            Traditional benchmarks like MMLU score models on trivia.
            Battle Mode scores them on <em className="text-foreground/90"> you</em>.
            Two anonymous responses, one prompt, one vote.
            Millions of signals become one living ranking.
          </p>

          {/* Steps */}
          <div className="space-y-0 divide-y divide-foreground/10 border-t border-foreground/10">
            <Step n="01" label="Prompt" detail="You ask. Two models answer in parallel." />
            <Step n="02" label="Vote" detail="Pick the better response — identity hidden." />
            <Step n="03" label="Reveal" detail="Names disclosed. ELO updates globally." />
          </div>

          <button className="mt-10 group inline-flex items-center gap-3 text-sm font-mono text-muted-foreground hover:text-coral transition-colors border-b border-foreground/20 hover:border-coral pb-1">
            Watch a live battle
            <span className="group-hover:translate-x-0.5 transition-transform">→</span>
          </button>
        </div>
      </div>
    </section>
  );
}

function Step({ n, label, detail }) {
  return (
    <div className="grid grid-cols-[36px_100px_1fr] gap-4 items-start py-4">
      <span className="text-muted-foreground/40 font-mono text-[10px] tracking-widest pt-0.5">{n}</span>
      <span className="text-foreground font-mono tracking-widest uppercase text-[11px] pt-0.5">{label}</span>
      <span className="text-muted-foreground text-sm leading-relaxed">{detail}</span>
    </div>
  );
}