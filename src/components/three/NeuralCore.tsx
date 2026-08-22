import { useRef, useMemo, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function CoreMesh() {
  const group = useRef<THREE.Group>(null);
  const inner = useRef<THREE.Mesh>(null);

  const nodePositions = useMemo(() => {
    const pts: THREE.Vector3[] = [];
    const count = 42;
    const phi = Math.PI * (3 - Math.sqrt(5));
    for (let i = 0; i < count; i++) {
      const y = 1 - (i / (count - 1)) * 2;
      const radius = Math.sqrt(1 - y * y);
      const theta = phi * i;
      pts.push(new THREE.Vector3(Math.cos(theta) * radius, y, Math.sin(theta) * radius).multiplyScalar(2.1));
    }
    return pts;
  }, []);

  const edges = useMemo(() => {
    const lines: [THREE.Vector3, THREE.Vector3][] = [];
    for (let i = 0; i < nodePositions.length; i++) {
      let closest: number[] = [];
      const dists = nodePositions
        .map((p, j) => ({ j, d: p.distanceTo(nodePositions[i]) }))
        .filter((x) => x.j !== i)
        .sort((a, b) => a.d - b.d)
        .slice(0, 2);
      closest = dists.map((d) => d.j);
      closest.forEach((j) => lines.push([nodePositions[i], nodePositions[j]]));
    }
    return lines;
  }, [nodePositions]);

  useFrame((state, delta) => {
    if (group.current) {
      group.current.rotation.y += delta * 0.12;
      group.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.15) * 0.15;
    }
    if (inner.current) {
      inner.current.rotation.y -= delta * 0.25;
      const s = 1 + Math.sin(state.clock.elapsedTime * 1.4) * 0.04;
      inner.current.scale.setScalar(s);
    }
  });

  return (
    <group ref={group}>
      <mesh ref={inner}>
        <icosahedronGeometry args={[1.15, 1]} />
        <meshStandardMaterial
          color="#5eead4"
          emissive="#2dd4bf"
          emissiveIntensity={0.6}
          wireframe
          transparent
          opacity={0.85}
        />
      </mesh>

      <mesh>
        <icosahedronGeometry args={[0.95, 0]} />
        <meshBasicMaterial color="#a78bfa" wireframe={false} transparent opacity={0.06} />
      </mesh>

      {nodePositions.map((p, i) => (
        <mesh key={i} position={p}>
          <sphereGeometry args={[0.035, 8, 8]} />
          <meshStandardMaterial
            color={i % 5 === 0 ? "#fb923c" : "#5eead4"}
            emissive={i % 5 === 0 ? "#fb923c" : "#5eead4"}
            emissiveIntensity={1.2}
          />
        </mesh>
      ))}

      {edges.map(([a, b], i) => (
        <line key={i}>
          <bufferGeometry
            attach="geometry"
            onUpdate={(geo) => geo.setFromPoints([a, b])}
          />
          <lineBasicMaterial attach="material" color="#5eead4" transparent opacity={0.18} />
        </line>
      ))}
    </group>
  );
}

export default function NeuralCore() {
  // Stop rendering the WebGL loop when the tab is hidden
  const [frameloop, setFrameloop] = useState<"always" | "never">("always");

  useEffect(() => {
    const onVisibility = () => setFrameloop(document.hidden ? "never" : "always");
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, []);

  return (
    <div className="absolute inset-0" aria-hidden="true">
      <Canvas frameloop={frameloop} camera={{ position: [0, 0, 6.2], fov: 45 }} dpr={[1, 1.5]}>
        <ambientLight intensity={0.4} />
        <pointLight position={[5, 5, 5]} intensity={1.2} color="#5eead4" />
        <pointLight position={[-5, -3, -5]} intensity={0.8} color="#a78bfa" />
        <CoreMesh />
      </Canvas>
    </div>
  );
}
