import { useMemo } from 'react';

// Определяет «слабое» устройство, чтобы упрощать 3D-сцены:
// снижать кол-во частиц и отключать bloom-постобработку.
export function useDeviceCapability() {
  return useMemo(() => {
    if (typeof window === 'undefined') {
      return { isMobile: false, isLowPower: false, particleCount: 2200, enableBloom: true, dpr: [1, 2] };
    }
    const cores = navigator.hardwareConcurrency || 4;
    const mem = navigator.deviceMemory || 4;
    const isMobile =
      /Mobi|Android|iPhone|iPad/i.test(navigator.userAgent) ||
      window.matchMedia('(max-width: 768px)').matches;
    const isTouch = window.matchMedia('(hover: none)').matches;
    const isLowPower = cores <= 4 || mem <= 4 || isMobile;

    return {
      isMobile,
      isTouch,
      isLowPower,
      particleCount: isLowPower ? (isMobile ? 700 : 1200) : 2600,
      enableBloom: !isLowPower,
      dpr: isLowPower ? [1, 1.5] : [1, 2],
    };
  }, []);
}
