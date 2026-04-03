import { useEffect, useRef, useState } from 'react';
import { motion, useSpring, useTransform } from 'framer-motion';

interface AnimatedScoreProps {
  value: number;
  className?: string;
}

export function AnimatedScore({ value, className = '' }: AnimatedScoreProps) {
  const spring = useSpring(value, { stiffness: 80, damping: 20 });
  const display = useTransform(spring, v => Math.round(v));
  const [displayValue, setDisplayValue] = useState(value);
  const prevValue = useRef(value);
  const [flash, setFlash] = useState<'up' | 'down' | null>(null);

  useEffect(() => {
    spring.set(value);

    if (value !== prevValue.current) {
      setFlash(value > prevValue.current ? 'up' : 'down');
      const timeout = setTimeout(() => setFlash(null), 800);
      prevValue.current = value;
      return () => clearTimeout(timeout);
    }
  }, [value, spring]);

  useEffect(() => {
    const unsubscribe = display.on('change', v => setDisplayValue(v));
    return unsubscribe;
  }, [display]);

  return (
    <motion.span
      className={`font-mono font-semibold tabular-nums ${className} ${
        flash === 'up' ? 'text-status-stable' : flash === 'down' ? 'text-status-critical' : ''
      }`}
      animate={flash ? { scale: [1, 1.15, 1] } : {}}
      transition={{ duration: 0.4 }}
    >
      {displayValue}
    </motion.span>
  );
}
