export interface PendingInfo {
  portfolio: number;
  portfolioName: string;
  modelId: number;
}

export interface PriceInfo {
  accountPosition: number;
  modelPosition: number;
  symbol: string;
  price: number;
}

export interface TradeInfo {
  id: number;
  name: string;
  created: Date;
  status: boolean;
  pendings: PendingInfo[];
  prices: PriceInfo[];
}
