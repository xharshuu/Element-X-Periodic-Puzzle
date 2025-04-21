import React from 'react';
// ElementData type definition
interface ElementData {
  symbol: string;
  name: string;
  atomicNumber: number;
  row: number;
  col: number;
  category: string;
  displayType?: 'symbol' | 'name';
}

interface ElementProps {
  element: {
    symbol: string;
    name: string;
    atomicNumber: number;
    row: number;
    col: number;
    category: string;
    displayType?: 'symbol' | 'name';
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
  // Determine the CSS classes for this element
  const elementClasses = [
    'element',
    isSelected ? 'selected' : '',
    isMatched ? 'matched' : ''
  ].filter(Boolean).join(' ');
  
  // Display either the symbol or the name based on displayType
  const displayContent = displayType === 'symbol' ? element.symbol : element.name;
  
  return (
    <div
      className={elementClasses}
      style={{
        backgroundColor: color,
        gridRow: element.row,
        gridColumn: element.col
      }}
      onClick={onClick}
    >
      <span className="element-number">{element.atomicNumber}</span>
      <span className={displayType === 'symbol' ? 'element-symbol' : 'element-name'}>
        {displayContent}
      </span>
    </div>
  );
};

export default ElementBlock;