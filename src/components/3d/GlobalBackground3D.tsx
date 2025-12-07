import { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Environment, Cloud } from '@react-three/drei';
import * as THREE from 'three';

function FloatingShape({ 
  position, 
  color, 
  scale = 1, 
  type = 'box' 
}: { 
  position: [number, number, number], 
  color: string, 
  scale?: number,
  type?: 'box' | 'octahedron' | 'tetrahedron'
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHover] = useState(false);

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.15;
      meshRef.current.rotation.y += delta * 0.2;
      
      // Subtle movement based on mouse
      const { x, y } = state.mouse;
      // Move slightly opposite to mouse for depth feel
      meshRef.current.position.x = THREE.MathUtils.lerp(meshRef.current.position.x, position[0] + x * 0.5, 0.05);
      meshRef.current.position.y = THREE.MathUtils.lerp(meshRef.current.position.y, position[1] + y * 0.5, 0.05);
    }
  });

  const Material = (
    <meshStandardMaterial
      color={color}
      roughness={0.1}
      metalness={0.8}
      transparent
      opacity={0.6}
    />
  );

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={1.5}>
      <mesh
        ref={meshRef}
        position={position}
        scale={hovered ? scale * 1.1 : scale}
        onPointerOver={() => setHover(true)}
        onPointerOut={() => setHover(false)}
      >
        {type === 'box' && <boxGeometry args={[1, 1, 1]} />}
        {type === 'octahedron' && <octahedronGeometry args={[0.8]} />}
        {type === 'tetrahedron' && <tetrahedronGeometry args={[0.9]} />}
        {Material}
      </mesh>
    </Float>
  );
}

export default function GlobalBackground3D() {
  const [isDark, setIsDark] = useState(true);
  const [scrollY, setScrollY] = useState(0);

  // Theme detection
  useEffect(() => {
    const checkTheme = () => {
      const colorMode = document.documentElement.getAttribute('data-color-mode');
      // Check data-color-mode attribute which is set by ThemeContext
      setIsDark(colorMode === 'dark');
    };
    
    checkTheme();
    
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-color-mode'] });
    
    return () => observer.disconnect();
  }, []);

  // Scroll detection for clouds
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!isDark) return null;

  // Calculate cloud opacity based on scroll (fade out over first 500px)
  const cloudOpacity = Math.max(0, 0.3 - scrollY / 500);

  return (
    <div className="fixed inset-0 z-50 w-full h-full pointer-events-none">
      <Canvas camera={{ position: [0, 0, 10], fov: 40 }} style={{ width: '100%', height: '100%' }}>
        <ambientLight intensity={0.4} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={0.8} />
        <pointLight position={[-10, -10, -10]} intensity={0.8} />
        
        {/* Clouds for atmosphere - Only visible at top */}
        {cloudOpacity > 0.01 && (
          <group>
            <Cloud opacity={cloudOpacity} speed={0.2} bounds={[10, 2, 1.5]} segments={20} position={[0, 5, -10]} />
            <Cloud opacity={cloudOpacity} speed={0.2} bounds={[10, 2, 1.5]} segments={20} position={[0, -5, -10]} />
          </group>
        )}

        {/* Left Side Shapes */}
        <FloatingShape position={[-7, 3, -5]} color="#4f46e5" scale={0.8} type="octahedron" />
        <FloatingShape position={[-8, 0, -6]} color="#0ea5e9" scale={0.6} type="box" />
        <FloatingShape position={[-6.5, -3, -4]} color="#6366f1" scale={0.7} type="tetrahedron" />
        
        {/* Right Side Shapes */}
        <FloatingShape position={[7, 2, -5]} color="#38bdf8" scale={0.8} type="octahedron" />
        <FloatingShape position={[8, -1, -6]} color="#818cf8" scale={0.6} type="box" />
        <FloatingShape position={[6.5, -4, -4]} color="#0ea5e9" scale={0.7} type="tetrahedron" />

        <Environment preset="city" />
      </Canvas>
    </div>
  );
}
