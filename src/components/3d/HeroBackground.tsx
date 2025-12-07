import { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Environment } from '@react-three/drei';
import * as THREE from 'three';

function FloatingCube({ position, color, scale = 1 }: { position: [number, number, number], color: string, scale?: number }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHover] = useState(false);

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.2;
      meshRef.current.rotation.y += delta * 0.3;
      
      // Subtle movement based on mouse
      const { x, y } = state.mouse;
      meshRef.current.position.x = THREE.MathUtils.lerp(meshRef.current.position.x, position[0] + x * 2, 0.1);
      meshRef.current.position.y = THREE.MathUtils.lerp(meshRef.current.position.y, position[1] + y * 2, 0.1);
    }
  });

  return (
    <Float speed={2} rotationIntensity={1.5} floatIntensity={2}>
      <mesh
        ref={meshRef}
        position={position}
        scale={hovered ? scale * 1.2 : scale}
        onPointerOver={() => setHover(true)}
        onPointerOut={() => setHover(false)}
      >
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial
          color={color}
          roughness={0.1}
          metalness={0.8}
          transparent
          opacity={0.8}
        />
      </mesh>
    </Float>
  );
}

export default function HeroBackground() {
  return (
    <div className="absolute inset-0 z-0 w-full h-full">
      <Canvas camera={{ position: [0, 0, 10], fov: 45 }} style={{ width: '100%', height: '100%' }}>
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} />
        <pointLight position={[-10, -10, -10]} intensity={1} />
        
        <FloatingCube position={[-4, 2, -5]} color="#4f46e5" scale={1.5} />
        <FloatingCube position={[4, -2, -5]} color="#0ea5e9" scale={1.5} />
        <FloatingCube position={[-3, -3, -2]} color="#6366f1" scale={1} />
        <FloatingCube position={[3, 3, -2]} color="#38bdf8" scale={1} />
        <FloatingCube position={[0, 0, -8]} color="#818cf8" scale={2} />
        
        <Environment preset="city" />
      </Canvas>
    </div>
  );
}
