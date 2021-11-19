export interface ModelPositionData {
  symbol: string;
  weight: number;
  price?: number;
}

export interface ModelPositionPayload {
  positions: ModelPositionData[];
}

export interface ModelPosition extends ModelPositionData {
  id: number;
}

export interface ModelPayload {
  name: string;
  keywords: string;
  isPublic: boolean;
  description: string;
}
export interface ModelInfo extends ModelPayload {
  id: number;
  positions: ModelPosition[];
}
