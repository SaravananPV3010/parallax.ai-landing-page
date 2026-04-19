import React from 'react';
import { SplitFlapText } from './SplitFlapText';

export default function Footer({ jungleImage }) {
  return (
    <footer className="relative px-6 md:px-10 py-12 border-t hairline overflow-hidden">
      {/* Jungle TV ambient */}
      {jungleImage && (
        <div className="absolute inset-0 -z-10 pointer-events-none">
          <img src={jungleImage} alt="" className="w-full h-full object-cover object-center opacity-8" style={{ opacity: 0.07 }} />
          <div className="absolute inset-0 bg-background/90" />
        </div>
      )}
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-10 mb-16">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <SplitFlapText text="PARALLAX" fontSize="1.4rem" speed={35} />
            </div>

            <p className="font-serif italic text-2xl max-w-md text-foreground/80 leading-tight">
              "The space between two points of view is where truth lives."
            </p>
          </div>

          <Col title="Product" items={['Chat', 'Battle', 'Compare', 'API', 'Leaderboard']} />
          <Col title="Company" items={['About', 'Research', 'Blog', 'Careers', 'Contact']} />
        </div>

        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pt-8 border-t hairline font-mono text-[11px] text-muted-foreground tracking-widest uppercase">
          <div>© 2026 Parallax Labs — All models remain property of their creators</div>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-foreground transition-colors">Privacy</a>
            <a href="#" className="hover:text-foreground transition-colors">Terms</a>
            <a href="#" className="hover:text-foreground transition-colors">Status</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

function Col({ title, items }) {
  return (
    <div>
      <div className="font-mono text-[10px] tracking-widest text-muted-foreground uppercase mb-4">{title}</div>
      <ul className="space-y-2.5 text-sm">
        {items.map(item => (
          <li key={item}>
            <a href="#" className="text-foreground/80 hover:text-coral transition-colors">{item}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}