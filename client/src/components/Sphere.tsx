import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface SphereProps {
  position: number[];
  radius: number;
  color: string;
  velocity: number[];
  rotationSpeed: number;
}

const Sphere = ({ position, radius, color, velocity, rotationSpeed }: SphereProps) => {
  // Reference to the mesh object
  const meshRef = useRef<THREE.Mesh>(null);
  
  // Use a reference to store the current position
  const positionRef = useRef({
    x: position[0],
    y: position[1],
    z: position[2],
  });
  
  // Update sphere position and rotation in the animation loop
  useFrame((_, delta) => {
    if (meshRef.current) {
      // Apply velocity to position
      positionRef.current.x += velocity[0];
      positionRef.current.y += velocity[1];
      positionRef.current.z += velocity[2];
      
      // Boundary check - if a sphere goes too far, bounce it back
      const boundary = 12;
      
      if (Math.abs(positionRef.current.x) > boundary) {
        velocity[0] *= -1; // Reverse x velocity
        positionRef.current.x = Math.sign(positionRef.current.x) * boundary;
      }
      
      if (Math.abs(positionRef.current.y) > boundary) {
        velocity[1] *= -1; // Reverse y velocity
        positionRef.current.y = Math.sign(positionRef.current.y) * boundary;
      }
      
      if (Math.abs(positionRef.current.z) > boundary) {
        velocity[2] *= -1; // Reverse z velocity
        positionRef.current.z = Math.sign(positionRef.current.z) * boundary;
      }
      
      // Update mesh position
      meshRef.current.position.set(
        positionRef.current.x,
        positionRef.current.y,
        positionRef.current.z
      );
      
      // Add constant rotation
      meshRef.current.rotation.x += rotationSpeed * 1.5 * delta;
      meshRef.current.rotation.y += rotationSpeed * delta;
      meshRef.current.rotation.z += rotationSpeed * 0.7 * delta;
    }
  });

  return (
    <mesh ref={meshRef} position={[position[0], position[1], position[2]]}>
      <sphereGeometry args={[radius, 32, 32]} />
      <meshPhysicalMaterial 
        color={color}
        emissive={color}
        emissiveIntensity={0.4}
        roughness={0.2}
        metalness={0.8}
        envMapIntensity={1}
        clearcoat={0.8}
        clearcoatRoughness={0.2}
        transparent={true}
        opacity={0.8}
      />
    </mesh>
  );
};

export default Sphere;
