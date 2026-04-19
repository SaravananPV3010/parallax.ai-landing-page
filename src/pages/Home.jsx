import React from 'react';
import Nav from '../components/landing/Nav';
import Hero from '../components/landing/Hero';
import Marquee from '../components/landing/Marquee';
import Modes from '../components/landing/Modes';
import Vision from '../components/landing/Vision';
import Battle from '../components/landing/Battle';
import Signal from '../components/landing/Signal';
import TryItNow from '../components/landing/TryItNow';
import API from '../components/landing/API';
import Hands from '../components/landing/Hands';
import Leaderboard from '../components/landing/Leaderboard';
import CTA from '../components/landing/CTA';
import Footer from '../components/landing/Footer';

// Hero — man standing before vortex of screens
const HERO_IMG = 'src/assets/hero.jpg';
// Battle — anonymous glowing teal figure in crowd
const BATTLE_IMG = 'src/assets/battle.jpg';
// Modes editorial image — person surrounded by many monitors
const COMPARE_IMG = 'src/assets/compare.jpg';
// API section — lone coder between two glowing screens outdoors
const API_IMG = 'src/assets/api.jpg';
// Pixel art retro terminal desk
const PIXEL_IMG = 'src/assets/api.jpg';
// Leaderboard / CTA ambient — floating figure in infinite library
const LIBRARY_IMG = 'src/assets/library.jpg';
// Jungle TV — raw signal, used as ambient texture in marquee / between sections
const JUNGLE_IMG = 'src/assets/jungle.jpg';

// NEW IMAGES
// Wireframe hands touching — AI ↔ human interoperability
const HANDS_IMG = 'src/assets/hands.png';
// Person with laptop under floating star screens — hero right column
const LAPTOP_IMG = 'src/assets/laptop.jpg';
// Person browsing floating color panels — Vision section
const VISION_IMG = 'src/assets/vision.png';
// Jungle TV v2 — Footer ambient
const JUNGLE2_IMG = 'src/assets/jungle2.jpg';
// Vortex of screens v2 — Signal interstitial
const VORTEX2_IMG = 'src/assets/vortex2.png';

export default function Home() {
  return (
    <div className="dark min-h-screen bg-background text-foreground relative">
      <Nav />
      <Hero heroImage={HERO_IMG} />
      <Marquee jungleImage={JUNGLE_IMG} />
      <Modes compareImage={COMPARE_IMG} />
      <Vision visionImage={VISION_IMG} />
      <Battle battleImage={BATTLE_IMG} />
      <Signal vortexImage={VORTEX2_IMG} />
      <TryItNow />
      <API apiImage={API_IMG} pixelImage={PIXEL_IMG} />
      <Hands handsImage={HANDS_IMG} />
      <Leaderboard libraryImage={LIBRARY_IMG} />
      <CTA libraryImage={LIBRARY_IMG} />
      <Footer jungleImage={JUNGLE2_IMG} />
    </div>
  );
}