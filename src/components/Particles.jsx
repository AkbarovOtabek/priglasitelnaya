import { useEffect, useRef } from 'react';

// ── Canvas-based fireworks ──────────────────────────────────────
function Fireworks() {
  const canvasRef = useRef();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    let animId;
    const particles = [];

    const COLORS = [
      '#c69b3a', '#e6c877', '#f4e19a', '#ffe680',
      '#ff9f43', '#ff6b6b', '#fd79a8',
      '#a29bfe', '#74b9ff', '#55efc4',
      '#ffeaa7', '#ff9ff3', '#d4a0ff',
    ];

    function burst(x, y) {
      const baseColor = COLORS[Math.floor(Math.random() * COLORS.length)];
      const n = 85 + Math.floor(Math.random() * 35);
      for (let i = 0; i < n; i++) {
        const angle = (Math.PI * 2 * i) / n + (Math.random() - 0.5) * 0.45;
        const speed = (1.5 + Math.random() * 5.8) * (window.innerWidth < 600 ? 0.65 : 1);
        particles.push({
          x, y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed - 1,
          life: 1,
          decay: 0.011 + Math.random() * 0.012,
          r: 1.5 + Math.random() * 2.8,
          color: Math.random() > 0.35 ? baseColor : COLORS[Math.floor(Math.random() * COLORS.length)],
          trail: i % 4 === 0,
        });
      }
    }

    const delays = [0, 450, 950, 1600, 2250, 2900, 3600, 4350, 5200, 6100];
    const timeouts = delays.map(d =>
      setTimeout(() => {
        const x = window.innerWidth * (0.12 + Math.random() * 0.76);
        const y = window.innerHeight * (0.06 + Math.random() * 0.44);
        burst(x, y);
        if (Math.random() > 0.4) {
          setTimeout(() =>
            burst(
              x + (Math.random() - 0.5) * 280,
              y + (Math.random() - 0.5) * 130
            ), 160
          );
        }
      }, d)
    );

    function tick() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.088;    // gravity
        p.vx *= 0.984;    // air resistance
        p.life -= p.decay;

        if (p.life <= 0) { particles.splice(i, 1); continue; }

        ctx.save();
        ctx.globalAlpha = p.life * 0.9;
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r * (0.4 + p.life * 0.6), 0, Math.PI * 2);
        ctx.fill();

        if (p.trail && p.life > 0.25) {
          ctx.globalAlpha = p.life * 0.28;
          ctx.strokeStyle = p.color;
          ctx.lineWidth = p.r * 0.55;
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p.x - p.vx * 6, p.y - p.vy * 6);
          ctx.stroke();
        }
        ctx.restore();
      }

      animId = requestAnimationFrame(tick);
    }

    tick();

    return () => {
      cancelAnimationFrame(animId);
      timeouts.forEach(clearTimeout);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        inset: 0,
        width: '100vw',
        height: '100vh',
        pointerEvents: 'none',
        zIndex: 8998,
      }}
    />
  );
}

// ── Falling petals / hearts / stars ────────────────────────────
const PETAL_DATA = Array.from({ length: 32 }, (_, i) => ({
  id: i,
  left: (i * 37 + 5) % 100,
  delay: (i * 0.62) % 10,
  duration: 7 + (i * 1.27) % 8,
  size: 13 + (i * 7) % 22,
  drift: ((i % 7) - 3) * 65,
  type: i % 5,
  color: ['#ffb3c6', '#ffc8dd', '#e6c877', '#c69b3a', '#ff9a9e', '#ffd3e1', '#f4e19a', '#d4a0ff', '#aee6d8'][i % 9],
  opacity: 0.55 + (i % 5) * 0.09,
}));

const HEART_PATH = 'M12 21.593c-5.63-5.539-11-10.297-11-14.402 0-3.791 3.068-5.191 5.281-5.191 1.312 0 4.151.501 5.719 4.457 1.59-3.968 4.464-4.447 5.726-4.447 2.54 0 5.274 1.621 5.274 5.181 0 4.069-5.136 8.625-11 14.402z';
const STAR_PATH = 'M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z';
const SPARKLE_PATH = 'M12 1L13.6 10.4L23 12L13.6 13.6L12 23L10.4 13.6L1 12L10.4 10.4Z';

function PetalShape({ type, color }) {
  switch (type) {
    case 0: // Heart
      return (
        <svg viewBox="0 0 24 24" fill={color} style={{ width: '100%', height: '100%' }}>
          <path d={HEART_PATH} />
        </svg>
      );
    case 1: // Flower petal (ellipse)
      return (
        <svg viewBox="0 0 20 36" fill={color} style={{ width: '100%', height: '100%', opacity: 0.88 }}>
          <ellipse cx="10" cy="18" rx="8" ry="16" />
        </svg>
      );
    case 2: // Star
      return (
        <svg viewBox="0 0 24 24" fill={color} style={{ width: '100%', height: '100%' }}>
          <path d={STAR_PATH} />
        </svg>
      );
    case 3: // Cherry blossom (5-petal)
      return (
        <svg viewBox="0 0 50 50" fill={color} style={{ width: '100%', height: '100%', opacity: 0.85 }}>
          <ellipse cx="25" cy="12" rx="7" ry="12" />
          <ellipse cx="25" cy="12" rx="7" ry="12" transform="rotate(72 25 25)" />
          <ellipse cx="25" cy="12" rx="7" ry="12" transform="rotate(144 25 25)" />
          <ellipse cx="25" cy="12" rx="7" ry="12" transform="rotate(216 25 25)" />
          <ellipse cx="25" cy="12" rx="7" ry="12" transform="rotate(288 25 25)" />
          <circle cx="25" cy="25" r="5" fill="#fff8e6" opacity="0.9" />
        </svg>
      );
    default: // Sparkle / 4-pointed star
      return (
        <svg viewBox="0 0 24 24" fill={color} style={{ width: '100%', height: '100%' }}>
          <path d={SPARKLE_PATH} />
        </svg>
      );
  }
}

function FallingPetals() {
  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        pointerEvents: 'none',
        overflow: 'hidden',
        zIndex: 8997,
      }}
    >
      {PETAL_DATA.map(p => (
        <div
          key={p.id}
          className="falling-petal"
          style={{
            left: `${p.left}%`,
            top: '-65px',
            width: p.size,
            height: p.size,
            opacity: p.opacity,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
            '--drift': `${p.drift}px`,
          }}
        >
          <PetalShape type={p.type} color={p.color} />
        </div>
      ))}
    </div>
  );
}

export default function Particles() {
  return (
    <>
      <Fireworks />
      <FallingPetals />
    </>
  );
}
