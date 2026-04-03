import { useEffect, useRef } from 'react';
import { toast } from 'sonner';
import { feedEvents } from '@/data/mockDashboard';

const alertMessages = [
  { title: '⚠️ Water pressure dropping in Nakuru pipeline junction', category: 'water', level: 'critical' },
  { title: '📈 Youth employment program exceeding targets in Kibera', category: 'employment', level: 'positive' },
  { title: '🏥 Clinic load rising — Kibera threshold in 10 days', category: 'health', level: 'high' },
  { title: '🌾 Crop yield forecast revised: Rift Valley –14%', category: 'food', level: 'critical' },
  { title: '🤝 Coordination event improved community trust scores', category: 'trust', level: 'positive' },
  { title: '⚡ Solar microgrid output stable across Nakuru', category: 'energy', level: 'info' },
  { title: '🌧️ Rainfall deficit deepening in northern corridor', category: 'climate', level: 'high' },
  { title: '💧 Water access dropped 8% in peri-urban zones', category: 'water', level: 'critical' },
];

export function useAlertNotifications() {
  const indexRef = useRef(0);

  useEffect(() => {
    // Show first alert after 8 seconds, then every 15-25 seconds
    const showAlert = () => {
      const alert = alertMessages[indexRef.current % alertMessages.length];
      indexRef.current++;

      if (alert.level === 'critical') {
        toast.error(alert.title, {
          description: `${alert.category.toUpperCase()} · Live Signal`,
          duration: 6000,
        });
      } else if (alert.level === 'high') {
        toast.warning(alert.title, {
          description: `${alert.category.toUpperCase()} · Live Signal`,
          duration: 5000,
        });
      } else if (alert.level === 'positive') {
        toast.success(alert.title, {
          description: `${alert.category.toUpperCase()} · Live Signal`,
          duration: 5000,
        });
      } else {
        toast(alert.title, {
          description: `${alert.category.toUpperCase()} · Live Signal`,
          duration: 4000,
        });
      }
    };

    const initialTimeout = setTimeout(showAlert, 8000);
    const interval = setInterval(showAlert, 18000);

    return () => {
      clearTimeout(initialTimeout);
      clearInterval(interval);
    };
  }, []);
}
