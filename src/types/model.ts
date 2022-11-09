export interface ModelPositionData {
  id?: number;
  symbol: string;
  weight: number;
  model_id?: number;
}

export interface ModelPositionPayload extends ModelPositionData {
  price: number | null;
}

export interface ModelPositionUpdatePayload {
  positions: ModelPositionPayload[];
}

export interface ModelPosition extends ModelPositionPayload {
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
}
