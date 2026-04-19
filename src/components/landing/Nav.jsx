import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { SplitFlapText } from './SplitFlapText';

gsap.registerPlugin(useGSAP);

export default function Nav() {
  const [scrolled, setScrolled] = React.useState(false);
  const navRef = useRef(null);
  const linksRef = useRef([]);

  React.useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useGSAP(() => {
    // Nav entrance animation
    gsap.fromTo(navRef.current, 
      { opacity: 0, y: -20 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }
    );
  }, { scope: navRef });

  return (
    <nav
      ref={navRef}
      className={`fixed top-0 inset-x-0 z-50 px-6 md:px-10 flex items-center justify-between transition-[height,background-color,border-color,backdrop-filter] duration-500 border-b ${
        scrolled ? 'bg-background/80 backdrop-blur-md h-14 border-foreground/10' : 'bg-transparent h-20 border-transparent'
      }`}
    >

      {/* Logo */}
      <div className="flex items-center gap-3 shrink-0">
        <SplitFlapText
          text="PARALLAX"
          fontSize="1.35rem"
          speed={35}
        />
      </div>


      {/* Nav links */}
      <div className="hidden md:flex items-center gap-8 text-[11px] font-mono tracking-widest text-muted-foreground uppercase">
        <a ref={el => linksRef.current[0] = el} href="#modes" className="hover:text-foreground transition-colors duration-200 inline-block p-2">Modes</a>
        <a ref={el => linksRef.current[1] = el} href="#api" className="hover:text-foreground transition-colors duration-200 inline-block p-2">API</a>
        <a ref={el => linksRef.current[2] = el} href="#leaderboard" className="hover:text-foreground transition-colors duration-200 inline-block p-2">Leaderboard</a>
        <a ref={el => linksRef.current[3] = el} href="#docs" className="hover:text-foreground transition-colors duration-200 inline-block p-2">Docs</a>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-4 shrink-0">
        <div className="hidden sm:flex flex-col items-end mr-2 font-mono leading-none">
          <span className="text-[10px] text-muted-foreground/60 tracking-widest uppercase mb-1">V0.1.4-BETA</span>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-[#E54D2E] animate-pulse shadow-[0_0_8px_rgba(229,77,46,0.6)]" />
            <span className="text-[11px] text-[#E54D2E] tracking-widest uppercase font-bold">LIVE</span>
          </div>
        </div>
        <button ref={el => linksRef.current[4] = el} className="hidden sm:block font-mono text-[11px] tracking-widest uppercase text-muted-foreground hover:text-foreground transition-colors duration-200 p-2">
          Sign in
        </button>
        <button ref={el => linksRef.current[5] = el} className="px-4 py-1.5 font-mono text-[11px] tracking-widest uppercase bg-foreground text-background rounded-sm transition-all duration-150 ease-out hover:scale-[1.03] hover:bg-white active:scale-[0.98]">
          Launch →
        </button>
      </div>
    </nav>
  );
}