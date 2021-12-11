import { PortfolioInfo } from './portfolio'

export interface PriceInfo {
  accountPosition: number;
  modelPosition: number;
  symbol: string;
  price: number;
}

export interface TradeInfo {
  id: number;
  name: string;
  created: string;
  status: boolean;
  portfolios: PortfolioInfo[];
}
