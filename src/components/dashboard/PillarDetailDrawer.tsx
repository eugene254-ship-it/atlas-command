import { motion } from 'framer-motion';
import { X, TrendingUp, TrendingDown, AlertTriangle, CheckCircle } from 'lucide-react';
import type { Pillar, PillarId } from '@/types/dashboard';
import { pillarConfig } from '@/lib/dashboardConfig';

interface PillarDetailDrawerProps {
  pillar: Pillar | null;
  onClose: () => void;
}

export function PillarDetailDrawer({ pillar, onClose }: PillarDetailDrawerProps) {
  if (!pillar) return null;
  const config = pillarConfig[pillar.id];
  const Icon = config.icon;

  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 30 }}
      className="fixed inset-y-0 right-0 w-[400px] z-50 glass-panel-strong border-l border-border/30 overflow-y-auto scrollbar-thin"
    >
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${config.bgClass}/20`}>
              <Icon className={`w-5 h-5 ${config.colorClass}`} />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-foreground">{pillar.name}</h2>
              <p className="text-xs text-muted-foreground">{pillar.descriptor}</p>
            </div>
          </div>
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex items-center gap-4 mb-6">
          <div className="text-4xl font-bold font-mono text-foreground">{pillar.score}</div>
          <div className={`flex items-center gap-1 text-sm ${pillar.delta > 0 ? 'text-status-stable' : 'text-status-critical'}`}>
            {pillar.delta > 0 ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
            {pillar.delta > 0 ? '+' : ''}{pillar.delta}
          </div>
        </div>

        <div className="glass-panel p-4 mb-4">
          <p className="text-sm text-secondary-foreground leading-relaxed">{pillar.explanation}</p>
        </div>

        <div className="mb-4">
          <h3 className="text-xs font-semibold tracking-wider text-muted-foreground uppercase mb-3">Supporting Metrics</h3>
          <div className="space-y-2">
            {pillar.metrics.map((m, i) => (
              <div key={i} className="glass-panel p-3 flex items-center justify-between">
                <span className="text-xs text-secondary-foreground">{m.label}</span>
                <span className={`text-sm font-mono font-medium ${
                  m.status === 'positive' ? 'text-status-stable' : m.status === 'negative' ? 'text-status-critical' : 'text-muted-foreground'
                }`}>{m.value}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-4">
          <h3 className="text-xs font-semibold tracking-wider text-muted-foreground uppercase mb-3">Implications</h3>
          <div className="space-y-2">
            {pillar.implications.map((imp, i) => (
              <div key={i} className="flex items-start gap-2">
                <AlertTriangle className="w-3.5 h-3.5 text-status-warning mt-0.5 flex-shrink-0" />
                <p className="text-xs text-secondary-foreground leading-relaxed">{imp}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <h3 className="text-xs font-semibold tracking-wider text-muted-foreground uppercase mb-2">Improved By</h3>
            <div className="space-y-1.5">
              {pillar.improvedBy.map((item, i) => (
                <div key={i} className="flex items-start gap-1.5">
                  <CheckCircle className="w-3 h-3 text-status-stable mt-0.5 flex-shrink-0" />
                  <span className="text-[11px] text-secondary-foreground">{item}</span>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-xs font-semibold tracking-wider text-muted-foreground uppercase mb-2">Harmed By</h3>
            <div className="space-y-1.5">
              {pillar.harmedBy.map((item, i) => (
                <div key={i} className="flex items-start gap-1.5">
                  <AlertTriangle className="w-3 h-3 text-status-critical mt-0.5 flex-shrink-0" />
                  <span className="text-[11px] text-secondary-foreground">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
