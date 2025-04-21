import React from 'react';
// Import ElementData type
interface ElementData {
  symbol: string;
  name: string;
  atomicNumber: number;
  row: number;
  col: number;
  category: string;
  displayType?: 'symbol' | 'name';
}

interface ElementPaletteProps {
  elements: ElementData[];
  getCategoryColor: (category: string) => string;
}

const ElementPalette: React.FC<ElementPaletteProps> = ({ elements, getCategoryColor }) => {
  const handleDragStart = (e: React.DragEvent<HTMLDivElement>, element: ElementData) => {
    // Set the data to be dragged
    e.dataTransfer.setData('text/plain', element.symbol);
    e.dataTransfer.setData('application/json', JSON.stringify(element));
    e.currentTarget.classList.add('dragging');
  };

  const handleDragEnd = (e: React.DragEvent<HTMLDivElement>) => {
    e.currentTarget.classList.remove('dragging');
  };

  return (
    <div className="element-palette">
      <h3 style={{ 
        width: '100%', 
        textAlign: 'center', 
        marginBottom: '15px', 
        color: '#64ffda',
        fontSize: '18px',
        fontWeight: 'bold',
        textShadow: '0 0 5px rgba(100, 255, 218, 0.5)',
        background: 'rgba(0,0,0,0.3)',
        padding: '8px',
        borderRadius: '4px',
        border: '1px solid rgba(100, 255, 218, 0.3)'
      }}>
        Element Palette - Drag to Their Correct Positions
      </h3>
      <div style={{ 
        display: 'flex', 
        flexWrap: 'wrap', 
        justifyContent: 'center',
        gap: '8px',
        padding: '10px'
      }}>
        {elements.length > 0 ? (
          elements.map((element) => (
            <div
              key={element.symbol}
              className="element-box"
              draggable
              onDragStart={(e) => handleDragStart(e, element)}
              onDragEnd={handleDragEnd}
              style={{ 
                backgroundColor: getCategoryColor(element.category),
                boxShadow: '0 0 10px rgba(0, 0, 0, 0.3)',
                cursor: 'grab'
              }}
            >
              <span 
                className="element-number" 
                style={{ 
                  position: 'absolute',
                  top: '3px',
                  left: '3px',
                  fontSize: '10px',
                  fontWeight: 'bold',
                  backgroundColor: 'rgba(0,0,0,0.3)',
                  padding: '1px 3px',
                  borderRadius: '3px'
                }}
              >{element.atomicNumber}</span>
              <span 
                className="element-symbol" 
                style={{ 
                  fontWeight: 'bold', 
                  fontSize: '18px',
                  marginTop: '6px'
                }}
              >{element.symbol}</span>
            </div>
          ))
        ) : (
          <div style={{ color: '#fff', padding: '20px' }}>
            All elements have been placed! Great job!
          </div>
        )}
      </div>
    </div>
  );
};

export default ElementPalette;