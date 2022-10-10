export interface ModelPositionData {
  id?: number;
  symbol: string;
  weight: number;
  model_id?: number;
}

export interface ModelPositionPayload {
  positions: ModelPositionData[];
}

export interface ModelPosition extends ModelPositionData {
  id: number;
}

export interface ModelPayload {
  name: string;
  keywords: string[];
  public: boolean;
  description: string;
}
export interface ModelInfo extends ModelPayload {
  id: number;
  positions: ModelPosition[];
  userId: number;
}
