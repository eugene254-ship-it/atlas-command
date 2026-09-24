# Atlas Sanctum

## 7 Pillar Command Interface

> **A real-time moral, strategic, and civilizational decision cockpit for making wiser decisions under uncertainty.**

Atlas Sanctum is a frontend MVP for a high-stakes decision environment where leaders can see the state of a region, understand systemic risk, explore causal relationships, simulate interventions, and evaluate decisions through seven human-centered pillars:

1. **Goodness**
2. **Knowledge**
3. **Self-Control**
4. **Perseverance**
5. **Godliness**
6. **Mutual Affection**
7. **Love**

The interface is intentionally **not** a conventional analytics dashboard. It combines the visual language of mission control, geopolitical intelligence, ethical AI oversight, and simulation-based decision systems into one calm, institutional command surface.

---

## Product Vision

Atlas Sanctum is designed around a simple principle:

> **Help a leader make wiser decisions under uncertainty.**

The system brings together strategic reality, ethical constraints, human impact, coordination, risk, and long-term flourishing in one interface.

The primary experience is built around five spatial ideas:

| Area | Role |
|---|---|
| **Center** | Reality / live world model |
| **Left** | Moral compass / seven pillar status |
| **Right** | Execution, risk, and recommendations |
| **Top** | Time, region, scenario, and simulation controls |
| **Bottom** | Human impact and mission execution |

---

## Core Product Goals

Atlas Sanctum enables a leader to:

- View a global or regional state in near-real-time through mock system intelligence.
- Inspect systemic risk, coordination pressure, and human impact.
- Monitor all seven pillars with live scores and trend signals.
- Explore how systems influence one another through causal chains.
- Run scenario simulations against multiple dimensions of impact.
- Compare decisions across ethics, resilience, risk, and human outcomes.
- Receive structured recommendations with confidence and uncertainty signals.
- Keep human consequences visible instead of reducing reality to abstract metrics.

The experience should create a sense of:

- clarity under pressure
- moral seriousness
- strategic agency
- groundedness in real-world consequences
- calm control rather than visual noise

---

## The Seven Pillars

Each pillar acts as a distinct lens on decision quality and system health.

### 1. Goodness — Impact Score

Measures whether an action produces net positive human, ecological, and distributive outcomes.

Example signals:

- Lives improved
- Ecosystem recovery
- Economic fairness

Example interpretation:

> “Net positive but unevenly distributed”

Example guardrail:

> “This decision increases GDP but harms 12,000 households.”

### 2. Knowledge — Truth Confidence

Measures the quality, traceability, and uncertainty of the evidence behind a decision.

Example signals:

- Verified vs. unverified data
- Conflicting signals
- Model confidence
- Source traceability

Example interpretation:

> “Strong evidence, moderate uncertainty”

### 3. Self-Control — Decision Risk Guard

Surfaces impulsive or unstable decision patterns before execution.

Example signals:

- Impulse-risk meter
- Red flags
- Long-term failure risk
- Constraint violations

Example interpretation:

> “High restraint against reactive policy”

### 4. Perseverance — Execution Strength

Measures whether an initiative can maintain momentum under pressure.

Example signals:

- Mission progress
- Timeline drift
- Execution friction
- Resilience

Example interpretation:

> “Execution stable under strain”

### 5. Godliness — Alignment Engine

Evaluates long-horizon alignment across economic, ethical, ecological, and human-dignity dimensions.

Example signals:

- Economic alignment
- Ethical alignment
- Ecological stability
- Human dignity

Example interpretation:

> “Aligned with long-term moral constraints”

### 6. Mutual Affection — Trust Graph

Measures coordination and relational trust across institutions and communities.

Example signals:

- Government ↔ NGO ↔ community alignment
- Coordination reliability
- Trust scores
- Breakdown risk

Example interpretation:

> “Coordination trust improving”

### 7. Love — Regenerative Value Score

Measures long-term flourishing and the balance between value created and value extracted.

Example signals:

- Flourishing index
- Long-term human benefit
- Environmental regeneration
- Regenerative value creation

Example interpretation:

> “Flourishing value creation is rising”

---

## Primary Dashboard

The MVP is organized around a single command dashboard.

### Top Bar

The top bar provides operational context and control:

- Atlas Sanctum product identity
- Region selector
- Timeline selector
- Scenario selector
- **Run Simulation** action
- **Compare Decisions** action
- Current system status indicator

### Left Sidebar — Seven Pillars

Each pillar card contains:

- icon
- pillar name
- live score from 0–100
- one-line interpretation
- trend indicator
- interactive selection state

Selecting a pillar opens deeper detail containing:

- explanation
- supporting metrics
- implications
- factors that improve the pillar
- factors that harm the pillar

### Center — Live World Model

The center of the interface is the primary visual focus and represents the current state of the system.

It uses a stylized, frontend-only systems visualization composed of:

- nodes
- connections
- flows
- pulses
- status cards
- system overlays
- local/regional indicators

Supported modes:

#### Reality

Shows the current state of the modeled system.

#### Causality

Shows drivers and influence paths such as:

```text
drought
  ↓
crop loss
  ↓
price shock
  ↓
unrest risk
```

#### Simulation

Shows projected effects of the selected scenario across multiple systems, including compact forecast cards and mini visualizations.

### Right Sidebar — Risk + Recommendations

The risk panel contains:

- systemic risk score
- active alert list
- cascade/failure-chain visualization
- uncertainty/confidence widget
- prioritized recommendations
- ethical or alignment warning

Recommendation priority labels include:

- **Critical**
- **High Leverage**
- **Watch**

### Bottom — Human Impact + Mission Execution

The bottom section is split into two complementary views.

#### Human Impact Feed

Combines quantitative signals with human-centered narratives, for example:

- Water access dropped 8% in peri-urban zones.
- Community sentiment improved after a local coordination event.
- Clinic load is projected to exceed a safe threshold in 12 days.
- Youth employment intervention is showing early gains.

Each event includes:

- category
- recency/timestamp
- impact or signal strength

#### Mission / Execution Panel

Tracks initiatives such as:

- Regenerative Water Grid Pilot
- Community Health Routing Upgrade
- Food Corridor Stabilization
- Trust Network Activation

Each initiative can expose:

- completion percentage
- lead status
- friction points
- milestone health
- resilience indicator
- delivery momentum

---

## Supported Controls

### Regions

The mock MVP can switch between:

- Kenya
- Nairobi
- Nakuru
- Kibera
- East Africa

### Timelines

- Now
- 30 Days
- 1 Year
- 10 Years

### Scenarios

- Baseline
- Water Intervention
- Food Resilience Plan
- Public Health Surge Response

Running a simulation should visibly update at minimum:

- pillar scores
- recommendation cards
- risk score
- human impact feed

---

## Kenya-Centered Mock Context

The MVP uses Kenya-centered examples to make the interface feel concrete while remaining fully frontend-only.

Example domain context includes:

- Kibera sanitation stress
- Nakuru water resilience
- Nairobi clinic load
- Rift Valley drought pressure
- food supply chain instability
- youth livelihood interventions
- trust coordination across county government, NGOs, and communities

These are **mock product scenarios**, not live or authoritative measurements.

---

## Visual Direction

Atlas Sanctum should feel:

- dark
- futuristic
- institutional
- sacred
- strategic
- calm
- cinematic
- intelligent

The UI uses:

- dark glass panels
- translucent graphite surfaces
- subtle borders
- restrained glows
- fine grid overlays
- premium typography
- smooth but restrained motion
- deliberate spacing and hierarchy

Avoid:

- childish visuals
- excessive neon
- game-like UI patterns
- decorative noise
- hype-heavy product copy

### Color System

| Pillar | Accent |
|---|---|
| Goodness | Green |
| Knowledge | Blue |
| Self-Control | Violet |
| Perseverance | Red |
| Godliness | Gold |
| Mutual Affection | Orange |
| Love | Rose |

The overall background remains near-black / deep slate, with charcoal and translucent graphite panel surfaces.

---

## Technology Stack

The MVP is intended for:

- **React**
- **TypeScript**
- **Vite**
- **Tailwind CSS**
- **shadcn/ui-style components**
- **lucide-react** for icons
- **Recharts** for charts
- **Framer Motion** for subtle motion
- **Zustand or lightweight React state** for dashboard state

There is **no backend requirement** for the MVP.

All data is represented through strongly typed mock data and local application state.

---

## Suggested Project Structure

```text
src/
├── components/
│   └── dashboard/
│       ├── TopBar.tsx
│       ├── PillarSidebar.tsx
│       ├── PillarCard.tsx
│       ├── WorldModelPanel.tsx
│       ├── WorldModelTabs.tsx
│       ├── RiskPanel.tsx
│       ├── HumanImpactFeed.tsx
│       ├── MissionExecutionPanel.tsx
│       ├── RecommendationCard.tsx
│       ├── AlertList.tsx
│       ├── PillarDetailDrawer.tsx
│       ├── SystemOverlayChips.tsx
│       └── SimulationSummary.tsx
├── data/
│   └── mockDashboard.ts
├── types/
│   └── dashboard.ts
├── pages/
│   └── Dashboard.tsx
├── App.tsx
└── main.tsx
```

The structure can evolve as the implementation grows, but responsibilities should remain separated between UI components, domain types, mock data, and page composition.

---

## Domain Model

The frontend should keep the domain strongly typed.

Recommended entities include:

```ts
Pillar
Alert
Recommendation
FeedEvent
Initiative
ScenarioOption
Region
SystemOverlay
CausalChain
SimulationResult
```

A typical pillar object should contain at least:

```ts
{
  id: string;
  name: string;
  score: number;
  delta: number;
  trend: "up" | "down" | "stable";
  descriptor: string;
  accent: string;
}
```

Simulation results should model changes across multiple pillars and system dimensions rather than returning a single generic score.

---

## Expected Interactions

The MVP should feel interactive rather than static.

### Region Selection

Changing the region updates the displayed context and mock system values.

### Scenario Selection

Changing the scenario updates the selected decision context and associated metrics.

### Simulation

Clicking **Run Simulation** triggers a lightweight animated state transition and updates:

- pillar scores
- risk levels
- recommendations
- human impact events
- simulation summaries

### Pillar Exploration

Clicking a pillar opens a detail drawer, modal, or center sub-panel.

### World Model Tabs

Switching between Reality, Causality, and Simulation changes the center visualization and supporting information.

### Overlay Chips

Selecting Water, Food, Health, Energy, Trust, or Climate changes which system layer is emphasized.

### Premium Motion

Hover and selection states should use subtle transitions, opacity shifts, glow changes, and positional movement rather than excessive animation.

---

## Charts and Visualizations

Use **Recharts** selectively for:

- pillar trend sparklines
- risk trend mini charts
- initiative progress/resilience charts
- simulation comparison bars

Visualization rules:

- avoid clutter
- prefer legibility over density
- use charts to explain decisions, not decorate cards
- reserve strong accent colors for meaningful states

The center world model may use SVG, CSS, or lightweight React-rendered diagrams rather than an external mapping provider.

---

## Core User Flow

A representative workflow looks like this:

```text
Leader opens Atlas Sanctum
        ↓
Reviews regional state
        ↓
Sees elevated food-system risk
        ↓
Selects region
        ↓
Expands causal chain
        ↓
Chooses a scenario
        ↓
Runs simulation
        ↓
System updates all seven pillars
        ↓
Risk + human impact + execution state update
        ↓
Leader reviews trade-offs and uncertainty
        ↓
Decision recommendation is surfaced
```

Example simulation output:

```text
Goodness       +22 impact
Knowledge      81% confidence
Self-Control   Medium decision risk
Perseverance   Strong execution
Godliness      Aligned
Affection      Trust improving
Love           High long-term value
```

The product experience should emphasize the **trade-offs and evidence behind the result**, not just produce a single winner or score.

---

## Data and Simulation Philosophy

The MVP uses mock data to simulate a complex decision environment.

The data model should support relationships between:

```text
Region
  ↓
System Overlay
  ↓
Risk / Signal
  ↓
Causal Chain
  ↓
Scenario Intervention
  ↓
Simulation Result
  ↓
Seven Pillars
  ↓
Recommendations + Human Impact
```

This makes the frontend architecture compatible with a future backend, streaming telemetry layer, or model-serving system without forcing the MVP to depend on one today.

---

## Accessibility and UX Quality

The MVP should include:

- semantic buttons and controls
- visible focus states
- accessible labels where practical
- readable contrast on dark surfaces
- meaningful empty and loading states
- responsive behavior with desktop as the primary target
- interaction feedback for selected and active states

The goal is not maximal data density. The goal is **fast comprehension under pressure**.

---

## Local Setup

### Prerequisites

- Node.js 18+ recommended
- npm, pnpm, or yarn

### Install

```bash
npm install
```

### Run Development Server

```bash
npm run dev
```

Vite will start the local development server and expose the app in the browser.

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

---

## Recommended Dependencies

A typical setup can include:

```bash
npm install react react-dom lucide-react recharts framer-motion zustand
npm install -D typescript vite tailwindcss @types/react @types/react-dom
```

For a shadcn/ui-style implementation, add only the primitives actually used by the dashboard (for example buttons, cards, badges, dropdowns, dialogs, drawers, tabs, and tooltips).

---

## State Management

A minimal MVP can use React state for local interaction.

Zustand becomes useful when state needs to span multiple dashboard regions, such as:

- selected region
- selected scenario
- selected pillar
- selected world-model tab
- selected system overlay
- simulation state
- comparison mode

Keep state close to the domain and avoid creating a global store for purely presentational UI state.

---

## Mock Data Strategy

Mock data should look operationally credible without pretending to be real-world truth.

Good mock content should express:

- concrete regions
- concrete systems
- realistic signal names
- explicit uncertainty
- meaningful time horizons
- observable consequences
- human impact

Avoid placeholders such as lorem ipsum, generic “Metric A”, or meaningless percentages.

---

## Product Assumptions

The following assumptions define the MVP boundary:

1. **Frontend only.** There is no production data pipeline, authentication system, or backend service in the initial build.
2. **Mock data is illustrative.** The dashboard values and narratives are synthetic and should not be interpreted as live intelligence.
3. **Simulation is deterministic or locally randomized.** The MVP demonstrates interaction and information architecture rather than validating scientific forecasting quality.
4. **Stylized world model.** A custom SVG/network visualization is preferred over integrating a heavyweight external map for the MVP.
5. **Desktop-first.** The primary composition is optimized for large screens while remaining responsive on smaller viewports.
6. **Dark theme only.** The visual system is intentionally constrained to preserve the command-center aesthetic.
7. **Ethical evaluation is multidimensional.** The interface exposes multiple lenses and uncertainty instead of collapsing every decision into a single universal metric.

---

## MVP Scope

### Included

- Single-page dashboard
- Seven pillar system
- Region selector
- Timeline selector
- Scenario selector
- Live-looking world model
- Reality / Causality / Simulation tabs
- System overlay controls
- Risk panel
- Alert list
- Recommendations
- Human impact feed
- Mission execution panel
- Pillar detail view
- Simulation transitions
- Recharts-based mini visualizations
- Framer Motion micro-interactions
- Fully mocked, strongly typed domain data

### Deliberately Deferred

- production authentication and authorization
- live geopolitical feeds
- satellite/IoT ingestion
- real-time event streaming infrastructure
- model-serving infrastructure
- production-grade geospatial rendering
- persistent scenario storage
- collaborative multi-user workflows
- audit-grade decision provenance
- verified policy or humanitarian datasets

---

## Future Expansion

Atlas Sanctum can evolve from a visual MVP into a broader decision operating system.

Potential future layers include:

### Data Fabric

Connect structured data from:

- climate systems
- water infrastructure
- health systems
- economic indicators
- food supply chains
- mobility
- social sentiment
- institutional coordination

### Causal Intelligence

Replace static causal chains with model-backed causal graphs that surface:

- leading indicators
- intervention points
- second-order effects
- cross-system dependencies

### Scenario Laboratory

Enable leaders to define intervention bundles and evaluate them across:

- risk
- human impact
- resilience
- ecological stability
- institutional trust
- uncertainty
- long-term flourishing

### Decision Provenance

Record:

- source evidence
- assumptions
- model version
- confidence
- decision rationale
- observed outcome

### Multi-Actor Coordination

Extend the trust graph to represent:

- national government
- county governments
- NGOs
- communities
- private sector
- humanitarian actors
- international organizations

---

## Design Principles

Every product decision should reinforce these principles:

### Truth

Surface evidence, uncertainty, conflicts, and limitations.

### Moral Alignment

Make consequences visible instead of hiding them behind aggregate KPIs.

### Risk Visibility

Reveal cascading risks before they become failures.

### Resilience

Measure the ability of people and systems to withstand shocks and continue operating.

### Coordination

Treat trust and execution relationships as part of system health.

### Flourishing

Look beyond short-term extraction toward long-term human and ecological value.

---

## Product Language

Interface copy should feel:

- strategic
- ethical
- intelligent
- clear
- institutional
- human-centered

Avoid hype language inside the command interface. The product should sound like a trusted decision system, not a marketing site.

---

## Example Recommendation Pattern

Recommendations should provide context rather than a black-box directive.

A useful recommendation card can contain:

```text
HIGH LEVERAGE

Invest in local regenerative agriculture

Why it matters
Food resilience is under pressure across the modeled region.

Expected effect
• Reduces supply-chain fragility
• Improves household resilience
• Supports ecological recovery

Trade-offs
• Slower near-term output growth
• Requires coordination across local actors

Confidence
81%

Uncertainty
Moderate
```

The interface should help a leader understand **why** a recommendation exists and **where uncertainty remains**.

---

## Development Guidance

When implementing the MVP:

- keep components small and composable
- keep domain types centralized
- keep mock data separate from rendering logic
- prefer reusable card, badge, tab, drawer, and metric primitives
- centralize pillar color metadata
- avoid hard-coded duplicated labels
- use animation to clarify state changes, not distract from information
- keep the center world model visually dominant
- make critical warnings visually distinct but restrained

A polished Atlas Sanctum implementation should feel like a system someone could trust during a difficult decision — not because it claims certainty, but because it makes uncertainty, consequences, and trade-offs visible.

---

## Status

**Product stage:** Frontend MVP / Prototype

**Data mode:** Mock data

**Backend:** None required

**Primary target:** Desktop command interface

**Theme:** Dark only

**Core principle:**

> **Help a leader make wiser decisions under uncertainty.**
