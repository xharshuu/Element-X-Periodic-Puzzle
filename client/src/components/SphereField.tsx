import { useMemo } from "react";
import * as THREE from "three";
import Sphere from "./Sphere";
import { useSphereStore } from "../lib/stores/useSphereStore";

const SphereField = () => {
  // Get sphere count from store
  const { sphereCount } = useSphereStore();
  
  // Memoize the sphere configurations to prevent regeneration on each render
  const spheres = useMemo(() => {
    const tempSpheres = [];
    
    for (let i = 0; i < sphereCount; i++) {
      // Calculate random properties for each sphere
      const radius = Math.random() * 0.5 + 0.2;
      
      // Position spheres in a sphere-like distribution
      const theta = Math.random() * Math.PI * 2; // Random angle around y-axis
      const phi = Math.acos((Math.random() * 2) - 1); // Random angle from y-axis
      const distance = Math.random() * 10 + 5; // Random distance from center
      
      // Convert spherical to cartesian coordinates
      const x = distance * Math.sin(phi) * Math.cos(theta);
      const y = distance * Math.sin(phi) * Math.sin(theta);
      const z = distance * Math.cos(phi);
      
      // Random velocity components
      const vx = (Math.random() - 0.5) * 0.02;
      const vy = (Math.random() - 0.5) * 0.02;
      const vz = (Math.random() - 0.5) * 0.02;
      
      // Random color
      const hue = Math.random();
      const saturation = 0.7;
      const lightness = 0.6;
      const color = new THREE.Color().setHSL(hue, saturation, lightness);
      
      tempSpheres.push({
        id: i,
        position: [x, y, z],
        radius,
        velocity: [vx, vy, vz],
        color: color.getHexString(), 
        rotationSpeed: Math.random() * 0.01 - 0.005
      });
    }
    
    return tempSpheres;
  }, [sphereCount]);

  return (
    <>
      {spheres.map((sphere) => (
        <Sphere
          key={sphere.id}
          position={sphere.position}
          radius={sphere.radius}
          color={`#${sphere.color}`}
          velocity={sphere.velocity}
          rotationSpeed={sphere.rotationSpeed}
        />
      ))}
    </>
  );
};

export default SphereField;
