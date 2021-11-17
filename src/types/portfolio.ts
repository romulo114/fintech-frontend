import { ModelInfo } from "./model"

export interface PortfolioInfo {
  id: number;
  name: string;
  model?: ModelInfo;
  accounts: number[];
}
