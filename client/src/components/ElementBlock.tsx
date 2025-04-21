import React from 'react';

interface ElementProps {
  element: {
    symbol: string;
    name: string;
    atomicNumber: number;
    row: number;
    col: number;
    category: string;
  };
  isSelected: boolean;
  isMatched: boolean;
  onClick: () => void;
  color: string;
  displayType: 'symbol' | 'name';
}

const ElementBlock: React.FC<ElementProps> = ({
  element,
  isSelected,
  isMatched,
  onClick,
  color,
  displayType
}) => {
  // Determine which content to display based on displayType
  const displayContent = displayType === 'symbol' ? element.symbol : element.name;
  
  return (
    <div 
      className={`element ${isSelected ? 'selected' : ''} ${isMatched ? 'matched' : ''}`}
      style={{ 
        backgroundColor: color, 
        gridRow: element.row, 
        gridColumn: element.col,
        opacity: isMatched ? 0.6 : 1
      }}
      onClick={onClick}
    >
      <span className="element-number">{element.atomicNumber}</span>
      <span className="element-symbol">{displayContent}</span>
    </div>
  );
};

export default ElementBlock;