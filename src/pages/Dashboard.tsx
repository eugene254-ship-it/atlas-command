import { useMemo } from 'react';
import { AnimatePresence } from 'framer-motion';
import { TopBar } from '@/components/dashboard/TopBar';
import { PillarSidebar } from '@/components/dashboard/PillarSidebar';
import { WorldModelPanel } from '@/components/dashboard/WorldModelPanel';
import { RiskPanel } from '@/components/dashboard/RiskPanel';
import { HumanImpactFeed } from '@/components/dashboard/HumanImpactFeed';
import { MissionExecutionPanel } from '@/components/dashboard/MissionExecutionPanel';
import { PillarDetailDrawer } from '@/components/dashboard/PillarDetailDrawer';
import { useDashboardState } from '@/hooks/useDashboardState';
import { basePillars, simulatedPillarDeltas } from '@/data/mockDashboard';
import type { Pillar } from '@/types/dashboard';

export default function Dashboard() {
  const {
    state, setRegion, setTimeline, setScenario,
    setWorldModelTab, setSelectedPillar, toggleOverlay, runSimulation,
  } = useDashboardState();

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
    <div className="h-screen flex flex-col bg-background overflow-hidden">
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
      />

      <div className="flex-1 flex gap-3 p-3 overflow-hidden">
        <PillarSidebar
          pillars={pillars}
          selectedPillar={state.selectedPillar}
          onSelectPillar={setSelectedPillar}
        />

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

          <div className="flex gap-3 h-[200px] flex-shrink-0">
            <HumanImpactFeed />
            <MissionExecutionPanel />
          </div>
        </div>

        <RiskPanel
          systemRiskScore={state.systemRiskScore}
          simulationComplete={state.simulationComplete}
        />
      </div>

      <AnimatePresence>
        {state.selectedPillar && (
          <PillarDetailDrawer
            pillar={selectedPillarData}
            onClose={() => setSelectedPillar(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
