import { useState, useCallback } from 'react';
import type { DashboardState, PillarId, SystemOverlay, WorldModelTab } from '@/types/dashboard';

const initialState: DashboardState = {
  selectedRegion: 'kenya',
  selectedTimeline: 'now',
  selectedScenario: 'baseline',
  activeOverlays: ['water', 'food', 'health'],
  worldModelTab: 'reality',
  selectedPillar: null,
  isSimulating: false,
  simulationComplete: false,
  systemRiskScore: 67,
};

export function useDashboardState() {
  const [state, setState] = useState<DashboardState>(initialState);

  const setRegion = useCallback((r: string) => setState(s => ({ ...s, selectedRegion: r })), []);
  const setTimeline = useCallback((t: string) => setState(s => ({ ...s, selectedTimeline: t })), []);
  const setScenario = useCallback((sc: string) => setState(s => ({ ...s, selectedScenario: sc, simulationComplete: false })), []);
  const setWorldModelTab = useCallback((tab: WorldModelTab) => setState(s => ({ ...s, worldModelTab: tab })), []);
  const setSelectedPillar = useCallback((p: PillarId | null) => setState(s => ({ ...s, selectedPillar: p })), []);

  const toggleOverlay = useCallback((o: SystemOverlay) => {
    setState(s => ({
      ...s,
      activeOverlays: s.activeOverlays.includes(o)
        ? s.activeOverlays.filter(x => x !== o)
        : [...s.activeOverlays, o],
    }));
  }, []);

  const runSimulation = useCallback(() => {
    setState(s => ({ ...s, isSimulating: true, simulationComplete: false }));
    setTimeout(() => {
      setState(s => ({ ...s, isSimulating: false, simulationComplete: true, systemRiskScore: Math.max(20, s.systemRiskScore - 15) }));
    }, 2000);
  }, []);

  return { state, setRegion, setTimeline, setScenario, setWorldModelTab, setSelectedPillar, toggleOverlay, runSimulation };
}
