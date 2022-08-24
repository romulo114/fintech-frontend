export interface Price {
  symbol: string;
  share: number;
  updated: Date;
}

export interface AccountPosition {
  symbol: string;
  share: number;
  isCash: boolean;
  price: Price[];
}

export interface AccountInfo {
  id: number;
  accountNo: string;
  brokerName: string;
  portfolioId: number;
  userId: number;
  positions: AccountPosition[];
}
