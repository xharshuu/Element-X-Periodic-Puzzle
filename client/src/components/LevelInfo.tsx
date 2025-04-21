import React, { useEffect, useState } from 'react';

interface LevelInfoProps {
  level: number;
  isVisible: boolean;
  onClose: () => void;
}

const LevelInfo: React.FC<LevelInfoProps> = ({ level, isVisible, onClose }) => {
  const [visible, setVisible] = useState(isVisible);
  
  // Level descriptions with detailed information
  const levelDescriptions = [
    {
      title: "Level 1: Basic Elements",
      description: "Start with the fundamental building blocks: Alkali metals, Alkaline earth metals, and Noble gases.",
      elements: "Elements like Li, Na, K, He, Ne, Ar, etc."
    },
    {
      title: "Level 2: Non-metals & Halogens",
      description: "Adding non-metals and reactive halogens to expand your knowledge.",
      elements: "Elements like C, N, O, F, Cl, Br, etc."
    },
    {
      title: "Level 3: Metalloids",
      description: "Now including metalloids - elements with properties of both metals and non-metals.",
      elements: "Elements like B, Si, Ge, As, Sb, Te, etc."
    },
    {
      title: "Level 4: Transition Metals",
      description: "Adding the first row of transition metals - versatile elements with multiple oxidation states.",
      elements: "Elements like Fe, Cu, Zn, Mn, Ni, etc."
    },
    {
      title: "Level 5: Post-Transition Metals",
      description: "Adding post-transition metals with lower melting points and higher electronegativity.",
      elements: "Elements like Al, Ga, In, Sn, Pb, etc."
    },
    {
      title: "Level 6: Complete Periodic Table",
      description: "Challenge yourself with the full periodic table including lanthanides and actinides.",
      elements: "Almost the entire periodic table including rare earth elements."
    }
  ];
  
  useEffect(() => {
    setVisible(isVisible);
    
    // Auto-hide after 5 seconds
    if (isVisible) {
      const timer = setTimeout(() => {
        setVisible(false);
        onClose();
      }, 5000);
      
      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);
  
  if (!visible) return null;
  
  const levelInfo = levelDescriptions[level - 1] || levelDescriptions[0];
  
  return (
    <div className="level-info-overlay">
      <div className="level-info-card">
        <h2>{levelInfo.title}</h2>
        <p>{levelInfo.description}</p>
        <p><strong>Featured elements:</strong> {levelInfo.elements}</p>
        <button className="level-info-close" onClick={onClose}>
          Continue
        </button>
      </div>
    </div>
  );
};

export default LevelInfo;