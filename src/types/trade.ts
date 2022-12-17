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

export type TradeBaseInfo = {
  name: string;
  status: boolean;
}

export type TradeInfo = TradeBaseInfo & {
  id: number;
  created: string;
  portfolios: TradePortofolioInfo[];
}
