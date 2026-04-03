import { useMemo, useState, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, X, Maximize2, Minimize2, Keyboard } from 'lucide-react';
import { TopBar } from '@/components/dashboard/TopBar';
import { PillarSidebar } from '@/components/dashboard/PillarSidebar';
import { WorldModelPanel } from '@/components/dashboard/WorldModelPanel';
import { RiskPanel } from '@/components/dashboard/RiskPanel';
import { HumanImpactFeed } from '@/components/dashboard/HumanImpactFeed';
import { MissionExecutionPanel } from '@/components/dashboard/MissionExecutionPanel';
import { PillarDetailDrawer } from '@/components/dashboard/PillarDetailDrawer';
import { ComparisonModal } from '@/components/dashboard/ComparisonModal';
import { AmbientParticles } from '@/components/dashboard/AmbientParticles';
import { CommandPalette } from '@/components/dashboard/CommandPalette';
import { useDashboardState } from '@/hooks/useDashboardState';
import { useAlertNotifications } from '@/hooks/useAlertNotifications';
import { useKeyboardShortcuts } from '@/hooks/useKeyboardShortcuts';
import { basePillars, simulatedPillarDeltas } from '@/data/mockDashboard';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import type { Pillar } from '@/types/dashboard';

export default function Dashboard() {
  const {
    state, setRegion, setTimeline, setScenario,
    setWorldModelTab, setSelectedPillar, toggleOverlay, runSimulation,
  } = useDashboardState();

  const [comparisonOpen, setComparisonOpen] = useState(false);
  const [leftSidebarOpen, setLeftSidebarOpen] = useState(false);
  const [rightSidebarOpen, setRightSidebarOpen] = useState(false);
  const [focusMode, setFocusMode] = useState(false);

  // Real-time alert notifications
  useAlertNotifications();

  // Keyboard shortcuts
  const toggleFocusMode = useCallback(() => setFocusMode(f => !f), []);
  const openCompare = useCallback(() => setComparisonOpen(true), []);

  useKeyboardShortcuts({
    onSelectPillar: setSelectedPillar,
    onRunSimulation: runSimulation,
    onCompare: openCompare,
    onToggleFocusMode: toggleFocusMode,
    selectedPillar: state.selectedPillar,
    isSimulating: state.isSimulating,
    selectedScenario: state.selectedScenario,
  });

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
        onCompare={openCompare}
      />

      {/* Mobile sidebar toggles + Focus mode */}
      <div className="flex items-center gap-2 px-3 py-1.5 z-10 relative">
        {!focusMode && (
          <>
            <button
              onClick={() => setLeftSidebarOpen(!leftSidebarOpen)}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-[10px] font-medium tracking-wider uppercase bg-secondary/60 text-muted-foreground hover:text-foreground transition-colors lg:hidden"
            >
              <Menu className="w-3.5 h-3.5" />
              Pillars
            </button>
            <button
              onClick={() => setRightSidebarOpen(!rightSidebarOpen)}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-[10px] font-medium tracking-wider uppercase bg-secondary/60 text-muted-foreground hover:text-foreground transition-colors lg:hidden"
            >
              <Menu className="w-3.5 h-3.5" />
              Risk
            </button>
          </>
        )}

        <div className="ml-auto flex items-center gap-1.5">
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                onClick={toggleFocusMode}
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-[10px] font-medium tracking-wider uppercase bg-secondary/60 text-muted-foreground hover:text-foreground transition-colors"
              >
                {focusMode ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
                <span className="hidden sm:inline">{focusMode ? 'Exit Focus' : 'Focus'}</span>
              </button>
            </TooltipTrigger>
            <TooltipContent side="bottom" className="text-[10px]">
              {focusMode ? 'Exit focused mode (F)' : 'Enter focused mode — hide sidebars (F)'}
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <button className="p-1.5 rounded-md text-muted-foreground hover:text-foreground transition-colors bg-secondary/40">
                <Keyboard className="w-3.5 h-3.5" />
              </button>
            </TooltipTrigger>
            <TooltipContent side="bottom" className="text-[10px] space-y-1">
              <p><kbd className="px-1 py-0.5 bg-secondary rounded text-[9px] font-mono">1-7</kbd> Select pillar</p>
              <p><kbd className="px-1 py-0.5 bg-secondary rounded text-[9px] font-mono">R</kbd> Run simulation</p>
              <p><kbd className="px-1 py-0.5 bg-secondary rounded text-[9px] font-mono">C</kbd> Compare</p>
              <p><kbd className="px-1 py-0.5 bg-secondary rounded text-[9px] font-mono">F</kbd> Focus mode</p>
              <p><kbd className="px-1 py-0.5 bg-secondary rounded text-[9px] font-mono">Esc</kbd> Close panel</p>
            </TooltipContent>
          </Tooltip>
        </div>
      </div>

      <div className="flex-1 flex gap-3 p-3 pt-0 overflow-hidden relative z-10">
        {/* Left sidebar - responsive + focus mode */}
        <AnimatePresence>
          {!focusMode && (
            <motion.div
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: 240, opacity: 1 }}
              exit={{ width: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className={`
                lg:relative lg:translate-x-0 lg:flex-shrink-0 overflow-hidden
                fixed inset-y-0 left-0 z-40 bg-background/95 backdrop-blur-xl p-3 pt-16
                transform transition-transform duration-300 ease-in-out
                ${leftSidebarOpen ? 'translate-x-0 w-[280px]' : '-translate-x-full w-[280px]'}
                lg:p-0 lg:pt-0 lg:bg-transparent lg:backdrop-blur-none lg:z-auto lg:w-auto
              `}
            >
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
            </motion.div>
          )}
        </AnimatePresence>

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

          {!focusMode && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="flex flex-col sm:flex-row gap-3 h-auto sm:h-[200px] flex-shrink-0"
            >
              <HumanImpactFeed />
              <MissionExecutionPanel />
            </motion.div>
          )}
        </div>

        {/* Right sidebar - responsive + focus mode */}
        <AnimatePresence>
          {!focusMode && (
            <motion.div
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: 280, opacity: 1 }}
              exit={{ width: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className={`
                lg:relative lg:translate-x-0 lg:flex-shrink-0 overflow-hidden
                fixed inset-y-0 right-0 z-40 bg-background/95 backdrop-blur-xl p-3 pt-16
                transform transition-transform duration-300 ease-in-out
                ${rightSidebarOpen ? 'translate-x-0 w-[300px]' : 'translate-x-full w-[300px]'}
                lg:p-0 lg:pt-0 lg:bg-transparent lg:backdrop-blur-none lg:z-auto lg:w-auto
              `}
            >
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
            </motion.div>
          )}
        </AnimatePresence>
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

      <CommandPalette
        onSelectPillar={setSelectedPillar}
        onRunSimulation={runSimulation}
        onCompare={openCompare}
        onToggleFocusMode={toggleFocusMode}
        onToggleOverlay={toggleOverlay}
        onScenarioChange={setScenario}
        isSimulating={state.isSimulating}
      />
  );
}
