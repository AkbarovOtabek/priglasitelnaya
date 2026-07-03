import { motion } from 'framer-motion';
import { useDeviceCapability } from '../hooks/useDeviceCapability';

// Медленно дрейфующие световые пятна — глубина и «уют».
const BLOBS = [
  { size: 480, color: 'rgba(230, 200, 119, 0.32)', top: '-10%', left: '-12%', x: [0, 60, -20, 0], y: [0, 40, 80, 0], dur: 26 },
  { size: 420, color: 'rgba(122, 170, 133, 0.26)', top: '58%', left: '74%', x: [0, -50, 30, 0], y: [0, -40, 20, 0], dur: 32 },
  { size: 320, color: 'rgba(232, 144, 160, 0.22)', top: '28%', left: '38%', x: [0, 40, -40, 0], y: [0, 60, -30, 0], dur: 38 },
];

export default function Atmosphere() {
  const { isLowPower } = useDeviceCapability();
  const blobs = isLowPower ? BLOBS.slice(0, 2) : BLOBS;
  return (
    <div className="atmosphere" aria-hidden="true">
      {blobs.map((b, i) => (
        <motion.div
          key={i}
          className="light-blob"
          style={{ width: b.size, height: b.size, top: b.top, left: b.left, background: `radial-gradient(circle, ${b.color} 0%, transparent 70%)` }}
          animate={{ x: b.x, y: b.y, scale: [1, 1.12, 0.95, 1] }}
          transition={{ duration: b.dur, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}
      <div className="vignette-layer" />
      <div className="grain-layer" />
    </div>
  );
}
