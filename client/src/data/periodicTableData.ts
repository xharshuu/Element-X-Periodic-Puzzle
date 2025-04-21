// ElementData interface definition
interface ElementData {
  symbol: string;
  name: string;
  atomicNumber: number;
  row: number;
  col: number;
  category: string;
  displayType?: 'symbol' | 'name';
}

// This is a simplified periodic table data
export const periodicTableData: ElementData[] = [
  // Row 1
  { symbol: 'H', name: 'Hydrogen', atomicNumber: 1, row: 1, col: 1, category: 'nonmetals' },
  { symbol: 'He', name: 'Helium', atomicNumber: 2, row: 1, col: 18, category: 'noble' },
  
  // Row 2
  { symbol: 'Li', name: 'Lithium', atomicNumber: 3, row: 2, col: 1, category: 'alkali' },
  { symbol: 'Be', name: 'Beryllium', atomicNumber: 4, row: 2, col: 2, category: 'alkaline' },
  { symbol: 'B', name: 'Boron', atomicNumber: 5, row: 2, col: 13, category: 'metalloids' },
  { symbol: 'C', name: 'Carbon', atomicNumber: 6, row: 2, col: 14, category: 'nonmetals' },
  { symbol: 'N', name: 'Nitrogen', atomicNumber: 7, row: 2, col: 15, category: 'nonmetals' },
  { symbol: 'O', name: 'Oxygen', atomicNumber: 8, row: 2, col: 16, category: 'nonmetals' },
  { symbol: 'F', name: 'Fluorine', atomicNumber: 9, row: 2, col: 17, category: 'halogens' },
  { symbol: 'Ne', name: 'Neon', atomicNumber: 10, row: 2, col: 18, category: 'noble' },
  
  // Row 3
  { symbol: 'Na', name: 'Sodium', atomicNumber: 11, row: 3, col: 1, category: 'alkali' },
  { symbol: 'Mg', name: 'Magnesium', atomicNumber: 12, row: 3, col: 2, category: 'alkaline' },
  { symbol: 'Al', name: 'Aluminum', atomicNumber: 13, row: 3, col: 13, category: 'post-transition' },
  { symbol: 'Si', name: 'Silicon', atomicNumber: 14, row: 3, col: 14, category: 'metalloids' },
  { symbol: 'P', name: 'Phosphorus', atomicNumber: 15, row: 3, col: 15, category: 'nonmetals' },
  { symbol: 'S', name: 'Sulfur', atomicNumber: 16, row: 3, col: 16, category: 'nonmetals' },
  { symbol: 'Cl', name: 'Chlorine', atomicNumber: 17, row: 3, col: 17, category: 'halogens' },
  { symbol: 'Ar', name: 'Argon', atomicNumber: 18, row: 3, col: 18, category: 'noble' },
  
  // Row 4 (only main groups for simplicity)
  { symbol: 'K', name: 'Potassium', atomicNumber: 19, row: 4, col: 1, category: 'alkali' },
  { symbol: 'Ca', name: 'Calcium', atomicNumber: 20, row: 4, col: 2, category: 'alkaline' },
  { symbol: 'Ga', name: 'Gallium', atomicNumber: 31, row: 4, col: 13, category: 'post-transition' },
  { symbol: 'Ge', name: 'Germanium', atomicNumber: 32, row: 4, col: 14, category: 'metalloids' },
  { symbol: 'As', name: 'Arsenic', atomicNumber: 33, row: 4, col: 15, category: 'metalloids' },
  { symbol: 'Se', name: 'Selenium', atomicNumber: 34, row: 4, col: 16, category: 'nonmetals' },
  { symbol: 'Br', name: 'Bromine', atomicNumber: 35, row: 4, col: 17, category: 'halogens' },
  { symbol: 'Kr', name: 'Krypton', atomicNumber: 36, row: 4, col: 18, category: 'noble' },
  
  // Row 5 (only main groups for simplicity)
  { symbol: 'Rb', name: 'Rubidium', atomicNumber: 37, row: 5, col: 1, category: 'alkali' },
  { symbol: 'Sr', name: 'Strontium', atomicNumber: 38, row: 5, col: 2, category: 'alkaline' },
  { symbol: 'In', name: 'Indium', atomicNumber: 49, row: 5, col: 13, category: 'post-transition' },
  { symbol: 'Sn', name: 'Tin', atomicNumber: 50, row: 5, col: 14, category: 'post-transition' },
  { symbol: 'Sb', name: 'Antimony', atomicNumber: 51, row: 5, col: 15, category: 'metalloids' },
  { symbol: 'Te', name: 'Tellurium', atomicNumber: 52, row: 5, col: 16, category: 'metalloids' },
  { symbol: 'I', name: 'Iodine', atomicNumber: 53, row: 5, col: 17, category: 'halogens' },
  { symbol: 'Xe', name: 'Xenon', atomicNumber: 54, row: 5, col: 18, category: 'noble' },
  
  // Row 6 (only main groups for simplicity)
  { symbol: 'Cs', name: 'Cesium', atomicNumber: 55, row: 6, col: 1, category: 'alkali' },
  { symbol: 'Ba', name: 'Barium', atomicNumber: 56, row: 6, col: 2, category: 'alkaline' },
  { symbol: 'Tl', name: 'Thallium', atomicNumber: 81, row: 6, col: 13, category: 'post-transition' },
  { symbol: 'Pb', name: 'Lead', atomicNumber: 82, row: 6, col: 14, category: 'post-transition' },
  { symbol: 'Bi', name: 'Bismuth', atomicNumber: 83, row: 6, col: 15, category: 'post-transition' },
  { symbol: 'Po', name: 'Polonium', atomicNumber: 84, row: 6, col: 16, category: 'post-transition' },
  { symbol: 'At', name: 'Astatine', atomicNumber: 85, row: 6, col: 17, category: 'halogens' },
  { symbol: 'Rn', name: 'Radon', atomicNumber: 86, row: 6, col: 18, category: 'noble' },
  
  // Row 7 (only main groups for simplicity)
  { symbol: 'Fr', name: 'Francium', atomicNumber: 87, row: 7, col: 1, category: 'alkali' },
  { symbol: 'Ra', name: 'Radium', atomicNumber: 88, row: 7, col: 2, category: 'alkaline' },
  { symbol: 'Nh', name: 'Nihonium', atomicNumber: 113, row: 7, col: 13, category: 'unknown' },
  { symbol: 'Fl', name: 'Flerovium', atomicNumber: 114, row: 7, col: 14, category: 'unknown' },
  { symbol: 'Mc', name: 'Moscovium', atomicNumber: 115, row: 7, col: 15, category: 'unknown' },
  { symbol: 'Lv', name: 'Livermorium', atomicNumber: 116, row: 7, col: 16, category: 'unknown' },
  { symbol: 'Ts', name: 'Tennessine', atomicNumber: 117, row: 7, col: 17, category: 'unknown' },
  { symbol: 'Og', name: 'Oganesson', atomicNumber: 118, row: 7, col: 18, category: 'unknown' },
];