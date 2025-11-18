'use client';

import { Canvas } from '@react-three/fiber';
import { Float, OrbitControls, Text } from '@react-three/drei';

const Result3D = ({ score }: { score: number }) => (
  <div className="h-64 w-full overflow-hidden rounded-3xl bg-slate-900 shadow-2xl sm:h-72">
    <Canvas camera={{ position: [0, 0, 6], fov: 45 }}>
      <ambientLight intensity={0.7} />
      <directionalLight position={[4, 6, 3]} intensity={1.4} color="#facc15" />
      <Float speed={1.5} rotationIntensity={0.6} floatIntensity={1.2}>
        <group>
          <mesh position={[0, -0.2, 0]}>
            <coneGeometry args={[1.2, 2.4, 48]} />
            <meshStandardMaterial color="#facc15" metalness={0.5} roughness={0.25} />
          </mesh>
          <mesh position={[0, -1.4, 0]}>
            <cylinderGeometry args={[0.5, 0.9, 0.4, 32]} />
            <meshStandardMaterial color="#d97706" metalness={0.3} roughness={0.4} />
          </mesh>
          <Text position={[0, 1.6, 0]} fontSize={0.5} color="#fef9c3" anchorX="center" anchorY="middle">
            {score}%
          </Text>
        </group>
      </Float>
      <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={1.2} />
    </Canvas>
  </div>
);

export default Result3D;
