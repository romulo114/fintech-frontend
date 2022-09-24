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
}

export interface AccountInfo {
  id: number;
  accountNo: string;
  brokerName: string;
  portfolioId: number;
  userId: number;
  positions: AccountPosition[];
}

export interface AccountPositionInfo {
  id: number;
  symbol: string;
  shares: number;
  accountNo: string;
  brokerName: string;
  portfolioId: number;
  pendingId: number;
  accountId: number;
}