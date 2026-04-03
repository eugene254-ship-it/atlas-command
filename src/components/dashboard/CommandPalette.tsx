import { useEffect, useState, useCallback } from 'react';
import {
  CommandDialog, CommandInput, CommandList, CommandEmpty,
  CommandGroup, CommandItem, CommandShortcut,
} from '@/components/ui/command';
import { pillarConfig, overlayConfig } from '@/lib/dashboardConfig';
import { scenarios } from '@/data/mockDashboard';
import {
  Play, GitCompare, Maximize2, Keyboard,
  MapPin, Clock, Layers,
} from 'lucide-react';
import type { PillarId, SystemOverlay } from '@/types/dashboard';

interface CommandPaletteProps {
  onSelectPillar: (id: PillarId) => void;
  onRunSimulation: () => void;
  onCompare: () => void;
  onToggleFocusMode: () => void;
  onToggleOverlay: (o: SystemOverlay) => void;
  onScenarioChange: (s: string) => void;
  isSimulating: boolean;
}

const pillarNames: Record<PillarId, string> = {
  goodness: 'Goodness',
  knowledge: 'Knowledge',
  'self-control': 'Self-Control',
  perseverance: 'Perseverance',
  godliness: 'Godliness',
  affection: 'Mutual Affection',
  love: 'Love',
};

export function CommandPalette({
  onSelectPillar, onRunSimulation, onCompare,
  onToggleFocusMode, onToggleOverlay, onScenarioChange, isSimulating,
}: CommandPaletteProps) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen(o => !o);
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  const runAndClose = useCallback((fn: () => void) => {
    fn();
    setOpen(false);
  }, []);

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <CommandInput placeholder="Search pillars, actions, scenarios…" />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>

        <CommandGroup heading="Pillars">
          {(Object.keys(pillarNames) as PillarId[]).map((id, i) => {
            const cfg = pillarConfig[id];
            const Icon = cfg.icon;
            return (
              <CommandItem key={id} onSelect={() => runAndClose(() => onSelectPillar(id))}>
                <Icon className={`mr-2 h-4 w-4 ${cfg.colorClass}`} />
                <span>{pillarNames[id]}</span>
                <CommandShortcut>{i + 1}</CommandShortcut>
              </CommandItem>
            );
          })}
        </CommandGroup>

        <CommandGroup heading="Actions">
          <CommandItem onSelect={() => runAndClose(onRunSimulation)} disabled={isSimulating}>
            <Play className="mr-2 h-4 w-4" />
            <span>Run Simulation</span>
            <CommandShortcut>R</CommandShortcut>
          </CommandItem>
          <CommandItem onSelect={() => runAndClose(onCompare)}>
            <GitCompare className="mr-2 h-4 w-4" />
            <span>Compare Decisions</span>
            <CommandShortcut>C</CommandShortcut>
          </CommandItem>
          <CommandItem onSelect={() => runAndClose(onToggleFocusMode)}>
            <Maximize2 className="mr-2 h-4 w-4" />
            <span>Toggle Focus Mode</span>
            <CommandShortcut>F</CommandShortcut>
          </CommandItem>
        </CommandGroup>

        <CommandGroup heading="Scenarios">
          {scenarios.map(s => (
            <CommandItem key={s.id} onSelect={() => runAndClose(() => onScenarioChange(s.id))}>
              <Layers className="mr-2 h-4 w-4" />
              <span>{s.name}</span>
            </CommandItem>
          ))}
        </CommandGroup>

        <CommandGroup heading="Overlays">
          {(Object.keys(overlayConfig) as SystemOverlay[]).map(o => {
            const cfg = overlayConfig[o];
            const Icon = cfg.icon;
            return (
              <CommandItem key={o} onSelect={() => runAndClose(() => onToggleOverlay(o))}>
                <Icon className={`mr-2 h-4 w-4 ${cfg.color}`} />
                <span>Toggle {cfg.label}</span>
              </CommandItem>
            );
          })}
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
}
