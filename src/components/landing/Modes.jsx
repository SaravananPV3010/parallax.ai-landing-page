import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';
import { MessageSquare, GitCompare, Swords } from 'lucide-react';

gsap.registerPlugin(useGSAP, ScrollTrigger);

const MODES = [
  {
    num: '01',
    icon: MessageSquare,
    title: 'Direct Chat',
    subtitle: 'One model, full focus.',
    description: 'Talk to any open-source model in a clean, distraction-free interface. Persistent threads, streaming, tool use.',
  },
  {
    num: '02',
    icon: GitCompare,
    title: 'Side-by-Side',
    subtitle: 'Two minds, one prompt.',
    description: 'Run the same prompt through two models simultaneously. See the difference in reasoning, tone and precision instantly.',
  },
  {
    num: '03',
    icon: Swords,
    title: 'Battle Mode',
    subtitle: 'Blind. Unbiased. Decisive.',
    description: 'Both answers are anonymous until you vote. Every vote feeds the global ELO and shapes the real leaderboard.',
    highlight: true,
  },
];

export default function Modes({ compareImage }) {
  const containerRef = useRef(null);
  const headerRef = useRef(null);
  const imgContainerRef = useRef(null);
  const imgRef = useRef(null);

  useGSAP(() => {
    // Header sequence
    gsap.from(headerRef.current.children, {
      opacity: 0,
      x: -30,
      duration: 1,
      stagger: 0.2,
      ease: "power3.out",
      scrollTrigger: { toggleActions: "play none none reverse",
        trigger: headerRef.current,
        start: "top 80%",
      }
    });

    // Image reveal & parallax
    const imgTl = gsap.timeline({
      scrollTrigger: { toggleActions: "play none none reverse",
        trigger: imgContainerRef.current,
        start: "top 85%",
      }
    });

    imgTl.fromTo(imgContainerRef.current,
      { opacity: 0, clipPath: 'inset(10% 0% 10% 0%)' },
      { opacity: 1, clipPath: 'inset(0% 0% 0% 0%)', duration: 1.5, ease: "power4.inOut" }
    );

    gsap.fromTo(imgRef.current,
      { yPercent: 0 },
      {
        yPercent: -20,
        ease: "none",
        scrollTrigger: {
          trigger: imgContainerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true
        }
      }
    );

  }, { scope: containerRef });

  return (
    <section id="modes" ref={containerRef} className="relative py-32 px-6 md:px-10">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div ref={headerRef} className="grid md:grid-cols-12 gap-8 mb-20">
          <div className="md:col-span-5">
            <div className="mb-6">
              <span className="flex items-center gap-3 text-[10px] font-mono tracking-[0.3em] text-muted-foreground uppercase before:content-[''] before:block before:w-8 before:h-px before:bg-coral">§ 02 — Interface</span>
            </div>
            <h2 className="font-serif text-5xl md:text-6xl leading-[0.95] tracking-tight text-balance">
              Three ways to <span className="italic text-coral">converse</span> with the open web.
            </h2>
          </div>
          <div className="md:col-span-6 md:col-start-7 flex items-end">
            <p className="text-muted-foreground leading-relaxed">
              Parallax isn't just another chat window. It's a lens through which you can see how different
              architectures think — alone, together, or in silent rivalry.
            </p>
          </div>
        </div>

        {/* Mode cards */}
        <div className="grid md:grid-cols-3 border-t border-foreground/5">
          {MODES.map((mode, i) => {
            const Icon = mode.icon;
            return (
              <motion.div
                key={mode.num}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className={`relative group p-8 md:p-12 lg:p-16 min-h-[480px] lg:min-h-[560px] flex flex-col border-b border-foreground/5 hover:bg-white/[0.015] transition-colors duration-700 ${i !== 2 ? 'md:border-r border-foreground/5' : ''}`}
              >
                {mode.highlight && (
                  <motion.div 
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.5 }}
                    className="absolute top-0 left-0 right-0 h-px bg-coral/80 origin-left" 
                  />
                )}
                <div className="flex items-start justify-between mb-20 lg:mb-28">
                  <span className="font-mono text-[10px] text-muted-foreground/50 tracking-[0.2em] uppercase">
                    {mode.num} / 03
                  </span>
                  <Icon className="w-5 h-5 text-muted-foreground/30 group-hover:text-foreground/60 transition-colors duration-500" strokeWidth={1} />
                </div>
                <h3 className="font-serif text-3xl lg:text-[2.75rem] leading-none tracking-tight text-foreground/90 mb-4">{mode.title}</h3>
                <p className={`font-serif italic text-lg lg:text-xl ${mode.highlight ? 'text-coral/90' : 'text-muted-foreground/60'}`}>
                  {mode.subtitle}
                </p>
                <div className="mt-auto pt-12">
                  <p className="text-[13px] md:text-sm text-muted-foreground/50 leading-loose font-light max-w-[95%]">
                    {mode.description}
                  </p>
                  {mode.highlight && (
                    <div className="mt-8 inline-flex items-center gap-3 text-[9px] font-mono tracking-[0.25em] uppercase text-coral/80">
                      <span className="w-1 h-1 rounded-full bg-coral/80 shadow-[0_0_8px_rgba(249,115,22,0.8)]" />
                      Standout feature
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Full-width cinematic image — person surrounded by monitors */}
        <div
          ref={imgContainerRef}
          className="mt-24 relative overflow-hidden rounded-sm border border-foreground/10 group bg-muted/20 w-full h-[300px] md:h-[500px]"
        >
          <img
            ref={imgRef}
            src={compareImage}
            alt="Surrounded by models"
            className="absolute top-0 left-0 w-full h-[120%] object-cover object-center group-hover:scale-[1.05] transition-transform duration-[2s] will-change-transform"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-r from-background/40 via-transparent to-background/40 pointer-events-none" />

          {/* Overlay text */}
          <div className="absolute bottom-8 left-8 right-8 flex items-end justify-between pointer-events-none z-10">
            <p className="font-serif italic text-2xl md:text-4xl max-w-xl text-balance text-foreground/90 leading-tight">
              "Every model has a signature.<br className="hidden md:block" />
              Parallax helps you find yours."
            </p>
            <div className="hidden md:flex flex-col items-end gap-1">
              <span className="font-mono text-[10px] text-muted-foreground tracking-widest uppercase">FIG. 02</span>
              <span className="font-mono text-[10px] text-muted-foreground/50 tracking-widest uppercase">Interface · Modes</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
