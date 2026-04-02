import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Layers, GitBranch, FlaskConical } from 'lucide-react';
import type { WorldModelTab, SystemOverlay, WorldNode, WorldConnection, CausalChain } from '@/types/dashboard';
import { worldNodes, worldConnections, causalChains, simulationResults } from '@/data/mockDashboard';
import { SystemOverlayChips } from './SystemOverlayChips';
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from 'recharts';

interface WorldModelPanelProps {
  activeTab: WorldModelTab;
  onTabChange: (tab: WorldModelTab) => void;
  activeOverlays: SystemOverlay[];
  onToggleOverlay: (o: SystemOverlay) => void;
  selectedScenario: string;
  isSimulating: boolean;
  simulationComplete: boolean;
}

const tabs: { id: WorldModelTab; label: string; icon: typeof Layers }[] = [
  { id: 'reality', label: 'Reality', icon: Layers },
  { id: 'causality', label: 'Causality', icon: GitBranch },
  { id: 'simulation', label: 'Simulation', icon: FlaskConical },
];

export function WorldModelPanel({
  activeTab, onTabChange, activeOverlays, onToggleOverlay,
  selectedScenario, isSimulating, simulationComplete,
}: WorldModelPanelProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex-1 glass-panel flex flex-col overflow-hidden"
    >
      <div className="flex items-center justify-between px-4 pt-3 pb-2 border-b border-border/30">
        <div className="flex gap-1">
          {tabs.map(t => {
            const Icon = t.icon;
            return (
              <button
                key={t.id}
                onClick={() => onTabChange(t.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-[11px] font-medium tracking-wide uppercase transition-all ${
                  activeTab === t.id
                    ? 'bg-primary/20 text-primary'
                    : 'text-muted-foreground hover:text-foreground hover:bg-secondary/50'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                {t.label}
              </button>
            );
          })}
        </div>
        <SystemOverlayChips activeOverlays={activeOverlays} onToggle={onToggleOverlay} />
      </div>

      <div className="flex-1 relative grid-overlay overflow-hidden">
        <AnimatePresence mode="wait">
          {activeTab === 'reality' && (
            <RealityView key="reality" nodes={worldNodes} connections={worldConnections} activeOverlays={activeOverlays} />
          )}
          {activeTab === 'causality' && (
            <CausalityView key="causality" chains={causalChains} />
          )}
          {activeTab === 'simulation' && (
            <SimulationView key="simulation" scenarioId={selectedScenario} isSimulating={isSimulating} simulationComplete={simulationComplete} />
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

function RealityView({ nodes, connections, activeOverlays }: { nodes: WorldNode[]; connections: WorldConnection[]; activeOverlays: SystemOverlay[] }) {
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 p-4">
      <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet">
        {connections.map((c, i) => {
          const from = nodes.find(n => n.id === c.from);
          const to = nodes.find(n => n.id === c.to);
          if (!from || !to) return null;
          return (
            <line
              key={i}
              x1={from.x} y1={from.y} x2={to.x} y2={to.y}
              stroke={c.type === 'risk' ? 'hsl(0 72% 51% / 0.3)' : c.type === 'dependency' ? 'hsl(210 60% 50% / 0.2)' : 'hsl(142 71% 45% / 0.15)'}
              strokeWidth={c.strength * 0.5}
              strokeDasharray={c.type === 'risk' ? '2 2' : undefined}
            />
          );
        })}

        {nodes.map(node => {
          const statusColor = node.status === 'critical' ? 'hsl(0 72% 51%)' : node.status === 'stressed' ? 'hsl(38 92% 50%)' : 'hsl(142 71% 45%)';
          const isHovered = hoveredNode === node.id;
          const size = node.type === 'city' ? 2.5 : node.type === 'system' ? 2 : 1.5;

          return (
            <g key={node.id} onMouseEnter={() => setHoveredNode(node.id)} onMouseLeave={() => setHoveredNode(null)} className="cursor-pointer">
              <circle cx={node.x} cy={node.y} r={size + 2} fill={statusColor} opacity={0.15}>
                <animate attributeName="r" values={`${size + 1};${size + 3};${size + 1}`} dur="3s" repeatCount="indefinite" />
              </circle>
              <circle cx={node.x} cy={node.y} r={size} fill={statusColor} opacity={0.8} />
              <circle cx={node.x} cy={node.y} r={size * 0.4} fill="hsl(210 20% 90%)" />
              <text x={node.x} y={node.y - size - 2} textAnchor="middle" fill="hsl(210 20% 80%)" fontSize="2.2" fontFamily="Inter" fontWeight="500">
                {node.label}
              </text>

              {isHovered && activeOverlays.length > 0 && (
                <foreignObject x={node.x + 3} y={node.y - 8} width="25" height="20">
                  <div className="glass-panel p-1.5 text-[8px] space-y-0.5">
                    {activeOverlays.map(o => {
                      const val = node.overlays[o];
                      if (val === undefined) return null;
                      return (
                        <div key={o} className="flex justify-between gap-2">
                          <span className="text-muted-foreground capitalize">{o}</span>
                          <span className={`font-mono ${val > 60 ? 'text-status-stable' : val > 40 ? 'text-status-warning' : 'text-status-critical'}`}>{val}%</span>
                        </div>
                      );
                    })}
                  </div>
                </foreignObject>
              )}
            </g>
          );
        })}
      </svg>
    </motion.div>
  );
}

function CausalityView({ chains }: { chains: CausalChain[] }) {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 p-6 overflow-y-auto scrollbar-thin">
      <h3 className="text-xs font-semibold tracking-wider text-muted-foreground uppercase mb-4">Causal Chain Analysis</h3>
      <div className="space-y-4">
        {chains.map(chain => (
          <div key={chain.id} className="glass-panel p-4">
            <div className="flex items-center gap-2 flex-wrap">
              {chain.steps.map((step, i) => (
                <div key={i} className="flex items-center gap-2">
                  <div className={`px-3 py-1.5 rounded-md text-xs font-medium ${
                    step.severity === 'critical' ? 'bg-status-critical/20 text-status-critical' :
                    step.severity === 'high' ? 'bg-status-warning/20 text-status-warning' :
                    step.severity === 'medium' ? 'bg-primary/20 text-primary' :
                    'bg-secondary text-secondary-foreground'
                  }`}>
                    {step.label}
                  </div>
                  {i < chain.steps.length - 1 && (
                    <span className="text-muted-foreground text-xs">→</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

function SimulationView({ scenarioId, isSimulating, simulationComplete }: { scenarioId: string; isSimulating: boolean; simulationComplete: boolean }) {
  const result = simulationResults.find(r => r.scenarioId === scenarioId);

  if (isSimulating) {
    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-2 border-primary/30 border-t-primary rounded-full animate-spin mx-auto mb-4" />
          <p className="text-sm text-muted-foreground">Running simulation across all pillars...</p>
        </div>
      </motion.div>
    );
  }

  if (!simulationComplete || !result) {
    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 flex items-center justify-center">
        <div className="text-center max-w-xs">
          <FlaskConical className="w-10 h-10 text-muted-foreground/30 mx-auto mb-3" />
          <p className="text-sm text-muted-foreground">Select a scenario and run simulation to see projected outcomes across all 7 pillars</p>
        </div>
      </motion.div>
    );
  }

  const chartData = Object.entries(result.pillars).map(([key, val]) => ({
    name: key === 'self-control' ? 'Self-Ctrl' : key === 'affection' ? 'Affection' : key.charAt(0).toUpperCase() + key.slice(1),
    before: val.before,
    after: val.after,
    delta: val.after - val.before,
  }));

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 p-6 overflow-y-auto scrollbar-thin">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xs font-semibold tracking-wider text-muted-foreground uppercase">Simulation Results</h3>
        <div className="flex items-center gap-4 text-xs">
          <span className="text-status-stable font-mono">Risk Reduction: {result.riskReduction}%</span>
          <span className="text-muted-foreground font-mono">Timeline: {result.timelineMonths}mo</span>
        </div>
      </div>

      <div className="glass-panel p-4 mb-4 h-[200px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} barGap={2}>
            <XAxis dataKey="name" tick={{ fill: 'hsl(215 15% 55%)', fontSize: 10 }} axisLine={false} tickLine={false} />
            <YAxis domain={[0, 100]} tick={{ fill: 'hsl(215 15% 55%)', fontSize: 10 }} axisLine={false} tickLine={false} />
            <Tooltip
              contentStyle={{ background: 'hsl(222 30% 10% / 0.95)', border: '1px solid hsl(222 20% 20%)', borderRadius: '8px', fontSize: '12px' }}
              labelStyle={{ color: 'hsl(210 20% 90%)' }}
            />
            <Bar dataKey="before" fill="hsl(222 20% 30%)" radius={[2, 2, 0, 0]} name="Before" />
            <Bar dataKey="after" fill="hsl(210 60% 50%)" radius={[2, 2, 0, 0]} name="After" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-4 gap-2">
        {chartData.map(d => (
          <div key={d.name} className="glass-panel p-3 text-center">
            <p className="text-[10px] text-muted-foreground uppercase mb-1">{d.name}</p>
            <p className={`text-lg font-bold font-mono ${d.delta > 0 ? 'text-status-stable' : 'text-status-critical'}`}>
              {d.delta > 0 ? '+' : ''}{d.delta}
            </p>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
