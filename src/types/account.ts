import { BusinessPrice } from "./business";

export interface Price {
  id: number;
  symbol: string;
  share: number;
  updated: Date;
}

export interface AccountPosition {
  id?: number;
  symbol: string;
  shares: number;
  isCash: boolean;
  price: BusinessPrice;
}

export interface AccountPositionPayload {
  id?: number;
  symbol: string;
  shares: number;
  isCash: boolean;
  price: number | null;
}

export interface AccountInfo {
  id: number;
  accountNo: string;
  brokerName: string;
  portfolioId: number;
  userId: number;
  positions: AccountPosition[];
}
