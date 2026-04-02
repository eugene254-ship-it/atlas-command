import { motion } from 'framer-motion';
import type { SystemOverlay } from '@/types/dashboard';
import { overlayConfig } from '@/lib/dashboardConfig';

interface SystemOverlayChipsProps {
  activeOverlays: SystemOverlay[];
  onToggle: (o: SystemOverlay) => void;
}

const allOverlays: SystemOverlay[] = ['water', 'food', 'health', 'energy', 'trust', 'climate'];

export function SystemOverlayChips({ activeOverlays, onToggle }: SystemOverlayChipsProps) {
  return (
    <div className="flex flex-wrap gap-1.5">
      {allOverlays.map(o => {
        const cfg = overlayConfig[o];
        const Icon = cfg.icon;
        const active = activeOverlays.includes(o);
        return (
          <motion.button
            key={o}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onToggle(o)}
            className={`flex items-center gap-1 px-2 py-1 rounded-full text-[10px] font-medium tracking-wide uppercase transition-all ${
              active
                ? 'glass-panel-strong ' + cfg.color
                : 'bg-secondary/50 text-muted-foreground'
            }`}
          >
            <Icon className="w-3 h-3" />
            {cfg.label}
          </motion.button>
        );
      })}
    </div>
  );
}
