import React, { useState, useEffect } from 'react';
import ElementBlock from './ElementBlock';
import ElementPalette from './ElementPalette';
import { periodicTableData } from '../data/periodicTableData';

// Define ElementData and Category interfaces directly
interface ElementData {
  symbol: string;
  name: string;
  atomicNumber: number;
  row: number;
  col: number;
  category: string;
  displayType?: 'symbol' | 'name';
}

interface Category {
  id: string;
  name: string;
  color: string;
}

interface PeriodicTableProps {
  level: number;
  onCorrectMatch: () => void;
  isPaused: boolean;
  categories: Array<Category>;
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
  // State for the current puzzle layout (full table)
  const [fullTableLayout, setFullTableLayout] = useState<ElementData[]>([]);
  // State for elements that have been placed correctly
  const [placedElements, setPlacedElements] = useState<string[]>([]);
  // State for elements available in the palette
  const [paletteElements, setPaletteElements] = useState<ElementData[]>([]);
  
  // Initialize or shuffle the periodic table layout
  useEffect(() => {
    const initializeGame = () => {
      // Filter elements based on level
      let elementsToShow = [...periodicTableData];
      
      // Apply different filters for each level
      switch(level) {
        case 1:
          // Level 1: Basic elements (alkali, alkaline, noble gases)
          elementsToShow = periodicTableData.filter((el: ElementData) => 
            el.category === 'alkali' || 
            el.category === 'alkaline' || 
            el.category === 'noble'
          );
          break;
          
        case 2:
          // Level 2: Add nonmetals and halogens
          elementsToShow = periodicTableData.filter((el: ElementData) => 
            el.category === 'alkali' || 
            el.category === 'alkaline' || 
            el.category === 'noble' ||
            el.category === 'nonmetals' ||
            el.category === 'halogens'
          );
          break;
          
        case 3:
          // Level 3: Add metalloids
          elementsToShow = periodicTableData.filter((el: ElementData) => 
            el.category === 'alkali' || 
            el.category === 'alkaline' || 
            el.category === 'noble' ||
            el.category === 'nonmetals' ||
            el.category === 'halogens' ||
            el.category === 'metalloids'
          );
          break;
          
        case 4:
          // Level 4: Add transition metals (first row)
          elementsToShow = periodicTableData.filter((el: ElementData) => 
            el.category === 'alkali' || 
            el.category === 'alkaline' || 
            el.category === 'noble' ||
            el.category === 'nonmetals' ||
            el.category === 'halogens' ||
            el.category === 'metalloids' ||
            (el.category === 'transition' && el.row <= 4)
          );
          break;
          
        case 5:
          // Level 5: Add post-transition metals
          elementsToShow = periodicTableData.filter((el: ElementData) => 
            el.category === 'alkali' || 
            el.category === 'alkaline' || 
            el.category === 'noble' ||
            el.category === 'nonmetals' ||
            el.category === 'halogens' ||
            el.category === 'metalloids' ||
            el.category === 'transition' ||
            el.category === 'post-transition'
          );
          break;
          
        case 6:
          // Level 6: All elements
          // No filter needed, use all elements
          break;
          
        default:
          // Default to level 1
          elementsToShow = periodicTableData.filter((el: ElementData) => 
            el.category === 'alkali' || 
            el.category === 'alkaline' || 
            el.category === 'noble'
          );
      }
      
      // Set full layout
      setFullTableLayout(elementsToShow);
      
      // Select elements for the palette (elements to be dragged)
      // Limit the number of elements in palette based on level
      const maxElementsPerLevel = [10, 15, 20, 25, 30, 40];
      const numElementsForPalette = Math.min(
        maxElementsPerLevel[level - 1] || 10, 
        elementsToShow.length
      );
      
      // Sort by atomic number to get a nice order
      const sortedElements = [...elementsToShow].sort((a, b) => a.atomicNumber - b.atomicNumber);
      const selectedForPalette = sortedElements.slice(0, numElementsForPalette);
      
      setPaletteElements(selectedForPalette);
      
      // Reset placed elements
      setPlacedElements([]);
      
      console.log(`Level ${level} initialized with ${elementsToShow.length} elements`);
      console.log(`Palette has ${selectedForPalette.length} elements`);
    };
    
    initializeGame();
  }, [level]);
  
  // Find the specific color for a category
  const getCategoryColor = (categoryId: string): string => {
    const category = categories.find(cat => cat.id === categoryId);
    return category ? category.color : '#cccccc';
  };
  
  // Handle drop on a cell
  const handleDrop = (e: React.DragEvent<HTMLDivElement>, row: number, col: number) => {
    e.preventDefault();
    
    if (isPaused) return;
    
    const elementSymbol = e.dataTransfer.getData('text/plain');
    const elementJson = e.dataTransfer.getData('application/json');
    
    if (!elementSymbol || !elementJson) return;
    
    const droppedElement: ElementData = JSON.parse(elementJson);
    
    // Check if this element belongs at this position
    const correctPosition = droppedElement.row === row && droppedElement.col === col;
    
    if (correctPosition) {
      // Element was placed correctly
      setPlacedElements(prev => [...prev, elementSymbol]);
      onCorrectMatch(); // Increase score
      
      // Play success sound
      const audio = new Audio('/sounds/success.mp3');
      audio.play();
    } else {
      // Play error sound
      const audio = new Audio('/sounds/hit.mp3');
      audio.play();
    }
  };
  
  // Handle drag over
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>, row: number, col: number) => {
    e.preventDefault();
    // Find the correct element for this position
    const correctElement = fullTableLayout.find(el => el.row === row && el.col === col);
    
    // If there's a correct element for this position
    if (correctElement) {
      // Highlight the drop zone
      e.currentTarget.classList.add('can-drop');
    }
  };
  
  // Handle drag leave
  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.currentTarget.classList.remove('can-drop');
  };

  // Generate the Periodic Table grid with proper spacing and drop zones
  const renderPeriodicTable = () => {
    const grid = [];
    
    // Standard periodic table has 18 columns and 10 rows (including f-block below)
    for (let row = 1; row <= 10; row++) {
      for (let col = 1; col <= 18; col++) {
        // Find the correct element for this position
        const element = fullTableLayout.find(el => el.row === row && el.col === col);
        
        if (element) {
          // Check if this element has been placed already
          const isPlaced = placedElements.includes(element.symbol);
          
          if (isPlaced) {
            // If placed, show the element
            grid.push(
              <ElementBlock
                key={`${row}-${col}`}
                element={element}
                isSelected={selectedElement === element.symbol}
                isMatched={true}
                onClick={() => {}}
                color={getCategoryColor(element.category)}
                displayType={element.displayType || 'symbol'}
              />
            );
          } else {
            // If not placed, show a drop zone
            grid.push(
              <div
                key={`dropzone-${row}-${col}`}
                className="element-dropzone"
                style={{ 
                  gridRow: row, 
                  gridColumn: col,
                  position: 'relative'
                }}
                onDrop={(e) => handleDrop(e, row, col)}
                onDragOver={(e) => handleDragOver(e, row, col)}
                onDragLeave={handleDragLeave}
              >
                <span style={{ 
                  fontSize: '10px', 
                  opacity: 0.5,
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)'
                }}>
                  ({row},{col})
                </span>
              </div>
            );
          }
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
    <div className="periodic-table-wrapper">
      {/* Element palette - where the elements can be dragged from */}
      <ElementPalette 
        elements={paletteElements.filter(el => !placedElements.includes(el.symbol))}
        getCategoryColor={getCategoryColor}
      />
      
      {/* The periodic table grid - where elements can be dragged to */}
      <div className="periodic-table">
        {renderPeriodicTable()}
      </div>
    </div>
  );
};

export default PeriodicTable;