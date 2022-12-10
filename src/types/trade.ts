import { PortfolioInfo } from './portfolio'

export interface PriceInfo {
  accountPosition: number;
  modelPosition: number;
  symbol: string;
  price: number;
}

type ExtPortfolioInfo = PortfolioInfo & {
  has_cash_positions: boolean;
  has_prices: boolean;
}
export interface TradePortofolioInfo {
  id: number;
  active: boolean;
  portfolio: ExtPortfolioInfo;
}
export interface TradeInfo {
  id: number;
  name: string;
  created: string;
  status: boolean;
  portfolios: TradePortofolioInfo[];
}
