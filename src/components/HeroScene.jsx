import { useRef, useMemo, Suspense } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';
import { useDeviceCapability } from '../hooks/useDeviceCapability';

// Парящая золотая пыль / лепестки (нормальное смешивание — видно на светлом фоне).
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
      <pointsMaterial size={0.05} color="#c69b3a" transparent opacity={0.5} depthWrite={false} sizeAttenuation />
    </points>
  );
}

// Солитер: тонкая платиновая полоса + бриллиант.
function SolitaireRing() {
  const group = useRef();
  const diamondRef = useRef();

  useFrame((state, delta) => {
    if (!group.current) return;
    group.current.rotation.y += delta * 0.28;
    group.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.35) * 0.09;
    if (diamondRef.current) {
      diamondRef.current.material.emissiveIntensity =
        0.35 + Math.sin(state.clock.elapsedTime * 2.4) * 0.2;
    }
  });

  const platinum = {
    color: '#dde0ea',
    metalness: 0.96,
    roughness: 0.05,
    emissive: '#8899bb',
    emissiveIntensity: 0.06,
  };

  return (
    <Float speed={1.4} rotationIntensity={0.4} floatIntensity={0.8}>
      <group ref={group} position={[0, 1.85, 0]} scale={0.48}>
        {/* Тонкое кольцо — обручальная полоса */}
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.84, 0.046, 32, 128]} />
          <meshStandardMaterial {...platinum} />
        </mesh>
        {/* Оправа (конус-крапан) */}
        <mesh position={[0, 0.86, 0]}>
          <cylinderGeometry args={[0.082, 0.118, 0.24, 8]} />
          <meshStandardMaterial {...platinum} />
        </mesh>
        {/* Бриллиант (октаэдр = форма огранки) */}
        <mesh ref={diamondRef} position={[0, 1.08, 0]}>
          <octahedronGeometry args={[0.24, 0]} />
          <meshStandardMaterial
            color="#e6f0ff"
            metalness={0.05}
            roughness={0}
            emissive="#88aaff"
            emissiveIntensity={0.35}
            transparent
            opacity={0.9}
          />
        </mesh>
        {/* Верхняя искра блика */}
        <mesh position={[0, 1.26, 0]}>
          <sphereGeometry args={[0.048, 8, 8]} />
          <meshStandardMaterial
            color="#ffffff"
            emissive="#ffffff"
            emissiveIntensity={2.5}
            transparent
            opacity={0.75}
          />
        </mesh>
        {/* Боковые блики бриллианта */}
        <mesh position={[0.18, 1.05, 0.1]}>
          <sphereGeometry args={[0.022, 6, 6]} />
          <meshStandardMaterial color="#ffffff" emissive="#aaddff" emissiveIntensity={3} transparent opacity={0.5} />
        </mesh>
        <mesh position={[-0.16, 1.02, -0.12]}>
          <sphereGeometry args={[0.018, 6, 6]} />
          <meshStandardMaterial color="#ffffff" emissive="#ffddaa" emissiveIntensity={3} transparent opacity={0.45} />
        </mesh>
      </group>
    </Float>
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
          <SolitaireRing />
          <GoldenDust count={particleCount} />
        </ParallaxRig>
      </Suspense>
    </Canvas>
  );
}
