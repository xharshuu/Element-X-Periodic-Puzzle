// Type definitions for periodic table data
declare module '../data/periodicTableData' {
  interface ElementData {
    symbol: string;
    name: string;
    atomicNumber: number;
    row: number;
    col: number;
    category: string;
    displayType?: 'symbol' | 'name';
  }
  
  export const periodicTableData: ElementData[];
}