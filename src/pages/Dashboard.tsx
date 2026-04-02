import { useMemo, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { TopBar } from '@/components/dashboard/TopBar';
import { PillarSidebar } from '@/components/dashboard/PillarSidebar';
import { WorldModelPanel } from '@/components/dashboard/WorldModelPanel';
import { RiskPanel } from '@/components/dashboard/RiskPanel';
import { HumanImpactFeed } from '@/components/dashboard/HumanImpactFeed';
import { MissionExecutionPanel } from '@/components/dashboard/MissionExecutionPanel';
import { PillarDetailDrawer } from '@/components/dashboard/PillarDetailDrawer';
import { ComparisonModal } from '@/components/dashboard/ComparisonModal';
import { AmbientParticles } from '@/components/dashboard/AmbientParticles';
import { useDashboardState } from '@/hooks/useDashboardState';
import { basePillars, simulatedPillarDeltas } from '@/data/mockDashboard';
import type { Pillar } from '@/types/dashboard';

export default function Dashboard() {
  const {
    state, setRegion, setTimeline, setScenario,
    setWorldModelTab, setSelectedPillar, toggleOverlay, runSimulation,
  } = useDashboardState();

  const [comparisonOpen, setComparisonOpen] = useState(false);
  const [leftSidebarOpen, setLeftSidebarOpen] = useState(false);
  const [rightSidebarOpen, setRightSidebarOpen] = useState(false);

  const pillars: Pillar[] = useMemo(() => {
    if (!state.simulationComplete || state.selectedScenario === 'baseline') return basePillars;
    const deltas = simulatedPillarDeltas[state.selectedScenario] || {};
    return basePillars.map(p => ({
      ...p,
      score: Math.min(100, Math.max(0, p.score + (deltas[p.id] || 0))),
      delta: deltas[p.id] || p.delta,
      trend: [...p.trend.slice(1), Math.min(100, Math.max(0, p.score + (deltas[p.id] || 0)))],
    }));
  }, [state.simulationComplete, state.selectedScenario]);

  const selectedPillarData = pillars.find(p => p.id === state.selectedPillar) || null;

  return (
    <div className="h-screen flex flex-col bg-background overflow-hidden relative">
      {/* Ambient particles background */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <AmbientParticles />
      </div>

      <TopBar
        selectedRegion={state.selectedRegion}
        selectedTimeline={state.selectedTimeline}
        selectedScenario={state.selectedScenario}
        isSimulating={state.isSimulating}
        simulationComplete={state.simulationComplete}
        systemRiskScore={state.systemRiskScore}
        onRegionChange={setRegion}
        onTimelineChange={setTimeline}
        onScenarioChange={setScenario}
        onRunSimulation={runSimulation}
        onCompare={() => setComparisonOpen(true)}
      />

      {/* Mobile sidebar toggles */}
      <div className="flex items-center gap-2 px-3 py-1.5 lg:hidden z-10 relative">
        <button
          onClick={() => setLeftSidebarOpen(!leftSidebarOpen)}
          className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-[10px] font-medium tracking-wider uppercase bg-secondary/60 text-muted-foreground hover:text-foreground transition-colors"
        >
          <Menu className="w-3.5 h-3.5" />
          Pillars
        </button>
        <button
          onClick={() => setRightSidebarOpen(!rightSidebarOpen)}
          className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-[10px] font-medium tracking-wider uppercase bg-secondary/60 text-muted-foreground hover:text-foreground transition-colors"
        >
          <Menu className="w-3.5 h-3.5" />
          Risk
        </button>
      </div>

      <div className="flex-1 flex gap-3 p-3 overflow-hidden relative z-10">
        {/* Left sidebar - responsive */}
        <div className={`
          lg:relative lg:translate-x-0 lg:w-[240px] lg:flex-shrink-0
          fixed inset-y-0 left-0 z-40 w-[280px] bg-background/95 backdrop-blur-xl p-3 pt-16
          transform transition-transform duration-300 ease-in-out
          ${leftSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
          lg:p-0 lg:pt-0 lg:bg-transparent lg:backdrop-blur-none lg:z-auto
        `}>
          <button
            onClick={() => setLeftSidebarOpen(false)}
            className="absolute top-3 right-3 p-1 rounded-md hover:bg-secondary/50 lg:hidden"
          >
            <X className="w-4 h-4 text-muted-foreground" />
          </button>
          <PillarSidebar
            pillars={pillars}
            selectedPillar={state.selectedPillar}
            onSelectPillar={(id) => {
              setSelectedPillar(id);
              setLeftSidebarOpen(false);
            }}
          />
        </div>

        {/* Mobile overlay */}
        {(leftSidebarOpen || rightSidebarOpen) && (
          <div
            className="fixed inset-0 bg-background/60 z-30 lg:hidden"
            onClick={() => { setLeftSidebarOpen(false); setRightSidebarOpen(false); }}
          />
        )}

        <div className="flex-1 flex flex-col gap-3 overflow-hidden">
          <WorldModelPanel
            activeTab={state.worldModelTab}
            onTabChange={setWorldModelTab}
            activeOverlays={state.activeOverlays}
            onToggleOverlay={toggleOverlay}
            selectedScenario={state.selectedScenario}
            isSimulating={state.isSimulating}
            simulationComplete={state.simulationComplete}
          />

          <div className="flex flex-col sm:flex-row gap-3 h-auto sm:h-[200px] flex-shrink-0">
            <HumanImpactFeed />
            <MissionExecutionPanel />
          </div>
        </div>

        {/* Right sidebar - responsive */}
        <div className={`
          lg:relative lg:translate-x-0 lg:w-[280px] lg:flex-shrink-0
          fixed inset-y-0 right-0 z-40 w-[300px] bg-background/95 backdrop-blur-xl p-3 pt-16
          transform transition-transform duration-300 ease-in-out
          ${rightSidebarOpen ? 'translate-x-0' : 'translate-x-full'}
          lg:p-0 lg:pt-0 lg:bg-transparent lg:backdrop-blur-none lg:z-auto
        `}>
          <button
            onClick={() => setRightSidebarOpen(false)}
            className="absolute top-3 left-3 p-1 rounded-md hover:bg-secondary/50 lg:hidden"
          >
            <X className="w-4 h-4 text-muted-foreground" />
          </button>
          <RiskPanel
            systemRiskScore={state.systemRiskScore}
            simulationComplete={state.simulationComplete}
          />
        </div>
      </div>

      <AnimatePresence>
        {state.selectedPillar && (
          <PillarDetailDrawer
            pillar={selectedPillarData}
            onClose={() => setSelectedPillar(null)}
          />
        )}
      </AnimatePresence>

      <ComparisonModal open={comparisonOpen} onClose={() => setComparisonOpen(false)} />
    </div>
  );
}
