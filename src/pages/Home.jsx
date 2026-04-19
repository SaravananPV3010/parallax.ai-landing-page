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
// import HERO_IMG from '../assets/hero.jpg'; // TODO: Add hero.jpg to src/assets/
const HERO_IMG = '/placeholder.jpg';
// Battle — anonymous glowing teal figure in crowd
import BATTLE_IMG from '../assets/battle.jpg';
// Modes editorial image — person surrounded by many monitors
import COMPARE_IMG from '../assets/compare.jpg';
// API section — lone coder between two glowing screens outdoors
import API_IMG from '../assets/api.jpg';
// Pixel art retro terminal desk
const PIXEL_IMG = API_IMG; // Using same as API_IMG
// Leaderboard / CTA ambient — floating figure in infinite library
// import LIBRARY_IMG from '../assets/library.jpg'; // TODO: Add library.jpg
const LIBRARY_IMG = '/placeholder.jpg';
// Jungle TV — raw signal, used as ambient texture in marquee / between sections
// import JUNGLE_IMG from '../assets/jungle.jpg'; // TODO: Add jungle.jpg
const JUNGLE_IMG = '/placeholder.jpg';

// NEW IMAGES
// Wireframe hands touching — AI ↔ human interoperability
import HANDS_IMG from '../assets/hands.png';
// Person with laptop under floating star screens — hero right column
// import LAPTOP_IMG from '../assets/laptop.jpg'; // TODO: Add laptop.jpg
const LAPTOP_IMG = '/placeholder.jpg';
// Person browsing floating color panels — Vision section
import VISION_IMG from '../assets/vision.png';
// Jungle TV v2 — Footer ambient
// import JUNGLE2_IMG from '../assets/jungle2.jpg'; // TODO: Add jungle2.jpg
const JUNGLE2_IMG = '/placeholder.jpg';
// Vortex of screens v2 — Signal interstitial
import VORTEX2_IMG from '../assets/vortex2.png';

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