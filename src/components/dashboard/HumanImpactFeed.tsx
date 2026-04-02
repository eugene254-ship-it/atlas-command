import { motion } from 'framer-motion';
import { Droplets, Wheat, Stethoscope, Zap, Handshake, Cloud, Briefcase, ShieldCheck, TrendingUp, TrendingDown, Minus } from 'lucide-react';
import type { FeedEvent } from '@/types/dashboard';
import { feedEvents } from '@/data/mockDashboard';

const categoryIcons: Record<string, typeof Droplets> = {
  water: Droplets, food: Wheat, health: Stethoscope, energy: Zap,
  trust: Handshake, climate: Cloud, employment: Briefcase, security: ShieldCheck,
};

export function HumanImpactFeed() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="glass-panel p-3 flex-1 overflow-hidden flex flex-col"
    >
      <h3 className="text-[10px] font-semibold tracking-[0.2em] text-muted-foreground uppercase mb-2">Human Impact Feed</h3>
      <div className="flex-1 overflow-y-auto scrollbar-thin space-y-1.5">
        {feedEvents.map((event, i) => (
          <FeedItem key={event.id} event={event} index={i} />
        ))}
      </div>
    </motion.div>
  );
}

function FeedItem({ event, index }: { event: FeedEvent; index: number }) {
  const Icon = categoryIcons[event.category] || Droplets;
  const DirectionIcon = event.direction === 'positive' ? TrendingUp : event.direction === 'negative' ? TrendingDown : Minus;
  const dirColor = event.direction === 'positive' ? 'text-status-stable' : event.direction === 'negative' ? 'text-status-critical' : 'text-muted-foreground';
  const impactBg = event.impactLevel === 'high' ? 'bg-status-critical/10 text-status-critical' :
    event.impactLevel === 'medium' ? 'bg-status-warning/10 text-status-warning' : 'bg-secondary text-muted-foreground';

  return (
    <motion.div
      initial={{ opacity: 0, x: -5 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.03 }}
      className="flex items-start gap-2 p-2 rounded-md hover:bg-secondary/30 transition-colors"
    >
      <div className={`mt-0.5 ${dirColor}`}>
        <Icon className="w-3.5 h-3.5" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-[11px] text-foreground leading-snug">{event.title}</p>
        <div className="flex items-center gap-2 mt-1">
          <span className="text-[9px] text-muted-foreground capitalize">{event.category}</span>
          <span className="text-[9px] text-muted-foreground">·</span>
          <span className="text-[9px] text-muted-foreground">{event.timestamp}</span>
          <span className={`text-[8px] px-1.5 py-0.5 rounded-full font-medium uppercase ${impactBg}`}>{event.impactLevel}</span>
        </div>
      </div>
      <DirectionIcon className={`w-3 h-3 mt-1 ${dirColor}`} />
    </motion.div>
  );
}
