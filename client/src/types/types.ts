// Element data interface
export interface ElementData {
  symbol: string;
  name: string;
  atomicNumber: number;
  row: number;
  col: number;
  category: string;
  displayType?: 'symbol' | 'name';
}

// Category interface
export interface Category {
  id: string;
  name: string;
  color: string;
}