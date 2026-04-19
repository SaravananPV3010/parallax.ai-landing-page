import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitFlapText, SplitFlapMuteToggle } from './SplitFlapText';

gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function Hero({ heroImage }) {
  const containerRef = useRef(null);
  const bgRef = useRef(null);
  const introLineRef = useRef(null);
  const introTextRef = useRef(null);
  const mainTitleRef = useRef(null);
  const headlineRef = useRef(null);
  const underlineRef = useRef(null);
  const descRef = useRef(null);
  const actionsRef = useRef(null);
  const footerRef = useRef(null);

  useGSAP(() => {
    // Entrance Timeline
    const tl = gsap.timeline({ 
      defaults: { ease: "power3.out" },
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 80%",
        toggleActions: "play none none reverse"
      }
    });

    // Initial States
    gsap.set(introLineRef.current, { width: 0 });
    gsap.set(introTextRef.current, { opacity: 0, scale: 0.9 });
    gsap.set(mainTitleRef.current, { opacity: 0, y: 20 });
    gsap.set(headlineRef.current, { opacity: 0, y: 40 });
    gsap.set(underlineRef.current, { scaleX: 0, transformOrigin: "left center" });
    gsap.set(descRef.current, { opacity: 0, filter: "blur(10px)" });
    gsap.set(actionsRef.current, { opacity: 0, y: 20 });
    gsap.set(footerRef.current, { opacity: 0 });

    tl.to(introLineRef.current, { width: 48, duration: 1, delay: 0.5 })
      .to(introTextRef.current, { opacity: 1, scale: 1, duration: 1 }, "<")
      .to(mainTitleRef.current, { opacity: 1, y: 0, duration: 1 }, "<0.2")
      .to(headlineRef.current, { opacity: 1, y: 0, duration: 1.2 }, "<0.1")
      .to(underlineRef.current, { scaleX: 1, duration: 1.5, ease: "circ.out" }, "<0.7")
      .to(descRef.current, { opacity: 1, filter: "blur(0px)", duration: 1.5 }, "<0.1")
      .to(actionsRef.current, { opacity: 1, y: 0, duration: 1 }, "<0.2")
      .to(footerRef.current, { opacity: 1, duration: 1 }, "<0.4");

    // Parallax Background Scrub
    gsap.to(bgRef.current, {
      yPercent: 20,
      scale: 1.05,
      opacity: 0.3,
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "bottom top",
        scrub: true,
      }
    });

    // Gamified mouse interactive orbs
    // (Removed per user request)

    // (Removed magnetic buttons gamification per user request)

  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="relative min-h-screen pt-12 pb-20 px-6 md:px-10 overflow-hidden">
      {/* Architectural grid overlay */}
      <div
        className="absolute inset-0 pointer-events-none z-0 opacity-[0.025]"
        style={{
          backgroundImage: `
            linear-gradient(to right, hsl(var(--foreground)) 1px, transparent 1px),
            linear-gradient(to bottom, hsl(var(--foreground)) 1px, transparent 1px)
          `,
          backgroundSize: '80px 80px'
        }}
      />
      {/* Full bleed background image */}
      <div
        ref={bgRef}
        className="absolute inset-0 -z-10 origin-top"
      >
        <img
          src={heroImage}
          alt="Vortex of infinite screens"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/30 to-background" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/60" />
        {/* Vignette sides */}
        <div className="absolute inset-0 bg-gradient-to-r from-background/80 via-transparent to-background/80" />
      </div>

      <div className="relative max-w-7xl mx-auto min-h-[75vh] flex flex-col justify-center pt-16 pb-8 z-10">

      {/* Top-right meta label */}
        <div ref={introTextRef} className="flex items-center gap-3 mb-8">
          <div ref={introLineRef} className="h-px bg-coral" />
          <span className="text-[10px] font-mono tracking-[0.3em] text-muted-foreground uppercase">
            A gateway to open AI — 47 models
          </span>
        </div>

        <div ref={mainTitleRef} className="mb-2">
          <SplitFlapText
            text="PARALLAX"
            fontSize="clamp(5rem, 13vw, 14rem)"
            speed={45}
          />
          <div className="mt-1">
            <SplitFlapMuteToggle />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-end mt-10">
          <h1
            ref={headlineRef}
            className="font-serif text-[15vw] md:text-[8vw] leading-[0.85] tracking-[-0.02em] text-balance mix-blend-plus-lighter"
          >
            Every model,
            <br />
            <span className="italic text-coral/90 relative inline-block">
              side by side.
              <span
                ref={underlineRef}
                className="absolute -bottom-2 left-0 w-full h-1 bg-coral/30"
              />
            </span>
          </h1>

          <div className="flex flex-col gap-8 pb-4">
            <p
              ref={descRef}
              className="max-w-md text-lg text-muted-foreground leading-relaxed"
            >
              Chat with Llama, Mistral, Qwen and dozens more from a single canvas.
              Compare answers, vote blind, and watch the leaderboard evolve in real time.
            </p>

            <div
              ref={actionsRef}
              className="flex flex-col sm:flex-row items-start sm:items-center gap-6"
            >
              <button className="group relative px-7 py-3.5 bg-foreground text-background text-sm rounded-full overflow-hidden transition-all duration-150 ease-out hover:scale-[1.05] hover:bg-white active:scale-[0.98] font-medium">
                <span className="relative z-10 flex items-center gap-2 pointer-events-none">
                  Start a battle
                  <span className="group-hover:translate-x-0.5 transition-transform">→</span>
                </span>
                <div
                  className="absolute inset-0 bg-coral/20 -translate-x-full group-hover:translate-x-0 transition-transform duration-500 pointer-events-none"
                />
              </button>
              <button className="px-7 py-3.5 border border-foreground/20 text-sm rounded-full hover:border-coral/50 transition-all duration-150 ease-out hover:scale-[1.05] flex items-center gap-2 font-mono backdrop-blur-sm group active:scale-[0.98]">
                <span className="text-coral group-hover:animate-pulse pointer-events-none">$</span> 
                <span className="pointer-events-none">curl api.parallax.ai</span>
              </button>
            </div>
          </div>
        </div>

        {/* Bottom meta strip */}
        <div
          ref={footerRef}
          className="mt-20 flex flex-wrap items-center justify-between gap-4 text-[10px] font-mono text-foreground/35 tracking-widest uppercase border-t border-foreground/10 pt-6"
        >
          <span>Index — 001 / The open model collective</span>
          <span className="hidden md:block">Chat · Compare · Evaluate · Rank</span>
          <span className="flex items-center gap-1">
            Scroll <span className="animate-bounce-small inline-block">↓</span>
          </span>
        </div>
      </div>
    </section>
  );
}