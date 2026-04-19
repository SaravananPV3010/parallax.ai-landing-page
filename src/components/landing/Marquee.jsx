import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(useGSAP, ScrollTrigger);

const MODELS = [
  'Llama 3.1 405B', 'Mistral Large', 'Qwen 2.5', 'DeepSeek V3',
  'Mixtral 8x22B', 'Gemma 2', 'Phi-3', 'Command R+',
  'Yi-Large', 'Falcon 180B', 'Nemotron', 'SOLAR',
];

export default function Marquee({ jungleImage }) {
  const containerRef = useRef(null);
  const trackRef = useRef(null);
  const imgRef = useRef(null);

  useGSAP(() => {
    // Continuous loop
    const track = trackRef.current;
    
    // Animate xPercent from 0 to -50% (since we doubled the children)
    const tl = gsap.to(track, {
      xPercent: -50,
      ease: "none",
      duration: 30, // Base speed
      repeat: -1
    });

    // Speed up on scroll
    ScrollTrigger.create({
      trigger: containerRef.current,
      start: "top bottom",
      end: "bottom top",
      onUpdate: (self) => {
        // Multiply timeScale based on scroll velocity. 
        // 1 is default, Math.abs(self.getVelocity()) / 100 adds speed.
        const v = Math.abs(self.getVelocity()) / 150;
        gsap.to(tl, { timeScale: 1 + v, duration: 0.1, overwrite: true });
        
        // Reset back to normal speed shortly after scroll ends
        gsap.delayedCall(0.1, () => {
          gsap.to(tl, { timeScale: 1, duration: 0.5, ease: "power1.out" });
        });
      }
    });

    // Slight parallax on the ambient image if present
    if (imgRef.current) {
      gsap.to(imgRef.current, {
        yPercent: 15,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true
        }
      });
    }

    // Hover to pause
    track.addEventListener('mouseenter', () => tl.pause());
    track.addEventListener('mouseleave', () => tl.play());

    return () => {
      track.removeEventListener('mouseenter', () => tl.pause());
      track.removeEventListener('mouseleave', () => tl.play());
    }
  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="relative border-y border-foreground/10 overflow-hidden">
      {/* Jungle TV ambient image strip */}
      {jungleImage && (
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <img ref={imgRef} src={jungleImage} alt="" className="w-full h-[130%] -top-[15%] relative object-cover opacity-15 scale-105" />
          <div className="absolute inset-0 bg-background/60" />
        </div>
      )}

      <div className="py-7 relative">
        <div ref={trackRef} className="flex whitespace-nowrap w-max will-change-transform">
          {[...MODELS, ...MODELS].map((m, i) => (
            <div key={i} className="flex items-center gap-8 px-8">
              <span className="font-serif italic text-2xl text-foreground/70">{m}</span>
              <span className="text-coral/70 text-lg">✦</span>
            </div>
          ))}
        </div>
      </div>

      <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-background to-transparent pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-background to-transparent pointer-events-none" />
    </div>
  );
}