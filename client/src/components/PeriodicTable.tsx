import React, { useState, useEffect } from 'react';
import ElementBlock from './ElementBlock';
import { periodicTableData } from '../data/periodicTableData';

interface PeriodicTableProps {
  level: number;
  onCorrectMatch: () => void;
  isPaused: boolean;
  categories: Array<{
    id: string;
    name: string;
    color: string;
  }>;
}

const PeriodicTable: React.FC<PeriodicTableProps> = ({ 
  level, 
  onCorrectMatch, 
  isPaused,
  categories 
}) => {
  // State for tracking selected element
  const [selectedElement, setSelectedElement] = useState<string | null>(null);
  // State for tracking matched elements
  const [matchedElements, setMatchedElements] = useState<string[]>([]);
  // State for the current puzzle layout
  const [currentLayout, setCurrentLayout] = useState<any[]>([]);
  
  // Initialize or shuffle the periodic table layout
  useEffect(() => {
    const shuffleElements = () => {
      // For level 1, only show a subset of elements (main groups)
      let elementsToShow = [...periodicTableData];
      
      if (level === 1) {
        elementsToShow = periodicTableData.filter(el => 
          el.category === 'alkali' || 
          el.category === 'alkaline' || 
          el.category === 'nonmetals' || 
          el.category === 'noble'
        );
      }
      
      // Randomize the display of symbols for some elements
      const shuffledElements = elementsToShow.map(element => {
        // 30% chance to hide symbol and show chemical name or vice versa
        const shouldAlternate = Math.random() < 0.3;
        
        return {
          ...element,
          displayType: shouldAlternate ? 'name' : 'symbol'
        };
      });
      
      setCurrentLayout(shuffledElements);
    };
    
    shuffleElements();
  }, [level]);
  
  // Handle element click
  const handleElementClick = (elementSymbol: string) => {
    if (isPaused || matchedElements.includes(elementSymbol)) {
      return; // Don't do anything if game is paused or element is already matched
    }
    
    if (selectedElement === null) {
      // First selection
      setSelectedElement(elementSymbol);
    } else {
      // Second selection - check if it matches the first
      const firstElement = currentLayout.find(el => el.symbol === selectedElement);
      const secondElement = currentLayout.find(el => el.symbol === elementSymbol);
      
      if (firstElement && secondElement && firstElement.symbol === secondElement.symbol) {
        // Matched - add to matched elements
        setMatchedElements(prev => [...prev, elementSymbol]);
        setSelectedElement(null);
        onCorrectMatch(); // Trigger score increase
      } else {
        // Not matched - clear selection after a short delay
        setTimeout(() => {
          setSelectedElement(null);
        }, 1000);
      }
    }
  };
  
  // Find the specific color for a category
  const getCategoryColor = (categoryId: string) => {
    const category = categories.find(cat => cat.id === categoryId);
    return category ? category.color : '#cccccc';
  };

  // Generate the Periodic Table grid with proper spacing
  const renderPeriodicTable = () => {
    const grid = [];
    
    // Standard periodic table has 18 columns and 10 rows (including f-block below)
    for (let row = 1; row <= 10; row++) {
      for (let col = 1; col <= 18; col++) {
        // Find an element at this position if it exists
        const element = currentLayout.find(el => el.row === row && el.col === col);
        
        if (element) {
          grid.push(
            <ElementBlock
              key={`${row}-${col}`}
              element={element}
              isSelected={selectedElement === element.symbol}
              isMatched={matchedElements.includes(element.symbol)}
              onClick={() => handleElementClick(element.symbol)}
              color={getCategoryColor(element.category)}
              displayType={element.displayType}
            />
          );
        } else {
          // Empty cell
          grid.push(
            <div 
              key={`empty-${row}-${col}`} 
              style={{ gridRow: row, gridColumn: col }}
            />
          );
        }
      }
    }
    
    return grid;
  };

  return (
    <div className="periodic-table">
      {renderPeriodicTable()}
    </div>
  );
};

export default PeriodicTable;