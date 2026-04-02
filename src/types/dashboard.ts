export type PillarId = 'goodness' | 'knowledge' | 'self-control' | 'perseverance' | 'godliness' | 'affection' | 'love';

export interface Pillar {
  id: PillarId;
  name: string;
  score: number;
  delta: number;
  descriptor: string;
  trend: number[];
  explanation: string;
  metrics: { label: string; value: string; status: 'positive' | 'neutral' | 'negative' }[];
  implications: string[];
  improvedBy: string[];
  harmedBy: string[];
}

export interface Alert {
  id: string;
  severity: 'critical' | 'high' | 'medium' | 'low';
  title: string;
  description: string;
  timestamp: string;
  region: string;
}

export interface Recommendation {
  id: string;
  priority: 'critical' | 'high-leverage' | 'watch';
  title: string;
  description: string;
  confidence: number;
  pillarImpact: Partial<Record<PillarId, number>>;
}

export interface FeedEvent {
  id: string;
  category: 'water' | 'food' | 'health' | 'energy' | 'trust' | 'climate' | 'employment' | 'security';
  title: string;
  timestamp: string;
  impactLevel: 'high' | 'medium' | 'low';
  direction: 'positive' | 'negative' | 'neutral';
}

export interface Initiative {
  id: string;
  name: string;
  completion: number;
  status: 'on-track' | 'at-risk' | 'delayed' | 'completed';
  lead: string;
  frictionPoints: string[];
  resilience: number;
}

export interface Region {
  id: string;
  name: string;
}

export interface Scenario {
  id: string;
  name: string;
}

export interface Timeline {
  id: string;
  label: string;
}

export type SystemOverlay = 'water' | 'food' | 'health' | 'energy' | 'trust' | 'climate';

export type WorldModelTab = 'reality' | 'causality' | 'simulation';

export interface CausalChain {
  id: string;
  steps: { label: string; severity: 'low' | 'medium' | 'high' | 'critical' }[];
}

export interface WorldNode {
  id: string;
  label: string;
  x: number;
  y: number;
  status: 'stable' | 'stressed' | 'critical';
  type: 'city' | 'system' | 'resource';
  overlays: Partial<Record<SystemOverlay, number>>;
}

export interface WorldConnection {
  from: string;
  to: string;
  strength: number;
  type: 'flow' | 'dependency' | 'risk';
}

export interface SimulationResult {
  scenarioId: string;
  pillars: Record<PillarId, { before: number; after: number }>;
  riskReduction: number;
  timelineMonths: number;
}

export interface DashboardState {
  selectedRegion: string;
  selectedTimeline: string;
  selectedScenario: string;
  activeOverlays: SystemOverlay[];
  worldModelTab: WorldModelTab;
  selectedPillar: PillarId | null;
  isSimulating: boolean;
  simulationComplete: boolean;
  systemRiskScore: number;
}
