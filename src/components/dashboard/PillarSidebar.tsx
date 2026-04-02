import { motion } from 'framer-motion';
import type { Pillar, PillarId } from '@/types/dashboard';
import { PillarCard } from './PillarCard';

interface PillarSidebarProps {
  pillars: Pillar[];
  selectedPillar: PillarId | null;
  onSelectPillar: (id: PillarId) => void;
}

export function PillarSidebar({ pillars, selectedPillar, onSelectPillar }: PillarSidebarProps) {
  return (
    <motion.aside
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4 }}
      className="w-[240px] flex-shrink-0 flex flex-col gap-2 overflow-y-auto scrollbar-thin pr-1"
    >
      <div className="px-1 py-1">
        <h2 className="text-[10px] font-semibold tracking-[0.2em] text-muted-foreground uppercase">Pillar Status</h2>
      </div>
      {pillars.map((p, i) => (
        <motion.div
          key={p.id}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.05 }}
        >
          <PillarCard pillar={p} isSelected={selectedPillar === p.id} onClick={onSelectPillar} />
        </motion.div>
      ))}
    </motion.aside>
  );
}
