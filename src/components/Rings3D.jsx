import { Suspense, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Environment, Lightformer, Sparkles } from '@react-three/drei';
import * as THREE from 'three';
import { useDeviceCapability } from '../hooks/useDeviceCapability';

// Одно золотое кольцо (тор) с металлическим материалом.
function Ring({ position = [0, 0, 0], rotation = [0, 0, 0], color = '#d7a938' }) {
  return (
    <mesh position={position} rotation={rotation}>
      <torusGeometry args={[1, 0.18, 24, 90]} />
      <meshStandardMaterial
        color={color}
        metalness={1}
        roughness={0.18}
        envMapIntensity={1.7}
        emissive="#3a2606"
        emissiveIntensity={0.25}
      />
    </mesh>
  );
}

// Гранёный бриллиант («брильянтовая» огранка) на кольце.
function Diamond({ position = [0, 0, 0] }) {
  const ref = useRef();
  useFrame((state, delta) => {
    if (!ref.current) return;
    ref.current.rotation.y += delta * 1.4;
    ref.current.position.y = Math.sin(state.clock.elapsedTime * 2) * 0.02;
  });

  const gem = (
    <meshPhysicalMaterial
      color="#eaf6ff"
      metalness={0.15}
      roughness={0.02}
      transmission={0.35}
      ior={2.4}
      thickness={0.6}
      reflectivity={1}
      clearcoat={1}
      clearcoatRoughness={0}
      envMapIntensity={3.2}
      emissive="#cfeaff"
      emissiveIntensity={0.22}
      transparent
    />
  );

  return (
    <group position={position} scale={0.42}>
      {/* Дополнительные блики на камне */}
      <pointLight position={[0.3, 0.5, 0.6]} intensity={2.6} color="#ffffff" distance={3} />
      <pointLight position={[-0.4, -0.2, 0.5]} intensity={1.4} color="#bfe0ff" distance={3} />
      <group ref={ref}>
        {/* Корона + площадка (гранёный усечённый конус) */}
        <mesh position={[0, 0.16, 0]}>
          <cylinderGeometry args={[0.34, 0.55, 0.28, 8]} />
          {gem}
        </mesh>
        {/* Павильон (гранёный конус остриём вниз) */}
        <mesh position={[0, -0.28, 0]}>
          <coneGeometry args={[0.55, 0.62, 8]} />
          {gem}
        </mesh>
      </group>
      {/* Мерцающие искры вокруг камня */}
      <Sparkles count={12} scale={1.4} size={3} speed={0.6} color="#ffffff" opacity={0.9} />
    </group>
  );
}

// Пара сцепленных колец, медленно вращается.
function RingPair() {
  const group = useRef();
  useFrame((state, delta) => {
    if (!group.current) return;
    group.current.rotation.y += delta * 0.35;
    group.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.4) * 0.08;
  });

  return (
    <Float speed={1.4} rotationIntensity={0.25} floatIntensity={0.6}>
      <group ref={group} scale={0.7}>
        {/* Кольцо 1 — во фронтальной плоскости */}
        <group position={[-0.55, 0, 0]}>
          <Ring color="#e6bf55" />
          <Diamond position={[0, 1.02, 0]} />
        </group>
        {/* Кольцо 2 — перпендикулярно, продето сквозь первое */}
        <Ring position={[0.55, 0, 0]} rotation={[Math.PI / 2, 0, 0]} color="#cf9c34" />
      </group>
    </Float>
  );
}

export default function Rings3D({ className = '', style = {} }) {
  const { dpr } = useDeviceCapability();

  return (
    <div className={className} style={{ pointerEvents: 'none', ...style }}>
      <Canvas
        dpr={dpr}
        camera={{ position: [0, 0.1, 5], fov: 42 }}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.7} />
        <directionalLight position={[3, 4, 5]} intensity={1.4} color="#fff3d6" />
        <directionalLight position={[-4, -1, 2]} intensity={0.6} color="#e6c877" />

        <Suspense fallback={null}>
          <RingPair />
          <Sparkles count={26} scale={5} size={2} speed={0.3} color="#f0d488" opacity={0.7} />

          {/* Окружение из «лайтформеров» — металл блестит без загрузки HDRI из сети */}
          <Environment resolution={128} frames={1}>
            <Lightformer intensity={2.4} position={[0, 3, 4]} scale={[8, 8, 1]} color="#fff4d8" />
            <Lightformer intensity={1.4} position={[-5, 1, 2]} scale={[5, 6, 1]} color="#e6c877" />
            <Lightformer intensity={1.1} position={[5, -2, 3]} scale={[5, 5, 1]} color="#f3cf8a" />
            <Lightformer intensity={0.8} position={[0, -4, 2]} scale={[8, 3, 1]} color="#a97e1f" />
          </Environment>
        </Suspense>
      </Canvas>
    </div>
  );
}
