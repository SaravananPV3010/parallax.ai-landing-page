import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

const ROWS = [
  { rank: 1, name: 'Llama 3.1 405B', elo: 1287, votes: '142.3k', trend: 'up', org: 'Meta' },
  { rank: 2, name: 'DeepSeek V3', elo: 1271, votes: '98.1k', trend: 'up', org: 'DeepSeek' },
  { rank: 3, name: 'Qwen 2.5 72B', elo: 1264, votes: '110.5k', trend: 'same', org: 'Alibaba' },
  { rank: 4, name: 'Mistral Large 2', elo: 1258, votes: '87.2k', trend: 'down', org: 'Mistral' },
  { rank: 5, name: 'Command R+', elo: 1241, votes: '54.8k', trend: 'up', org: 'Cohere' },
  { rank: 6, name: 'Mixtral 8x22B', elo: 1229, votes: '71.0k', trend: 'down', org: 'Mistral' },
  { rank: 7, name: 'Gemma 2 27B', elo: 1214, votes: '42.6k', trend: 'same', org: 'Google' },
];

const TrendIcon = ({ t }) => {
  if (t === 'up') return <TrendingUp className="w-3.5 h-3.5 text-teal" />;
  if (t === 'down') return <TrendingDown className="w-3.5 h-3.5 text-coral" />;
  return <Minus className="w-3.5 h-3.5 text-muted-foreground/40" />;
};

export default function Leaderboard({ libraryImage }) {
  return (
    <section id="leaderboard" className="relative py-32 px-6 md:px-10 overflow-hidden">
      {/* Library ambient — faint behind leaderboard */}
      {libraryImage && (
        <div className="absolute inset-0 -z-10 pointer-events-none">
          <img
            src={libraryImage}
            alt=""
            className="w-full h-full object-cover object-center opacity-10"
          />
          <div className="absolute inset-0 bg-background/80" />
        </div>
      )}

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="grid md:grid-cols-12 gap-8 mb-16">
          <div className="md:col-span-5">
            <div className="mb-6 reveal">
              <span className="flex items-center gap-3 text-[10px] font-mono tracking-[0.3em] text-muted-foreground uppercase before:content-[''] before:block before:w-8 before:h-px before:bg-coral">§ 05 — Rankings</span>
            </div>
            <h2 className="font-serif text-5xl md:text-6xl leading-[0.95] tracking-tight text-balance">
              The leaderboard<br />
              <span className="italic text-coral">writes itself.</span>
            </h2>
          </div>
          <div className="md:col-span-6 md:col-start-7 flex items-end">
            <p className="text-muted-foreground leading-relaxed">
              Every anonymous vote moves the needle. An ELO rating system — the same math that ranks
              chess grandmasters — turns millions of micro-preferences into a living, breathing truth.
            </p>
          </div>
        </div>

        {/* Table */}
        <div className="border border-foreground/10 rounded-sm overflow-hidden bg-background/60 backdrop-blur-sm">
          <div className="grid grid-cols-[56px_1fr_90px_100px_110px_52px] px-6 py-4 border-b border-foreground/10 font-mono text-[10px] tracking-widest text-muted-foreground/60 uppercase">
            <div>#</div>
            <div>Model</div>
            <div className="text-right">ELO</div>
            <div className="text-right hidden md:block">Votes</div>
            <div className="hidden md:block">Org</div>
            <div className="text-right">±</div>
          </div>

          {ROWS.map((row, i) => (
            <motion.div
              key={row.rank}
              initial={{ opacity: 0, x: -16, filter: 'blur(4px)' }}
              whileInView={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
              whileHover={{ x: 4, backgroundColor: 'hsl(var(--card) / 0.9)' }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ duration: 0.5, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="grid grid-cols-[56px_1fr_90px_100px_110px_52px] px-6 py-5 border-b border-foreground/8 last:border-0 transition-colors group items-center cursor-default"
            >
              <motion.div
                className="font-serif text-xl text-foreground/60"
                whileHover={{ color: 'hsl(var(--foreground))' }}
              >
                {String(row.rank).padStart(2, '0')}
              </motion.div>
              <div>
                <div className="font-serif text-lg group-hover:text-coral transition-colors duration-300">{row.name}</div>
                <div className="md:hidden text-[11px] text-muted-foreground/60 mt-0.5 font-mono">{row.org}</div>
              </div>
              <div className="text-right font-mono text-sm group-hover:text-foreground transition-colors duration-300">{row.elo}</div>
              <div className="text-right font-mono text-xs text-muted-foreground/60 hidden md:block group-hover:text-muted-foreground transition-colors duration-300">{row.votes}</div>
              <div className="hidden md:block text-sm text-muted-foreground/70 font-mono group-hover:text-muted-foreground transition-colors duration-300">{row.org}</div>
              <motion.div
                className="flex justify-end"
                whileHover={{ scale: 1.2 }}
                transition={{ type: 'spring', stiffness: 400 }}
              >
                <TrendIcon t={row.trend} />
              </motion.div>
            </motion.div>
          ))}
        </div>

        <div className="mt-5 flex items-center justify-between text-[10px] font-mono text-muted-foreground/50 tracking-widest uppercase">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-coral animate-pulse-slow inline-block" />
            Updated 12 seconds ago
          </div>
          <a href="#" className="hover:text-foreground transition-colors">View full board →</a>
        </div>
      </div>
    </section>
  );
}