import type {
  Pillar, Alert, Recommendation, FeedEvent, Initiative,
  Region, Scenario, Timeline, CausalChain, WorldNode, WorldConnection, SimulationResult, PillarId
} from '@/types/dashboard';

export const regions: Region[] = [
  { id: 'kenya', name: 'Kenya' },
  { id: 'nairobi', name: 'Nairobi' },
  { id: 'nakuru', name: 'Nakuru' },
  { id: 'kibera', name: 'Kibera' },
  { id: 'east-africa', name: 'East Africa' },
];

export const timelines: Timeline[] = [
  { id: 'now', label: 'Now' },
  { id: '30d', label: '30 Days' },
  { id: '1y', label: '1 Year' },
  { id: '10y', label: '10 Years' },
];

export const scenarios: Scenario[] = [
  { id: 'baseline', name: 'Baseline' },
  { id: 'water', name: 'Water Intervention' },
  { id: 'food', name: 'Food Resilience Plan' },
  { id: 'health', name: 'Public Health Surge Response' },
];

export const basePillars: Pillar[] = [
  {
    id: 'goodness',
    name: 'Goodness',
    score: 68,
    delta: 3.2,
    descriptor: 'Net positive but unevenly distributed',
    trend: [60, 62, 64, 63, 65, 67, 68],
    explanation: 'Goodness measures the aggregate positive impact of current policies and actions on human welfare, ecosystem health, and economic equity across the selected region.',
    metrics: [
      { label: 'Lives Improved (30d)', value: '14,200', status: 'positive' },
      { label: 'Ecosystem Recovery', value: '42%', status: 'neutral' },
      { label: 'Economic Fairness Index', value: '0.61', status: 'negative' },
    ],
    implications: ['Rural communities receiving disproportionately less benefit', 'Urban welfare gains masking peri-urban decline'],
    improvedBy: ['Targeted rural investment', 'Community-led distribution models', 'Transparent resource allocation'],
    harmedBy: ['Centralized resource hoarding', 'Neglect of informal settlements', 'Short-term profit extraction'],
  },
  {
    id: 'knowledge',
    name: 'Knowledge',
    score: 74,
    delta: 1.8,
    descriptor: 'Strong evidence, moderate uncertainty',
    trend: [70, 71, 72, 73, 72, 74, 74],
    explanation: 'Knowledge quantifies data reliability, source verification, model confidence, and the clarity of intelligence used for decision-making.',
    metrics: [
      { label: 'Data Verification Rate', value: '87%', status: 'positive' },
      { label: 'Conflicting Signals', value: '12', status: 'negative' },
      { label: 'Model Confidence', value: '74%', status: 'neutral' },
    ],
    implications: ['Health data streams lagging by 48 hours', 'Economic indicators well-correlated with ground truth'],
    improvedBy: ['Additional IoT sensor deployment', 'Cross-validation with community reports', 'Real-time satellite integration'],
    harmedBy: ['Data source monopolization', 'Censored reporting channels', 'Model overfitting to historical patterns'],
  },
  {
    id: 'self-control',
    name: 'Self-Control',
    score: 71,
    delta: -2.1,
    descriptor: 'High restraint against reactive policy',
    trend: [75, 74, 73, 72, 73, 72, 71],
    explanation: 'Self-Control measures institutional discipline, resistance to impulsive reactions, and quality of deliberative process before major decisions.',
    metrics: [
      { label: 'Impulse Risk Rating', value: 'Moderate', status: 'neutral' },
      { label: 'Deliberation Quality', value: '78%', status: 'positive' },
      { label: 'Reactive Decisions (30d)', value: '3', status: 'negative' },
    ],
    implications: ['Pressure mounting for rapid food price intervention', 'Risk of bypassing consultation frameworks'],
    improvedBy: ['Mandatory cooling periods', 'Multi-stakeholder review gates', 'Scenario testing before action'],
    harmedBy: ['Media pressure cycles', 'Electoral urgency', 'Incomplete information acting'],
  },
  {
    id: 'perseverance',
    name: 'Perseverance',
    score: 65,
    delta: 0.5,
    descriptor: 'Execution stable under strain',
    trend: [63, 64, 64, 65, 64, 65, 65],
    explanation: 'Perseverance tracks the consistency of execution against planned initiatives, resilience under disruption, and long-term commitment to stated goals.',
    metrics: [
      { label: 'Mission Drift Index', value: '12%', status: 'neutral' },
      { label: 'Initiative Completion Rate', value: '64%', status: 'neutral' },
      { label: 'Execution Under Stress', value: 'Stable', status: 'positive' },
    ],
    implications: ['Water grid project maintaining pace despite supply chain issues', 'Health routing upgrade behind schedule'],
    improvedBy: ['Buffer resource allocation', 'Adaptive project management', 'Clear milestone accountability'],
    harmedBy: ['Budget reallocation mid-cycle', 'Leadership turnover', 'Scope creep from political mandates'],
  },
  {
    id: 'godliness',
    name: 'Godliness',
    score: 77,
    delta: 4.1,
    descriptor: 'Aligned with long-term moral constraints',
    trend: [70, 72, 73, 74, 75, 76, 77],
    explanation: 'Godliness evaluates alignment across ethical, ecological, economic, and human dignity axes — whether current trajectory honors long-term sacred commitments.',
    metrics: [
      { label: 'Ethical Alignment', value: '82%', status: 'positive' },
      { label: 'Ecological Stability', value: '68%', status: 'neutral' },
      { label: 'Human Dignity Index', value: '0.79', status: 'positive' },
    ],
    implications: ['Economic growth strategy aligned with ecological guardrails', 'Dignity protections strong in formal sector, weak in informal'],
    improvedBy: ['Constitutional alignment reviews', 'Ecological impact assessments', 'Community voice integration'],
    harmedBy: ['Profit-first regulatory capture', 'Ecological externalization', 'Dignity violations in enforcement'],
  },
  {
    id: 'affection',
    name: 'Mutual Affection',
    score: 59,
    delta: 2.7,
    descriptor: 'Coordination trust improving',
    trend: [52, 54, 55, 56, 57, 58, 59],
    explanation: 'Mutual Affection tracks trust, coordination quality, and relational health between key actors: government, NGOs, communities, and international partners.',
    metrics: [
      { label: 'Trust Score (Gov-NGO)', value: '62%', status: 'neutral' },
      { label: 'Trust Score (Gov-Community)', value: '48%', status: 'negative' },
      { label: 'Coordination Events (30d)', value: '18', status: 'positive' },
    ],
    implications: ['County government-community trust remains fragile', 'NGO coordination improved after joint planning session'],
    improvedBy: ['Joint planning forums', 'Transparent budget processes', 'Community feedback integration'],
    harmedBy: ['Unilateral decision-making', 'Broken commitments', 'Information asymmetry'],
  },
  {
    id: 'love',
    name: 'Love',
    score: 72,
    delta: 5.3,
    descriptor: 'Flourishing value creation is rising',
    trend: [62, 64, 66, 67, 69, 70, 72],
    explanation: 'Love measures long-term regenerative value — whether actions create conditions for sustained human and environmental flourishing beyond immediate outputs.',
    metrics: [
      { label: 'Regenerative Value Ratio', value: '3.2x', status: 'positive' },
      { label: 'Long-term Benefit Index', value: '0.71', status: 'positive' },
      { label: 'Value Extracted vs Created', value: '1:3.2', status: 'positive' },
    ],
    implications: ['Regenerative agriculture pilots producing compounding benefits', 'Youth programs creating self-sustaining community capacity'],
    improvedBy: ['Long-horizon investment frameworks', 'Regenerative design principles', 'Intergenerational impact assessment'],
    harmedBy: ['Extractive economic models', 'Short-term political cycles', 'Neglect of ecological capital'],
  },
];

export const simulatedPillarDeltas: Record<string, Partial<Record<PillarId, number>>> = {
  'water': { goodness: 12, knowledge: 3, 'self-control': -2, perseverance: 5, godliness: 8, affection: 10, love: 14 },
  'food': { goodness: 8, knowledge: 5, 'self-control': 1, perseverance: 7, godliness: 6, affection: 4, love: 9 },
  'health': { goodness: 15, knowledge: 8, 'self-control': 3, perseverance: -3, godliness: 10, affection: 6, love: 11 },
  'baseline': { goodness: 0, knowledge: 0, 'self-control': 0, perseverance: 0, godliness: 0, affection: 0, love: 0 },
};

export const alerts: Alert[] = [
  { id: 'a1', severity: 'critical', title: 'Water Infrastructure Failure Risk', description: 'Nakuru main pipeline showing 87% stress indicators. Failure probability within 14 days without intervention.', timestamp: '2 min ago', region: 'Nakuru' },
  { id: 'a2', severity: 'high', title: 'Food Supply Chain Disruption', description: 'Rift Valley corridor experiencing 23% throughput reduction due to transport fuel shortage.', timestamp: '18 min ago', region: 'Rift Valley' },
  { id: 'a3', severity: 'high', title: 'Clinic Capacity Threshold', description: 'Kibera primary health facilities projected to exceed safe capacity in 12 days.', timestamp: '1 hr ago', region: 'Kibera' },
  { id: 'a4', severity: 'medium', title: 'Trust Deficit Emerging', description: 'Community sentiment surveys indicate declining trust in county resource allocation.', timestamp: '3 hr ago', region: 'Nairobi' },
  { id: 'a5', severity: 'low', title: 'Drought Probability Shift', description: 'Seasonal forecast models revising Rift Valley drought probability upward by 8%.', timestamp: '6 hr ago', region: 'East Africa' },
];

export const recommendations: Recommendation[] = [
  { id: 'r1', priority: 'critical', title: 'Deploy emergency water pipeline reinforcement', description: 'Mobilize engineering teams to Nakuru pipeline junction. Estimated cost: $240K. Risk reduction: 72%.', confidence: 89, pillarImpact: { goodness: 15, perseverance: 5, love: 8 } },
  { id: 'r2', priority: 'high-leverage', title: 'Activate food corridor stabilization protocol', description: 'Redirect logistics through Mombasa secondary corridor. Coordinate with 3 transport unions.', confidence: 76, pillarImpact: { goodness: 10, affection: 8, perseverance: 6 } },
  { id: 'r3', priority: 'high-leverage', title: 'Invest in local regenerative agriculture', description: 'Scale Nakuru agroforestry pilot to 12 additional communities. 4x regenerative value potential.', confidence: 82, pillarImpact: { love: 14, godliness: 10, goodness: 12 } },
  { id: 'r4', priority: 'watch', title: 'Monitor clinic load trajectory', description: 'Increase health data collection frequency in Kibera. Prepare surge response framework.', confidence: 65, pillarImpact: { knowledge: 8, 'self-control': 5 } },
];

export const feedEvents: FeedEvent[] = [
  { id: 'f1', category: 'water', title: 'Water access dropped 8% in peri-urban zones', timestamp: '5 min ago', impactLevel: 'high', direction: 'negative' },
  { id: 'f2', category: 'trust', title: 'Community sentiment improved after local coordination event', timestamp: '22 min ago', impactLevel: 'medium', direction: 'positive' },
  { id: 'f3', category: 'health', title: 'Clinic load projected to exceed safe threshold in 12 days', timestamp: '1 hr ago', impactLevel: 'high', direction: 'negative' },
  { id: 'f4', category: 'employment', title: 'Youth employment intervention showing early gains in Kibera', timestamp: '2 hr ago', impactLevel: 'medium', direction: 'positive' },
  { id: 'f5', category: 'food', title: 'Rift Valley crop yield forecast revised downward 14%', timestamp: '3 hr ago', impactLevel: 'high', direction: 'negative' },
  { id: 'f6', category: 'energy', title: 'Solar microgrid output stable across Nakuru district', timestamp: '4 hr ago', impactLevel: 'low', direction: 'positive' },
  { id: 'f7', category: 'climate', title: 'Rainfall deficit deepening in northern corridor', timestamp: '5 hr ago', impactLevel: 'medium', direction: 'negative' },
  { id: 'f8', category: 'security', title: 'Community safety indicators stable post-election cycle', timestamp: '8 hr ago', impactLevel: 'low', direction: 'positive' },
];

export const initiatives: Initiative[] = [
  { id: 'i1', name: 'Regenerative Water Grid Pilot', completion: 67, status: 'on-track', lead: 'Ministry of Water', frictionPoints: ['Supply chain delays for filtration units'], resilience: 78 },
  { id: 'i2', name: 'Community Health Routing Upgrade', completion: 43, status: 'at-risk', lead: 'Health Commission', frictionPoints: ['Staff shortage', 'Data integration lag'], resilience: 52 },
  { id: 'i3', name: 'Food Corridor Stabilization', completion: 81, status: 'on-track', lead: 'Agriculture Board', frictionPoints: ['Transport fuel costs'], resilience: 85 },
  { id: 'i4', name: 'Trust Network Activation', completion: 28, status: 'delayed', lead: 'Community Affairs', frictionPoints: ['Stakeholder alignment', 'Budget approval pending'], resilience: 41 },
];

export const causalChains: CausalChain[] = [
  { id: 'cc1', steps: [
    { label: 'Drought intensification', severity: 'high' },
    { label: 'Crop yield decline', severity: 'high' },
    { label: 'Food price shock', severity: 'critical' },
    { label: 'Urban migration pressure', severity: 'medium' },
    { label: 'Social unrest risk', severity: 'critical' },
  ]},
  { id: 'cc2', steps: [
    { label: 'Pipeline stress', severity: 'critical' },
    { label: 'Water access reduction', severity: 'high' },
    { label: 'Sanitation crisis', severity: 'high' },
    { label: 'Disease outbreak risk', severity: 'critical' },
  ]},
  { id: 'cc3', steps: [
    { label: 'Trust deficit', severity: 'medium' },
    { label: 'Coordination failure', severity: 'high' },
    { label: 'Resource misallocation', severity: 'high' },
    { label: 'Community disengagement', severity: 'medium' },
  ]},
];

export const worldNodes: WorldNode[] = [
  { id: 'nairobi', label: 'Nairobi', x: 55, y: 45, status: 'stressed', type: 'city', overlays: { water: 62, food: 71, health: 55, energy: 78, trust: 48, climate: 60 } },
  { id: 'nakuru', label: 'Nakuru', x: 38, y: 35, status: 'critical', type: 'city', overlays: { water: 34, food: 65, health: 72, energy: 81, trust: 58, climate: 45 } },
  { id: 'kibera', label: 'Kibera', x: 60, y: 55, status: 'stressed', type: 'city', overlays: { water: 41, food: 58, health: 38, energy: 52, trust: 35, climate: 55 } },
  { id: 'rift-valley', label: 'Rift Valley', x: 30, y: 25, status: 'stressed', type: 'resource', overlays: { water: 28, food: 42, health: 65, energy: 70, trust: 62, climate: 32 } },
  { id: 'mombasa', label: 'Mombasa', x: 75, y: 70, status: 'stable', type: 'city', overlays: { water: 72, food: 78, health: 68, energy: 85, trust: 70, climate: 65 } },
  { id: 'food-system', label: 'Food Network', x: 45, y: 60, status: 'stressed', type: 'system', overlays: { food: 52, water: 45, trust: 55, climate: 40 } },
  { id: 'health-system', label: 'Health Grid', x: 65, y: 35, status: 'stable', type: 'system', overlays: { health: 64, water: 58, trust: 60, energy: 72 } },
  { id: 'energy-grid', label: 'Energy Grid', x: 25, y: 55, status: 'stable', type: 'system', overlays: { energy: 82, climate: 55, trust: 68 } },
];

export const worldConnections: WorldConnection[] = [
  { from: 'nairobi', to: 'kibera', strength: 0.9, type: 'dependency' },
  { from: 'nakuru', to: 'rift-valley', strength: 0.8, type: 'dependency' },
  { from: 'rift-valley', to: 'food-system', strength: 0.85, type: 'flow' },
  { from: 'food-system', to: 'nairobi', strength: 0.7, type: 'flow' },
  { from: 'mombasa', to: 'food-system', strength: 0.6, type: 'flow' },
  { from: 'health-system', to: 'nairobi', strength: 0.75, type: 'dependency' },
  { from: 'health-system', to: 'kibera', strength: 0.65, type: 'dependency' },
  { from: 'energy-grid', to: 'nakuru', strength: 0.7, type: 'flow' },
  { from: 'energy-grid', to: 'nairobi', strength: 0.8, type: 'flow' },
  { from: 'nakuru', to: 'nairobi', strength: 0.5, type: 'risk' },
];

export const simulationResults: SimulationResult[] = [
  {
    scenarioId: 'water',
    pillars: {
      goodness: { before: 68, after: 80 },
      knowledge: { before: 74, after: 77 },
      'self-control': { before: 71, after: 69 },
      perseverance: { before: 65, after: 70 },
      godliness: { before: 77, after: 85 },
      affection: { before: 59, after: 69 },
      love: { before: 72, after: 86 },
    },
    riskReduction: 34,
    timelineMonths: 18,
  },
  {
    scenarioId: 'food',
    pillars: {
      goodness: { before: 68, after: 76 },
      knowledge: { before: 74, after: 79 },
      'self-control': { before: 71, after: 72 },
      perseverance: { before: 65, after: 72 },
      godliness: { before: 77, after: 83 },
      affection: { before: 59, after: 63 },
      love: { before: 72, after: 81 },
    },
    riskReduction: 28,
    timelineMonths: 24,
  },
  {
    scenarioId: 'health',
    pillars: {
      goodness: { before: 68, after: 83 },
      knowledge: { before: 74, after: 82 },
      'self-control': { before: 71, after: 74 },
      perseverance: { before: 65, after: 62 },
      godliness: { before: 77, after: 87 },
      affection: { before: 59, after: 65 },
      love: { before: 72, after: 83 },
    },
    riskReduction: 41,
    timelineMonths: 12,
  },
];
