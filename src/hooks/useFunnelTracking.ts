/**
 * useFunnelTracking.ts
 * Hook que observa quais seções do funil entram na viewport
 * e dispara o pageview virtual correspondente no GA4.
 * Cada seção é rastreada apenas uma vez por sessão de página.
 */

import { useEffect, useRef } from 'react';
import { trackSectionView, FUNNEL_SECTIONS } from '../analytics';

export function useFunnelTracking() {
  const trackedSections = useRef<Set<string>>(new Set());

  useEffect(() => {
    const sectionIds = Object.keys(FUNNEL_SECTIONS);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.id;
            if (id && !trackedSections.current.has(id)) {
              trackedSections.current.add(id);
              trackSectionView(id);
            }
          }
        });
      },
      {
        // Dispara quando pelo menos 30% da seção está visível
        threshold: 0.3,
      }
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);
}
