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
      <h3 style={{ width: '100%', textAlign: 'center', marginBottom: '10px', color: '#64ffda' }}>
        Element Palette - Drag to Place
      </h3>
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
        {elements.map((element) => (
          <div
            key={element.symbol}
            className="element-box"
            draggable
            onDragStart={(e) => handleDragStart(e, element)}
            onDragEnd={handleDragEnd}
            style={{ backgroundColor: getCategoryColor(element.category) }}
          >
            <span className="element-number">{element.atomicNumber}</span>
            <span className="element-symbol">{element.symbol}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ElementPalette;