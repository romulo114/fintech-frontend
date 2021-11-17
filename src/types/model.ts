export interface ModelPosition {
  id: number;
  symbol: string;
  weight: number;
  price: number;
}

export interface ModelInfo {
  id: number;
  name: string;
  keywords: string[];
  isPublic: boolean;
  positions: ModelPosition[]
}
