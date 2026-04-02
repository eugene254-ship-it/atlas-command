import { motion } from 'framer-motion';
import { X } from 'lucide-react';
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { simulationResults, scenarios, basePillars } from '@/data/mockDashboard';
import { pillarConfig } from '@/lib/dashboardConfig';
import type { PillarId } from '@/types/dashboard';

interface ComparisonModalProps {
  open: boolean;
  onClose: () => void;
}

const pillarNames: Record<PillarId, string> = {
  goodness: 'Goodness',
  knowledge: 'Knowledge',
  'self-control': 'Self-Ctrl',
  perseverance: 'Persev.',
  godliness: 'Godliness',
  affection: 'Affection',
  love: 'Love',
};

const scenarioColors: Record<string, string> = {
  water: 'hsl(210 100% 56%)',
  food: 'hsl(142 71% 45%)',
  health: 'hsl(340 82% 60%)',
};

export function ComparisonModal({ open, onClose }: ComparisonModalProps) {
  const chartData = (Object.keys(pillarNames) as PillarId[]).map(pid => {
    const base = basePillars.find(p => p.id === pid)!;
    const row: Record<string, string | number> = { name: pillarNames[pid], baseline: base.score };
    simulationResults.forEach(r => {
      const sc = scenarios.find(s => s.id === r.scenarioId);
      if (sc) row[r.scenarioId] = r.pillars[pid].after;
    });
    return row;
  });

  return (
    <Dialog open={open} onOpenChange={v => !v && onClose()}>
      <DialogContent className="max-w-3xl bg-card/95 backdrop-blur-2xl border-border/40">
        <DialogHeader>
          <DialogTitle className="text-sm font-semibold tracking-wider uppercase text-foreground">
            Decision Comparison — Pillar Impact Across Scenarios
          </DialogTitle>
        </DialogHeader>

        <div className="h-[320px] mt-2">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} barGap={1} barCategoryGap="15%">
              <XAxis dataKey="name" tick={{ fill: 'hsl(215 15% 55%)', fontSize: 10 }} axisLine={false} tickLine={false} />
              <YAxis domain={[0, 100]} tick={{ fill: 'hsl(215 15% 55%)', fontSize: 10 }} axisLine={false} tickLine={false} />
              <Tooltip
                contentStyle={{ background: 'hsl(222 30% 10% / 0.95)', border: '1px solid hsl(222 20% 20%)', borderRadius: '8px', fontSize: '11px' }}
                labelStyle={{ color: 'hsl(210 20% 90%)' }}
              />
              <Legend wrapperStyle={{ fontSize: '10px', paddingTop: '8px' }} />
              <Bar dataKey="baseline" fill="hsl(222 20% 30%)" radius={[2, 2, 0, 0]} name="Baseline" />
              <Bar dataKey="water" fill={scenarioColors.water} radius={[2, 2, 0, 0]} name="Water Intervention" />
              <Bar dataKey="food" fill={scenarioColors.food} radius={[2, 2, 0, 0]} name="Food Resilience" />
              <Bar dataKey="health" fill={scenarioColors.health} radius={[2, 2, 0, 0]} name="Health Surge" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Summary cards */}
        <div className="grid grid-cols-3 gap-3 mt-2">
          {simulationResults.map(r => {
            const sc = scenarios.find(s => s.id === r.scenarioId);
            const totalDelta = Object.values(r.pillars).reduce((sum, v) => sum + (v.after - v.before), 0);
            return (
              <div key={r.scenarioId} className="glass-panel p-3">
                <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground mb-1">{sc?.name}</p>
                <div className="flex items-baseline gap-2">
                  <span className="text-lg font-bold font-mono text-status-stable">+{totalDelta}</span>
                  <span className="text-[9px] text-muted-foreground">total pillar gain</span>
                </div>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-[9px] text-muted-foreground">Risk ↓{r.riskReduction}%</span>
                  <span className="text-[9px] text-muted-foreground">·</span>
                  <span className="text-[9px] text-muted-foreground">{r.timelineMonths}mo</span>
                </div>
              </div>
            );
          })}
        </div>
      </DialogContent>
    </Dialog>
  );
}
