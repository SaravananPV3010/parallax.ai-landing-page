import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function CTA({ libraryImage }) {
  const containerRef = useRef(null);
  const imgRef = useRef(null);
  const contentRef = useRef(null);

  useGSAP(() => {
    // Parallax background
    if (imgRef.current) {
      gsap.fromTo(imgRef.current,
        { yPercent: -15, scale: 1.1 },
        {
          yPercent: 15,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true
          }
        }
      );
    }

    // Content reveal staggered
    const tl = gsap.timeline({
      scrollTrigger: { toggleActions: "play none none reverse",
        trigger: contentRef.current,
        start: "top 80%",
      }
    });

    tl.from(contentRef.current.children, {
      opacity: 0,
      y: 40,
      duration: 1,
      stagger: 0.15,
      ease: "power3.out"
    });

  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="relative py-48 px-6 md:px-10 overflow-hidden border-t border-foreground/10">
      {/* Library image — floating figure in infinite knowledge */}
      {libraryImage && (
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <img
            ref={imgRef}
            src={libraryImage}
            alt="Infinite library of knowledge"
            className="w-full h-[130%] -top-[15%] relative object-cover object-center opacity-35 will-change-transform"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-background/70 pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-transparent to-background/80 pointer-events-none" />
        </div>
      )}

      <div
        ref={contentRef}
        className="w-full relative flex flex-col lg:flex-row lg:items-end justify-between gap-12 max-w-[100rem] mx-auto px-4 lg:px-8"
      >
        <div className="flex-1">
          <h2 className="font-serif text-[16vw] lg:text-[10vw] xl:text-[9vw] leading-[0.85] tracking-[-0.04em] text-left uppercase text-[#f3efe6]">
            STOP <br />
            GUESSING.<br />
            <span className="italic text-[#ee6b54] lowercase -ml-1">start voting.</span>
          </h2>
        </div>

        <div className="flex flex-col items-start lg:items-end text-left lg:text-right max-w-md pb-[2vw]">
          <p className="text-base lg:text-lg text-[#f3efe6]/80 mb-10 leading-relaxed font-sans text-balance">
            Free forever for chat. Generous free tier for the API. Help build the first leaderboard that reflects how people actually use AI.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4 w-full justify-end">
            <button className="px-12 py-5 bg-[#ee6b54] text-white text-[11px] transition-all duration-150 flex items-center justify-center gap-2 font-mono uppercase tracking-[0.2em] hover:bg-[#e05b44]">
              GET STARTED <span className="text-lg leading-none">→</span>
            </button>
            <button className="px-12 py-5 border border-white/20 text-white text-[11px] hover:bg-white/5 transition-all font-mono uppercase tracking-[0.2em] text-center hover:border-white">
              DOCS
            </button>
          </div>
          
          <div className="mt-8 font-mono text-[9px] tracking-widest text-white/30 uppercase text-right w-full">
            NO CREDIT CARD REQUIRED
          </div>
        </div>
      </div>
    </section>
  );
}