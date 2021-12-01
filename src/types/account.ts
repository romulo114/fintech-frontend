export interface AccountInfo {
  id: number;
  accountNo: string;
  brokerName: string;
  portfolioId: number;
  userId: number;
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