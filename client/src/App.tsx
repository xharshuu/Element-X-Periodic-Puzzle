import { Canvas } from "@react-three/fiber";
import { Suspense, useEffect } from "react";
import InteractiveSpheres from "./components/InteractiveSpheres";
import { useAudio } from "./lib/stores/useAudio";

function App() {
  // Initialize audio elements
  useEffect(() => {
    // Create background music element
    const bgMusic = new Audio("/sounds/background.mp3");
    bgMusic.loop = true;
    bgMusic.volume = 0.3;
    
    // Create hit sound for interactions
    const hitSound = new Audio("/sounds/hit.mp3");
    
    // Create success sound
    const successSound = new Audio("/sounds/success.mp3");
    
    // Store audio elements in the global store
    const audioStore = useAudio.getState();
    audioStore.setBackgroundMusic(bgMusic);
    audioStore.setHitSound(hitSound);
    audioStore.setSuccessSound(successSound);
    
    // Optional: Add event listener for user interaction to start audio
    // (browsers often require user interaction before playing audio)
    const handleInteraction = () => {
      // Toggle mute to false on first interaction
      if (useAudio.getState().isMuted) {
        useAudio.getState().toggleMute();
        // Try to play background music
        bgMusic.play().catch(err => console.log("Could not play audio: ", err));
      }
      // Remove the event listeners after first interaction
      document.removeEventListener("click", handleInteraction);
      document.removeEventListener("touchstart", handleInteraction);
    };
    
    document.addEventListener("click", handleInteraction);
    document.addEventListener("touchstart", handleInteraction);
    
    // Clean up on unmount
    return () => {
      document.removeEventListener("click", handleInteraction);
      document.removeEventListener("touchstart", handleInteraction);
      bgMusic.pause();
      bgMusic.currentTime = 0;
    };
  }, []);

  return (
    <div style={{ width: '100vw', height: '100vh', position: 'relative', overflow: 'hidden', backgroundColor: '#0f0f17' }}>
      <Canvas
        camera={{
          position: [0, 0, 15],
          fov: 60,
          near: 0.1,
          far: 1000
        }}
        gl={{
          antialias: true,
          alpha: true
        }}
        style={{ background: 'radial-gradient(#1a1a2e, #0f0f17)' }}
      >
        <color attach="background" args={["#0f0f17"]} />
        
        <Suspense fallback={null}>
          <InteractiveSpheres />
        </Suspense>
      </Canvas>
      
      {/* Audio toggle button */}
      <button 
        onClick={() => useAudio.getState().toggleMute()}
        style={{
          position: 'absolute',
          bottom: '20px',
          right: '20px',
          background: 'rgba(255, 255, 255, 0.1)',
          border: 'none',
          color: 'white',
          padding: '8px 12px',
          borderRadius: '4px',
          cursor: 'pointer',
          zIndex: 100
        }}
      >
        {useAudio.getState().isMuted ? 'Unmute' : 'Mute'}
      </button>
    </div>
  );
}

export default App;
