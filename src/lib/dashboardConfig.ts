import { PillarId, SystemOverlay } from '@/types/dashboard';
import {
  Heart, BookOpen, Shield, Mountain, Sparkles, Users, HeartHandshake,
  Droplets, Wheat, Stethoscope, Zap, Handshake, Cloud
} from 'lucide-react';

export const pillarConfig: Record<PillarId, { icon: typeof Heart; colorClass: string; glowClass: string; bgClass: string }> = {
  goodness: { icon: Heart, colorClass: 'text-pillar-goodness', glowClass: 'pillar-glow-goodness', bgClass: 'bg-pillar-goodness' },
  knowledge: { icon: BookOpen, colorClass: 'text-pillar-knowledge', glowClass: 'pillar-glow-knowledge', bgClass: 'bg-pillar-knowledge' },
  'self-control': { icon: Shield, colorClass: 'text-pillar-self-control', glowClass: 'pillar-glow-self-control', bgClass: 'bg-pillar-self-control' },
  perseverance: { icon: Mountain, colorClass: 'text-pillar-perseverance', glowClass: 'pillar-glow-perseverance', bgClass: 'bg-pillar-perseverance' },
  godliness: { icon: Sparkles, colorClass: 'text-pillar-godliness', glowClass: 'pillar-glow-godliness', bgClass: 'bg-pillar-godliness' },
  affection: { icon: Users, colorClass: 'text-pillar-affection', glowClass: 'pillar-glow-affection', bgClass: 'bg-pillar-affection' },
  love: { icon: HeartHandshake, colorClass: 'text-pillar-love', glowClass: 'pillar-glow-love', bgClass: 'bg-pillar-love' },
};

export const overlayConfig: Record<SystemOverlay, { icon: typeof Droplets; label: string; color: string }> = {
  water: { icon: Droplets, label: 'Water', color: 'text-pillar-knowledge' },
  food: { icon: Wheat, label: 'Food', color: 'text-pillar-goodness' },
  health: { icon: Stethoscope, label: 'Health', color: 'text-pillar-perseverance' },
  energy: { icon: Zap, label: 'Energy', color: 'text-pillar-godliness' },
  trust: { icon: Handshake, label: 'Trust', color: 'text-pillar-affection' },
  climate: { icon: Cloud, label: 'Climate', color: 'text-pillar-self-control' },
};
