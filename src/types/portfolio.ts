import { ModelInfo } from './model'
import { AccountInfo } from './account'

export interface PortfolioInfo {
  id: number;
  name: string;
  model?: ModelInfo;
  accounts: AccountInfo[];
}
