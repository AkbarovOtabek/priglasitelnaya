import { useRef, useMemo, Suspense } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float, Sparkles } from '@react-three/drei';
import * as THREE from 'three';
import { useDeviceCapability } from '../hooks/useDeviceCapability';

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
          <Sparkles count={Math.floor(particleCount / 8)} scale={10} size={1.4} speed={0.2} color="#e6c877" opacity={0.55} />
          <Sparkles count={Math.floor(particleCount / 12)} scale={8} size={1.0} speed={0.15} color="#e87090" opacity={0.35} />
        </ParallaxRig>
      </Suspense>
    </Canvas>
  );
}


