import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { Area, AreaChart, ResponsiveContainer } from 'recharts';
import type { Pillar, PillarId } from '@/types/dashboard';
import { pillarConfig } from '@/lib/dashboardConfig';
import { AnimatedScore } from './AnimatedScore';

interface PillarCardProps {
  pillar: Pillar;
  isSelected: boolean;
  onClick: (id: PillarId) => void;
}

export function PillarCard({ pillar, isSelected, onClick }: PillarCardProps) {
  const config = pillarConfig[pillar.id];
  const Icon = config.icon;
  const trendData = pillar.trend.map((v, i) => ({ v, i }));

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={() => onClick(pillar.id)}
      className={`w-full glass-panel p-3 text-left transition-all duration-300 ${
        isSelected ? config.glowClass + ' border-current/30' : 'hover:border-border/60'
      }`}
    >
      <div className="flex items-center gap-2 mb-1.5">
        <Icon className={`w-3.5 h-3.5 ${config.colorClass}`} />
        <span className="text-[11px] font-medium text-foreground tracking-wide uppercase">{pillar.name}</span>
        <AnimatedScore value={pillar.score} className="ml-auto text-sm text-foreground" />
      </div>

      <div className="flex items-center gap-2">
        <div className="flex-1 h-6">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={trendData}>
              <defs>
                <linearGradient id={`grad-${pillar.id}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={`hsl(var(--pillar-${pillar.id === 'self-control' ? 'self-control' : pillar.id === 'affection' ? 'affection' : pillar.id}))`} stopOpacity={0.3} />
                  <stop offset="100%" stopColor={`hsl(var(--pillar-${pillar.id === 'self-control' ? 'self-control' : pillar.id === 'affection' ? 'affection' : pillar.id}))`} stopOpacity={0} />
                </linearGradient>
              </defs>
              <Area
                type="monotone"
                dataKey="v"
                stroke={`hsl(var(--pillar-${pillar.id === 'self-control' ? 'self-control' : pillar.id === 'affection' ? 'affection' : pillar.id}))`}
                fill={`url(#grad-${pillar.id})`}
                strokeWidth={1.5}
                dot={false}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="flex items-center gap-0.5">
          {pillar.delta > 0 ? (
            <TrendingUp className="w-3 h-3 text-status-stable" />
          ) : pillar.delta < 0 ? (
            <TrendingDown className="w-3 h-3 text-status-critical" />
          ) : (
            <Minus className="w-3 h-3 text-muted-foreground" />
          )}
          <span className={`text-[10px] font-mono ${
            pillar.delta > 0 ? 'text-status-stable' : pillar.delta < 0 ? 'text-status-critical' : 'text-muted-foreground'
          }`}>
            {pillar.delta > 0 ? '+' : ''}{pillar.delta}
          </span>
        </div>
      </div>

      <p className="text-[10px] text-muted-foreground mt-1.5 leading-tight">{pillar.descriptor}</p>
    </motion.button>
  );
}
