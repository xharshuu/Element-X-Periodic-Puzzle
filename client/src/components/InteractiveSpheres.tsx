import { useFrame, useThree } from "@react-three/fiber";
import { useRef, useState, useEffect } from "react";
import * as THREE from "three";
import SphereField from "./SphereField";
import useMousePosition from "../hooks/useMousePosition";
import useWindowSize from "../hooks/useWindowSize";
import { useSphereStore } from "../lib/stores/useSphereStore";
import { useAudio } from "../lib/stores/useAudio";

// Main component that sets up the 3D scene
const InteractiveSpheres = () => {
  // Reference to the overall scene group
  const groupRef = useRef<THREE.Group>(null);
  
  // Get the current state of the canvas
  const { viewport } = useThree();
  
  // Custom hooks for mouse position and window size
  const mousePosition = useMousePosition();
  const windowSize = useWindowSize();
  
  // Target for lerping the mouse movement effect
  const [targetRotation, setTargetRotation] = useState({ x: 0, y: 0 });
  
  // Access the sphere store
  const { setSphereCount } = useSphereStore();
  
  // Calculate number of spheres based on window size
  useEffect(() => {
    const baseSphereCount = 30;
    const aspectRatio = windowSize.width / windowSize.height;
    
    // Adjust sphere count based on screen size
    let adjustedCount = Math.round(baseSphereCount * aspectRatio);
    
    // Limit the maximum number of spheres for performance
    adjustedCount = Math.max(15, Math.min(adjustedCount, 60));
    
    setSphereCount(adjustedCount);
  }, [windowSize, setSphereCount]);
  
  // Update rotation targets based on mouse position
  useEffect(() => {
    if (mousePosition.x !== null && mousePosition.y !== null) {
      // Convert mouse position to normalized coordinates (-1 to 1)
      const normalizedX = (mousePosition.x / windowSize.width) * 2 - 1;
      const normalizedY = -(mousePosition.y / windowSize.height) * 2 + 1;
      
      // Set target rotation based on mouse position
      setTargetRotation({
        x: normalizedY * 0.2, // Tilt up/down based on mouse Y
        y: normalizedX * 0.3  // Rotate left/right based on mouse X
      });
    }
  }, [mousePosition, windowSize]);
  
  // Animation loop
  useFrame((_, delta) => {
    if (groupRef.current) {
      // Smoothly interpolate towards the target rotation (lerp)
      groupRef.current.rotation.x = THREE.MathUtils.lerp(
        groupRef.current.rotation.x,
        targetRotation.x,
        delta * 2
      );
      groupRef.current.rotation.y = THREE.MathUtils.lerp(
        groupRef.current.rotation.y,
        targetRotation.y,
        delta * 2
      );
      
      // Add subtle continuous rotation
      groupRef.current.rotation.y += delta * 0.05;
    }
  });
  
  // Play hit sound when mouse moves significantly
  useEffect(() => {
    let timeout: NodeJS.Timeout;
    let lastX = mousePosition.x;
    let lastY = mousePosition.y;
    
    const handleMouseMove = () => {
      if (
        mousePosition.x !== null && 
        mousePosition.y !== null && 
        lastX !== null && 
        lastY !== null
      ) {
        const distance = Math.hypot(
          mousePosition.x - lastX,
          mousePosition.y - lastY
        );
        
        // If mouse moved more than 100px, play hit sound
        if (distance > 100) {
          useAudio.getState().playHit();
          
          // Update last position
          lastX = mousePosition.x;
          lastY = mousePosition.y;
          
          // Debounce to prevent too many sounds
          clearTimeout(timeout);
          timeout = setTimeout(() => {
            lastX = mousePosition.x;
            lastY = mousePosition.y;
          }, 300);
        }
      }
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      clearTimeout(timeout);
    };
  }, [mousePosition]);
  
  return (
    <>
      {/* Scene lighting */}
      <ambientLight intensity={0.3} />
      <pointLight position={[10, 10, 10]} intensity={0.8} />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#5c17eb" />
      
      {/* Container for all spheres */}
      <group ref={groupRef}>
        <SphereField />
      </group>
    </>
  );
};

export default InteractiveSpheres;
