// Large animated 3D wedding scene – placed between Ceremony and Calendar
import { useRef, useMemo, Suspense, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Sparkles } from '@react-three/drei';
import * as THREE from 'three';
import { useDeviceCapability } from '../hooks/useDeviceCapability';

// ── 3D Rose made from layered scaled spheres ──────────────────────
function Rose3D() {
  const group = useRef();

  useFrame((state, delta) => {
    if (!group.current) return;
    group.current.rotation.y += delta * 0.1;
    group.current.position.y = Math.sin(state.clock.elapsedTime * 0.45) * 0.07;
  });

  // [petalCount, ringRadius, yHeight, tiltX, scaleX, scaleY, color]
  const LAYERS = [
    { n: 5,  r: 0.00, dy:  0.06, tiltX: 0.10, sx: 0.14, sy: 0.20, sz: 0.04, color: '#c83868' },
    { n: 6,  r: 0.26, dy:  0.02, tiltX: 0.20, sx: 0.14, sy: 0.26, sz: 0.04, color: '#d84878' },
    { n: 7,  r: 0.47, dy: -0.01, tiltX: 0.34, sx: 0.14, sy: 0.30, sz: 0.04, color: '#e05888' },
    { n: 8,  r: 0.67, dy: -0.06, tiltX: 0.46, sx: 0.13, sy: 0.32, sz: 0.04, color: '#e86898' },
    { n: 8,  r: 0.86, dy: -0.13, tiltX: 0.60, sx: 0.12, sy: 0.34, sz: 0.04, color: '#f07aa8' },
    { n: 6,  r: 1.00, dy: -0.22, tiltX: 0.72, sx: 0.11, sy: 0.36, sz: 0.04, color: '#f88cbc' },
  ];

  const petals = LAYERS.flatMap(({ n, r, dy, tiltX, sx, sy, sz, color }, li) =>
    Array.from({ length: n }, (_, i) => {
      const a = (i / n) * Math.PI * 2 + li * 0.19;
      return {
        key: `${li}-${i}`,
        pos: [Math.cos(a) * r, dy, Math.sin(a) * r],
        rot: [-tiltX, a, 0],
        scale: [sx, sy, sz],
        color,
      };
    })
  );

  return (
    <Float speed={0.8} floatIntensity={0.35} rotationIntensity={0.1}>
      <group ref={group} rotation={[-0.28, 0, 0]}>
        {petals.map(({ key, pos, rot, scale, color }) => (
          <mesh key={key} position={pos} rotation={rot} scale={scale}>
            <sphereGeometry args={[1, 10, 8]} />
            <meshStandardMaterial
              color={color}
              roughness={0.5}
              metalness={0.06}
              emissive={color}
              emissiveIntensity={0.1}
              transparent
              opacity={0.93}
            />
          </mesh>
        ))}

        {/* Leaves */}
        {[0, 120, 240].map((deg, i) => {
          const a = (deg * Math.PI) / 180;
          return (
            <mesh
              key={`leaf-${i}`}
              position={[Math.cos(a) * 1.15, -0.35, Math.sin(a) * 1.15]}
              rotation={[-0.52, a, 0.18]}
              scale={[0.11, 0.40, 0.04]}
            >
              <sphereGeometry args={[1, 8, 6]} />
              <meshStandardMaterial color="#3d8845" roughness={0.65} transparent opacity={0.88} />
            </mesh>
          );
        })}

        {/* Stem */}
        <mesh position={[0, -1.3, 0]}>
          <cylinderGeometry args={[0.022, 0.018, 2.0, 6]} />
          <meshStandardMaterial color="#3a7838" roughness={0.7} />
        </mesh>

        {/* Center glow */}
        <mesh>
          <sphereGeometry args={[0.09, 8, 8]} />
          <meshStandardMaterial color="#ff3070" emissive="#ff1050" emissiveIntensity={0.9} />
        </mesh>
      </group>
    </Float>
  );
}

// ── Floating hearts ───────────────────────────────────────────────
function FloatingHearts({ count = 10 }) {
  const heartShape = useMemo(() => {
    const x = -0.25, y = -0.5;
    const s = new THREE.Shape();
    s.moveTo(x + 0.25, y + 0.25);
    s.bezierCurveTo(x + 0.25, y + 0.25, x + 0.2, y, x, y);
    s.bezierCurveTo(x - 0.3, y, x - 0.3, y + 0.35, x - 0.3, y + 0.35);
    s.bezierCurveTo(x - 0.3, y + 0.55, x - 0.15, y + 0.77, x + 0.25, y + 0.95);
    s.bezierCurveTo(x + 0.65, y + 0.77, x + 0.8, y + 0.55, x + 0.8, y + 0.35);
    s.bezierCurveTo(x + 0.8, y + 0.35, x + 0.8, y, x + 0.5, y);
    s.bezierCurveTo(x + 0.35, y, x + 0.25, y + 0.25, x + 0.25, y + 0.25);
    return s;
  }, []);

  const instances = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        pos: [(Math.random() - 0.5) * 7, (Math.random() - 0.5) * 3.5, (Math.random() - 0.5) * 2.5],
        speed: 0.28 + Math.random() * 0.45,
        phase: (i / count) * Math.PI * 2,
        scale: 0.11 + Math.random() * 0.19,
        color: ['#e06080', '#e87898', '#f090a8', '#d05070', '#c84060'][i % 5],
      })),
    [count]
  );

  const refs = useRef([]);

  useFrame((state) => {
    refs.current.forEach((m, i) => {
      if (!m) return;
      const ins = instances[i];
      m.position.y = ins.pos[1] + Math.sin(state.clock.elapsedTime * ins.speed + ins.phase) * 0.65;
      m.rotation.y = state.clock.elapsedTime * 0.38;
      m.rotation.z = Math.sin(state.clock.elapsedTime * ins.speed * 0.5 + ins.phase) * 0.22;
    });
  });

  return (
    <>
      {instances.map((ins, i) => (
        <mesh
          key={i}
          ref={(el) => (refs.current[i] = el)}
          position={ins.pos}
          scale={ins.scale}
        >
          <shapeGeometry args={[heartShape]} />
          <meshStandardMaterial
            color={ins.color}
            side={THREE.DoubleSide}
            transparent
            opacity={0.7}
            emissive={ins.color}
            emissiveIntensity={0.22}
          />
        </mesh>
      ))}
    </>
  );
}

// ── Wedding rings pair (background-right) ────────────────────────
function BackgroundRings() {
  const group = useRef();
  useFrame((state, delta) => {
    if (!group.current) return;
    group.current.rotation.y += delta * 0.16;
    group.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.32) * 0.07;
  });

  return (
    <Float speed={1.1} floatIntensity={0.45} rotationIntensity={0.25}>
      <group ref={group} position={[2.5, 0.3, -1.8]} scale={0.68}>
        <mesh rotation={[Math.PI / 2.3, 0.25, 0]} position={[-0.38, 0, 0]}>
          <torusGeometry args={[0.92, 0.056, 28, 90]} />
          <meshStandardMaterial
            color="#d4af37"
            metalness={0.88}
            roughness={0.1}
            emissive="#9a7420"
            emissiveIntensity={0.22}
          />
        </mesh>
        <mesh rotation={[Math.PI / 1.8, -0.25, 0]} position={[0.38, 0, 0]}>
          <torusGeometry args={[0.92, 0.056, 28, 90]} />
          <meshStandardMaterial
            color="#dde0ea"
            metalness={0.97}
            roughness={0.04}
            emissive="#9999bb"
            emissiveIntensity={0.06}
          />
        </mesh>
        {/* Diamond */}
        <mesh position={[0.38, 0.94, 0]}>
          <octahedronGeometry args={[0.2, 0]} />
          <meshStandardMaterial
            color="#e8f0ff"
            metalness={0.05}
            roughness={0}
            emissive="#88aaff"
            emissiveIntensity={0.55}
            transparent
            opacity={0.9}
          />
        </mesh>
      </group>
    </Float>
  );
}

// ── Scene ─────────────────────────────────────────────────────────
function Scene({ particleCount }) {
  return (
    <>
      <fog attach="fog" args={['#fef6f8', 11, 22]} />
      <ambientLight intensity={1.3} />
      <directionalLight position={[3, 5, 4]} intensity={2.0} color="#fff4e8" />
      <directionalLight position={[-4, -1, 2]} intensity={0.7} color="#f8d0e0" />
      <pointLight position={[0, 3, 3]} intensity={1.2} color="#e6c877" />
      <pointLight position={[-2, -2, 1]} intensity={0.5} color="#f090a0" />

      <Rose3D />
      <FloatingHearts count={Math.max(5, Math.min(11, Math.floor(particleCount / 28)))} />
      <BackgroundRings />

      {/* Golden sparkles */}
      <Sparkles
        count={Math.floor(particleCount / 2.5)}
        scale={9}
        size={1.8}
        speed={0.25}
        color="#c69b3a"
        opacity={0.78}
      />
      {/* Rose-pink sparkles */}
      <Sparkles
        count={Math.floor(particleCount / 4.5)}
        scale={7}
        size={1.1}
        speed={0.18}
        color="#e87090"
        opacity={0.55}
      />
    </>
  );
}

// ── Main component ────────────────────────────────────────────────
export default function WeddingDivider() {
  const { dpr, particleCount } = useDeviceCapability();
  const [inView, setInView] = useState(false);
  const sectionRef = useRef();

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), {
      threshold: 0.05,
    });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden"
      style={{
        height: '62vh',
        minHeight: '360px',
        maxHeight: '640px',
        background:
          'radial-gradient(ellipse 140% 100% at 50% 0%, #fef9f8 0%, #fef0ea 40%, #f8e8d8 100%)',
      }}
    >
      {/* Subtle faint heart watermark */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none"
        style={{ opacity: 0.028 }}
        aria-hidden="true"
      >
        <span
          className="font-display text-emerald-ink leading-none"
          style={{ fontSize: 'clamp(200px, 38vw, 420px)' }}
        >
          ♡
        </span>
      </div>

      {/* 3D canvas */}
      <div className="absolute inset-0">
        <Canvas
          dpr={dpr}
          camera={{ position: [0, 0.4, 7.8], fov: 44 }}
          gl={{ antialias: true, alpha: true }}
          frameloop={inView ? 'always' : 'demand'}
        >
          <Suspense fallback={null}>
            <Scene particleCount={particleCount} />
          </Suspense>
        </Canvas>
      </div>

      {/* Gradient fade at top & bottom edges */}
      <div
        className="absolute inset-x-0 top-0 h-16 pointer-events-none"
        style={{ background: 'linear-gradient(to bottom, #fef0e8, transparent)' }}
      />
      <div
        className="absolute inset-x-0 bottom-0 h-16 pointer-events-none"
        style={{ background: 'linear-gradient(to top, #f8e8d8, transparent)' }}
      />

      {/* Bottom text label */}
      <div className="absolute bottom-4 inset-x-0 flex flex-col items-center pointer-events-none z-10">
        <div className="gold-rule w-20 mb-2" style={{ opacity: 0.45 }} />
        <p className="eyebrow text-[0.68rem] tracking-[0.24em]" style={{ opacity: 0.55 }}>
          Malika ♡ Adxam
        </p>
      </div>
    </section>
  );
}
