import { motion } from 'framer-motion';
import { CheckCircle, AlertTriangle, Clock, AlertCircle } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import type { Initiative } from '@/types/dashboard';
import { initiatives } from '@/data/mockDashboard';

export function MissionExecutionPanel() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="glass-panel p-3 flex-1 overflow-hidden flex flex-col"
    >
      <h3 className="text-[10px] font-semibold tracking-[0.2em] text-muted-foreground uppercase mb-2">Mission Execution</h3>
      <div className="flex-1 overflow-y-auto scrollbar-thin space-y-2">
        {initiatives.map((init, i) => (
          <InitiativeItem key={init.id} initiative={init} index={i} />
        ))}
      </div>
    </motion.div>
  );
}

function InitiativeItem({ initiative, index }: { initiative: Initiative; index: number }) {
  const statusConfig = {
    'on-track': { icon: CheckCircle, color: 'text-status-stable', label: 'On Track' },
    'at-risk': { icon: AlertTriangle, color: 'text-status-warning', label: 'At Risk' },
    'delayed': { icon: Clock, color: 'text-status-critical', label: 'Delayed' },
    'completed': { icon: CheckCircle, color: 'text-status-stable', label: 'Done' },
  };

  const cfg = statusConfig[initiative.status];
  const Icon = cfg.icon;

  return (
    <motion.div
      initial={{ opacity: 0, x: -5 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.05 }}
      className="glass-panel p-3 hover:border-border/60 transition-all"
    >
      <div className="flex items-center justify-between mb-1.5">
        <p className="text-[11px] font-medium text-foreground">{initiative.name}</p>
        <div className="flex items-center gap-1">
          <Icon className={`w-3 h-3 ${cfg.color}`} />
          <span className={`text-[9px] font-medium ${cfg.color}`}>{cfg.label}</span>
        </div>
      </div>

      <div className="flex items-center gap-2 mb-1.5">
        <Progress value={initiative.completion} className="flex-1 h-1.5" />
        <span className="text-[10px] font-mono text-muted-foreground">{initiative.completion}%</span>
      </div>

      <div className="flex items-center justify-between">
        <span className="text-[9px] text-muted-foreground">{initiative.lead}</span>
        <div className="flex items-center gap-1">
          <span className="text-[9px] text-muted-foreground">Resilience</span>
          <span className={`text-[9px] font-mono ${initiative.resilience > 60 ? 'text-status-stable' : initiative.resilience > 40 ? 'text-status-warning' : 'text-status-critical'}`}>
            {initiative.resilience}%
          </span>
        </div>
      </div>

      {initiative.frictionPoints.length > 0 && (
        <div className="mt-1.5 flex flex-wrap gap-1">
          {initiative.frictionPoints.map((fp, i) => (
            <span key={i} className="text-[8px] px-1.5 py-0.5 rounded-full bg-status-warning/10 text-status-warning">{fp}</span>
          ))}
        </div>
      )}
    </motion.div>
  );
}
