import React, { useState, useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { callGroqAPI, getRandomModels } from '../../api/groqClient';
import { ScrollArea } from '@/components/ui/scroll-area';

gsap.registerPlugin(useGSAP, ScrollTrigger);

const ModernScrollArea = /** @type {any} */ (ScrollArea);

export default function TryItNow() {
  const containerRef = useRef(/** @type {HTMLElement | null} */ (null));
  const headerRef = useRef(/** @type {HTMLDivElement | null} */ (null));
  const boxRef = useRef(/** @type {HTMLDivElement | null} */ (null));
  const resultRef = useRef(/** @type {HTMLDivElement | null} */ (null));

  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [textA, setTextA] = useState('');
  const [textB, setTextB] = useState('');
  const [hasVoted, setHasVoted] = useState(/** @type {null | 'A' | 'B'} */ (null));
  const [models, setModels] = useState({ modelA: '', modelB: '' });
  const [errorMessage, setErrorMessage] = useState('');

  useGSAP(() => {
    // Parallax background scale effect
    if (containerRef.current) {
      gsap.fromTo(
        containerRef.current,
        { backgroundColor: 'rgba(0,0,0,0)' },
        {
          backgroundColor: 'hsl(var(--background) / 0.3)',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top bottom',
            end: 'center center',
            scrub: true,
          },
        }
      );
    }

    if (headerRef.current) {
      gsap.from(headerRef.current.children, {
        opacity: 0,
        y: 30,
        duration: 1,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          toggleActions: 'play none none reverse',
          trigger: headerRef.current,
          start: 'top 80%',
        },
      });
    }

    // Box float up
    if (boxRef.current) {
      gsap.from(boxRef.current, {
        opacity: 0,
        y: 60,
        rotationX: -5,
        duration: 1.2,
        ease: 'power3.out',
        scrollTrigger: {
          toggleActions: 'play none none reverse',
          trigger: boxRef.current,
          start: 'top 85%',
        },
      });
    }

  }, { scope: containerRef });

  // Handle vote animation dynamically
  useGSAP(() => {
    if (hasVoted && resultRef.current) {
      const tl = gsap.timeline();
      
      // Box shake / flash impact gamification
      tl.to(boxRef.current, {
        scale: 1.02,
        boxShadow: "0 0 40px rgba(255, 87, 51, 0.4)",
        duration: 0.1,
        ease: "power2.out"
      })
      .to(boxRef.current, {
        scale: 1,
        boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
        duration: 0.4,
        ease: "bounce.out"
      });

      // Show result
      gsap.fromTo(resultRef.current, 
        { opacity: 0, y: 15, scale: 0.9 },
        { opacity: 1, y: 0, scale: 1, duration: 0.5, delay: 0.1, ease: "back.out(1.7)" }
      );
    }
  }, [hasVoted]);

  const handleBattle = async () => {
    if (!prompt.trim() || isGenerating) return;
    setIsGenerating(true);
    setErrorMessage('');
    setTextA('');
    setTextB('');
    setHasVoted(null);
    const [modelA, modelB] = getRandomModels();
    setModels({ modelA, modelB });

    try {
      /**
       * @param {(value: string) => void} setText
       * @param {string} content
       * @param {string} fallbackText
       * @returns {Promise<void>}
       */
      const animateText = async (setText, content, fallbackText) => {
        const text = content?.trim() ? content : fallbackText;

        await new Promise((resolve) => {
          let index = 0;
          const speed = 20;
          const interval = setInterval(() => {
            setText(text.slice(0, index));
            index += 1;

            if (index > text.length) {
              clearInterval(interval);
              resolve(undefined);
            }
          }, speed);
        });
      };

      /**
       * @param {string} selectedModel
       * @param {(value: string) => void} setText
       * @param {string} fallbackLabel
       */
      const runModel = async (selectedModel, setText, fallbackLabel) => {
        try {
          const response = await callGroqAPI(prompt, selectedModel);
          await animateText(setText, response, `${fallbackLabel} returned no response.`);
          return { model: selectedModel, error: '' };
        } catch (modelError) {
          const message = modelError instanceof Error ? modelError.message : `${fallbackLabel} failed.`;
          await animateText(setText, '', message);
          return { model: selectedModel, error: message };
        }
      };

      const [resultA, resultB] = await Promise.all([
        runModel(modelA, setTextA, 'Model A'),
        runModel(modelB, setTextB, 'Model B'),
      ]);

      if (resultA.error || resultB.error) {
        setErrorMessage('One or both models did not return a usable answer.');
      }
    } catch (error) {
      console.error('Error calling Groq API:', error);
      setErrorMessage(error instanceof Error ? error.message : 'Unable to reach Groq right now.');
      setIsGenerating(false);
      return;
    }

    setIsGenerating(false);
  };

  return (
    <section ref={containerRef} className="relative py-32 px-6 md:px-10 overflow-hidden border-y border-foreground/10">
      <div className="max-w-5xl mx-auto perspective-[1000px]">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-16">
          <div className="mb-8 flex justify-center">
            <span className="flex items-center gap-3 text-[10px] font-mono tracking-[0.3em] text-coral uppercase before:content-[''] before:block before:w-8 before:h-px before:bg-coral">
              § 04 — TRY IT NOW
            </span>
          </div>
          <h2 className="font-serif text-5xl md:text-7xl leading-[0.95] tracking-tight mb-8 text-balance">
            Prompt once. <span className="italic text-coral">See both.</span>
          </h2>
          <p className="text-muted-foreground font-mono text-[11px] tracking-[0.2em] uppercase">
            Type any question and watch two models respond in real time. Vote for the winner.
          </p>
        </div>

        {/* Interactive Box */}
        <div ref={boxRef} className="border border-foreground/15 rounded-sm overflow-hidden bg-background shadow-2xl origin-bottom">
          {/* Input Row */}
          <div className="flex flex-col sm:flex-row border-b border-foreground/15">
            <input 
              type="text" 
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Ask anything... e.g. 'Explain attention mechanisms in one paragraph'"
              className="flex-1 bg-transparent px-8 py-7 font-mono text-[13px] outline-none text-foreground placeholder:text-muted-foreground/50"
              onKeyDown={(e) => e.key === 'Enter' && handleBattle()}
            />
            <button 
              onClick={handleBattle}
              disabled={isGenerating}
              className="px-10 py-7 bg-coral text-white font-mono tracking-[0.2em] text-[11px] uppercase transition-colors hover:bg-coral/90 disabled:opacity-70 flex items-center justify-center gap-2"
            >
              {isGenerating ? 'GENERATING...' : 'BATTLE →'}
            </button>
          </div>

          {errorMessage && (
            <div className="border-b border-foreground/15 px-8 py-4 text-[11px] font-mono tracking-wide text-destructive">
              {errorMessage}
            </div>
          )}

          {/* Models Row */}
          <div className="grid md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-foreground/15">
            {/* Model A */}
            <div className="p-8 md:p-10 flex flex-col h-[320px] md:h-[420px] min-h-0 overflow-hidden">
              <div className="font-mono text-[10px] tracking-[0.2em] text-muted-foreground/50 uppercase mb-8">
                MODEL A — HIDDEN
              </div>
              <ModernScrollArea className="flex-1 min-h-0">
                <div className="font-mono text-[13px] leading-[2] text-foreground/90 whitespace-pre-wrap pr-4">
                  {textA || <span className="text-foreground">Waiting for your prompt...</span>}
                  {isGenerating && <span className="inline-block w-2 h-4 bg-coral animate-pulse ml-1 align-middle" />}
                </div>
              </ModernScrollArea>
            </div>

            {/* Model B */}
            <div className="p-8 md:p-10 flex flex-col h-[320px] md:h-[420px] min-h-0 overflow-hidden">
              <div className="font-mono text-[10px] tracking-[0.2em] text-muted-foreground/50 uppercase mb-8">
                MODEL B — HIDDEN
              </div>
              <ModernScrollArea className="flex-1 min-h-0">
                <div className="font-mono text-[13px] leading-[2] text-foreground/90 whitespace-pre-wrap pr-4">
                  {textB || <span className="text-foreground">Waiting for your prompt...</span>}
                  {isGenerating && <span className="inline-block w-2 h-4 bg-coral animate-pulse ml-1 align-middle" />}
                </div>
              </ModernScrollArea>
            </div>
          </div>

          {/* Vote Row */}
          <div className="grid md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-foreground/15 border-t border-foreground/15">
            <button 
              onClick={() => setHasVoted('A')}
              disabled={isGenerating || (!textA && !textB)}
              className={`py-5 font-mono tracking-[0.2em] text-[10px] uppercase transition-colors flex items-center justify-center gap-2 ${hasVoted === 'A' ? 'bg-coral/10 text-coral' : 'text-muted-foreground hover:text-foreground hover:bg-foreground/5'} disabled:opacity-50 disabled:cursor-not-allowed`}
            >
              ← VOTE A
            </button>
            <button 
              onClick={() => setHasVoted('B')}
              disabled={isGenerating || (!textA && !textB)}
              className={`py-5 font-mono tracking-[0.2em] text-[10px] uppercase transition-colors flex items-center justify-center gap-2 ${hasVoted === 'B' ? 'bg-coral/10 text-coral' : 'text-muted-foreground hover:text-foreground hover:bg-foreground/5'} disabled:opacity-50 disabled:cursor-not-allowed`}
            >
              VOTE B →
            </button>
          </div>
        </div>
        
        {hasVoted && (
          <div 
            ref={resultRef}
            className="mt-8 text-center font-mono text-[10px] text-teal tracking-widest uppercase opacity-0"
          >
            Vote recorded. Model A was {models.modelA}. Model B was {models.modelB}.
          </div>
        )}
      </div>
    </section>
  );
}
