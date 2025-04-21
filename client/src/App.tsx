import React, { useState, useEffect } from "react";
import { useAudio } from "./lib/stores/useAudio";
import PeriodicTable from "./components/PeriodicTable";
import './index.css';
// Category type definition
interface Category {
  id: string;
  name: string;
  color: string;
}

// Define the different element categories
const categories: Category[] = [
  { id: 'alkali', name: 'Alkali Metals', color: '#ff9999' },
  { id: 'alkaline', name: 'Alkaline Earth Metals', color: '#ffcc66' },
  { id: 'transition', name: 'Transition Metals', color: '#cc9966' },
  { id: 'post-transition', name: 'Post-Transition Metals', color: '#99cc99' },
  { id: 'metalloids', name: 'Metalloids', color: '#66cccc' },
  { id: 'nonmetals', name: 'Nonmetals', color: '#6699cc' },
  { id: 'halogens', name: 'Halogens', color: '#6699aa' },
  { id: 'noble', name: 'Noble Gases', color: '#9999cc' },
  { id: 'lanthanides', name: 'Lanthanides', color: '#cc99cc' },
  { id: 'actinides', name: 'Actinides', color: '#cc6699' },
  { id: 'unknown', name: 'Unknown Properties', color: '#cccccc' }
];

function App() {
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);
  const [time, setTime] = useState(600); // 10 minutes in seconds
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [elementsCorrect, setElementsCorrect] = useState(0);
  const [totalElementsInLevel, setTotalElementsInLevel] = useState(0);
  
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
  
  // Timer effect
  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | undefined = undefined;
    
    if (isPlaying && !isPaused && time > 0) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime - 1);
      }, 1000);
    } else if (time === 0) {
      // Game over when time runs out
      handleGameOver();
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isPlaying, isPaused, time]);
  
  const formatTime = (timeInSeconds: number): string => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };
  
  const handleStart = () => {
    // Reset game state
    setScore(0);
    setLevel(1);
    setElementsCorrect(0);
    setTime(600); // Reset timer to 10 minutes
    
    // Show level description before starting
    const levelDescriptions = [
      "Level 1: Basic elements - Alkali metals, Alkaline earth metals, and Noble gases",
      "Level 2: Adding non-metals and halogens",
      "Level 3: Adding metalloids",
      "Level 4: Adding transition metals",
      "Level 5: Adding post-transition metals",
      "Level 6: All elements - Complete the periodic table!"
    ];
    
    alert(`Starting Game!\n\n${levelDescriptions[0]}`);
    
    setIsPlaying(true);
    setIsPaused(false);
    
    // Start playing background music
    if (!useAudio.getState().isMuted) {
      useAudio.getState().backgroundMusic?.play();
    }
  };
  
  const handlePause = () => {
    setIsPaused(!isPaused);
    if (!isPaused) {
      // Pause music
      useAudio.getState().backgroundMusic?.pause();
    } else {
      // Resume music
      if (!useAudio.getState().isMuted) {
        useAudio.getState().backgroundMusic?.play();
      }
    }
  };
  
  const handleShuffle = () => {
    // Re-shuffle the board (will be implemented in PeriodicTable component)
    useAudio.getState().playHit();
  };
  
  // Handle level setup when level changes
  useEffect(() => {
    // Reset elements correct counter when level changes
    setElementsCorrect(0);
    
    // Set total elements based on level
    // Different number of elements for each level
    let elementsCount = 0;
    
    switch(level) {
      case 1: elementsCount = 10; break; // Basic elements (alkali, alkaline, noble gases)
      case 2: elementsCount = 15; break; // Above + some non-metals
      case 3: elementsCount = 20; break; // Above + metalloids
      case 4: elementsCount = 25; break; // Above + transition metals
      case 5: elementsCount = 30; break; // Above + post-transition metals
      case 6: elementsCount = 40; break; // Nearly all elements
      default: elementsCount = 10;
    }
    
    setTotalElementsInLevel(elementsCount);
    
    // Add time for higher levels
    if (level > 1 && isPlaying) {
      setTime(prev => prev + 120); // Add 2 minutes per level
    }
    
  }, [level, isPlaying]);

  const handleCorrectMatch = () => {
    const pointsPerElement = 10;
    setScore((prevScore) => prevScore + pointsPerElement);
    setElementsCorrect(prev => {
      const newValue = prev + 1;
      
      // Level descriptions for alerts
      const levelDescriptions = [
        "Level 1: Basic elements - Alkali metals, Alkaline earth metals, and Noble gases",
        "Level 2: Adding non-metals and halogens",
        "Level 3: Adding metalloids",
        "Level 4: Adding transition metals",
        "Level 5: Adding post-transition metals",
        "Level 6: All elements - Complete the periodic table!"
      ];
      
      // Check if all elements for this level are placed correctly
      if (newValue >= totalElementsInLevel && level < 6) {
        // Level up!
        setTimeout(() => {
          const nextLevel = level + 1;
          alert(`Congratulations! You completed level ${level}!\n\nMoving to ${levelDescriptions[nextLevel-1]}`);
          setLevel(prev => prev + 1);
        }, 500);
      } else if (newValue >= totalElementsInLevel && level === 6) {
        // Game completed!
        setTimeout(() => {
          alert(`Congratulations! You completed all levels!\n\nYou are a periodic table master!\n\nFinal score: ${score + pointsPerElement}`);
          setIsPlaying(false);
        }, 500);
      }
      
      return newValue;
    });
    
    useAudio.getState().playSuccess();
  };
  
  const handleGameOver = () => {
    setIsPlaying(false);
    alert(`Game Over! Your final score is ${score}. You reached level ${level}.`);
  };

  return (
    <div className="game-container">
      <div className="game-header">
        <h1>Periodic Puzzle</h1>
        <div className="game-stats">
          <div className="stat">Score: {score}</div>
          <div className="stat">
            <div>Level: {level} / 6</div>
            {isPlaying && (
              <div className="progress-bar">
                <div 
                  className="progress-fill" 
                  style={{ 
                    width: `${Math.min(100, (elementsCorrect / totalElementsInLevel) * 100)}%`,
                    backgroundColor: level <= 3 ? '#64ffda' : level <= 5 ? '#ff9d42' : '#ff4242'
                  }}
                ></div>
                <div className="progress-text">
                  {elementsCorrect} / {totalElementsInLevel}
                </div>
              </div>
            )}
          </div>
          <div className="stat">Time: {formatTime(time)}</div>
        </div>
        <div className="game-controls">
          <button 
            className="control-button"
            onClick={handleStart}
            disabled={isPlaying && !isPaused}
          >
            Start
          </button>
          <button 
            className="control-button"
            onClick={handlePause}
            disabled={!isPlaying}
          >
            Pause
          </button>
          <button 
            className="control-button"
            onClick={handleShuffle}
            disabled={!isPlaying || isPaused}
          >
            Shuffle
          </button>
        </div>
      </div>
      
      <div className="category-legend">
        {categories.map((category) => (
          <div key={category.id} className="legend-item">
            <div 
              className="color-box" 
              style={{ backgroundColor: category.color }}
            ></div>
            <div className="category-name">{category.name}</div>
          </div>
        ))}
      </div>
      
      <div className="periodic-table-container">
        {isPlaying ? (
          <PeriodicTable 
            level={level} 
            onCorrectMatch={handleCorrectMatch} 
            isPaused={isPaused}
            categories={categories}
          />
        ) : (
          <div className="start-prompt">
            <h2>Click Start to Begin!</h2>
            <p>Match elements correctly to earn points before time runs out.</p>
          </div>
        )}
      </div>
      
      {/* Audio toggle button */}
      <button 
        onClick={() => useAudio.getState().toggleMute()}
        className="audio-toggle"
      >
        {useAudio.getState().isMuted ? 'Unmute' : 'Mute'}
      </button>
    </div>
  );
}

export default App;
