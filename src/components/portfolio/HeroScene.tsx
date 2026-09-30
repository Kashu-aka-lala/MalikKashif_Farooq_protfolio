import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Lightformer, Float } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";

export const scrollProgress = { current: 0 };

const VIOLET = "#a855f7";
const NEON = "#c084fc";
const CYAN = "#22d3ee";

function Avatar() {
  const group = useRef<THREE.Group>(null);
  const head = useRef<THREE.Group>(null);
  const eyes = useRef<THREE.Group>(null);
  const armL = useRef<THREE.Group>(null);
  const armR = useRef<THREE.Group>(null);

  useFrame((state, rawDelta) => {
    const dt = Math.min(rawDelta, 0.05);
    const t = state.clock.elapsedTime;
    const p = scrollProgress.current; // 0 = floating, 1 = seated & typing

    if (head.current) {
      const tx = state.pointer.x * 0.55;
      const ty = -state.pointer.y * 0.35;
      head.current.rotation.y += (tx - head.current.rotation.y) * (1 - Math.exp(-6 * dt));
      head.current.rotation.x +=
        (ty + p * 0.25 - head.current.rotation.x) * (1 - Math.exp(-6 * dt));
    }
    if (eyes.current) {
      eyes.current.position.x = state.pointer.x * 0.06;
      eyes.current.position.y = -state.pointer.y * 0.04;
    }
    if (group.current) {
      const targetY = THREE.MathUtils.lerp(0, -0.55, p) + Math.sin(t * 1.2) * 0.05 * (1 - p);
      group.current.position.y += (targetY - group.current.position.y) * (1 - Math.exp(-5 * dt));
      group.current.rotation.y = Math.sin(t * 0.4) * 0.12 * (1 - p);
    }
    const typing = p > 0.55 ? Math.sin(t * 12) * 0.12 : 0;
    if (armL.current) armL.current.rotation.x = -p * 1.15 + typing;
    if (armR.current) armR.current.rotation.x = -p * 1.15 - typing;
  });

  const body = (
    <meshStandardMaterial color="#6b5a9e" roughness={0.3} metalness={0.45} emissive="#2a1f4d" emissiveIntensity={0.6} />
  );

  return (
    <group ref={group}>
      {/* head */}
      <group ref={head} position={[0, 1.55, 0]}>
        <mesh castShadow>
          <boxGeometry args={[0.78, 0.74, 0.7]} />
          {body}
        </mesh>
        {/* visor */}
        <mesh position={[0, 0.04, 0.36]}>
          <boxGeometry args={[0.62, 0.26, 0.06]} />
          <meshStandardMaterial
            color="#120c22"
            emissive={VIOLET}
            emissiveIntensity={0.35}
            roughness={0.1}
          />
        </mesh>
        <group ref={eyes} position={[0, 0.04, 0.41]}>
          <mesh position={[-0.14, 0, 0]}>
            <circleGeometry args={[0.055, 24]} />
            <meshBasicMaterial color={CYAN} />
          </mesh>
          <mesh position={[0.14, 0, 0]}>
            <circleGeometry args={[0.055, 24]} />
            <meshBasicMaterial color={CYAN} />
          </mesh>
        </group>
      </group>

      {/* torso */}
      <mesh position={[0, 0.78, 0]} castShadow>
        <boxGeometry args={[0.92, 0.94, 0.56]} />
        {body}
      </mesh>
      <mesh position={[0, 0.9, 0.3]}>
        <boxGeometry args={[0.2, 0.2, 0.04]} />
        <meshStandardMaterial color="#120c22" emissive={NEON} emissiveIntensity={1.4} />
      </mesh>

      {/* arms */}
      <group ref={armL} position={[-0.6, 1.1, 0]}>
        <mesh position={[0, -0.36, 0.1]} castShadow>
          <boxGeometry args={[0.22, 0.8, 0.22]} />
          {body}
        </mesh>
      </group>
      <group ref={armR} position={[0.6, 1.1, 0]}>
        <mesh position={[0, -0.36, 0.1]} castShadow>
          <boxGeometry args={[0.22, 0.8, 0.22]} />
          {body}
        </mesh>
      </group>

      {/* legs */}
      <mesh position={[-0.24, 0.05, 0]} castShadow>
        <boxGeometry args={[0.28, 0.66, 0.28]} />
        {body}
      </mesh>
      <mesh position={[0.24, 0.05, 0]} castShadow>
        <boxGeometry args={[0.28, 0.66, 0.28]} />
        {body}
      </mesh>
    </group>
  );
}

function Desk() {
  const group = useRef<THREE.Group>(null);
  useFrame((_, rawDelta) => {
    const dt = Math.min(rawDelta, 0.05);
    if (!group.current) return;
    const p = scrollProgress.current;
    const target = THREE.MathUtils.lerp(-2.2, 0, p);
    group.current.position.y += (target - group.current.position.y) * (1 - Math.exp(-4 * dt));
    const m = group.current.children;
    m.forEach((c) => {
      const mesh = c as THREE.Mesh;
      const mat = mesh.material as THREE.Material | undefined;
      if (mat) {
        mat.transparent = true;
        mat.opacity = Math.max(0, Math.min(1, (p - 0.2) * 2));
      }
    });
  });

  return (
    <group ref={group} position={[0, -2.2, 0]}>
      <mesh position={[0, 0.42, 1.45]} receiveShadow castShadow>
        <boxGeometry args={[2.8, 0.08, 1.2]} />
        <meshStandardMaterial color="#3a2e63" roughness={0.4} metalness={0.4} />
      </mesh>
      <mesh position={[0, 0.75, 1.15]} rotation-x={0.12}>
        <boxGeometry args={[1.3, 0.62, 0.06]} />
        <meshStandardMaterial color="#0d0918" emissive={VIOLET} emissiveIntensity={0.55} />
      </mesh>
      <mesh position={[0, 0.48, 1.7]}>
        <boxGeometry args={[0.9, 0.04, 0.3]} />
        <meshStandardMaterial color="#231a3d" emissive={CYAN} emissiveIntensity={0.25} />
      </mesh>
    </group>
  );
}

function Rig() {
  useFrame((state, rawDelta) => {
    const dt = Math.min(rawDelta, 0.05);
    const p = scrollProgress.current;
    const z = THREE.MathUtils.lerp(6.6, 8.2, p);
    const y = THREE.MathUtils.lerp(1.4, 0.9, p);
    state.camera.position.x +=
      (state.pointer.x * 0.4 - state.camera.position.x) * (1 - Math.exp(-3 * dt));
    state.camera.position.y += (y - state.camera.position.y) * (1 - Math.exp(-3 * dt));
    state.camera.position.z += (z - state.camera.position.z) * (1 - Math.exp(-3 * dt));
    state.camera.lookAt(-0.8, THREE.MathUtils.lerp(0.9, 0.35, p), 0);
  });
  return null;
}

export function HeroScene() {
  return (
    <Canvas
      shadows
      dpr={[1, 1.8]}
      camera={{ position: [0, 1.4, 6.6], fov: 45 }}
      gl={{ antialias: true }}
    >
      <color attach="background" args={["#100c1c"]} />
      <fog attach="fog" args={["#100c1c", 9, 22]} />
      <ambientLight intensity={1.1} />
      <directionalLight
        position={[4, 7, 5]}
        intensity={2.6}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />
      <pointLight position={[-3.2, 1.8, -2.4]} intensity={70} color={VIOLET} />
      <pointLight position={[3.4, 2.4, -2.2]} intensity={45} color={CYAN} />

      <Environment>
        <Lightformer intensity={3} position={[0, 5, 2]} scale={[10, 10, 1]} color="#b388ff" />
        <Lightformer
          intensity={2}
          color="#22d3ee"
          position={[-5, 1, -1]}
          rotation-y={Math.PI / 2}
          scale={[18, 2, 1]}
        />
      </Environment>

      <Float speed={1.2} rotationIntensity={0.12} floatIntensity={0.4}>
        <Avatar />
      </Float>
      <Desk />

      <mesh rotation-x={-Math.PI / 2} position={[0, -0.32, 0]} receiveShadow>
        <circleGeometry args={[7, 48]} />
        <meshStandardMaterial color="#241b42" roughness={0.75} metalness={0.2} />
      </mesh>

      <Rig />
    </Canvas>
  );
}
