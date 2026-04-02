import { motion } from 'framer-motion';
import { Globe, Play, GitCompare, Activity } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { regions, timelines, scenarios } from '@/data/mockDashboard';

interface TopBarProps {
  selectedRegion: string;
  selectedTimeline: string;
  selectedScenario: string;
  isSimulating: boolean;
  simulationComplete: boolean;
  systemRiskScore: number;
  onRegionChange: (r: string) => void;
  onTimelineChange: (t: string) => void;
  onScenarioChange: (s: string) => void;
  onRunSimulation: () => void;
}

export function TopBar({
  selectedRegion, selectedTimeline, selectedScenario,
  isSimulating, simulationComplete, systemRiskScore,
  onRegionChange, onTimelineChange, onScenarioChange, onRunSimulation,
}: TopBarProps) {
  return (
    <motion.header
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-panel-strong px-4 py-2.5 flex items-center gap-4 z-50"
    >
      <div className="flex items-center gap-2 mr-auto">
        <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center">
          <Globe className="w-4 h-4 text-primary" />
        </div>
        <div>
          <h1 className="text-sm font-semibold tracking-wide text-foreground">ATLAS SANCTUM</h1>
          <p className="text-[10px] text-muted-foreground tracking-widest uppercase">7 Pillar Command Interface</p>
        </div>
      </div>

      <Select value={selectedRegion} onValueChange={onRegionChange}>
        <SelectTrigger className="w-[130px] h-8 text-xs bg-secondary border-border/50">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {regions.map(r => <SelectItem key={r.id} value={r.id}>{r.name}</SelectItem>)}
        </SelectContent>
      </Select>

      <Select value={selectedTimeline} onValueChange={onTimelineChange}>
        <SelectTrigger className="w-[100px] h-8 text-xs bg-secondary border-border/50">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {timelines.map(t => <SelectItem key={t.id} value={t.id}>{t.label}</SelectItem>)}
        </SelectContent>
      </Select>

      <Select value={selectedScenario} onValueChange={onScenarioChange}>
        <SelectTrigger className="w-[180px] h-8 text-xs bg-secondary border-border/50">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {scenarios.map(s => <SelectItem key={s.id} value={s.id}>{s.name}</SelectItem>)}
        </SelectContent>
      </Select>

      <Button
        size="sm"
        onClick={onRunSimulation}
        disabled={isSimulating || selectedScenario === 'baseline'}
        className="h-8 text-xs gap-1.5 bg-primary hover:bg-primary/90"
      >
        {isSimulating ? (
          <Activity className="w-3.5 h-3.5 animate-pulse" />
        ) : (
          <Play className="w-3.5 h-3.5" />
        )}
        {isSimulating ? 'Simulating...' : 'Run Simulation'}
      </Button>

      <Button variant="outline" size="sm" className="h-8 text-xs gap-1.5 border-border/50">
        <GitCompare className="w-3.5 h-3.5" />
        Compare
      </Button>

      <div className="flex items-center gap-2 ml-2">
        <div className={`w-2 h-2 rounded-full ${simulationComplete ? 'bg-status-stable' : 'bg-status-info'} animate-pulse-glow`} />
        <span className="text-[10px] text-muted-foreground font-mono">
          RISK {systemRiskScore}%
        </span>
      </div>
    </motion.header>
  );
}
