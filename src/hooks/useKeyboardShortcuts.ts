import { useEffect } from 'react';
import { toast } from 'sonner';
import type { PillarId } from '@/types/dashboard';

const pillarKeys: Record<string, PillarId> = {
  '1': 'goodness',
  '2': 'knowledge',
  '3': 'self-control',
  '4': 'perseverance',
  '5': 'godliness',
  '6': 'affection',
  '7': 'love',
};

interface UseKeyboardShortcutsProps {
  onSelectPillar: (id: PillarId | null) => void;
  onRunSimulation: () => void;
  onCompare: () => void;
  onToggleFocusMode: () => void;
  selectedPillar: PillarId | null;
  isSimulating: boolean;
  selectedScenario: string;
}

export function useKeyboardShortcuts({
  onSelectPillar,
  onRunSimulation,
  onCompare,
  onToggleFocusMode,
  selectedPillar,
  isSimulating,
  selectedScenario,
}: UseKeyboardShortcutsProps) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      // Don't fire when typing in inputs
      const tag = (e.target as HTMLElement).tagName;
      if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') return;

      if (e.key === 'Escape') {
        e.preventDefault();
        onSelectPillar(null);
        return;
      }

      if (pillarKeys[e.key]) {
        e.preventDefault();
        const pid = pillarKeys[e.key];
        onSelectPillar(selectedPillar === pid ? null : pid);
        return;
      }

      if (e.key.toLowerCase() === 'r' && !e.metaKey && !e.ctrlKey) {
        e.preventDefault();
        if (!isSimulating && selectedScenario !== 'baseline') {
          onRunSimulation();
        }
        return;
      }

      if (e.key.toLowerCase() === 'c' && !e.metaKey && !e.ctrlKey) {
        e.preventDefault();
        onCompare();
        return;
      }

      if (e.key.toLowerCase() === 'f' && !e.metaKey && !e.ctrlKey) {
        e.preventDefault();
        onToggleFocusMode();
        return;
      }
    };

    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onSelectPillar, onRunSimulation, onCompare, onToggleFocusMode, selectedPillar, isSimulating, selectedScenario]);
}
