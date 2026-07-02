import { useRef, useMemo, Suspense } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float, Sparkles } from '@react-three/drei';
import * as THREE from 'three';
import { useDeviceCapability } from '../hooks/useDeviceCapability';

// Геометрия сердечка (создаётся один раз).
function makeHeartGeometry() {
  const s = new THREE.Shape();
  const x = 0, y = 0;
  s.moveTo(x + 0.25, y + 0.25);
  s.bezierCurveTo(x + 0.25, y + 0.25, x + 0.2, y, x, y);
  s.bezierCurveTo(x - 0.3, y, x - 0.3, y + 0.35, x - 0.3, y + 0.35);
  s.bezierCurveTo(x - 0.3, y + 0.55, x - 0.1, y + 0.77, x + 0.25, y + 0.95);
  s.bezierCurveTo(x + 0.6, y + 0.77, x + 0.8, y + 0.55, x + 0.8, y + 0.35);
  s.bezierCurveTo(x + 0.8, y + 0.35, x + 0.8, y, x + 0.5, y);
  s.bezierCurveTo(x + 0.35, y, x + 0.25, y + 0.25, x + 0.25, y + 0.25);
  const geo = new THREE.ExtrudeGeometry(s, { depth: 0.15, bevelEnabled: true, bevelThickness: 0.06, bevelSize: 0.06, bevelSegments: 3, steps: 1 });
  geo.center();
  return geo;
}

// Парящие 3D сердечки — тёплый, уютный акцент.
function FloatingHearts({ count = 6 }) {
  const geo = useMemo(makeHeartGeometry, []);
  const items = useMemo(
    () => Array.from({ length: count }, (_, i) => ({
      x: (Math.random() - 0.5) * 14,
      y: (Math.random() - 0.5) * 9,
      z: -1 - Math.random() * 4,
      scale: 0.28 + Math.random() * 0.3,
      speed: 0.25 + Math.random() * 0.35,
      color: i % 2 === 0 ? '#e88aa4' : '#e6c877',
      phase: Math.random() * Math.PI * 2,
    })),
    [count]
  );
  const refs = useRef([]);

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime;
    items.forEach((it, i) => {
      const m = refs.current[i];
      if (!m) return;
      m.position.y += it.speed * delta * 0.5;
      if (m.position.y > 5.5) m.position.y = -5.5;
      m.position.x = it.x + Math.sin(t * 0.4 + it.phase) * 0.5;
      m.rotation.z = Math.PI + Math.sin(t * 0.5 + it.phase) * 0.4;
      m.rotation.y = t * 0.3 + it.phase;
    });
  });

  return (
    <group>
      {items.map((it, i) => (
        <mesh
          key={i}
          ref={(el) => (refs.current[i] = el)}
          geometry={geo}
          position={[it.x, it.y, it.z]}
          scale={it.scale}
          rotation={[0, 0, Math.PI]}
        >
          <meshStandardMaterial
            color={it.color}
            metalness={0.35}
            roughness={0.35}
            transparent
            opacity={0.72}
            emissive={it.color}
            emissiveIntensity={0.2}
          />
        </mesh>
      ))}
    </group>
  );
}

// Парящая золотая пыль / лепестки.
function GoldenDust({ count }) {
  const ref = useRef();
  const { positions, speeds } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const speeds = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 14;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 8;
      speeds[i] = 0.15 + Math.random() * 0.5;
    }
    return { positions, speeds };
  }, [count]);

  useFrame((state, delta) => {
    const pos = ref.current.geometry.attributes.position.array;
    for (let i = 0; i < count; i++) {
      pos[i * 3 + 1] += speeds[i] * delta * 0.5;
      pos[i * 3] += Math.sin(state.clock.elapsedTime * 0.3 + i) * delta * 0.06;
      if (pos[i * 3 + 1] > 7) pos[i * 3 + 1] = -7;
    }
    ref.current.geometry.attributes.position.needsUpdate = true;
    ref.current.rotation.y = state.clock.elapsedTime * 0.02;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.055} color="#c69b3a" transparent opacity={0.48} depthWrite={false} sizeAttenuation />
    </points>
  );
}

// Параллакс от движения мыши/гироскопа.
function ParallaxRig({ children }) {
  const group = useRef();
  const { pointer } = useThree();
  useFrame((state, delta) => {
    if (!group.current) return;
    group.current.rotation.y = THREE.MathUtils.damp(group.current.rotation.y, pointer.x * 0.14, 3, delta);
    group.current.rotation.x = THREE.MathUtils.damp(group.current.rotation.x, -pointer.y * 0.1, 3, delta);
  });
  return <group ref={group}>{children}</group>;
}

export default function HeroScene({ active = true }) {
  const { particleCount, dpr } = useDeviceCapability();

  return (
    <Canvas
      dpr={dpr}
      camera={{ position: [0, 0, 8], fov: 45 }}
      gl={{ antialias: true, alpha: true }}
      frameloop={active ? 'always' : 'never'}
    >
      <fog attach="fog" args={['#f7f2e9', 11, 22]} />
      <ambientLight intensity={0.9} />
      <directionalLight position={[4, 6, 5]} intensity={1.6} color="#fff3d6" />
      <directionalLight position={[-5, -2, 2]} intensity={0.5} color="#c69b3a" />

      <Suspense fallback={null}>
        <ParallaxRig>
          <GoldenDust count={particleCount} />
          <FloatingHearts count={particleCount > 120 ? 7 : 4} />
          <Sparkles count={Math.floor(particleCount / 8)} scale={10} size={1.4} speed={0.2} color="#e6c877" opacity={0.55} />
          <Sparkles count={Math.floor(particleCount / 12)} scale={8} size={1.0} speed={0.15} color="#e87090" opacity={0.35} />
        </ParallaxRig>
      </Suspense>
    </Canvas>
  );
}


