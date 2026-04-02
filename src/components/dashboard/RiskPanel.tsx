import { motion } from 'framer-motion';
import { AlertTriangle, AlertCircle, Info, Shield, TrendingDown, Lightbulb } from 'lucide-react';
import type { Alert, Recommendation } from '@/types/dashboard';
import { alerts, recommendations } from '@/data/mockDashboard';

interface RiskPanelProps {
  systemRiskScore: number;
  simulationComplete: boolean;
}

export function RiskPanel({ systemRiskScore, simulationComplete }: RiskPanelProps) {
  return (
    <motion.aside
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4 }}
      className="w-[280px] flex-shrink-0 flex flex-col gap-3 overflow-y-auto scrollbar-thin pl-1"
    >
      {/* Risk Score */}
      <div className="glass-panel p-4">
        <h3 className="text-[10px] font-semibold tracking-[0.2em] text-muted-foreground uppercase mb-3">Systemic Risk</h3>
        <div className="flex items-center gap-3">
          <div className="relative w-14 h-14">
            <svg viewBox="0 0 36 36" className="w-full h-full -rotate-90">
              <circle cx="18" cy="18" r="15.9" fill="none" stroke="hsl(222 20% 16%)" strokeWidth="2.5" />
              <circle
                cx="18" cy="18" r="15.9" fill="none"
                stroke={systemRiskScore > 70 ? 'hsl(0 72% 51%)' : systemRiskScore > 40 ? 'hsl(38 92% 50%)' : 'hsl(142 71% 45%)'}
                strokeWidth="2.5"
                strokeDasharray={`${systemRiskScore} ${100 - systemRiskScore}`}
                strokeLinecap="round"
                className="transition-all duration-1000"
              />
            </svg>
            <span className="absolute inset-0 flex items-center justify-center text-sm font-bold font-mono text-foreground">
              {systemRiskScore}
            </span>
          </div>
          <div>
            <p className={`text-xs font-medium ${systemRiskScore > 70 ? 'text-status-critical' : systemRiskScore > 40 ? 'text-status-warning' : 'text-status-stable'}`}>
              {systemRiskScore > 70 ? 'Elevated' : systemRiskScore > 40 ? 'Moderate' : 'Contained'}
            </p>
            <p className="text-[10px] text-muted-foreground">
              {simulationComplete ? 'Post-simulation estimate' : 'Current assessment'}
            </p>
          </div>
        </div>
      </div>

      {/* Alerts */}
      <div className="glass-panel p-3">
        <h3 className="text-[10px] font-semibold tracking-[0.2em] text-muted-foreground uppercase mb-2">Active Alerts</h3>
        <div className="space-y-1.5">
          {alerts.slice(0, 5).map(alert => (
            <AlertItem key={alert.id} alert={alert} />
          ))}
        </div>
      </div>

      {/* Recommendations */}
      <div className="glass-panel p-3">
        <h3 className="text-[10px] font-semibold tracking-[0.2em] text-muted-foreground uppercase mb-2">Recommendations</h3>
        <div className="space-y-2">
          {recommendations.map(rec => (
            <RecommendationItem key={rec.id} rec={rec} />
          ))}
        </div>
      </div>

      {/* Ethical Warning */}
      <div className="glass-panel p-3 border-pillar-godliness/20">
        <div className="flex items-start gap-2">
          <Shield className="w-3.5 h-3.5 text-pillar-godliness mt-0.5 flex-shrink-0" />
          <div>
            <h4 className="text-[10px] font-semibold text-pillar-godliness uppercase tracking-wider">Alignment Note</h4>
            <p className="text-[10px] text-muted-foreground mt-1 leading-relaxed">
              Current baseline trajectory is economically stable but ecologically unsustainable beyond 18 months. Intervention recommended.
            </p>
          </div>
        </div>
      </div>
    </motion.aside>
  );
}

function AlertItem({ alert }: { alert: Alert }) {
  const severityIcon = alert.severity === 'critical' ? AlertTriangle : alert.severity === 'high' ? AlertCircle : Info;
  const Icon = severityIcon;
  const color = alert.severity === 'critical' ? 'text-status-critical' : alert.severity === 'high' ? 'text-status-warning' : alert.severity === 'medium' ? 'text-primary' : 'text-muted-foreground';

  return (
    <div className="flex items-start gap-2 p-1.5 rounded-md hover:bg-secondary/30 transition-colors cursor-pointer">
      <Icon className={`w-3 h-3 mt-0.5 flex-shrink-0 ${color}`} />
      <div className="min-w-0">
        <p className="text-[11px] text-foreground truncate">{alert.title}</p>
        <p className="text-[9px] text-muted-foreground">{alert.region} · {alert.timestamp}</p>
      </div>
    </div>
  );
}

function RecommendationItem({ rec }: { rec: Recommendation }) {
  const priorityColor = rec.priority === 'critical' ? 'bg-status-critical/20 text-status-critical' :
    rec.priority === 'high-leverage' ? 'bg-status-warning/20 text-status-warning' : 'bg-primary/20 text-primary';

  return (
    <div className="glass-panel p-2.5 hover:border-border/60 transition-all cursor-pointer">
      <div className="flex items-center gap-1.5 mb-1">
        <Lightbulb className="w-3 h-3 text-pillar-godliness" />
        <span className={`text-[9px] font-semibold uppercase tracking-wider px-1.5 py-0.5 rounded ${priorityColor}`}>
          {rec.priority}
        </span>
        <span className="ml-auto text-[9px] font-mono text-muted-foreground">{rec.confidence}%</span>
      </div>
      <p className="text-[11px] text-foreground leading-snug">{rec.title}</p>
      <p className="text-[9px] text-muted-foreground mt-1 leading-relaxed">{rec.description}</p>
    </div>
  );
}
