import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(useGSAP, ScrollTrigger);

const CODE = `import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.PARALLAX_KEY,
  baseURL: "https://api.parallax.ai/v1",
});

// One key. Every open model.
const response = await client.chat.completions.create({
  model: "llama-3.1-405b",
  messages: [{ role: "user", content: "hello, world" }],
});`;

export default function API({ apiImage, pixelImage }) {
  const containerRef = useRef(null);
  const leftColRef = useRef(null);
  const codeBlockRef = useRef(null);
  const imgRef = useRef(null);
  const statsRef = useRef([]);
  const statsValuesRef = useRef([]);

  useGSAP(() => {
    // Left column staggered entrance
    gsap.from(leftColRef.current.children, {
      opacity: 0,
      x: -30,
      duration: 1,
      stagger: 0.15,
      ease: "power3.out",
      scrollTrigger: { toggleActions: "play none none reverse",
        trigger: leftColRef.current,
        start: "top 80%",
      }
    });

    // Stats grid entrance & counter gamification
    statsRef.current.forEach((stat, i) => {
      if (!stat) return;
      
      const tl = gsap.timeline({
        scrollTrigger: { toggleActions: "play none none reverse",
          trigger: leftColRef.current,
          start: "top 70%",
        }
      });
      
      // Entrance fade up
      tl.from(stat, {
        opacity: 0,
        y: 20,
        duration: 0.8,
        ease: "power3.out",
      }, i * 0.1);
      
      // Number count up
      const valEl = statsValuesRef.current[i];
      if (valEl) {
        const targetVal = parseFloat(valEl.dataset.value);
        const suffix = valEl.dataset.suffix || "";
        const decimals = targetVal % 1 !== 0 ? 2 : 0;
        
        gsap.fromTo(valEl, 
          { innerHTML: 0 }, 
          {
            innerHTML: targetVal,
            duration: 2,
            ease: "power2.out",
            snap: { innerHTML: Math.pow(10, -decimals) },
            onUpdate: function() {
              valEl.innerHTML = Number(this.targets()[0].innerHTML).toFixed(decimals) + suffix;
            },
            scrollTrigger: { toggleActions: "play none none reverse",
              trigger: leftColRef.current,
              start: "top 70%",
            }
          }
        );
      }
    });

    // Right column / Code block entrance
    gsap.from(codeBlockRef.current, {
      opacity: 0,
      y: 50,
      duration: 1,
      ease: "power3.out",
      scrollTrigger: { toggleActions: "play none none reverse",
        trigger: codeBlockRef.current,
        start: "top 80%",
      }
    });

    // Optional: Parallax on the pixel image
    if (imgRef.current) {
      gsap.from(imgRef.current, {
        opacity: 0,
        y: 40,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: { toggleActions: "play none none reverse",
          trigger: imgRef.current,
          start: "top 85%",
        }
      });
    }

  }, { scope: containerRef });

  return (
    <section id="api" ref={containerRef} className="relative py-32 px-6 md:px-10 border-y border-foreground/10">
      {/* Full-bleed atmospheric background */}
      {apiImage && (
        <div className="absolute inset-0 -z-10">
          <img
            src={apiImage}
            alt="Coder between glowing screens"
            className="w-full h-full object-cover object-center opacity-25"
          />
          <div className="absolute inset-0 bg-background/60" />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/70 to-background" />
        </div>
      )}

      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-12 gap-12 items-start">
          {/* Left — copy */}
          <div ref={leftColRef} className="md:col-span-5">
            <div className="mb-6">
              <span className="flex items-center gap-3 text-[10px] font-mono tracking-[0.3em] text-muted-foreground uppercase before:content-[''] before:block before:w-8 before:h-px before:bg-coral">§ 04 — Developers</span>
            </div>
            <h2 className="font-serif text-5xl md:text-6xl leading-[0.95] tracking-tight text-balance mb-8">
              One key.<br />
              One format.<br />
              <span className="italic text-coral">Every model.</span>
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-10 max-w-md">
              Drop-in OpenAI compatibility. Point your existing SDK at parallax.ai and route any prompt
              to any open-source model — no new library, no rate-limit juggling, no vendor lock.
            </p>

            <div className="grid grid-cols-2 gap-px bg-foreground/10 overflow-hidden">
              <div ref={el => statsRef.current[0] = el} className="bg-background/60 backdrop-blur-sm p-5">
                <div className="font-mono text-[10px] tracking-widest text-muted-foreground uppercase mb-2">Models</div>
                <div className="font-serif text-3xl"><span ref={el => statsValuesRef.current[0] = el} data-value="47" data-suffix="">47</span></div>
              </div>
              <div ref={el => statsRef.current[1] = el} className="bg-background/60 backdrop-blur-sm p-5">
                <div className="font-mono text-[10px] tracking-widest text-muted-foreground uppercase mb-2">Avg latency</div>
                <div className="font-serif text-3xl"><span ref={el => statsValuesRef.current[1] = el} data-value="180" data-suffix="ms">180ms</span></div>
              </div>
              <div ref={el => statsRef.current[2] = el} className="bg-background/60 backdrop-blur-sm p-5">
                <div className="font-mono text-[10px] tracking-widest text-muted-foreground uppercase mb-2">Uptime</div>
                <div className="font-serif text-3xl"><span ref={el => statsValuesRef.current[2] = el} data-value="99.98" data-suffix="%">99.98%</span></div>
              </div>
              <div ref={el => statsRef.current[3] = el} className="bg-background/60 backdrop-blur-sm p-5">
                <div className="font-mono text-[10px] tracking-widest text-muted-foreground uppercase mb-2">Regions</div>
                <div className="font-serif text-3xl"><span ref={el => statsValuesRef.current[3] = el} data-value="12" data-suffix="">12</span></div>
              </div>
            </div>
          </div>


          {/* Right — code block */}
          <div ref={codeBlockRef} className="md:col-span-7 sticky top-[100px] self-start">
            <div className="relative rounded-sm border border-foreground/15 bg-background/80 backdrop-blur-md overflow-hidden shadow-2xl">
              {/* Window bar */}
              <div className="flex items-center justify-between px-5 py-3.5 border-b border-foreground/10 bg-card/60">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-coral/70" />
                  <div className="w-2.5 h-2.5 rounded-full bg-foreground/20" />
                  <div className="w-2.5 h-2.5 rounded-full bg-foreground/20" />
                </div>
                <span className="font-mono text-[10px] tracking-widest text-muted-foreground uppercase">
                  parallax-client.ts
                </span>
                <span className="font-mono text-[10px] text-teal/70 tracking-widest">● READY</span>
              </div>

              <pre className="p-6 md:p-8 font-mono text-[13px] leading-[1.75] overflow-x-auto">
                <code>
                  {CODE.split('\n').map((line, i) => (
                    <div key={i} className="flex">
                      <span className="text-foreground/20 w-8 shrink-0 select-none text-right pr-3">
                        {i + 1}
                      </span>
                      <span dangerouslySetInnerHTML={{ __html: highlight(line) }} />
                    </div>
                  ))}
                </code>
              </pre>

              {/* Bottom glow line */}
              <div className="h-px bg-gradient-to-r from-transparent via-coral/40 to-transparent" />
            </div>

            {/* Caption */}
            <p className="mt-4 font-mono text-[10px] tracking-widest text-muted-foreground/50 uppercase text-right">
              Compatible with all OpenAI SDKs
            </p>
          </div>
        </div>

        {/* Pixel art terminal image */}
        {pixelImage && (
          <div ref={imgRef} className="mt-16 relative rounded-sm overflow-hidden border border-foreground/15">
            <img
              src={pixelImage}
              alt="Retro terminal setup"
              className="w-full object-cover object-center max-h-[420px]"
              style={{ imageRendering: 'pixelated' }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/10 to-transparent pointer-events-none" />
            <div className="absolute bottom-4 left-6 font-mono text-[10px] tracking-widest text-foreground/40 uppercase">FIG. 01 — The original terminal</div>
            <div className="absolute bottom-4 right-6 font-mono text-[10px] tracking-widest text-foreground/40 uppercase">Before the cloud</div>
          </div>
        )}
      </div>
    </section>
  );
}

function highlight(line) {
  return line
    .replace(/(".*?")/g, '<span style="color:hsl(var(--teal))">$1</span>')
    .replace(/\b(import|from|const|await|new)\b/g, '<span style="color:hsl(var(--coral));font-style:italic">$1</span>')
    .replace(/(\/\/.*$)/g, '<span style="color:hsl(220,20%,50%)">$1</span>');
}